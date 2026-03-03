'use client';

import React, { useState } from 'react';
import {
    APIProvider,
    Map as GMap,
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import { Project } from '@/data/projects';
import { MapPin, ExternalLink, X } from 'lucide-react';

interface MapProps {
    projects: Project[];
}

const MapMarker = ({ project, onClick }: { project: Project, onClick: (p: Project) => void }) => {
    const [markerRef, marker] = useAdvancedMarkerRef();

    return (
        <AdvancedMarker
            ref={markerRef}
            position={{ lat: project.lat, lng: project.lng }}
            onClick={() => onClick(project)}
            title={project.name}
        >
            <div className="relative flex items-center justify-center">
                <div className={`w-10 h-10 rounded-full rounded-bl-none rotate-45 flex items-center justify-center shadow-2xl transition-all hover:scale-110 border-2 border-white ${project.status === 'Entregado' ? 'bg-emerald-500' : 'bg-[#0747a1]'
                    }`}>
                    <div className="-rotate-45">
                        <MapPin size={18} className="text-white" />
                    </div>
                </div>
                {/* Glow effect */}
                <div className={`absolute -inset-1 rounded-full opacity-40 blur-sm -z-10 ${project.status === 'Entregado' ? 'bg-emerald-500' : 'bg-blue-600'
                    }`} />
            </div>
        </AdvancedMarker>
    );
};

export default function Map({ projects }: MapProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const center = { lat: 5.0688, lng: -75.5173 }; // Manizales central coords

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

    return (
        <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-inner border border-slate-200 dark:border-slate-800">
            <APIProvider apiKey={apiKey}>
                <GMap
                    style={{ width: '100%', height: '100%' }}
                    defaultCenter={center}
                    defaultZoom={13}
                    gestureHandling={'greedy'}
                    disableDefaultUI={false}
                    mapId={'BF51B9145963973'} // A generic ID for advanced markers if needed, or leave blank
                    mapTypeId={'roadmap'}
                >
                    {projects.map((project) => (
                        <MapMarker
                            key={project.id}
                            project={project}
                            onClick={(p) => setSelectedProject(p)}
                        />
                    ))}

                    {selectedProject && (
                        <InfoWindow
                            position={{ lat: selectedProject.lat, lng: selectedProject.lng }}
                            onCloseClick={() => setSelectedProject(null)}
                            headerDisabled={true}
                            className="premium-infowindow"
                        >
                            <div className="flex flex-col bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-2xl min-w-[320px] max-w-[320px] -m-1">
                                {/* Header */}
                                <div className="bg-[#0747a1] p-4 flex items-center justify-between text-white">
                                    <div className="flex items-center gap-3">
                                        <MapPin size={14} className="opacity-70" />
                                        <h4 className="font-black text-[10px] uppercase tracking-tighter leading-tight max-w-[180px]">
                                            {selectedProject.name}
                                        </h4>
                                    </div>
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>

                                {/* Image */}
                                <div className="h-40 overflow-hidden relative">
                                    <img src={selectedProject.images.current} alt={selectedProject.name} className="w-full h-full object-cover" />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black uppercase text-[#0747a1] shadow-lg">
                                        {selectedProject.category}
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-6 space-y-5 bg-white dark:bg-slate-900 border-x border-b border-slate-100 dark:border-slate-800 rounded-b-3xl">
                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Estado</span>
                                        </div>
                                        <p className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase">{selectedProject.status}</p>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Avance Real</span>
                                            <span className="text-sm font-black text-[#0747a1] dark:text-blue-400">{selectedProject.progress}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-500 rounded-full shadow-lg transition-all duration-1000"
                                                style={{ width: `${selectedProject.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    <a
                                        href={`/projects/${selectedProject.id}`}
                                        className="w-full py-4 bg-[#0747a1] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-blue-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-blue-500/20"
                                    >
                                        <ExternalLink size={14} /> Ficha Técnica
                                    </a>
                                </div>
                            </div>
                        </InfoWindow>
                    )}
                </GMap>
            </APIProvider>

            <style jsx global>{`
                .gm-style-iw-c {
                    background: transparent !important;
                    box-shadow: none !important;
                    padding: 0 !important;
                    border-radius: 2rem !important;
                }
                .gm-style-iw-d {
                    overflow: visible !important;
                    max-height: none !important;
                }
                .gm-ui-hover-effect {
                    display: none !important;
                }
                .gm-style-iw-tc::after {
                    background: transparent !important;
                }
            `}</style>
        </div>
    );
}
