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
    Mail
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/context/ProjectContext';
import { useToast } from '@/context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

export default function AdminDashboard() {
    const { projects, deleteProject, currentUser, logout, allUsers, deleteUser } = useProjects();
    const { showToast } = useToast();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'projects' | 'users'>('projects');
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [isDeletingUser, setIsDeletingUser] = useState<string | null>(null);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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
                ) : (
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
                            {filteredUsers.map((user) => (
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
                                        <button className="flex-1 py-3 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
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

                                    {/* Decoration */}
                                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#0747a1]/5 rounded-full blur-2xl group-hover:bg-[#0747a1]/10 transition-all" />
                                </motion.div>
                            ))}

                            {/* Add User Card */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-slate-50 dark:bg-slate-900/30 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-[#0747a1] hover:border-[#0747a1]/30 transition-all group min-h-[300px]"
                            >
                                <div className="w-16 h-16 rounded-[1.5rem] border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Plus size={32} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest">Registrar Nuevo Responsable</span>
                            </motion.button>
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
        </div>
    );
}
