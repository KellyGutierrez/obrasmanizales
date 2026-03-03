'use client';

import React from 'react';
import ProjectForm from '@/components/admin/ProjectForm';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { useProjects } from '@/context/ProjectContext';
import { useToast } from '@/context/ToastContext';

export default function NewProjectPage() {
    const router = useRouter();
    const { addProject, projects } = useProjects();
    const { showToast } = useToast();

    const handleSave = (data: any) => {
        // Generate a new sequential ID or unique hash
        const newId = (Math.max(0, ...projects.map(p => parseInt(p.id))) + 1).toString();
        const newProject = { ...data, id: newId };

        addProject(newProject);
        showToast('Proyecto creado exitosamente', 'success');
        router.push('/admin');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-outfit">
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/admin" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-500 group-hover:scale-110 transition-transform">
                            <ArrowLeft size={20} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Volver al Panel</span>
                    </Link>
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-6 py-12">
                <ProjectForm
                    onSave={handleSave}
                    onCancel={() => router.push('/admin')}
                />
            </main>
        </div>
    );
}
