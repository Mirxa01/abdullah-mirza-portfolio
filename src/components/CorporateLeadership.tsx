"use client";

import { motion } from "framer-motion";
import { Briefcase, Building2, ChevronRight } from "lucide-react";
import { leadershipRoles } from "@/lib/data";

const roleIcons = [
    <Briefcase key="briefcase" className="w-4 h-4" />,
    <Building2 key="building" className="w-4 h-4" />,
];

export default function CorporateLeadership() {
    return (
        <section id="leadership" className="section-y relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 sm:mb-16 max-w-3xl"
                >
                    <span className="kicker mb-5">
                        <span className="kicker-dot" />
                        Executive Leadership
                    </span>
                    <h2 className="heading-display">
                        Leading at the{" "}
                        <span className="heading-accent">enterprise frontier.</span>
                    </h2>
                </motion.div>

                <div className="space-y-6 sm:space-y-8">
                    {leadershipRoles.map((role, i) => (
                        <motion.article
                            key={role.company}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="surface surface-hover p-6 sm:p-8 lg:p-10 group"
                        >
                            <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 pb-6 border-b border-white/[0.06]">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-muted-gold)]/10 text-[var(--color-muted-gold)] text-xs font-semibold border border-[var(--color-muted-gold)]/20 mb-3">
                                        {roleIcons[i]}
                                        <span>{role.company}</span>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                                        {role.role}
                                    </h3>
                                </div>
                                <span className="pill self-start whitespace-nowrap">
                                    {role.period}
                                </span>
                            </header>

                            <ul className="grid gap-3 sm:gap-4">
                                {role.points.map((point, j) => (
                                    <motion.li
                                        key={j}
                                        initial={{ opacity: 0, x: -8 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.2 + j * 0.06 }}
                                        className="flex items-start gap-3 text-sm sm:text-base text-white/75 leading-relaxed font-light"
                                    >
                                        <ChevronRight className="w-4 h-4 mt-1 text-[var(--color-electric-blue)] shrink-0" />
                                        <span>{point}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
