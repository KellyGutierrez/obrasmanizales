'use client';

import React, { useState, useMemo } from 'react';
import { Project } from '@/data/projects';
import DynamicMap from '@/components/DynamicMap';
import ProjectCard from '@/components/ProjectCard';
import InitialView from '@/components/InitialView';
import {
  Building2,
  GraduationCap,
  Trophy,
  Stethoscope,
  Trees,
  LayoutDashboard,
  Filter,
  BarChart3,
  Search,
  CheckCircle2,
  TrendingUp,
  Coins,
  Bus,
  ShieldCheck,
  Droplets,
  ArrowLeft,
  ChevronRight,
  Map as MapIcon,
  Grid
} from 'lucide-react';
import Link from 'next/link';
import { useProjects } from '@/context/ProjectContext';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { id: 'all', name: 'Todas las Obras', icon: <LayoutDashboard size={18} /> },
  { id: 'Educación', name: 'Megacolegios y Jardines', icon: <GraduationCap size={18} /> },
  { id: 'Deporte', name: 'Escenarios Deportivos', icon: <Trophy size={18} /> },
  { id: 'Vial', name: 'Infraestructura Vial', icon: <Building2 size={18} /> },
  { id: 'Salud', name: 'Red Salud Pública', icon: <Stethoscope size={18} /> },
  { id: 'Parques', name: 'Parques y Ornato', icon: <Trees size={18} /> },
  { id: 'Transporte', name: 'Transporte Limpio', icon: <Bus size={18} /> },
  { id: 'Seguridad', name: 'Seguridad y CAI', icon: <ShieldCheck size={18} /> },
  { id: 'Cultura', name: 'Cultura y Turismo', icon: <Building2 size={18} /> },
  { id: 'Saneamiento', name: 'Saneamiento y Agua', icon: <Droplets size={18} /> },
];

