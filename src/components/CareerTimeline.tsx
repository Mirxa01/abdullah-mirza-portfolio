"use client";

import { motion } from "framer-motion";
import { History } from "lucide-react";
import { timelineEvents } from "@/lib/data";
import { sectionFadeIn } from "@/lib/constants";

export default function CareerTimeline() {
    return (
        <section id="career-progression" className="py-24 sm:py-32 relative bg-[var(--color-charcoal-medium)] overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none print:hidden" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 relative">
                <motion.div
                    {...sectionFadeIn}
                    className="mb-14 sm:mb-20 text-center"
                >
                    <div className="flex items-center justify-center gap-3 mb-6 text-[var(--color-muted-gold)]">
                        <History className="w-5 h-5" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase">Chronology of Impact</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Career <span className="animated-gradient drop-shadow-[0_0_10px_rgba(0,102,255,0.3)]">Progression</span>
                    </h2>
                </motion.div>

                <div className="relative ml-2 sm:ml-4 md:ml-12 space-y-10 sm:space-y-16 py-4 sm:py-8">
                    {/* Glowing timeline track */}
                    <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[var(--color-electric-blue)] to-transparent opacity-50 shadow-[0_0_10px_rgba(0,102,255,0.8)] print:bg-gray-300 print:shadow-none"></div>

                    {timelineEvents.map((event, i) => (
                        <motion.div
                            key={`${event.company}-${event.role}`}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="relative pl-8 sm:pl-10 md:pl-16 group"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute top-2 -left-0 w-4 h-4 rounded-full bg-[var(--color-charcoal-base)] border-2 border-white/10 group-hover:border-[var(--color-electric-blue)] group-hover:shadow-[0_0_15px_rgba(0,102,255,0.8)] transition-all duration-500 z-10 flex items-center justify-center print:border-gray-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[var(--color-electric-blue)] transition-colors duration-500"></div>
                            </div>

                            {/* Hover Glow */}
                            <div className="absolute top-0 -left-1 w-20 h-20 bg-[var(--color-electric-blue)]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 print:hidden"></div>

                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 md:gap-6 mb-3 sm:mb-4">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-shimmer transition-colors">{event.role}</h3>
                                <div className="text-[var(--color-muted-gold)] font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase py-1 px-2 sm:px-3 rounded-md bg-white/5 border border-white/5 w-max">{event.company}</div>
                            </div>

                            {event.highlights.length > 0 && (
                                <div className="grid gap-2 sm:gap-3">
                                    {event.highlights.map((highlight, j) => (
                                        <div key={j} className="flex gap-3 sm:gap-4 items-start text-gray-400 font-light leading-relaxed max-w-2xl">
                                            <div className="mt-2 sm:mt-2.5 w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[var(--color-electric-blue)]/40 transition-colors shrink-0"></div>
                                            <span className="text-sm sm:text-base md:text-lg">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
