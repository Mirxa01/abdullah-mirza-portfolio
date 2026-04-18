"use client";

import { motion } from "framer-motion";
import { Calendar, DollarSign, TrendingUp } from "lucide-react";
import { formatSar, formatUsd } from "@/lib/chat/pricing";
import type { Quote } from "@/lib/chat/types";

interface Props {
    quote: Quote;
}

export default function QuoteCard({ quote }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="w-full max-w-[420px] rounded-2xl border border-[var(--color-electric-blue)]/30 bg-gradient-to-br from-[var(--color-electric-blue)]/10 via-white/[0.02] to-purple-500/10 backdrop-blur-md p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,102,255,0.15)]"
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-electric-blue)]/20 flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-[var(--color-electric-blue)]" />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold tracking-widest text-white/50 uppercase">
                            Estimate
                        </div>
                        <div className="text-sm font-semibold text-white truncate">
                            {quote.serviceTitle}
                        </div>
                    </div>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-full bg-[var(--color-muted-gold)]/15 text-[var(--color-muted-gold)] border border-[var(--color-muted-gold)]/30">
                    {quote.complexity}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="rounded-xl bg-black/30 border border-white/5 p-3">
                    <div className="text-[10px] text-white/50 uppercase tracking-widest mb-1">
                        USD
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white tabular-nums">
                        {formatUsd(quote.usd.min)}
                    </div>
                    <div className="text-[11px] text-white/50 tabular-nums">
                        – {formatUsd(quote.usd.max)}
                    </div>
                </div>
                <div className="rounded-xl bg-black/30 border border-white/5 p-3">
                    <div className="text-[10px] text-white/50 uppercase tracking-widest mb-1">
                        SAR
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white tabular-nums">
                        {formatSar(quote.sar.min)}
                    </div>
                    <div className="text-[11px] text-white/50 tabular-nums">
                        – {formatSar(quote.sar.max)}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-white/70 mb-3">
                <Calendar className="w-3.5 h-3.5 text-[var(--color-muted-gold)]" />
                <span className="font-medium">
                    {quote.weeks.min}–{quote.weeks.max} weeks
                </span>
            </div>

            {quote.breakdown.length > 0 && (
                <details className="group">
                    <summary className="flex items-center gap-1.5 text-[11px] font-semibold text-white/60 hover:text-white cursor-pointer list-none">
                        <TrendingUp className="w-3 h-3" />
                        <span>Pricing breakdown</span>
                        <span className="ml-auto text-white/30 group-open:rotate-180 transition-transform">
                            ▾
                        </span>
                    </summary>
                    <ul className="mt-2 space-y-1.5">
                        {quote.breakdown.map((b, i) => (
                            <li
                                key={i}
                                className="flex items-start justify-between gap-2 text-[11px] text-white/70"
                            >
                                <span className="flex-1">{b.label}</span>
                                <span className="text-white/50 font-mono shrink-0">
                                    {b.impact}
                                </span>
                            </li>
                        ))}
                    </ul>
                </details>
            )}

            <p className="mt-3 pt-3 border-t border-white/5 text-[10px] text-white/40 leading-relaxed">
                Indicative range. Final scope confirmed during discovery call.
            </p>
        </motion.div>
    );
}
