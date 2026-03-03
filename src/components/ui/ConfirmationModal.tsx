'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
}

export default function ConfirmationModal({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    type = 'danger'
}: ConfirmationModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={onCancel}
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-3xl max-w-md w-full relative z-10 border border-slate-100 dark:border-slate-800"
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${type === 'danger' ? 'bg-red-50 text-red-500' :
                                type === 'warning' ? 'bg-orange-50 text-orange-500' :
                                    'bg-blue-50 text-blue-500'
                            }`}>
                            <AlertCircle size={32} />
                        </div>

                        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2 tracking-tight uppercase italic">{title}</h3>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-8 leading-relaxed italic">{message}</p>

                        <div className="flex gap-4">
                            <button
                                onClick={onCancel}
                                className="flex-1 py-4 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100 dark:border-slate-700"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={onConfirm}
                                className={`flex-1 py-4 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl ${type === 'danger' ? 'bg-red-500 shadow-red-500/20' :
                                        type === 'warning' ? 'bg-orange-500 shadow-orange-500/20' :
                                            'bg-blue-500 shadow-blue-500/20'
                                    }`}
                            >
                                {confirmText}
                            </button>
                        </div>

                        <button
                            onClick={onCancel}
                            className="absolute top-8 right-8 p-2 text-slate-300 hover:text-slate-800 dark:hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
