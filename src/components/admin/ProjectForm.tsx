'use client';

import React, { useState } from 'react';
import {
    Save,
    X,
    Plus,
    Trash2,
    Image as ImageIcon,
    MapPin,
    DollarSign,
    HardHat,
    Calendar,
    ChevronDown,
    Activity,
    Upload,
    RefreshCw,
    Building2,
    User,
    ExternalLink
} from 'lucide-react';
import { Project, ProjectStage } from '@/data/projects';
import { useProjects } from '@/context/ProjectContext';
import { useToast } from '@/context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectFormProps {
    initialData?: Project;
    onSave: (data: Project) => void;
    onCancel: () => void;
}

const CATEGORIES = ['Educación', 'Deporte', 'Vial', 'Salud', 'Parques', 'Cultura', 'Seguridad', 'Transporte', 'Saneamiento'];
const STATUSES = ['Iniciado', 'Planeación', 'Estudios', 'Entregado'];

export default function ProjectForm({ initialData, onSave, onCancel }: ProjectFormProps) {
    const { currentUser, allUsers } = useProjects();
    const { showToast } = useToast();

    // Filter out admins from the project manager list
    const managerUsers = allUsers.filter(u => u.role === 'manager');
    const [formData, setFormData] = useState<Partial<Project>>(initialData || {
        name: '',
        category: 'Vial',
        commune: '',
        progress: 0,
        budget: 0,
        executedTotal: 0,
        executedCurrentPeriod: 0,
        contractor: '',
        dependency: 'Secretaría de Infraestructura',
        jobsGenerated: 0,
        builtArea: 0,
        publicSpaceArea: 0,
        interventionType: 'Construcción',
        startDate: '',
        endDate: '',
        status: 'Iniciado',
        description: '',
        address: '',
        lat: 5.0688,
        lng: -75.5173,
        images: { render: '', current: '' },
        gantt: [],
        stages: [
            { name: 'PLANEACIÓN (MGA)', progress: 0 },
            { name: 'ESTUDIOS PRELIMINARES', progress: 0 },
            { name: 'CONTRATACIÓN', progress: 0 },
            { name: 'INICIO', progress: 0 },
            { name: 'EJECUCIÓN', progress: 0 }
        ],
        assignedManager: ''
    });

    const [activeSection, setActiveSection] = useState<'basic' | 'financial' | 'technical' | 'timeline' | 'images'>('basic');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    const handleGanttChange = (index: number, field: string, value: any) => {
        const newGantt = [...(formData.gantt || [])];
        newGantt[index] = { ...newGantt[index], [field]: value };
        setFormData(prev => ({ ...prev, gantt: newGantt }));
    };

    const addGanttItem = () => {
        setFormData(prev => ({
            ...prev,
            gantt: [...(prev.gantt || []), { stage: '', estimatedStart: '', estimatedEnd: '', progress: 0 }]
        }));
    };

    const removeGanttItem = (index: number) => {
        setFormData(prev => ({
            ...prev,
            gantt: (prev.gantt || []).filter((_, i) => i !== index)
        }));
    };

    const handleStageChange = (index: number, progress: number) => {
        const newStages = [...(formData.stages || [])];
        newStages[index] = { ...newStages[index], progress };
        setFormData(prev => ({ ...prev, stages: newStages }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'render' | 'current') => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size (max 2MB to avoid localStorage overflow)
            if (file.size > 2 * 1024 * 1024) {
                showToast('La imagen no debe superar 2MB. Intenta comprimir la foto.', 'error');
                return;
            }
            // Convert to Base64 so it persists in localStorage across any server/browser/reload
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setFormData(prev => ({
                    ...prev,
                    images: { ...prev.images!, [field]: base64 }
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as Project);
    };

    const sectionTab = (id: typeof activeSection, label: string, icon: React.ReactNode) => (
        <button
            type="button"
            onClick={() => setActiveSection(id)}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSection === id
                ? 'bg-[#0747a1] text-white shadow-lg shadow-blue-500/20'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
        >
            {icon}
            {label}
        </button>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-12 pb-20">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sticky top-24 z-40 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md py-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter uppercase italic">
                        {initialData ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}
                    </h2>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#0747a1]">
                        {currentUser?.role === 'admin' ? 'Modo: Administrador de Obras' : 'Modo: Responsable de Obra'}
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-8 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-8 py-4 bg-[#0747a1] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-blue-500/30 flex items-center gap-2"
                    >
                        <Save size={16} /> Guardar Cambios
                    </button>
                </div>
            </div>

            {/* Section Tabs */}
            <div className="flex flex-wrap gap-3">
                {sectionTab('basic', 'Información Básica', <Building2 size={16} />)}
                {sectionTab('financial', 'Financiero', <DollarSign size={16} />)}
                {sectionTab('technical', 'Datos Técnicos', <HardHat size={16} />)}
                {sectionTab('timeline', 'Cronograma y Etapas', <Calendar size={16} />)}
                {sectionTab('images', 'Material Visual', <ImageIcon size={16} />)}
            </div>

            <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden p-12"
            >
                {activeSection === 'basic' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="col-span-full space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Nombre del Proyecto</label>
                            <input
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ej: Intercambiador Vial Los Cedros"
                                className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg font-bold text-slate-800 dark:text-white"
                            />
                        </div>

                        {currentUser?.role === 'admin' && (
                            <div className="col-span-full space-y-2 p-8 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/30">
                                <label className="text-[10px] font-black uppercase tracking-widest text-blue-600 pl-4 flex items-center gap-2">
                                    <User size={12} /> Asignar Responsable de Obra
                                </label>
                                <select
                                    name="assignedManager"
                                    value={formData.assignedManager}
                                    onChange={handleChange}
                                    className="w-full px-6 py-5 bg-white dark:bg-slate-800 rounded-2xl border border-blue-200 dark:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-slate-800 dark:text-white appearance-none"
                                >
                                    <option value="">-- Sin asignar (Solo el Admin podrá verlo) --</option>
                                    {managerUsers.map((u) => (
                                        <option key={u.username} value={u.username}>{u.name}</option>
                                    ))}
                                </select>
                                <p className="text-[9px] font-bold text-blue-400 uppercase mt-2 pl-4">Esta obra solo será visible para el administrador y el usuario seleccionado.</p>
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Categoría</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-slate-800 dark:text-white appearance-none"
                            >
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Sectores / Comuna</label>
                            <input
                                name="commune"
                                value={formData.commune}
                                onChange={handleChange}
                                placeholder="Comuna Ciudadela del Norte"
                                className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-slate-800 dark:text-white"
                            />
                        </div>
                        <div className="col-span-full space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Descripción del Proyecto</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-slate-800 dark:text-white"
                            />
                        </div>
                        <div className="col-span-full space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Dirección Exacta</label>
                            <div className="relative">
                                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Ej: Carrera 23 # 45-12 o Avenida Santander con Calle 50"
                                    className="w-full pl-16 pr-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-slate-800 dark:text-white"
                                />
                            </div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase mt-2 pl-4 italic">* El mapa usa coordenadas (Lat/Lng) para ubicar el marcador. La dirección es solo informativa.</p>
                        </div>

                        <div className="space-y-4 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                            <div className="flex flex-col gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Latitud</label>
                                    <input
                                        type="number" step="any" name="lat"
                                        value={formData.lat} onChange={handleChange}
                                        className="w-full px-6 py-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-slate-800 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Longitud</label>
                                    <input
                                        type="number" step="any" name="lng"
                                        value={formData.lng} onChange={handleChange}
                                        className="w-full px-6 py-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-slate-800 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div className="pt-2">
                                <a
                                    href={`https://www.google.com/maps/search/Manizales+${formData.address}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[9px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest flex items-center gap-2"
                                >
                                    <ExternalLink size={12} /> Buscar Coordenadas en Google Maps
                                </a>
                                <p className="text-[8px] text-slate-400 uppercase mt-1">Tip: Click derecho en el mapa de Google -&gt; Copiar coordenadas</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'financial' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Presupuesto Inicial (COP)</label>
                            <input
                                type="number" name="budget"
                                value={formData.budget} onChange={handleChange}
                                className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg font-black text-[#2e7d32]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Ejecutado Total (COP)</label>
                            <input
                                type="number" name="executedTotal"
                                value={formData.executedTotal} onChange={handleChange}
                                className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg font-black text-[#1976d2]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Vigencia 2024-2027 (COP)</label>
                            <input
                                type="number" name="executedCurrentPeriod"
                                value={formData.executedCurrentPeriod} onChange={handleChange}
                                className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg font-black text-slate-700 dark:text-slate-300"
                            />
                        </div>
                        <div className="col-span-full p-8 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/30 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white"><Activity size={24} /></div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">Porcentaje de Avance General</p>
                                    <p className="text-2xl font-black text-slate-800 dark:text-white">{formData.progress}%</p>
                                </div>
                            </div>
                            <input
                                type="range" min="0" max="100" name="progress"
                                value={formData.progress} onChange={handleChange}
                                className="w-1/2 accent-blue-600"
                            />
                        </div>
                    </div>
                )}

                {activeSection === 'technical' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Contratista</label>
                            <input
                                name="contractor" value={formData.contractor} onChange={handleChange}
                                className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-slate-800 dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Dependencia Líder</label>
                            <input
                                name="dependency" value={formData.dependency} onChange={handleChange}
                                className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-slate-800 dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Empleos Generados</label>
                            <input
                                type="number" name="jobsGenerated" value={formData.jobsGenerated} onChange={handleChange}
                                className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-slate-800 dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Área Construida (m²)</label>
                            <input
                                type="number" name="builtArea" value={formData.builtArea} onChange={handleChange}
                                className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-slate-800 dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Estado de Obra</label>
                            <select
                                name="status" value={formData.status} onChange={handleChange}
                                className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-slate-800 dark:text-white appearance-none"
                            >
                                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Tipo de Intervención</label>
                            <input
                                name="interventionType" value={formData.interventionType} onChange={handleChange}
                                className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-slate-800 dark:text-white"
                            />
                        </div>
                    </div>
                )}

                {activeSection === 'timeline' && (
                    <div className="space-y-12">
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Actividades de Cronograma (Gantt)</h4>
                                <button
                                    type="button" onClick={addGanttItem}
                                    className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl hover:scale-110 transition-all"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                {formData.gantt?.map((item, i) => (
                                    <div key={i} className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 items-end">
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-[8px] font-black uppercase text-slate-400">Actividad</label>
                                            <input value={item.stage} onChange={(e) => handleGanttChange(i, 'stage', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-xs font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[8px] font-black uppercase text-slate-400">Inicio</label>
                                            <input type="date" value={item.estimatedStart} onChange={(e) => handleGanttChange(i, 'estimatedStart', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-xs font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[8px] font-black uppercase text-slate-400">Fin</label>
                                            <input type="date" value={item.estimatedEnd} onChange={(e) => handleGanttChange(i, 'estimatedEnd', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-xs font-bold" />
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="space-y-2 flex-1">
                                                <label className="text-[8px] font-black uppercase text-slate-400">Progreso (%)</label>
                                                <input type="number" value={item.progress} onChange={(e) => handleGanttChange(i, 'progress', parseInt(e.target.value))} className="w-full px-4 py-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-xs font-bold" />
                                            </div>
                                            <button type="button" onClick={() => removeGanttItem(i)} className="p-3 text-red-500 bg-red-50 dark:bg-red-900/30 rounded-xl"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-12 border-t border-slate-100 dark:border-slate-800">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 text-center">Etapas de Maduración</h4>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                                {formData.stages?.map((stage, i) => (
                                    <div key={i} className="space-y-4 text-center">
                                        <p className="text-[8px] font-black text-slate-500 uppercase h-8 flex items-center justify-center leading-tight">{stage.name}</p>
                                        <div className="relative">
                                            <input
                                                type="number" min="0" max="100" value={stage.progress}
                                                onChange={(e) => handleStageChange(i, parseInt(e.target.value))}
                                                className="w-full px-4 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center text-lg font-black text-blue-600"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'images' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Render Image Source */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between pl-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Imagen Principal / Render</label>
                                <span className="text-[10px] font-bold text-emerald-500 uppercase">URL recomendado • o Subir (&lt;2MB)</span>
                            </div>

                            <div className="flex gap-4">
                                <div className="relative flex-1">
                                    <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        name="image_render"
                                        value={formData.images?.render}
                                        onChange={(e) => setFormData(prev => ({ ...prev, images: { ...prev.images!, render: e.target.value } }))}
                                        placeholder="https://..."
                                        className="w-full pl-16 pr-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none text-xs font-bold"
                                    />
                                </div>
                                <label className="cursor-pointer shrink-0">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, 'render')}
                                    />
                                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-[#0747a1] dark:text-blue-400 rounded-2xl flex items-center justify-center hover:scale-105 transition-all border-2 border-dashed border-blue-200 dark:border-blue-800">
                                        <Upload size={24} />
                                    </div>
                                </label>
                            </div>

                            <div className="group relative aspect-video rounded-[2.5rem] bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                                {formData.images?.render ? (
                                    <>
                                        <img src={formData.images.render} alt="Preview Render" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, images: { ...prev.images!, render: '' } }))}
                                            className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-xl"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center space-y-4">
                                        <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                                            <ImageIcon className="text-slate-300" size={32} />
                                        </div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vista previa del render</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Current Image Source */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between pl-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Imagen Estado Actual</label>
                                <span className="text-[10px] font-bold text-emerald-500 uppercase">URL recomendado • o Subir (&lt;2MB)</span>
                            </div>

                            <div className="flex gap-4">
                                <div className="relative flex-1">
                                    <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        name="image_current"
                                        value={formData.images?.current}
                                        onChange={(e) => setFormData(prev => ({ ...prev, images: { ...prev.images!, current: e.target.value } }))}
                                        placeholder="https://..."
                                        className="w-full pl-16 pr-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 focus:outline-none text-xs font-bold"
                                    />
                                </div>
                                <label className="cursor-pointer shrink-0">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, 'current')}
                                    />
                                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-[#0747a1] dark:text-blue-400 rounded-2xl flex items-center justify-center hover:scale-105 transition-all border-2 border-dashed border-blue-200 dark:border-blue-800">
                                        <Upload size={24} />
                                    </div>
                                </label>
                            </div>

                            <div className="group relative aspect-video rounded-[2.5rem] bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                                {formData.images?.current ? (
                                    <>
                                        <img src={formData.images.current} alt="Preview Actual" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, images: { ...prev.images!, current: '' } }))}
                                            className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-xl"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center space-y-4">
                                        <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                                            <ImageIcon className="text-slate-300" size={32} />
                                        </div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vista previa estado real</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </form>
    );
}
