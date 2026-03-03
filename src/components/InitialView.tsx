'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart2, Globe, Command, ShieldCheck, User, Settings as Gear, Plus } from 'lucide-react';
import Link from 'next/link';

interface InitialViewProps {
    onEnterDashboard: (categoryId?: string, mode?: 'map' | 'list', query?: string) => void;
}

const CATEGORIES = [
    { title: 'Escenarios Deportivos', subtitle: 'Proyectos deportivos y recreativos', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80', id: 'Deporte' },
    { title: 'Megacolegios', subtitle: 'Tecnología educativa de punta', image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800&q=80', id: 'Educación' },
    { title: 'Jardines Mzl', subtitle: 'Educación y desarrollo infantil', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80', id: 'Educación' },
    { title: 'Parques y Ornato', subtitle: 'Espacios verdes de recreación', image: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914?w=800&q=80', id: 'Parques' },
    { title: 'Centros Culturales', subtitle: 'Cultura, museos y música local', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', id: 'Cultura' },
    { title: 'Estadio Palogrande', subtitle: 'Unidad deportiva emblemática', image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80', id: 'Deporte' },
    { title: 'Cable Aéreo L3', subtitle: 'Movilidad sostenible de alta capacidad', image: 'https://images.unsplash.com/photo-1494522358652-f30e63a60317?w=800&q=80', id: 'Transporte' },
    { title: 'Vía Los Cedros', subtitle: 'Solución vial estratégica norte', image: 'https://images.unsplash.com/photo-1545143333-11b2724c9d19?w=800&q=80', id: 'Vial' },
    { title: 'Seguridad y CAI', subtitle: 'Fortalecimiento de la seguridad ciudadana', image: 'https://images.unsplash.com/photo-1555854816-802f188095e4?w=800&q=80', id: 'Seguridad' },
    { title: 'Salud de la Enea', subtitle: 'Red de hospitales municipal', image: 'https://images.unsplash.com/photo-1586773860418-d319ebb274e1?w=800&q=80', id: 'Salud' },
    { title: 'Saneamiento PTAR', subtitle: 'Infraestructura ambiental crítica', image: 'https://images.unsplash.com/photo-1536697246747-e23a64150ba7?w=800&q=80', id: 'Saneamiento' },
    { title: 'Teatro Fundadores', subtitle: 'Renovación de espacios icónicos', image: 'https://images.unsplash.com/photo-1503095396549-80705bc0607a?w=800&q=80', id: 'Cultura' },
    { title: 'Intercambiadores', subtitle: 'Puentes y conectividad urbana', image: 'https://images.unsplash.com/photo-1545143333-11b2724c9d19?w=800&q=80', id: 'Vial' },
    { title: 'Canchas Sintéticas', subtitle: 'Grama profesional en barrios', image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80', id: 'Deporte' },
    { title: 'Pista BMX Aranjuez', subtitle: 'Deportes de alto rendimiento', image: 'https://images.unsplash.com/photo-1544191143-693630650949?w=800&q=80', id: 'Deporte' },
];

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

            {/* Floating Top Access */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute top-10 right-10 z-[50]"
            >
                <Link
                    href="/login"
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-all group"
                >
                    <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-[#0747a1] transition-all">
                        <User size={18} />
                    </div>
                    <div>
                        <p className="text-[8px] font-black uppercase tracking-widest opacity-60 leading-none mb-1">Portal Oficial</p>
                        <p className="text-[10px] font-black uppercase tracking-widest">Acceso Institucional</p>
                    </div>
                </Link>
            </motion.div>

            {/* Header Blocks - Balanced Size */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'circOut' }}
                className="flex mb-12 shadow-[0_20px_40px_rgba(0,0,0,0.5)] rounded-[1.5rem] overflow-hidden border-2 border-white/10 z-10"
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
                {CATEGORIES.map((cat, i) => (
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

            {/* Footer System Taskbar Mockup */}
            <div className="mt-16 flex items-center justify-between w-full max-w-7xl px-12 py-6 bg-white/10 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 shadow-2xl relative z-10">
                <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-2xl">
                        <Globe size={24} className="opacity-80" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Sistema Activo</p>
                        <p className="text-xs font-black uppercase tracking-widest text-[#90caf9]">GEOLOCALIZACIÓN MZL V2.4</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.25, y: -8, rotate: 5 }}
                            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white via-slate-100 to-slate-200 shadow-2xl cursor-pointer border border-white/30 flex items-center justify-center text-blue-900/40"
                        >
                            <Command size={20} />
                        </motion.div>
                    ))}
                </div>

                <div className="flex items-center gap-4 text-right">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Uptime</p>
                        <p className="text-xs font-black uppercase tracking-widest text-emerald-400">99.9% LIVE ACCESS</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    </div>
                </div>
            </div>
        </div >
    );
}
