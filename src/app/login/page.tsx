'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useProjects } from '@/context/ProjectContext';
import { useToast } from '@/context/ToastContext';

export default function LoginPage() {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login } = useProjects();
    const { showToast } = useToast();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulation
        setTimeout(() => {
            if (user === 'admin' && pass === 'mzl2024') {
                login('admin', 'admin', 'Super Administrador');
                showToast('Bienvenido, Administrador', 'success');
                router.push('/admin');
            } else if (user === 'ingeniero' && pass === 'obra2024') {
                login('ingeniero', 'manager', 'Residente de Obra');
                showToast('Bienvenido, Ingeniero de Obra', 'success');
                router.push('/admin');
            } else {
                showToast('Credenciales incorrectas. Intenta admin/mzl2024 o ingeniero/obra2024', 'error');
                setLoading(false);
            }
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 font-outfit">
            <Link href="/" className="mb-12 flex flex-col items-center group">
                <div className="w-16 h-16 bg-[#0747a1] rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-all">
                    <ShieldCheck size={32} />
                </div>
                <div className="mt-4 text-center">
                    <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter uppercase italic">Obras Manizales</h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0747a1]">Acceso Institucional</p>
                </div>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-2xl border border-slate-100 dark:border-slate-800"
            >
                <div className="mb-10 text-center">
                    <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Gestión de Proyectos</h2>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ingresa tus credenciales de funcionario</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Usuario</label>
                        <div className="relative">
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                placeholder="Escribe tu usuario"
                                className="w-full pl-16 pr-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-slate-800 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-16 pr-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-slate-800 dark:text-white"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-[#0747a1] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {loading ? 'Validando...' : (
                            <>
                                Ingresar Sistema <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-12 pt-8 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex items-center gap-4 text-slate-300 dark:text-slate-700">
                        <div className="h-[1px] flex-1 bg-current" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Soporte Técnico</span>
                        <div className="h-[1px] flex-1 bg-current" />
                    </div>
                    <p className="text-[9px] text-center text-slate-400 mt-4 leading-relaxed px-8">
                        Este sistema es para uso exclusivo de la Secretaría de Infraestructura de Manizales.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
