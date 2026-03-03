'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
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
            if (user === 'admin' && pass === 'mzl2026') {
                login('admin', 'admin', 'Alcaldía de Manizales');
                showToast('Bienvenido, Administrador', 'success');
                router.push('/admin');
            } else if (user === 'ingeniero' && pass === 'obra2026') {
                login('ingeniero', 'manager', 'Ing. Carlos Pérez');
                showToast('Bienvenido, Ingeniero de Obra', 'success');
                router.push('/admin');
            } else {
                showToast('Credenciales incorrectas', 'error');
                setLoading(false);
            }
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f1a] flex font-outfit overflow-hidden">

            {/* Left Side: Login Form */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white dark:bg-[#0b0f1a] relative z-10 shadow-2xl">

                <div className="absolute top-10 left-10">
                    <Link href="/" className="flex items-center gap-3 text-slate-400 hover:text-[#0747a1] transition-colors group">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-[#0747a1] group-hover:text-white transition-all">
                            <ArrowLeft size={20} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Regresar</span>
                    </Link>
                </div>

                <div className="max-w-md mx-auto w-full">
                    <div className="mb-12">
                        <div className="w-16 h-16 bg-[#0747a1] rounded-2xl flex items-center justify-center text-white shadow-2xl mb-6">
                            <ShieldCheck size={32} />
                        </div>
                        <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter uppercase italic leading-none">Acceso Institucional</h1>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-3 leading-relaxed">
                            Portal oficial para el personal de la Secretaría de Infraestructura.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#0747a1] pl-1">Usuario de Red</label>
                            <div className="relative">
                                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    placeholder="ej: carlos_perez"
                                    className="w-full pl-16 pr-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-sm font-bold text-slate-800 dark:text-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#0747a1] pl-1">Contraseña Única</label>
                            <div className="relative">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="password"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-16 pr-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-sm font-bold text-slate-800 dark:text-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#0747a1] focus:ring-[#0747a1]" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recordar sesión</span>
                            </label>
                            <button type="button" className="text-[10px] font-black uppercase tracking-widest text-[#0747a1] hover:underline">¿Olvidó su clave?</button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-[#0747a1] text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    Autenticando...
                                </span>
                            ) : (
                                <>
                                    Ingresar al Sistema <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    <footer className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-relaxed italic opacity-50">
                            © 2026 Alcaldía de Manizales. <br />
                            Todos los derechos reservados. Secretaría de TIC y Competitividad.
                        </p>
                    </footer>
                </div>
            </div>

            {/* Right Side: Brand Illustration */}
            <div className="hidden lg:block lg:flex-1 relative overflow-hidden bg-[#0747a1]">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/img/brand_slogan.png"
                        alt="Manizales del alma"
                        className="w-full h-full object-cover mix-blend-multiply opacity-50 scale-110 blur-[2px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0747a1] via-[#0747a1]/70 to-transparent" />
                </div>

                <div className="relative z-10 h-full flex flex-col items-center justify-center p-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-xl"
                    >
                        <img
                            src="/img/brand_slogan.png"
                            alt="Manizales del alma"
                            className="w-full h-auto rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-4 border-white/10"
                        />

                        <div className="mt-16 space-y-4">
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white drop-shadow-lg">
                                Transformando la Ciudad
                            </h3>
                            <p className="text-lg font-bold text-blue-100 opacity-80 leading-relaxed px-10">
                                La gestión pública es un compromiso de todos. <br /> Monitoriza, gestiona y entrega resultados para nuestra gente.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative dots/lines from the brand style */}
                <div className="absolute bottom-10 right-10 flex gap-1 opacity-20">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-white" />
                    ))}
                </div>
            </div>
        </div>
    );
}
