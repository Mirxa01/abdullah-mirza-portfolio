"use client";

import { motion } from "framer-motion";
import { Briefcase, Building, ChevronRight, TrendingUp } from "lucide-react";

const roles = [
    {
        company: "5S Logistics",
        role: "Head of Business Development",
        period: "Sep 2022 – Present",
        icon: <Briefcase className="w-5 h-5 text-white" />,
        points: [
            "Architecting AI-first logistics platform for enterprise clients across KSA",
            "Closed $10M+ in strategic B2B partnerships with multinational corporates",
            "Generated $1M+ incremental annual revenue through new verticals",
            "Leading cross-functional proposal teams for government & enterprise RFPs",
            "Drove 40% capacity optimization across warehouse and fleet operations"
        ]
    },
    {
        company: "Hubex (Noon.com 3PL Partner)",
        role: "Chief Operating Officer",
        period: "Feb 2021 – Sep 2022",
        icon: <Building className="w-5 h-5 text-white" />,
        points: [
            "Directed 9 warehouses spanning ~1M sqft across Saudi Arabia",
            "Orchestrated 30K–45K daily order fulfillment for Noon.com",
            "Built and led 2,500+ person operations workforce",
            "Implemented end-to-end 3PL infrastructure: inbound → storage → last-mile",
            "Achieved 99.2% SLA compliance under peak Ramadan and White Friday surges"
        ]
    }
];

export default function CorporateLeadership() {
    return (
        <section id="leadership" className="py-32 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                    className="mb-20"
                >
                    <div className="flex items-center gap-3 mb-6 text-[var(--color-electric-blue)]">
                        <TrendingUp className="w-5 h-5" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase">Executive Leadership</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Executive <span className="animated-gradient drop-shadow-[0_0_10px_rgba(0,102,255,0.3)]">Leadership</span>
                    </h2>
                </motion.div>

                <div className="space-y-12">
                    {roles.map((role, i) => (
                        <motion.div
                            key={role.company}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            className="glass-card rounded-[2rem] p-8 md:p-12 relative group transition-all duration-500 glow-border border-transparent"
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10 pb-8 border-b border-white/5 relative z-10">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 text-[var(--color-muted-gold)] text-sm font-semibold border-none ring-1 ring-white/10 group-hover:ring-[var(--color-electric-blue)] transition-all">
                                        {role.icon}
                                        {role.company}
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white group-hover:text-shimmer transition-colors">{role.role}</h3>
                                </div>

                                <div className="text-sm font-bold tracking-widest uppercase text-[var(--color-text-muted)] bg-white/5 px-6 py-3 rounded-full border border-white/5 w-max group-hover:text-white transition-colors">
                                    {role.period}
                                </div>
                            </div>

                            <ul className="grid md:grid-cols-1 gap-6 text-gray-400 relative z-10">
                                {role.points.map((point, j) => (
                                    <motion.li
                                        key={j}
                                        className="flex gap-4 items-start"
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + (j * 0.1) }}
                                    >
                                        <ChevronRight className="w-5 h-5 text-[var(--color-electric-blue)] shrink-0 mt-0.5" />
                                        <span className="text-lg font-light leading-relaxed group-hover:text-gray-200 transition-colors">{point}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
