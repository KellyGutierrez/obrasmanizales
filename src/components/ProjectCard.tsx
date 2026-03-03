'use client';

import React from 'react';
import { Project } from '@/data/projects';
import { MapPin, ArrowRight, CheckCircle2, Building2, GraduationCap, Trophy, Stethoscope, Trees, Bus, ShieldCheck, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

import Link from 'next/link';

const CATEGORY_ICONS = {
    Educación: <GraduationCap size={14} className="text-blue-500" />,
    Deporte: <Trophy size={14} className="text-orange-500" />,
    Vial: <Building2 size={14} className="text-zinc-500" />,
    Salud: <Stethoscope size={14} className="text-rose-500" />,
    Parques: <Trees size={14} className="text-emerald-500" />,
    Cultura: <Building2 size={14} className="text-indigo-500" />,
    Seguridad: <ShieldCheck size={14} className="text-slate-500" />,
    Transporte: <Bus size={14} className="text-blue-600" />,
    Saneamiento: <Droplets size={14} className="text-cyan-500" />,
};

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Link href={`/projects/${project.id}`}>
            <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-all duration-500 border border-slate-100 dark:border-slate-700 cursor-pointer overflow-hidden flex flex-col group min-h-[440px]"
            >
                {/* Visual Image Header */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={project.images.current}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-1000"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-2.5 rounded-2xl shadow-lg border border-white dark:border-slate-700">
                        {CATEGORY_ICONS[project.category as keyof typeof CATEGORY_ICONS] || <Building2 size={14} />}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-[#0747a1]/80 backdrop-blur-md text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-xl">
                        ID: #00{project.id}
                    </div>
                </div>

                <div className="p-7 flex flex-col flex-1">
                    <div className="mb-4">
                        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2 leading-tight group-hover:text-[#0747a1] transition-colors line-clamp-2">
                            {project.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                            <MapPin size={12} className="text-slate-300" />
                            <span>{project.commune}</span>
                        </div>
                    </div>

                    <div className="mb-6 mt-auto">
                        <div className="flex justify-between items-end mb-2">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Inversión Social</span>
                                <span className="text-lg font-black text-slate-700 dark:text-slate-100 tracking-tighter mt-1">${(project.budget / 1000000).toFixed(0)}M <span className="text-[10px] opacity-40">COP</span></span>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-black text-[#0747a1] tracking-tighter">{project.progress}%</span>
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden shadow-inner border border-slate-50 dark:border-slate-600">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${project.progress}%` }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                                className={`h-full rounded-full ${project.progress === 100 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-gradient-to-r from-blue-600 to-indigo-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]'}`}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-slate-50 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                            {project.status === 'Entregado' ? (
                                <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
                                    <CheckCircle2 size={12} className="text-emerald-500" />
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{project.status}</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-100 dark:border-blue-500/20">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{project.status}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-[#0747a1] transition-all uppercase tracking-widest">
                            Ficha de Obra <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

