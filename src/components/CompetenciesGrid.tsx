"use client";

import { motion } from "framer-motion";
import {
    Network, TrendingUp, Settings,
    Box, Truck, Handshake,
    Code2, Target, BarChart, Users, Star
} from "lucide-react";

const competencies = [
    { name: "AI-First Logistics & Supply Chain Platforms", icon: <Network className="w-5 h-5 text-[var(--color-electric-blue)]" /> },
    { name: "E-Commerce Fulfillment & Marketplace Scaling", icon: <TrendingUp className="w-5 h-5 text-[var(--color-muted-gold)]" /> },
    { name: "End-to-End Supply Chain Architecture", icon: <Settings className="w-5 h-5 text-indigo-400" /> },
    { name: "Warehouse Automation & Infrastructure Design", icon: <Box className="w-5 h-5 text-emerald-400" /> },
    { name: "Last-Mile Delivery Network Optimization", icon: <Truck className="w-5 h-5 text-blue-400" /> },
    { name: "Enterprise Business Development & B2B Deals", icon: <Handshake className="w-5 h-5 text-amber-400" /> },
    { name: "SaaS Architecture & Digital Transformation", icon: <Code2 className="w-5 h-5 text-pink-400" /> },
    { name: "Operational Excellence & Process Engineering", icon: <Target className="w-5 h-5 text-red-400" /> },
    { name: "Business Intelligence & Predictive Analytics", icon: <BarChart className="w-5 h-5 text-cyan-400" /> },
    { name: "Customer Experience & GTM Strategy", icon: <Users className="w-5 h-5 text-orange-400" /> }
];

export default function CompetenciesGrid() {
    return (
        <section id="competencies" className="py-32 relative bg-[var(--color-charcoal-light)]">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {competencies.map((comp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            className="glass-card p-6 rounded-2xl flex items-center gap-5 transition-all duration-300 group glow-border border-transparent"
                        >
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 shrink-0 group-hover:scale-110 group-hover:border-[var(--color-electric-blue)] transition-all z-10">
                                {comp.icon}
                            </div>
                            <span className="font-bold text-gray-200 text-sm leading-snug tracking-tight group-hover:text-shimmer transition-colors z-10">{comp.name}</span>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="md:col-span-2 lg:col-span-2 glass-card p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[var(--color-charcoal-medium)] to-black flex flex-col justify-center border-transparent relative overflow-hidden group glow-border"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-electric-blue)]/10 blur-3xl -z-10 group-hover:bg-[var(--color-electric-blue)]/20 transition-colors"></div>

                        <h3 className="text-2xl font-bold mb-6 text-white tracking-tight flex items-center gap-3">
                            <div className="w-2 h-8 bg-[var(--color-electric-blue)] rounded-full"></div>
                            Professional Strengths
                        </h3>

                        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
                            {[
                                "Scales operations from zero-to-one and one-to-enterprise",
                                "Leads and mentors teams from 10 to 2,500+",
                                "Pairs operational instinct with data-driven decision-making",
                                "Thrives under high-pressure, high-volume constraints",
                                "Delivers compounding growth in complex, multi-stakeholder environments"
                            ].map((strength, idx) => (
                                <div key={idx} className="flex gap-4 items-center py-2 border-b border-white/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-electric-blue)]"></div>
                                    <span className="text-gray-300 text-sm font-medium leading-relaxed">{strength}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
