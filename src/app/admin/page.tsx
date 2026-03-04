'use client';

import React, { useState } from 'react';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    ArrowLeft,
    LayoutDashboard,
    Building2,
    Calendar,
    ChevronRight,
    Filter,
    Users as UsersIcon,
    ShieldCheck,
    Briefcase,
    Mail,
    X,
    Globe
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProjects, User, LandingCategory } from '@/context/ProjectContext';
import { useToast } from '@/context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

export default function AdminDashboard() {
    const { projects, allProjects, deleteProject, currentUser, logout, allUsers, deleteUser, updateUser, landingCategories, updateLandingCategory } = useProjects();
    const { showToast } = useToast();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'projects' | 'users' | 'landing'>('projects');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [isDeletingUser, setIsDeletingUser] = useState<string | null>(null);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [editingCategory, setEditingCategory] = useState<{ index: number, cat: LandingCategory } | null>(null);
    const [userForm, setUserForm] = useState({ name: '', role: 'manager' as 'admin' | 'manager', username: '' });
    const [catForm, setCatForm] = useState<LandingCategory>({ title: '', subtitle: '', image: '', id: '' });

    React.useEffect(() => {
        if (!currentUser) router.push('/login');
    }, [currentUser, router]);

    if (!currentUser) return null;

    const filteredProjects = projects.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.contractor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredUsers = allUsers.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string, name: string) => {
        setIsDeleting(id);
    };

    const confirmDelete = () => {
        if (isDeleting) {
            deleteProject(isDeleting);
            showToast('Proyecto eliminado exitosamente', 'success');
            setIsDeleting(null);
        }
    };

    const handleDeleteUser = (username: string) => {
        if (username === currentUser.username) {
            showToast('No puedes eliminar tu propio usuario', 'error');
            return;
        }
        setIsDeletingUser(username);
    };

    const confirmDeleteUser = () => {
        if (isDeletingUser) {
            deleteUser(isDeletingUser);
            showToast('Usuario eliminado correctamente', 'success');
            setIsDeletingUser(null);
        }
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setUserForm({ name: user.name, role: user.role, username: user.username });
    };

    const handleEditCategory = (index: number, cat: LandingCategory) => {
        setEditingCategory({ index, cat });
        setCatForm({ ...cat });
    };

    const confirmUpdateCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            updateLandingCategory(editingCategory.index, catForm);
            setEditingCategory(null);
            showToast('Categoría actualizada exitosamente', 'success');
        }
    };

    const confirmUpdateUser = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser(userForm as any);
        showToast('Perfil actualizado correctamente', 'success');
        setEditingUser(null);
    };

    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    };

    const confirmLogout = () => {
        logout();
        showToast('Sesión cerrada correctamente', 'info');
        router.push('/');
    };

    const currencyFormat = (num: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(num);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-outfit">
            {/* Sidebar / Header */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-[#0747a1] rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                <ArrowLeft size={20} />
                            </div>
                            <div>
                                <h1 className="text-xl font-black text-slate-800 dark:text-white tracking-tighter uppercase italic">Panel de Gestión</h1>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#0747a1]">Alcaldía de Manizales</p>
                            </div>
                        </Link>

                        {/* DESKTOP TABS */}
                        <div className="hidden lg:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl ml-8">
                            <button
                                onClick={() => setActiveTab('projects')}
                                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'projects' ? 'bg-white dark:bg-slate-700 text-[#0747a1] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <div className="flex items-center gap-2">
                                    <Briefcase size={14} /> Proyectos
                                </div>
                            </button>
                            {currentUser.role === 'admin' && (
                                <button
                                    onClick={() => setActiveTab('users')}
                                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-white dark:bg-slate-700 text-[#0747a1] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <UsersIcon size={14} /> Responsables
                                    </div>
                                </button>
                            )}
                            {currentUser.role === 'admin' && (
                                <button
                                    onClick={() => setActiveTab('landing')}
                                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'landing' ? 'bg-white dark:bg-slate-700 text-[#0747a1] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Globe size={14} /> Pantalla Principal
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#0747a1]">{currentUser.role === 'admin' ? 'Administrador Central' : 'Responsable de Obra'}</p>
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{currentUser.name}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-50 dark:bg-red-500/10 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all border border-red-100 dark:border-red-500/20"
                        >
                            Salir
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {activeTab === 'projects' ? (
                    <>
                        {/* Stats Header */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                            {[
                                { label: 'Total Obras', val: projects.length, color: 'text-blue-600', icon: <Building2 /> },
                                { label: 'En Ejecución', val: projects.filter(p => p.status !== 'Entregado').length, color: 'text-orange-500', icon: <Calendar /> },
                                { label: 'Finalizadas', val: projects.filter(p => p.status === 'Entregado').length, color: 'text-emerald-600', icon: <Trash2 /> },
                                { label: 'Presupuesto Total', val: currencyFormat(projects.reduce((acc, p) => acc + p.budget, 0)), color: 'text-slate-800 dark:text-white', icon: <LayoutDashboard /> },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400">{stat.icon}</div>
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                                    <h3 className={`text-xl font-black tracking-tighter ${stat.color}`}>{stat.val}</h3>
                                </div>
                            ))}
                        </div>

                        {/* Toolbar */}
                        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-4 top-1/2 -mt-2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Buscar obra..."
                                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-slate-700 dark:text-white shadow-sm"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-4 w-full md:w-auto">
                                <Link
                                    href="/admin/new"
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-[#0747a1] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-blue-500/20"
                                >
                                    <Plus size={16} /> Nueva Obra
                                </Link>
                            </div>
                        </div>

                        {/* Projects Table */}
                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Proyecto</th>
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Presupuesto</th>
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Progreso</th>
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Estado</th>
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {filteredProjects.map((project) => (
                                            <tr key={project.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 shadow-inner">
                                                            <img src={project.images.render} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tighter line-clamp-1">{project.name}</p>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{project.contractor}</p>
                                                            {project.assignedManager && (
                                                                <div className="flex items-center gap-1.5 mt-1">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#0747a1]" />
                                                                    <span className="text-[8px] font-black text-[#0747a1] dark:text-blue-400 uppercase tracking-widest">Asignado: {allUsers.find(u => u.username === project.assignedManager)?.name}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <p className="text-sm font-black text-slate-700 dark:text-slate-300 tracking-tighter">{currencyFormat(project.budget)}</p>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase">Total Inversión</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-blue-600 rounded-full shadow-lg"
                                                                style={{ width: `${project.progress}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-xs font-black text-[#0747a1] dark:text-blue-400">{project.progress}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${project.status === 'Entregado'
                                                        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 border border-emerald-100 dark:border-emerald-500/20'
                                                        : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 border border-blue-100 dark:border-blue-500/20'
                                                        }`}>
                                                        {project.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex items-center gap-2 justify-end">
                                                        <Link
                                                            href={`/admin/edit/${project.id}`}
                                                            className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all"
                                                            title="Editar obra"
                                                        >
                                                            <Edit2 size={16} />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(project.id, project.name)}
                                                            className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all"
                                                            title="Eliminar obra"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                        <Link href={`/projects/${project.id}`} className="ml-2 group/link">
                                                            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover/link:bg-[#0747a1] group-hover/link:text-white transition-all">
                                                                <ChevronRight size={16} />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : activeTab === 'users' ? (
                    <>
                        {/* Users Management Tab */}
                        <div className="flex flex-col md:flex-row gap-4 mb-10 justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter uppercase italic">Responsables de Obra</h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Gestión de Ingenieros e Interventores</p>
                            </div>
                            <div className="relative w-full md:w-72">
                                <Search className="absolute left-4 top-1/2 -mt-2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Buscar usuario..."
                                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold shadow-sm"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(searchTerm ? allUsers.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase())) : allUsers).map((user) => (
                                <motion.div
                                    key={user.username}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl group relative overflow-hidden"
                                >
                                    <div className="flex items-center gap-5 mb-8">
                                        <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${user.role === 'admin' ? 'bg-[#0747a1] text-white' : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600'}`}>
                                            {user.role === 'admin' ? <ShieldCheck size={32} /> : <UsersIcon size={32} />}
                                        </div>
                                        <div>
                                            <h4 className="text-base font-black text-slate-800 dark:text-white uppercase tracking-tight">{user.name}</h4>
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${user.role === 'admin' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 border-blue-100' : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 border-emerald-100'}`}>
                                                {user.role === 'admin' ? 'Administrador' : 'Responsable de Obra'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-3 text-slate-500">
                                            <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                                <Mail size={14} />
                                            </div>
                                            <span className="text-xs font-bold">{user.username}@manizales.gov.co</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-500">
                                            <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                                <Briefcase size={14} />
                                            </div>
                                            <span className="text-xs font-bold">
                                                {allProjects.filter(p => p.assignedManager === user.username).length} Obras Asignadas
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 border-t border-slate-50 dark:border-slate-800 pt-6">
                                        <button
                                            onClick={() => handleEditUser(user)}
                                            className="flex-1 py-3 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all"
                                        >
                                            Editar Perfil
                                        </button>
                                        {user.username !== currentUser.username && (
                                            <button
                                                onClick={() => handleDeleteUser(user.username)}
                                                className="p-3 text-red-500 bg-red-50 dark:bg-red-900/30 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#0747a1]/5 rounded-full blur-2xl group-hover:bg-[#0747a1]/10 transition-all" />
                                </motion.div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        {/* Landing Page Management Tab */}
                        <div className="flex flex-col md:flex-row gap-4 mb-10 justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter uppercase italic">Pantalla Principal</h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Gestión de Categorías y Visuales del Inicio</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {landingCategories.map((cat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl group relative"
                                >
                                    <div className="h-32 relative overflow-hidden">
                                        <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                        <button
                                            onClick={() => handleEditCategory(i, cat)}
                                            className="absolute top-4 right-4 w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-[#0747a1] shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all active:scale-95"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                    </div>
                                    <div className="p-5 text-center">
                                        <h3 className="text-[#0747a1] font-black text-xs uppercase tracking-tight mb-0.5">{cat.title}</h3>
                                        <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest truncate">{cat.subtitle}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </main>

            <ConfirmationModal
                isOpen={isDeleting !== null}
                title="¿Eliminar Proyecto?"
                message={`¿Estás seguro de que deseas eliminar permanentemente la obra "${projects.find(p => p.id === isDeleting)?.name}"? Esta acción no se puede deshacer.`}
                confirmText="Sí, eliminar obra"
                cancelText="Mantener proyecto"
                onConfirm={confirmDelete}
                onCancel={() => setIsDeleting(null)}
                type="danger"
            />

            <ConfirmationModal
                isOpen={isDeletingUser !== null}
                title="¿Eliminar Usuario?"
                message={`¿Estás seguro de que deseas eliminar el acceso a "${allUsers.find(u => u.username === isDeletingUser)?.name}"? Perderá el acceso a sus obras asignadas.`}
                confirmText="Eliminar acceso"
                cancelText="Mantener usuario"
                onConfirm={confirmDeleteUser}
                onCancel={() => setIsDeletingUser(null)}
                type="danger"
            />

            <ConfirmationModal
                isOpen={isLogoutModalOpen}
                title="Cerrar Sesión"
                message="¿Estás seguro de que deseas salir del panel de gestión institucional?"
                confirmText="Salir ahora"
                cancelText="Continuar trabajando"
                onConfirm={confirmLogout}
                onCancel={() => setIsLogoutModalOpen(false)}
                type="warning"
            />
            {/* User Edit Modal */}
            <AnimatePresence>
                {editingUser && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800"
                        >
                            <div className="bg-[#0747a1] p-8 text-white relative">
                                <h3 className="text-xl font-black uppercase tracking-tighter italic">Editar Responsable</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mt-1">Modificar datos institucionales</p>
                                <button onClick={() => setEditingUser(null)} className="absolute top-8 right-8 text-white/50 hover:text-white"><X size={20} /></button>
                            </div>
                            <form onSubmit={confirmUpdateUser} className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 pl-2">Nombre Completo</label>
                                    <input
                                        required
                                        value={userForm.name}
                                        onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                                        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 pl-2">Usuario (ID)</label>
                                    <input
                                        disabled
                                        value={userForm.username}
                                        className="w-full px-5 py-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs font-bold opacity-50 cursor-not-allowed"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 pl-2">Rol del Sistema</label>
                                    <select
                                        value={userForm.role}
                                        onChange={(e) => setUserForm({ ...userForm, role: e.target.value as any })}
                                        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs font-bold appearance-none"
                                    >
                                        <option value="manager">Responsable de Obra</option>
                                        <option value="admin">Administrador</option>
                                    </select>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setEditingUser(null)}
                                        className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-4 bg-[#0747a1] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20"
                                    >
                                        Guardar Cambios
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Category Edit Modal */}
            <AnimatePresence>
                {editingCategory && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800"
                        >
                            <div className="bg-[#0747a1] p-8 text-white relative">
                                <h3 className="text-xl font-black uppercase tracking-tighter italic">Editar Categoría de Inicio</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mt-1">Personaliza el visual de la landing page</p>
                                <button onClick={() => setEditingCategory(null)} className="absolute top-8 right-8 text-white/50 hover:text-white"><X size={20} /></button>
                            </div>
                            <form onSubmit={confirmUpdateCategory} className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 pl-2">Título Principal</label>
                                        <input
                                            required
                                            value={catForm.title}
                                            onChange={(e) => setCatForm({ ...catForm, title: e.target.value })}
                                            className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 pl-2">Vínculo Categoría (Filter ID)</label>
                                        <input
                                            required
                                            value={catForm.id}
                                            onChange={(e) => setCatForm({ ...catForm, id: e.target.value })}
                                            placeholder="Ej: Deporte, Educación..."
                                            className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 pl-2">Subtítulo Descriptivo</label>
                                    <input
                                        required
                                        value={catForm.subtitle}
                                        onChange={(e) => setCatForm({ ...catForm, subtitle: e.target.value })}
                                        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs font-bold"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between pl-2">
                                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Imagen de Fondo (URL o Base64)</label>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-[#0747a1]">Vista Previa</span>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="w-24 h-24 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0">
                                            <img src={catForm.image} className="w-full h-full object-cover" alt="preview" />
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <textarea
                                                required
                                                rows={3}
                                                value={catForm.image}
                                                onChange={(e) => setCatForm({ ...catForm, image: e.target.value })}
                                                placeholder="Pega la URL de la imagen aquí..."
                                                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 text-[10px] font-mono leading-tight"
                                            />
                                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Tip: Usa Picsum o Cloudinary para URL estables</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setEditingCategory(null)}
                                        className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-4 bg-[#0747a1] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20"
                                    >
                                        Actualizar Visual
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
