"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown } from "lucide-react";

/**
 * Opens the browser print dialog for the dedicated printable CV.
 * Prefers "Print / Save as PDF" language — we do not generate a binary PDF file.
 */
export default function PrintButton({ className = "" }: { className?: string }) {
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Some browsers fire afterprint inconsistently; keep a no-op listener
        // so future print-prep hooks have a stable place to live.
        const onAfterPrint = () => undefined;
        window.addEventListener("afterprint", onAfterPrint);
        return () => window.removeEventListener("afterprint", onAfterPrint);
    }, []);

    const handlePrint = () => {
        // Yield one frame so tooltip/hover state settles before the dialog opens.
        requestAnimationFrame(() => {
            window.print();
        });
    };

    return (
        <div className={`relative print:hidden ${className}`}>
            <motion.button
                type="button"
                onClick={handlePrint}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                aria-label="Print or save CV as PDF"
                title="Print / Save as PDF"
            >
                <FileDown className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                <div className="absolute inset-0 rounded-full bg-[var(--color-electric-blue)]/0 group-hover:bg-[var(--color-electric-blue)]/10 transition-colors" />
            </motion.button>

            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-bold tracking-wide whitespace-nowrap shadow-xl pointer-events-none z-50"
                    >
                        Print / Save as PDF
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
