'use client';

import React from 'react';
import { Project } from '@/data/projects';
import { X, Calendar, UserCircle2, Building2, MapPin, Users, Maximize, Briefcase, Share2, Download, Clock, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ProjectDetailProps {
    project: Project | null;
    onClose: () => void;
}

const StageDonut = ({ name, progress, color }: { name: string; progress: number, color: string }) => {
    const data = [
        { value: progress },
        { value: 100 - progress },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center">
            <div className="h-16 w-16 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={22}
                            outerRadius={30}
                            paddingAngle={0}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                        >
                            <Cell fill={color} />
                            <Cell fill="#f1f5f9" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-800">
                    {progress.toFixed(1)}%
                </div>
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 mt-2 text-center">{name}</span>
        </div>
    );
};

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
    React.useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [project]);

    if (!project) return null;


    const currencyFormat = (val: number) => {
        return `$${(val / 1000000).toFixed(2)} MM`;
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto bg-slate-100/40 backdrop-blur-xl font-outfit">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-blue-950/20"
                    onClick={onClose}
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#f8fafc] dark:bg-[#0b0f1a] w-full max-w-6xl max-h-[92vh] rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.3)] overflow-hidden relative z-10 flex flex-col border border-white"
                >
                    {/* Detailed Header */}
                    <div className="bg-[#0747a1] p-4 text-white flex items-center justify-between px-8 shrink-0">
                        <div className="flex items-center gap-3">
                            <h1 className="text-lg font-black uppercase tracking-tighter italic">Consultar Obra</h1>
                            <div className="h-4 w-[1px] bg-white/20" />
                            <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                                {project.category}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition"><Share2 size={16} /></button>
                            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition"><Download size={16} /></button>
                            <button onClick={onClose} className="p-2 bg-white/20 hover:bg-red-500 rounded-xl transition-all shadow-lg"><X size={16} /></button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar">


                        {/* Top Financial Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {[
                                { label: 'Presupuesto', val: project.budget, color: 'bg-[#2e7d32]', icon: <Settings size={18} /> },
                                { label: 'Ejecutado Total', val: project.executedTotal, color: 'bg-[#1976d2]', icon: <CheckCircle2 size={18} /> },
                                { label: 'Ejecutado 2024-2027', val: project.executedCurrentPeriod, color: 'bg-[#374151]', icon: <Clock size={18} /> }
                            ].map((card, i) => (
                                <div key={i} className={`${card.color} p-6 rounded-3xl text-white shadow-lg relative overflow-hidden group`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[9px] font-black uppercase tracking-widest opacity-70">{card.label}</span>
                                        <div className="opacity-40">{card.icon}</div>
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tighter">{currencyFormat(card.val)}</h3>
                                    <div className="absolute bottom-[-20%] right-[-10%] opacity-5 group-hover:scale-110 transition duration-1000">
                                        {card.icon}
                                    </div>
                                </div>
                            ))}
                        </div>


                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                            {/* Left Column - Details */}
                            <div className="lg:col-span-8 flex flex-col gap-8">

                                <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden">
                                    <div className="bg-blue-50/50 p-4 px-6 border-b border-blue-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 bg-[#0747a1] text-white rounded-lg"><Building2 size={16} /></div>
                                            <h3 className="text-sm font-black text-[#0747a1] tracking-tighter">Detalles del Proyecto</h3>
                                        </div>
                                    </div>

                                    <div className="p-6 md:p-8">
                                        <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 mb-6 tracking-tighter underline decoration-blue-500 underline-offset-4 decoration-4">{project.name}</h2>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                                            <div className="flex items-start gap-3">
                                                <MapPin className="text-[#0747a1] shrink-0 opacity-40" size={18} />
                                                <div>
                                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Comuna</p>
                                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{project.commune}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Users className="text-[#0747a1] shrink-0 opacity-40" size={18} />
                                                <div>
                                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Empleos</p>
                                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{project.jobsGenerated}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Maximize className="text-[#0747a1] shrink-0 opacity-40" size={18} />
                                                <div>
                                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Área Const.</p>
                                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{project.builtArea} m²</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Briefcase className="text-[#0747a1] shrink-0 opacity-40" size={18} />
                                                <div>
                                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Contratista</p>
                                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate max-w-[120px]">{project.contractor}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Settings className="text-[#0747a1] shrink-0 opacity-40" size={18} />
                                                <div>
                                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Dependencia</p>
                                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase truncate max-w-[120px]">{project.dependency}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Maximize className="text-[#0747a1] shrink-0 opacity-40" size={18} />
                                                <div>
                                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Espacio Púb.</p>
                                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{project.publicSpaceArea} m²</p>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="mt-12 p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                                            <h4 className="text-[10px] font-black text-[#0747a1]/60 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <CheckCircle2 size={12} /> Descripción Técnica
                                            </h4>
                                            <p className="text-sm font-bold text-slate-600 dark:text-slate-400 leading-relaxed italic">"{project.description}"</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Gantt Chart Section */}
                                <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tighter flex items-center gap-3">
                                            <Calendar className="text-blue-500" size={24} /> Cronograma del Proyecto
                                        </h3>
                                        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><div className="h-3 w-3 rounded bg-blue-600" /> Fecha Estimada</span>
                                            <span className="flex items-center gap-1.5"><div className="h-3 w-3 rounded bg-emerald-500" /> Fecha Real</span>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <div className="min-w-[700px] space-y-6">
                                            {project.gantt?.map((item, i) => (
                                                <div key={i} className="flex items-center group">
                                                    <div className="w-40 shrink-0 text-[10px] font-black uppercase text-slate-400 group-hover:text-slate-800 transition">{item.stage}</div>
                                                    <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full flex gap-1 items-center relative">
                                                        <div className="absolute inset-0 flex items-center">
                                                            {/* Mock blue bar for estimated */}
                                                            <div className="h-2.5 bg-blue-600/40 rounded-full" style={{ width: '80%', marginLeft: '5%' }} />
                                                        </div>
                                                        {/* Actual real bar */}
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${item.progress}%` }}
                                                            className={`h-2.5 bg-emerald-500 rounded-full shadow-lg relative z-10`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Images & Stages */}
                            <div className="lg:col-span-4 flex flex-col gap-8">
                                {/* Current Image with Progress Circle */}
                                <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square bg-slate-900 border-4 border-white dark:border-slate-800">
                                    <img src={project.images.current} alt="Current State" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                                    <div className="absolute bottom-8 left-8">
                                        <div className="text-4xl font-black text-white tracking-tighter mb-1">{project.progress}%</div>
                                        <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">En Progreso</div>
                                    </div>
                                    <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                                        <Maximize className="text-white" size={20} />
                                    </div>
                                </div>

                                {/* Stages Pie Charts Section */}
                                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
                                    <h3 className="text-md font-black uppercase tracking-widest text-[#0747a1] mb-8 text-center border-b border-blue-50 pb-4">Etapas del Proyecto</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {project.stages?.map((stage, i) => (
                                            <StageDonut
                                                key={i}
                                                name={stage.name}
                                                progress={stage.progress}
                                                color={stage.progress === 100 ? '#10b981' : i < 5 ? '#3b82f6' : '#6366f1'}
                                            />
                                        )) || (
                                                <div className="col-span-2 py-10 text-center text-slate-400 font-bold italic">Etapas en proceso de auditoría...</div>
                                            )}
                                    </div>
                                </div>

                                {/* Estimated Delivery */}
                                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border-t-4 border-orange-500">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl"><Calendar size={20} /></div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fecha estimada de entrega</p>
                                            <p className="text-lg font-black text-slate-800 uppercase">{format(new Date(project.endDate), 'dd MMMM, yyyy', { locale: es })}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

// Sub-component icon fix
function Settings(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}
