"use client";

import { motion, Variants } from "framer-motion";
import {
    Network, TrendingUp, Settings,
    Box, Truck, Handshake,
    Code2, Target, BarChart, Users, Star
} from "lucide-react";

const competencies = [
    { name: "Full-Stack App & Website Development", icon: <Code2 className="w-5 h-5 text-[var(--color-electric-blue)]" /> },
    { name: "AI Solutions & GPT Integrations", icon: <Network className="w-5 h-5 text-[var(--color-muted-gold)]" /> },
    { name: "Automated Workflows (Make, Zapier, n8n)", icon: <Settings className="w-5 h-5 text-indigo-400" /> },
    { name: "SaaS Architecture & Infrastructure", icon: <Box className="w-5 h-5 text-emerald-400" /> },
    { name: "E-Commerce Scaling & Platforms", icon: <TrendingUp className="w-5 h-5 text-blue-400" /> },
    { name: "Operational Process Engineering", icon: <Target className="w-5 h-5 text-amber-400" /> },
    { name: "Business Intelligence & Analytics", icon: <BarChart className="w-5 h-5 text-cyan-400" /> }
];
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring" as const, stiffness: 300, damping: 24 }
    }
};

export default function CompetenciesGrid() {
    return (
        <section id="competencies" className="py-32 relative transition-colors duration-500 hover:bg-white/[0.02]">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                    className="mb-20 text-center"
                >
                    <div className="flex items-center justify-center gap-3 mb-6 text-[var(--color-electric-blue)]">
                        <Star className="w-5 h-5" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase">Core Capabilities</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Strategic <span className="animated-gradient drop-shadow-[0_0_10px_rgba(0,102,255,0.3)]">Competencies</span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {competencies.map((comp, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="glass-card p-6 rounded-2xl flex items-center gap-5 transition-all duration-300 group glow-border border-transparent"
                            style={{ transform: "translateZ(0)" }}
                        >
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 shrink-0 group-hover:scale-110 group-hover:border-[var(--color-electric-blue)] transition-all z-10">
                                {comp.icon}
                            </div>
                            <span className="font-bold text-gray-200 text-sm leading-snug tracking-tight group-hover:text-shimmer transition-colors z-10">{comp.name}</span>
                        </motion.div>
                    ))}

                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-2 lg:col-span-2 glass-card p-6 md:p-10 rounded-3xl bg-gradient-to-br from-[var(--color-charcoal-medium)] to-black flex flex-col justify-center border-transparent relative overflow-hidden group glow-border"
                        style={{ transform: "translateZ(0)" }}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-electric-blue)]/10 blur-3xl -z-10 group-hover:bg-[var(--color-electric-blue)]/20 transition-colors"></div>

                        <h3 className="text-2xl font-bold mb-6 text-white tracking-tight flex items-center gap-3">
                            <div className="w-2 h-8 bg-[var(--color-electric-blue)] rounded-full"></div>
                            Professional Strengths
                        </h3>

                        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
                            {[
                                "Builds elegant, high-performing websites and mobile apps",
                                "Automates repetitive tasks to save hundreds of hours",
                                "Integrates cutting-edge AI to solve complex business problems",
                                "Architects scalable infrastructure from zero-to-one",
                                "Pairs technical execution with deep entrepreneurial strategy"
                            ].map((strength, idx) => (
                                <div key={idx} className="flex gap-4 items-center py-2 border-b border-white/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-electric-blue)]"></div>
                                    <span className="text-gray-300 text-sm font-medium leading-relaxed">{strength}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
