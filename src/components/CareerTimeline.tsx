"use client";

import { motion } from "framer-motion";
import { timelineEvents } from "@/lib/data";

export default function CareerTimeline() {
    return (
        <section
            id="career-progression"
            className="section-y relative overflow-hidden bg-[var(--color-surface-2)]"
        >
            {/* Subtle dot pattern */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none print:hidden"
                style={{
                    backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
                aria-hidden="true"
            />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 sm:mb-16 text-center"
                >
                    <span className="kicker mx-auto mb-5">
                        <span className="kicker-dot" />
                        Chronology of Impact
                    </span>
                    <h2 className="heading-display">
                        Career <span className="heading-accent">Progression</span>
                    </h2>
                </motion.div>

                <div className="relative pl-6 sm:pl-8 md:pl-10">
                    {/* Vertical track */}
                    <div
                        className="absolute left-[7px] sm:left-[9px] md:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent print:bg-gray-300"
                        aria-hidden="true"
                    />

                    <ol className="space-y-10 sm:space-y-12">
                        {timelineEvents.map((event, i) => (
                            <motion.li
                                key={`${event.company}-${event.role}-${i}`}
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: i * 0.06 }}
                                className="relative group"
                            >
                                {/* Dot */}
                                <span
                                    className="absolute -left-6 sm:-left-8 md:-left-10 top-[6px] w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded-full bg-[var(--bg-primary)] border-2 border-white/15 group-hover:border-[var(--color-electric-blue)] group-hover:shadow-[0_0_12px_rgba(0,102,255,0.6)] transition-all flex items-center justify-center"
                                    aria-hidden="true"
                                >
                                    <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[var(--color-electric-blue)] transition-colors" />
                                </span>

                                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
                                        {event.role}
                                    </h3>
                                    <span className="pill text-[var(--color-muted-gold)] border-[var(--color-muted-gold)]/20 bg-[var(--color-muted-gold)]/10">
                                        {event.company}
                                    </span>
                                </div>

                                {event.highlights.length > 0 && (
                                    <ul className="space-y-1.5 max-w-2xl">
                                        {event.highlights.map((h, j) => (
                                            <li
                                                key={j}
                                                className="flex gap-2.5 items-start text-sm sm:text-[15px] text-white/65 leading-relaxed font-light"
                                            >
                                                <span className="mt-2 w-1 h-1 rounded-full bg-white/25 shrink-0" />
                                                <span>{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
