'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, projects as initialProjects } from '@/data/projects';
import { getProjectsFromDB, saveProjectsToDB, getUsersFromDB, saveUsersToDB } from '@/utils/db';

export interface User {
    username: string;
    role: 'admin' | 'manager';
    name: string;
    email?: string;
    avatar?: string;
}

const INITIAL_USERS: User[] = [
    { username: 'admin', role: 'admin', name: 'Alcaldía de Manizales' },
    { username: 'ingeniero', role: 'manager', name: 'Ing. Carlos Pérez (Residente)' },
    { username: 'diego_obra', role: 'manager', name: 'Ing. Diego Rojas (Interventor)' },
    { username: 'marta_infra', role: 'manager', name: 'Arq. Marta Gómez (Secretaría)' }
];

interface ProjectContextType {
    projects: Project[];
    allProjects: Project[];
    addProject: (project: Project) => void;
    updateProject: (project: Project) => void;
    deleteProject: (id: string) => void;
    getProjectById: (id: string) => Project | undefined;

    // Auth & Users
    currentUser: User | null;
    allUsers: User[];
    login: (username: string, role: 'admin' | 'manager', name: string) => void;
    logout: () => void;
    addUser: (user: User) => void;
    updateUser: (user: User) => void;
    deleteUser: (username: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
    const [allProjects, setAllProjects] = useState<Project[]>(initialProjects);
    const [allUsers, setAllUsers] = useState<User[]>(INITIAL_USERS);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // Filter projects based on user assignment
    const projects = currentUser?.role === 'manager'
        ? allProjects.filter(p => p.assignedManager === currentUser.username)
        : allProjects;

    useEffect(() => {
        const loadInitialData = async () => {
            const savedProjects = await getProjectsFromDB();
            const savedUsers = await getUsersFromDB();
            const savedUser = localStorage.getItem('mzl_current_user');

            if (savedProjects && savedProjects.length > 0) {
                // Ensure new static projects appear
                const projectIds = savedProjects.map((p: Project) => p.id);
                const missingProjects = initialProjects.filter(p => !projectIds.includes(p.id));
                setAllProjects([...savedProjects, ...missingProjects]);
            } else {
                setAllProjects(initialProjects);
            }

            if (savedUsers) {
                setAllUsers(savedUsers);
            }
            if (savedUser) {
                try { setCurrentUser(JSON.parse(savedUser)); } catch (e) { }
            }
            setIsInitialized(true);
        };

        loadInitialData();
    }, []);

    useEffect(() => {
        if (!isInitialized) return;

        const saveData = async () => {
            await saveProjectsToDB(allProjects);
            await saveUsersToDB(allUsers);

            if (currentUser) {
                localStorage.setItem('mzl_current_user', JSON.stringify(currentUser));
            } else {
                localStorage.removeItem('mzl_current_user');
            }
        };

        saveData();
    }, [allProjects, allUsers, currentUser, isInitialized]);

    const login = (username: string, role: 'admin' | 'manager', name: string) => {
        setCurrentUser({ username, role, name });
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const addProject = (project: Project) => {
        setAllProjects(prev => [...prev, project]);
    };

    const updateProject = (updatedProject: Project) => {
        setAllProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
    };

    const deleteProject = (id: string) => {
        setAllProjects(prev => prev.filter(p => p.id !== id));
    };

    const getProjectById = (id: string) => {
        return allProjects.find(p => p.id === id);
    };

    const addUser = (user: User) => {
        setAllUsers(prev => [...prev, user]);
    };

    const updateUser = (updatedUser: User) => {
        setAllUsers(prev => prev.map(u => u.username === updatedUser.username ? updatedUser : u));
    };

    const deleteUser = (username: string) => {
        setAllUsers(prev => prev.filter(u => u.username !== username));
    };

    return (
        <ProjectContext.Provider value={{
            projects,
            allProjects,
            addProject,
            updateProject,
            deleteProject,
            getProjectById,
            currentUser,
            allUsers,
            login,
            logout,
            addUser,
            updateUser,
            deleteUser
        }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjects() {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useProjects must be used within a ProjectProvider');
    }
    return context;
}
