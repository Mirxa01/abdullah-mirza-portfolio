"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
}

interface ToastContextType {
    addToast: (message: string, type: ToastType, duration?: number) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within a ToastProvider");
    return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType, duration = 4000) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type, duration }]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

const toastVariants: Variants = {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 25 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
    const icons = {
        success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
        error: <AlertCircle className="w-5 h-5 text-rose-400" />,
        info: <Info className="w-5 h-5 text-[var(--color-electric-blue)]" />,
    };

    const borders = {
        success: "border-emerald-500/30",
        error: "border-rose-500/30",
        info: "border-[var(--color-electric-blue)]/50",
    };

    const bgGlows = {
        success: "bg-emerald-500/5",
        error: "bg-rose-500/5",
        info: "bg-[var(--color-electric-blue)]/5",
    };

    return (
        <motion.div
            layout
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`pointer-events-auto flex items-center gap-3 glass-card px-4 py-3 rounded-2xl border ${borders[toast.type]} ${bgGlows[toast.type]} shadow-xl min-w-[280px] max-w-sm`}
            style={{ transform: "translateZ(0)" }}
        >
            <div className="shrink-0">{icons[toast.type]}</div>
            <p className="text-sm font-medium text-white/90 flex-1 leading-snug">{toast.message}</p>
            <button
                onClick={() => onRemove(toast.id)}
                className="shrink-0 p-1 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/10"
            >
                <X className="w-4 h-4" />
            </button>

            {/* Progress bar simulation */}
            {toast.duration && toast.duration > 0 && (
                <motion.div
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{ duration: toast.duration / 1000, ease: "linear" }}
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-white/20 origin-left rounded-full"
                />
            )}
        </motion.div>
    );
}
