"use client";

import { motion } from "framer-motion";
import {
    Network,
    TrendingUp,
    Settings,
    Box,
    Code2,
    Target,
    BarChart,
    type LucideIcon,
} from "lucide-react";
import { competencyNames, professionalStrengths } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/lib/constants";

interface CompetencyMeta {
    icon: LucideIcon;
    color: string;
}

const competencyMeta: CompetencyMeta[] = [
    { icon: Code2, color: "var(--color-electric-blue)" },
    { icon: Network, color: "var(--color-muted-gold)" },
    { icon: Settings, color: "#818cf8" },
    { icon: Box, color: "#34d399" },
    { icon: TrendingUp, color: "#60a5fa" },
    { icon: Target, color: "#fbbf24" },
    { icon: BarChart, color: "#22d3ee" },
];

export default function CompetenciesGrid() {
    return (
        <section id="competencies" className="section-y relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 sm:mb-16 text-center"
                >
                    <span className="kicker mx-auto mb-5">
                        <span className="kicker-dot" />
                        Core Capabilities
                    </span>
                    <h2 className="heading-display">
                        Strategic <span className="heading-accent">Competencies</span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                >
                    {competencyNames.map((name, i) => {
                        const meta = competencyMeta[i] ?? competencyMeta[0];
                        const Icon = meta.icon;
                        return (
                            <motion.div
                                key={name}
                                variants={staggerItem}
                                className="surface surface-hover p-5 flex items-center gap-4 group"
                            >
                                <div
                                    className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform"
                                    style={{
                                        background: `${meta.color}15`,
                                        color: meta.color,
                                    }}
                                >
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className="text-[13px] sm:text-sm font-semibold text-white/85 leading-snug">
                                    {name}
                                </span>
                            </motion.div>
                        );
                    })}

                    {/* Strengths spanning card */}
                    <motion.div
                        variants={staggerItem}
                        className="surface-elevated sm:col-span-2 p-6 sm:p-8 relative overflow-hidden group"
                    >
                        <div
                            className="absolute -top-12 -right-12 w-48 h-48 bg-[var(--color-electric-blue)]/10 blur-3xl group-hover:bg-[var(--color-electric-blue)]/20 transition-colors -z-10 print:hidden"
                            aria-hidden="true"
                        />

                        <div className="flex items-center gap-3 mb-5">
                            <span className="block w-1 h-7 rounded-full bg-gradient-to-b from-[var(--color-electric-blue)] to-purple-500" />
                            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                                Professional Strengths
                            </h3>
                        </div>

                        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                            {professionalStrengths.map((strength) => (
                                <li
                                    key={strength}
                                    className="flex items-start gap-2.5 text-[13px] sm:text-sm text-white/70 leading-relaxed font-light"
                                >
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-electric-blue)] shrink-0" />
                                    <span>{strength}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
