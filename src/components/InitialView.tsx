'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart2, Globe, Command, ShieldCheck, User, Settings as Gear, Plus } from 'lucide-react';
import Link from 'next/link';
import { useProjects } from '@/context/ProjectContext';

interface InitialViewProps {
    onEnterDashboard: (categoryId?: string, mode?: 'map' | 'list', query?: string) => void;
}

// Removido CATEGORIES estático

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: 'spring' as const, damping: 15, stiffness: 100 }
    }
};

export default function InitialView({ onEnterDashboard }: InitialViewProps) {
    const { landingCategories } = useProjects();
    return (
        <div className="min-h-screen bg-[#0b0f1a] text-white flex flex-col items-center p-6 md:p-12 overflow-hidden font-outfit relative">

            {/* Background Pattern - subtle command center effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px]" />
                <div className="absolute -top-1/4 -right-1/4 w-full h-full bg-blue-600/10 blur-[200px] rounded-full" />
                <div className="absolute -bottom-1/4 -left-1/4 w-full h-full bg-emerald-500/5 blur-[200px] rounded-full" />

                {/* Decorative Brand Elements */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-20 right-[15%] text-slate-800 opacity-20"
                >
                    <Gear size={180} />
                </motion.div>
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute bottom-40 left-[10%] text-slate-800 opacity-20"
                >
                    <Gear size={120} />
                </motion.div>
                <div className="absolute top-1/2 right-[5%] text-yellow-500 opacity-20">
                    <Plus size={40} />
                </div>
                <div className="absolute bottom-1/4 right-[20%] text-yellow-500 opacity-20">
                    <Plus size={30} />
                </div>
            </div>

            {/* Top Navigation & Brand Header */}
            <div className="w-full max-w-7xl flex justify-between items-center z-[50] mb-12">
                {/* Branding */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 group cursor-default"
                >
                    <div className="w-14 h-14 bg-white rounded-2xl p-1.5 flex items-center justify-center shadow-xl border border-white/10 transition-transform group-hover:scale-105">
                        <img src="/favicon.png" alt="Escudo Manizales" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm md:text-xl font-black uppercase tracking-tighter text-white leading-none italic">
                            Alcaldía de Manizales
                        </p>
                        <p className="text-[7px] font-bold uppercase tracking-[0.4em] text-white/30 truncate mt-1">Portal Oficial de Obras Estratégicas</p>
                    </div>
                </motion.div>

                {/* Login Access */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Link
                        href="/login"
                        className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-white/10 hover:bg-white/15 transition-all group"
                    >
                        <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:text-[#0747a1] transition-all">
                            <User size={14} />
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-widest">Acceso</p>
                    </Link>
                </motion.div>
            </div>

            {/* Header Blocks - Compacted spacing */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'circOut' }}
                className="flex mb-12 shadow-[0_25px_50px_rgba(0,0,0,0.6)] rounded-[2rem] overflow-hidden border-2 border-white/10 z-10"
            >
                <div className="bg-[#0747a1] px-10 py-5">
                    <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic">Proyectos</h1>
                </div>
                <div className="bg-white/5 backdrop-blur-md px-10 py-5">
                    <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic opacity-60">Estratégicos</h1>
                </div>
            </motion.div>

            {/* Main Large Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14 w-full max-w-4xl z-10">
                <motion.button
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onEnterDashboard(undefined, 'map')}
                    className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 flex flex-col items-center gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-slate-800 dark:text-white transition-all group relative overflow-hidden border border-white/5"
                >
                    <div className="bg-[#0747a1] p-5 rounded-2xl text-white group-hover:bg-blue-600 transition-colors shadow-xl shadow-blue-500/20">
                        <BarChart2 size={40} />
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-black mb-1 capitalize tracking-tight">Geo-Visor Estratégico</h2>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Reporte de progreso en vivo</p>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-1.5 bg-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onEnterDashboard(undefined, 'list')}
                    className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 flex flex-col items-center gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-slate-800 dark:text-white transition-all group relative overflow-hidden border border-white/5"
                >

                    <div className="bg-emerald-500 p-5 rounded-2xl text-white group-hover:bg-emerald-400 transition-colors shadow-xl shadow-emerald-500/20">
                        <Search size={40} />
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-black mb-1 capitalize tracking-tight">Consulta Ciudadana</h2>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Detalle específico de obras</p>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-1.5 bg-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
            </div>

            {/* Stripes Decoration */}
            <div className="w-full flex justify-center mb-12 opacity-30">
                <div className="flex gap-2">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="w-12 h-3 bg-yellow-500 rotate-[45deg]" />
                    ))}
                </div>
            </div>

            {/* Categories Staggered Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-[105rem] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 z-10"
            >
                {landingCategories.map((cat, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        whileHover={{ y: -15, scale: 1.02, transition: { duration: 0.2 } }}
                        className="bg-white rounded-[2rem] overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.25)] flex flex-col cursor-pointer group border-4 border-transparent hover:border-[#1976d2]/30 transition-all aspect-[4/3] md:aspect-auto"
                        onClick={() => onEnterDashboard(cat.id)}
                    >
                        <div className="h-40 overflow-hidden relative">
                            <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                            <div className="absolute top-4 left-4 flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-white opacity-50" />
                                <div className="w-2 h-2 rounded-full bg-white opacity-20" />
                            </div>
                        </div>
                        <div className="p-6 text-center flex-1 flex flex-col justify-center border-t border-slate-50">
                            <h3 className="text-[#0747a1] font-black text-sm md:text-lg uppercase tracking-tighter mb-1 leading-none">{cat.title}</h3>
                            <p className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-widest opacity-80">{cat.subtitle}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Footer Version */}
            <div className="mt-16 py-10 flex flex-col items-center gap-3 opacity-30 relative z-10">
                <div className="flex items-center gap-4">
                    <img src="/favicon.png" alt="escudo" className="w-8 h-8 object-contain brightness-0 invert opacity-50" />
                    <div className="w-px h-6 bg-white/20" />
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400">Sistema Activo</p>
                        </div>
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400/80 italic">GEOLOCALIZACIÓN MZL v2026.03.04</p>
                    </div>
                </div>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
        </div >
    );
}
