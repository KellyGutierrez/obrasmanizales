'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const Map = dynamic(() => import('./Map'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center animate-pulse rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
                <span className="text-slate-500 dark:text-slate-400 font-medium">Cargando mapa interactivo...</span>
            </div>
        </div>
    )
});

export default function DynamicMap(props: any) {
    return <Map {...props} />;
}
