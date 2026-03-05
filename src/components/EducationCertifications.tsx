"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, CheckCircle2 } from "lucide-react";
import { certifications } from "@/lib/data";
import { slideInLeft, slideInRight, fastStaggerContainer, fastStaggerItem } from "@/lib/constants";

export default function EducationCertifications() {
    return (
        <section id="education-certifications" className="py-24 sm:py-32 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
                <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">

                    {/* Education */}
                    <motion.div
                        {...slideInLeft}
                        className="lg:col-span-5"
                    >
                        <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 text-[var(--color-muted-gold)]">
                            <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8" />
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase tracking-[0.1em] animated-gradient drop-shadow-[0_0_10px_rgba(197,160,89,0.3)]">Education</h2>
                        </div>

                        <div className="glass-card p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2.5rem] border-transparent relative group overflow-hidden glow-border">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-muted-gold)]/5 blur-3xl -z-10 group-hover:bg-[var(--color-muted-gold)]/10 transition-colors print:hidden"></div>
                            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/5">
                                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-muted-gold)]" />
                                </div>
                                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-white/40 uppercase">Undergraduate Degree</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 tracking-tight">Bachelor of Business Administration (BBA)</h3>
                            <p className="text-[var(--color-electric-blue)] font-bold text-base sm:text-lg tracking-wide">University of Punjab</p>
                        </div>
                    </motion.div>

                    {/* Certifications */}
                    <motion.div
                        {...slideInRight}
                        className="lg:col-span-7"
                    >
                        <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 text-[var(--color-electric-blue)]">
                            <Award className="w-7 h-7 sm:w-8 sm:h-8" />
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase tracking-[0.1em] animated-gradient drop-shadow-[0_0_10px_rgba(0,102,255,0.3)]">Certifications</h2>
                        </div>

                        <motion.div
                            variants={fastStaggerContainer}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-50px" }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                        >
                            {certifications.map((cert) => (
                                <motion.div
                                    key={cert}
                                    variants={fastStaggerItem}
                                    className="bg-white/[0.03] border-transparent p-3.5 sm:p-5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold text-gray-300 transition-all cursor-default flex items-center gap-2.5 sm:gap-3 group glow-border"
                                    style={{ transform: "translateZ(0)" }}
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-electric-blue)] bg-[var(--color-electric-blue)]/10 rounded-full opacity-40 group-hover:opacity-100 transition-opacity shrink-0 relative z-10" />
                                    <span className="leading-snug group-hover:text-shimmer transition-colors relative z-10">{cert}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
