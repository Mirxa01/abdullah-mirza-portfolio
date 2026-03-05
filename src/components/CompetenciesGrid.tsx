"use client";

import { motion } from "framer-motion";
import {
    Network, TrendingUp, Settings,
    Box, Code2, Target, BarChart, Star
} from "lucide-react";
import { competencyNames, professionalStrengths } from "@/lib/data";
import { sectionFadeIn, staggerContainer, staggerItem } from "@/lib/constants";

/** Icon mapping for each competency — maintains JSX rendering in the component layer */
const competencyIcons = [
    <Code2 key="code" className="w-5 h-5 text-[var(--color-electric-blue)]" />,
    <Network key="network" className="w-5 h-5 text-[var(--color-muted-gold)]" />,
    <Settings key="settings" className="w-5 h-5 text-indigo-400" />,
    <Box key="box" className="w-5 h-5 text-emerald-400" />,
    <TrendingUp key="trending" className="w-5 h-5 text-blue-400" />,
    <Target key="target" className="w-5 h-5 text-amber-400" />,
    <BarChart key="barchart" className="w-5 h-5 text-cyan-400" />,
];

export default function CompetenciesGrid() {
    return (
        <section id="competencies" className="py-24 sm:py-32 relative transition-colors duration-500 hover:bg-white/[0.02]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
                <motion.div
                    {...sectionFadeIn}
                    className="mb-14 sm:mb-20 text-center"
                >
                    <div className="flex items-center justify-center gap-3 mb-6 text-[var(--color-electric-blue)]">
                        <Star className="w-5 h-5" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase">Core Capabilities</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Strategic <span className="animated-gradient drop-shadow-[0_0_10px_rgba(0,102,255,0.3)]">Competencies</span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                >
                    {competencyNames.map((name, i) => (
                        <motion.div
                            key={name}
                            variants={staggerItem}
                            className="glass-card p-4 sm:p-6 rounded-2xl flex items-center gap-4 sm:gap-5 transition-all duration-300 group glow-border border-transparent"
                            style={{ transform: "translateZ(0)" }}
                        >
                            <div className="bg-white/5 p-3 sm:p-4 rounded-xl border border-white/5 shrink-0 group-hover:scale-110 group-hover:border-[var(--color-electric-blue)] transition-all z-10">
                                {competencyIcons[i]}
                            </div>
                            <span className="font-bold text-gray-200 text-xs sm:text-sm leading-snug tracking-tight group-hover:text-shimmer transition-colors z-10">{name}</span>
                        </motion.div>
                    ))}

                    <motion.div
                        variants={staggerItem}
                        className="sm:col-span-2 lg:col-span-2 glass-card p-5 sm:p-6 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[var(--color-charcoal-medium)] to-black flex flex-col justify-center border-transparent relative overflow-hidden group glow-border"
                        style={{ transform: "translateZ(0)" }}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-electric-blue)]/10 blur-3xl -z-10 group-hover:bg-[var(--color-electric-blue)]/20 transition-colors print:hidden"></div>

                        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white tracking-tight flex items-center gap-3">
                            <div className="w-2 h-6 sm:h-8 bg-[var(--color-electric-blue)] rounded-full"></div>
                            Professional Strengths
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-3 sm:gap-y-4">
                            {professionalStrengths.map((strength) => (
                                <div key={strength} className="flex gap-3 sm:gap-4 items-center py-2 border-b border-white/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-electric-blue)]"></div>
                                    <span className="text-gray-300 text-xs sm:text-sm font-medium leading-relaxed">{strength}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
