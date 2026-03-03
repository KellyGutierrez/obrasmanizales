'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProjects } from '@/context/ProjectContext';
import { Project } from '@/data/projects';
import {
    ArrowLeft, Calendar, Building2, MapPin, Users, Maximize,
    Briefcase, Share2, Download, Clock, CheckCircle2, Settings
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const STAGE_COLORS = {
    'PLANEACIÓN (MGA)': '#0747a1',
    'ESTUDIOS PRELIMINARES': '#b5a442',
    'CONTRATACIÓN': '#0747a1',
    'INICIO': '#454545',
    'EJECUCIÓN': '#0747a1'
};

const StageDonut = ({ name, progress }: { name: string; progress: number }) => {
    const color = STAGE_COLORS[name as keyof typeof STAGE_COLORS] || '#0747a1';
    const data = [
        { value: progress },
        { value: 100 - progress },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex flex-col items-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] h-full">
            <h4 className="text-[11px] font-black uppercase tracking-tighter text-slate-800 dark:text-slate-100 mb-6 text-center h-8 flex items-center">{name}</h4>

            <div className="h-28 w-28 relative mb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={45}
                            outerRadius={50}
                            paddingAngle={0}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                            stroke="none"
                        >
                            <Cell fill={color} />
                            <Cell fill="#f1f5f9" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-black text-slate-900 dark:text-slate-100">
                    {progress.toFixed(2)}%
                </div>
            </div>

            <div className="w-full flex justify-between px-2 text-[9px] font-bold text-slate-400">
                <span>0.00%</span>
                <span>100.00%</span>
            </div>
        </div>
    );
};