export default function Dashboard() {
  const { projects } = useProjects();
  const [view, setView] = useState<'initial' | 'dashboard'>('initial');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayMode, setDisplayMode] = useState<'map' | 'list'>('map');

  const filteredProjects = useMemo(() => {
    return projects.filter((p: Project) => {
      const categoryMatch = selectedCategory === 'all' || p.category === selectedCategory;
      const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.commune.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery, projects]);

  const stats = useMemo(() => {
    const total = projects.length;
    const delivered = projects.filter((p: Project) => p.status === 'Entregado').length;
    const totalInvestment = projects.reduce((acc: number, p: Project) => acc + p.budget, 0);
    const avgProgress = projects.reduce((acc: number, p: Project) => acc + p.progress, 0) / (total || 1);

    return { total, delivered, totalInvestment, avgProgress };
  }, [projects]);

  if (view === 'initial') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="initial"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <InitialView onEnterDashboard={() => setView('dashboard')} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#0b0f1a] font-outfit text-slate-900 dark:text-slate-100 p-6 md:p-10 relative overflow-x-hidden">

      {/* Top Floating Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="max-w-[110rem] mx-auto mb-10 flex flex-col lg:flex-row items-center justify-between gap-8 bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl p-8 rounded-[3rem] shadow-2xl border border-white/40 dark:border-slate-800"
      >
        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setView('initial')}
            className="p-4 bg-[#0747a1] text-white rounded-2xl shadow-xl shadow-blue-500/20"
          >
            <ArrowLeft size={24} />
          </motion.button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-3xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-[#0747a1] to-blue-400 dark:from-blue-400 dark:to-emerald-400">Visor Estratégico</h1>
              <span className="bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-emerald-500/20">Manizales 2026</span>
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mt-1">Centro de Gestión y Transparencia</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="relative hidden xl:flex group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#0747a1] transition-colors" size={18} />
            <input
              type="text"
              placeholder="Buscar obra..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-none rounded-xl text-xs font-bold focus:ring-4 focus:ring-blue-500/10 transition-all w-64"
            />
          </div>

          <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-800 hidden lg:block" />

          <Link
            href="/login"
            className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/10 px-5 py-3 rounded-2xl border border-blue-100 dark:border-blue-500/20 group hover:bg-[#0747a1] hover:border-[#0747a1] transition-all"
          >
            <div className="bg-[#0747a1] p-2 rounded-lg text-white group-hover:bg-white group-hover:text-[#0747a1] transition-all">
              <ShieldCheck size={16} />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-[8px] font-black uppercase tracking-widest text-[#0747a1] dark:text-blue-400 group-hover:text-white/60 mb-0.5 opacity-60">Funcionarios</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#0747a1] dark:text-blue-300 group-hover:text-white">Acceso Institucional</p>
            </div>
          </Link>
        </div>
      </motion.header>

      {/* Top Stats - Improved and Accurate */}
      <section className="max-w-[110rem] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {[
          { label: 'Total de Obras', value: stats.total, icon: <LayoutDashboard className="text-white" />, sub: 'Proyectos Estratégicos', color: 'bg-[#0747a1]' },
          { label: 'Obras Entregadas', value: stats.delivered, icon: <CheckCircle2 className="text-white" />, sub: 'Finalizadas satisfactoriamente', color: 'bg-emerald-600' },
          { label: 'Presupuesto de Obras', value: `$${(stats.totalInvestment / 1000000000).toFixed(2)}B`, icon: <Coins className="text-white" />, sub: 'Inversión total proyectada', color: 'bg-indigo-600' },
        ].map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`${kpi.color} p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition duration-500`}
          >
            <div className="absolute top-[-20%] right-[-5%] opacity-10 group-hover:scale-125 transition duration-1000">
              {React.cloneElement(kpi.icon as React.ReactElement<any>, { size: 180 })}
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white">
                {kpi.icon}
              </div>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/80">{kpi.label}</span>
            </div>
            <div>
              <span className="text-5xl font-black text-white tracking-tighter">{kpi.value}</span>
              <p className="text-[10px] text-white/60 mt-2 font-black uppercase tracking-widest">{kpi.sub}</p>
            </div>
          </motion.div>
        ))}

      </section>

      {/* Main Container */}
      <div className="max-w-[110rem] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-10">

        {/* Left Stats & Categories */}
        <aside className="xl:col-span-3 space-y-8">

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
                <Filter size={18} className="text-blue-600" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-200">Consultar Obra</h3>
            </div>

            <div className="space-y-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat.id
                    ? 'bg-[#0747a1] text-white shadow-2xl shadow-blue-500/30 scale-105'
                    : 'bg-slate-50 dark:bg-slate-800/50 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:translate-x-1'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    {cat.icon}
                    <span>{cat.name}</span>
                  </div>
                  {selectedCategory === cat.id && <ChevronRight size={14} className="animate-bounce-x" />}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0747a1] to-blue-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition duration-1000">
              <TrendingUp size={120} />
            </div>
            <h4 className="text-xl font-black text-white mb-2 relative z-10">Inversión Ejecutada</h4>
            <p className="text-4xl font-black text-white tracking-widest relative z-10">${(stats.totalInvestment / 1000000000).toFixed(1)}B</p>
            <div className="mt-8 flex items-center gap-3 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-xl border border-white/20 w-fit relative z-10">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Ejecución: {stats.avgProgress.toFixed(0)}%</span>
            </div>
          </div>
        </aside>

        {/* Center/Right Content */}
        <main className="xl:col-span-9 space-y-10">

          {/* Section Toggle and Title */}
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-black uppercase tracking-tighter italic opacity-60">Resultados</h2>
              <div className="h-0.5 w-12 bg-slate-300 dark:bg-slate-700" />
              <span className="text-xs font-black uppercase tracking-widest text-[#0747a1] dark:text-blue-400">{filteredProjects.length} Proyectos Filtrados</span>
            </div>
            <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setDisplayMode('map')}
                className={`p-3 rounded-xl transition-all ${displayMode === 'map' ? 'bg-[#0747a1] text-white shadow-lg' : 'text-slate-400'}`}
              >
                <MapIcon size={20} />
              </button>
              <button
                onClick={() => setDisplayMode('list')}
                className={`p-3 rounded-xl transition-all ${displayMode === 'list' ? 'bg-[#0747a1] text-white shadow-lg' : 'text-slate-400'}`}
              >
                <Grid size={20} />
              </button>
            </div>
          </div>

          {/* Dynamic Display Area */}
          <AnimatePresence mode="wait">
            {displayMode === 'map' ? (
              <motion.section
                key="map-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: 'circOut' }}
                className="bg-white dark:bg-slate-900 p-4 rounded-[3rem] shadow-3xl border border-white/40 dark:border-slate-800 relative overflow-hidden h-[650px]"
              >
                <DynamicMap
                  projects={filteredProjects}
                />

              </motion.section>
            ) : (
              <motion.section
                key="list-view"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10"
              >
                {filteredProjects.map((project, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={project.id}
                  >
                    <ProjectCard
                      project={project}
                    />
                  </motion.div>
                ))}
              </motion.section>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer System Branding */}
      <footer className="max-w-[110rem] mx-auto mt-20 pt-10 border-t-4 border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-10 pb-20">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xs font-black uppercase tracking-[0.5em] text-slate-400">Desarrollo Tecnológico</span>
          <div className="text-3xl font-black text-[#0747a1] tracking-tighter uppercase italic">Alcaldía de Manizales</div>
        </div>
        <div className="flex items-center gap-10 text-xs font-black text-slate-400 uppercase tracking-widest">
          <a href="#" className="hover:text-[#0747a1] transition py-4 px-2">Transparencia</a>
          <a href="#" className="hover:text-[#0747a1] transition py-4 px-2">Datos Abiertos</a>
          <a href="#" className="hover:text-[#0747a1] transition py-4 px-2">Seguimiento PDM</a>
        </div>
      </footer>

    </div>
  );
}
