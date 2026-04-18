"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, CheckCircle2 } from "lucide-react";
import { certifications } from "@/lib/data";
import {
    slideInLeft,
    slideInRight,
    fastStaggerContainer,
    fastStaggerItem,
} from "@/lib/constants";

export default function EducationCertifications() {
    return (
        <section
            id="education-certifications"
            className="section-y relative overflow-hidden"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
                    {/* Education */}
                    <motion.div {...slideInLeft} className="lg:col-span-5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[var(--color-muted-gold)]/15 border border-[var(--color-muted-gold)]/30 flex items-center justify-center text-[var(--color-muted-gold)]">
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="kicker">
                                    <span className="kicker-dot" />
                                    Education
                                </span>
                            </div>
                        </div>

                        <div className="surface surface-hover p-6 sm:p-8 group">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                    <BookOpen className="w-4 h-4 text-[var(--color-muted-gold)]" />
                                </div>
                                <span className="text-[10px] font-bold tracking-[0.18em] text-white/45 uppercase">
                                    Undergraduate Degree
                                </span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                                Bachelor of Business Administration (BBA)
                            </h3>
                            <p className="text-[var(--color-electric-blue)] font-semibold text-sm sm:text-base">
                                University of Punjab
                            </p>
                        </div>
                    </motion.div>

                    {/* Certifications */}
                    <motion.div {...slideInRight} className="lg:col-span-7">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[var(--color-electric-blue)]/15 border border-[var(--color-electric-blue)]/30 flex items-center justify-center text-[var(--color-electric-blue)]">
                                <Award className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="kicker">
                                    <span className="kicker-dot" />
                                    Certifications
                                </span>
                            </div>
                        </div>

                        <motion.div
                            variants={fastStaggerContainer}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-50px" }}
                            className="grid sm:grid-cols-2 gap-2.5"
                        >
                            {certifications.map((cert) => (
                                <motion.div
                                    key={cert}
                                    variants={fastStaggerItem}
                                    className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12] transition-colors group"
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-electric-blue)] shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-[12px] sm:text-[13px] font-medium text-white/75 leading-snug">
                                        {cert}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