export default function ProjectPage() {
    const params = useParams();
    const router = useRouter();
    const { getProjectById } = useProjects();
    const [activeTab, setActiveTab] = React.useState<'details' | 'gantt' | 'stages'>('details');

    const project = getProjectById(params?.id as string);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-slate-800 mb-4">Proyecto no encontrado</h1>
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-3 bg-[#0747a1] text-white rounded-xl font-bold"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    const currencyFormat = (val: number) => {
        return `$${(val / 1000000).toFixed(2)} MM`;
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b0f1a] font-outfit">
            <title>{`${project.name} | Visor Estratégico Manizales`}</title>

            {/* Immersive Header */}
            <header className="bg-gradient-to-r from-[#0747a1] via-[#1976d2] to-[#0747a1] text-white sticky top-0 z-50 shadow-2xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => router.back()}
                            className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-xl font-black uppercase tracking-tighter italic">Consulta de Obra</h1>
                                <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                                    {project.category}
                                </span>
                            </div>
                            <p className="text-sm font-medium opacity-70">Manizales Estratégica / Proyectos</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition font-black text-xs uppercase tracking-widest border border-white/10">
                            <Share2 size={16} /> Compartir
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition font-black text-xs uppercase tracking-widest border border-white/10">
                            <Download size={16} /> Reporte PDF
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="space-y-12">

                    {/* Title Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex-1">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0747a1] dark:text-blue-400 mb-2 block">Proyecto Estratégico</span>
                                <h1 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-white tracking-tighter uppercase leading-[0.9]">
                                    {project.name}
                                </h1>
                                <div className="flex items-center gap-4 mt-6">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg ${project.status === 'Entregado' ? 'bg-emerald-500' : 'bg-blue-600'}`}>
                                        {project.status}
                                    </span>
                                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-bold">
                                        <MapPin size={14} />
                                        <span>Manizales, Colombia</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800/80 p-6 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 shrink-0">
                            <div className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 text-right">Progreso General</div>
                            <div className="text-5xl font-black text-[#0747a1] dark:text-blue-400 tracking-tighter text-right leading-none">
                                {project.progress}%
                            </div>
                        </div>
                    </div>

                    {/* Financial Performance Overview */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400"><Clock size={20} /></div>
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Desempeño Financiero</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { label: 'Presupuesto Inicial', val: project.budget, color: 'bg-[#2e7d32]', sub: 'Inversión Total', icon: <Settings size={24} /> },
                                { label: 'Ejecutado Total', val: project.executedTotal, color: 'bg-[#1976d2]', sub: 'Histórico', icon: <CheckCircle2 size={24} /> },
                                { label: 'Ejecutado Vigencia', val: project.executedCurrentPeriod, color: 'bg-[#374151]', sub: '2024 - 2027', icon: <Clock size={24} /> }
                            ].map((card, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`${card.color} p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group`}
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="bg-white/20 p-3 rounded-2xl">{card.icon}</div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 underline underline-offset-4 decoration-white/20 text-white">Auditoría OK</span>
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1 text-white">{card.label}</p>
                                    <h4 className="text-4xl font-black tracking-tighter mb-4 text-white">{currencyFormat(card.val)}</h4>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40 bg-black/10 w-fit px-3 py-1 rounded-full text-white">{card.sub}</p>
                                    <div className="absolute top-[-10%] right-[-5%] opacity-10 group-hover:scale-125 transition duration-1000 rotate-12">
                                        {card.icon}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* TABS SELECTOR - The "Apartados" */}
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 flex flex-wrap md:flex-nowrap gap-2">
                        {[
                            { id: 'details', label: 'Detalles de Obra', icon: <Building2 size={18} /> },
                            { id: 'gantt', label: 'Cronograma de Gantt', icon: <Calendar size={18} /> },
                            { id: 'stages', label: 'Etapas del Proyecto', icon: <Settings size={18} /> }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-[#0747a1] text-white shadow-lg shadow-blue-500/20'
                                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-white dark:hover:bg-slate-800 hover:bg-slate-50'
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8">
                            <AnimatePresence mode="wait">
                                {activeTab === 'details' && (
                                    <motion.div
                                        key="details"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-white dark:bg-slate-900/50 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden"
                                    >
                                        <div className="bg-slate-50/50 dark:bg-slate-800/30 p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-[#0747a1] text-white rounded-2xl shadow-lg"><Building2 size={24} /></div>
                                                <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tighter uppercase italic">Ficha Técnica de Obra</h3>
                                            </div>
                                        </div>
                                        <div className="p-12">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                                {[
                                                    { icon: <MapPin size={28} />, label: 'Comuna / Corregimiento', val: project.commune },
                                                    { icon: <Users size={28} />, label: 'Empleos Generados', val: project.jobsGenerated },
                                                    { icon: <Maximize size={28} />, label: 'Área Construida', val: `${project.builtArea} m²` },
                                                    { icon: <Briefcase size={28} />, label: 'Contratista', val: project.contractor },
                                                    { icon: <Settings size={28} />, label: 'Dependencia Líder', val: project.dependency },
                                                    { icon: <Maximize size={28} />, label: 'Espacio Público', val: `${project.publicSpaceArea} m²` }
                                                ].map((item, i) => (
                                                    <div key={i}>
                                                        <div className="flex items-center gap-4 mb-3">
                                                            <div className="text-[#0747a1] dark:text-blue-400 p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">{item.icon}</div>
                                                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{item.label}</p>
                                                        </div>
                                                        <p className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase pl-12">{item.val}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-16 p-10 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                                                <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Descripción del Proyecto</h4>
                                                <p className="text-lg font-bold text-slate-600 dark:text-slate-300 leading-relaxed italic">"{project.description}"</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'gantt' && (
                                    <motion.div
                                        key="gantt"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-white dark:bg-slate-900/50 p-10 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-x-auto"
                                    >
                                        <div className="min-w-[1000px]">
                                            <div className="flex items-center justify-between mb-10">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl"><Calendar size={24} /></div>
                                                    <div>
                                                        <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tighter uppercase italic">Programación de Obra (Gantt)</h3>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Cronograma Detallado por Fases</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest">
                                                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                                        <div className="h-3 w-12 rounded-sm bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600" /> Plan Base
                                                    </span>
                                                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                                        <div className="h-3 w-12 rounded-sm bg-[#0747a1] dark:bg-blue-600" /> Ejecutado
                                                    </span>
                                                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                                        <div className="w-[2px] h-4 bg-red-500" /> Hoy
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Timeline Grid Header */}
                                            <div className="grid grid-cols-12 gap-0 border-b-2 border-slate-100 dark:border-slate-800 pb-4 mb-2">
                                                <div className="col-span-3 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Actividad / Hito</div>
                                                <div className="col-span-9 grid grid-cols-12">
                                                    {['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'].map((m) => (
                                                        <div key={m} className="text-center text-[10px] font-black text-slate-500 dark:text-slate-400">{m}</div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Gantt Body */}
                                            <div className="relative pt-4">
                                                {/* Vertical Grid Lines */}
                                                <div className="absolute inset-0 grid grid-cols-12 col-start-4 col-span-9 pointer-events-none z-0">
                                                    {[...Array(12)].map((_, i) => (
                                                        <div key={i} className={`border-l ${i === 2 ? 'border-red-500/30' : 'border-slate-100 dark:border-slate-800'} h-full last:border-r`} />
                                                    ))}
                                                    {/* Today Marker */}
                                                    <div className="absolute left-[25%] top-0 bottom-0 w-[2px] bg-red-500 z-20 shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                                                        <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                                                    </div>
                                                </div>

                                                <div className="space-y-4 relative z-10">
                                                    {(project.gantt || [
                                                        { stage: 'Planeación Preliminar', estimatedStart: '2024-01-01', estimatedEnd: '2024-03-31', progress: 100 },
                                                        { stage: 'Ejecución de Obra Física', estimatedStart: '2024-04-01', estimatedEnd: '2024-12-31', progress: 20 }
                                                    ]).map((item: { stage: string; estimatedStart: string; estimatedEnd: string; progress: number }, i: number) => {
                                                        const parseDate = (d: string) => {
                                                            const parts = d.split('-').map(Number);
                                                            return new Date(parts[0], parts[1] - 1, parts[2]);
                                                        };
                                                        const start = parseDate(item.estimatedStart);
                                                        const end = parseDate(item.estimatedEnd);
                                                        const startMonth = start.getMonth();
                                                        const endMonth = end.getMonth();
                                                        const duration = Math.max(1, (endMonth - startMonth + 1));
                                                        const leftPos = (startMonth / 12) * 100;
                                                        const widthPos = (duration / 12) * 100;

                                                        return (
                                                            <div key={i} className="grid grid-cols-12 items-center min-h-[44px] group">
                                                                <div className="col-span-3 pr-4">
                                                                    <p className="text-[11px] font-black uppercase text-slate-700 dark:text-slate-200 group-hover:text-blue-500 transition-colors">{item.stage}</p>
                                                                    <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500">{item.estimatedStart} / {item.estimatedEnd}</p>
                                                                </div>
                                                                <div className="col-span-9 relative h-10 flex items-center bg-slate-100/50 dark:bg-slate-800/50 rounded-lg border border-slate-50 dark:border-slate-700/30">
                                                                    {/* Base Estimated Bar */}
                                                                    <div
                                                                        className="absolute h-6 bg-slate-300 dark:bg-slate-700/80 rounded-md border border-slate-400/30 dark:border-slate-600 shadow-sm"
                                                                        style={{ left: `${leftPos}%`, width: `${widthPos}%` }}
                                                                    />
                                                                    {/* Real Progress Bar */}
                                                                    <motion.div
                                                                        initial={{ width: 0 }}
                                                                        animate={{ width: `${widthPos * (item.progress / 100)}%` }}
                                                                        transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                                                                        className="absolute h-6 bg-[#0747a1] dark:bg-blue-500 rounded-md shadow-[0_5px_15px_rgba(7,71,161,0.4)] z-10 flex items-center justify-end px-2 overflow-hidden border border-white/20"
                                                                        style={{ left: `${leftPos}%` }}
                                                                    >
                                                                        {item.progress > 12 && (
                                                                            <span className="text-[9px] font-black text-white">{item.progress}%</span>
                                                                        )}
                                                                    </motion.div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            <div className="mt-12 p-8 bg-[#f8fafc] dark:bg-slate-800/80 rounded-3xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                                <div className="flex gap-10">
                                                    <div>
                                                        <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 text-center">Contrato No.</p>
                                                        <p className="text-xs font-black text-slate-700 dark:text-white">LIC-00{project.id}-2024</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 text-center">Interventoría</p>
                                                        <p className="text-xs font-black text-slate-700 dark:text-white">Verificando cumplimiento...</p>
                                                    </div>
                                                </div>
                                                <button className="px-6 py-3 bg-white dark:bg-slate-700 border-2 border-[#0747a1] dark:border-blue-500 text-[#0747a1] dark:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0747a1] dark:hover:bg-blue-600 hover:text-white transition-all shadow-md">
                                                    Ver Informe Detallado
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'stages' && (
                                    <motion.div
                                        key="stages"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-white dark:bg-slate-900/50 p-12 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800"
                                    >
                                        <h3 className="text-2xl font-black text-[#0747a1] dark:text-white tracking-tighter uppercase italic mb-12 text-center">Etapas de Ejecución</h3>
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                            {project.stages?.map((stage: { name: string; progress: number }, i: number) => (
                                                <div key={i}>
                                                    <StageDonut name={stage.name} progress={stage.progress} />
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>


                        {/* Right Column: Visuals & Stages */}
                        <div className="lg:col-span-4 space-y-12">

                            {/* Immersive Image Display */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-blue-50 rounded-xl text-blue-600"><Users size={18} /></div>
                                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Evidencias Visuales</h3>
                                </div>

                                <div className="relative group rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 aspect-[4/5] bg-slate-900">
                                    <img
                                        src={project.images.current}
                                        alt="Current State"
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-[2s]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                    <div className="absolute bottom-10 left-10">
                                        <div className="text-6xl font-black text-white tracking-tighter mb-2">{project.progress}%</div>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em]">Ejecutando Fase Final</span>
                                            </div>
                                            <p className="text-xs font-medium text-white/60">Actualizado hace: 2 días</p>
                                        </div>
                                    </div>
                                    <div className="absolute top-10 right-10 bg-white/20 backdrop-blur-xl p-4 rounded-3xl border border-white/20 hover:bg-white/30 transition cursor-pointer">
                                        <Maximize className="text-white" size={24} />
                                    </div>
                                </div>
                            </div>


                            {/* Small Delivery Summary Card */}
                            <div className="bg-slate-900 dark:bg-slate-900 p-8 rounded-[3rem] shadow-2xl text-white relative overflow-hidden group">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Calendar size={18} className="text-orange-400" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Entrega Estimada</p>
                                    </div>
                                    <h4 className="text-2xl font-black tracking-tighter uppercase mb-6">
                                        {format(new Date(project.endDate), "dd 'de' MMMM, yyyy", { locale: es })}
                                    </h4>
                                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${project.progress}%` }}
                                            className="h-full bg-orange-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Sticky Footer CTA */}
            <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 mt-20">
                <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#0747a1] rounded-2xl flex items-center justify-center text-white font-black text-xl">M</div>
                        <div>
                            <h4 className="font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">Alcaldía de Manizales</h4>
                            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">Secretaría de Infraestructura</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition">Solicitar Información</button>
                        <button className="px-8 py-4 bg-[#0747a1] text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition shadow-xl shadow-blue-500/20">Descargar Ficha Completa</button>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Icon wrapper for consistency
function MaximizeWrapper(props: any) {
    return <Maximize {...props} />;
}
