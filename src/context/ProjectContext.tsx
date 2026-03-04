'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, projects as initialProjects } from '@/data/projects';
import { getProjectsFromDB, saveProjectsToDB, getUsersFromDB, saveUsersToDB, getLandingCategoriesFromDB, saveLandingCategoriesToDB } from '@/utils/db';

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

export interface LandingCategory {
    title: string;
    subtitle: string;
    image: string;
    id: string; // The category ID for filtering
}

export const INITIAL_CATEGORIES: LandingCategory[] = [
    { title: 'Escenarios Deportivos', subtitle: 'Proyectos deportivos y recreativos', image: 'https://picsum.photos/seed/deporte/800/600', id: 'Deporte' },
    { title: 'Megacolegios', subtitle: 'Tecnología educativa de punta', image: 'https://picsum.photos/seed/ed-1/800/600', id: 'Educación' },
    { title: 'Jardines Mzl', subtitle: 'Educación y desarrollo infantil', image: 'https://picsum.photos/seed/ed-2/800/600', id: 'Educación' },
    { title: 'Parques y Ornato', subtitle: 'Espacios verdes de recreación', image: 'https://picsum.photos/seed/parques/800/600', id: 'Parques' },
    { title: 'Centros Culturales', subtitle: 'Cultura, museos y música local', image: 'https://picsum.photos/seed/cultura/800/600', id: 'Cultura' },
    { title: 'Estadio Palogrande', subtitle: 'Unidad deportiva emblemática', image: 'https://picsum.photos/seed/estadio/800/600', id: 'Deporte' },
    { title: 'Cable Aéreo L3', subtitle: 'Movilidad sostenible de alta capacidad', image: 'https://picsum.photos/seed/cable/800/600', id: 'Transporte' },
    { title: 'Vía Los Cedros', subtitle: 'Solución vial estratégica norte', image: 'https://picsum.photos/seed/cedros/800/600', id: 'Vial' },
    { title: 'Seguridad y CAI', subtitle: 'Fortalecimiento de la seguridad ciudadana', image: 'https://picsum.photos/seed/seguridad/800/600', id: 'Seguridad' },
    { title: 'Salud de la Enea', subtitle: 'Red de hospitales municipal', image: 'https://picsum.photos/seed/salud/800/600', id: 'Salud' },
    { title: 'Saneamiento PTAR', subtitle: 'Infraestructura ambiental crítica', image: 'https://picsum.photos/seed/saneamiento/800/600', id: 'Saneamiento' },
    { title: 'Teatro Fundadores', subtitle: 'Renovación de espacios icónicos', image: 'https://picsum.photos/seed/teatro/800/600', id: 'Cultura' },
    { title: 'Intercambiadores', subtitle: 'Puentes y conectividad urbana', image: 'https://picsum.photos/seed/vial-2/800/600', id: 'Vial' },
    { title: 'Canchas Sintéticas', subtitle: 'Grama profesional en barrios', image: 'https://picsum.photos/seed/canchas/800/600', id: 'Deporte' },
    { title: 'Pista BMX Aranjuez', subtitle: 'Deportes de alto rendimiento', image: 'https://picsum.photos/seed/bmx/800/600', id: 'Deporte' },
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

    // Landing Page
    landingCategories: LandingCategory[];
    updateLandingCategory: (index: number, category: LandingCategory) => void;
    setLandingCategories: (categories: LandingCategory[]) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
    const [allProjects, setAllProjects] = useState<Project[]>(initialProjects);
    const [allUsers, setAllUsers] = useState<User[]>(INITIAL_USERS);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [landingCategories, setLandingCategories] = useState<LandingCategory[]>(INITIAL_CATEGORIES);
    const [isInitialized, setIsInitialized] = useState(false);

    // Filter projects based on user assignment
    const projects = currentUser?.role === 'manager'
        ? allProjects.filter(p => p.assignedManager === currentUser.username)
        : allProjects;

    useEffect(() => {
        const loadInitialData = async () => {
            const savedProjects = await getProjectsFromDB();
            const savedUsers = await getUsersFromDB();
            const savedCats = await getLandingCategoriesFromDB();
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

            if (savedCats && savedCats.length > 0) {
                setLandingCategories(savedCats);
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
            await saveLandingCategoriesToDB(landingCategories);

            if (currentUser) {
                localStorage.setItem('mzl_current_user', JSON.stringify(currentUser));
            } else {
                localStorage.removeItem('mzl_current_user');
            }
        };

        saveData();
    }, [allProjects, allUsers, currentUser, isInitialized, landingCategories]);

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

    const updateLandingCategory = (index: number, updatedCat: LandingCategory) => {
        setLandingCategories(prev => {
            const next = [...prev];
            next[index] = updatedCat;
            return next;
        });
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
            deleteUser,
            landingCategories,
            updateLandingCategory,
            setLandingCategories
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
