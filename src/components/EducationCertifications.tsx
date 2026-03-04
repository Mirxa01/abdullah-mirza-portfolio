"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, CheckCircle2 } from "lucide-react";

const certifications = [
    "CPSM",
    "Harvard Business School Online – Leadership & Management",
    "Six Sigma Black Belt",
    "Six Sigma Green Belt",
    "Project Management Professional (PMP)",
    "Business Analyst Certification",
    "Full-Stack Web Development Bootcamp",
    "BI Specialist",
    "Digital Transformation",
    "AWS Certified Solutions Architect",
    "Advanced Workflow Automation (Make/Zapier)",
    "AI Solutions & Prompt Engineering"
];

export default function EducationCertifications() {
    return (
        <section id="education-certifications" className="py-32 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-12 gap-16">

                    {/* Education */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                        className="lg:col-span-5"
                    >
                        <div className="flex items-center gap-4 mb-10 text-[var(--color-muted-gold)]">
                            <GraduationCap className="w-8 h-8" />
                            <h2 className="text-3xl font-bold tracking-tight uppercase tracking-[0.1em] animated-gradient drop-shadow-[0_0_10px_rgba(197,160,89,0.3)]">Education</h2>
                        </div>

                        <div className="glass-card p-10 rounded-[2.5rem] border-transparent relative group overflow-hidden glow-border">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-muted-gold)]/5 blur-3xl -z-10 group-hover:bg-[var(--color-muted-gold)]/10 transition-colors"></div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <BookOpen className="w-6 h-6 text-[var(--color-muted-gold)]" />
                                </div>
                                <span className="text-xs font-bold tracking-widest text-white/40 uppercase">Undergraduate Degree</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 tracking-tight">Bachelor of Business Administration (BBA)</h3>
                            <p className="text-[var(--color-electric-blue)] font-bold text-lg tracking-wide">University of Punjab</p>
                        </div>
                    </motion.div>

                    {/* Certifications */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
                        className="lg:col-span-7"
                    >
                        <div className="flex items-center gap-4 mb-10 text-[var(--color-electric-blue)]">
                            <Award className="w-8 h-8" />
                            <h2 className="text-3xl font-bold tracking-tight uppercase tracking-[0.1em] animated-gradient drop-shadow-[0_0_10px_rgba(0,102,255,0.3)]">Certifications</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {certifications.map((cert, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + (i * 0.05) }}
                                    className="bg-white/[0.03] border-transparent p-5 rounded-2xl text-sm font-semibold text-gray-300 transition-all cursor-default flex items-center gap-3 group glow-border"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-[var(--color-electric-blue)] bg-[var(--color-electric-blue)]/10 rounded-full opacity-40 group-hover:opacity-100 transition-opacity shrink-0 relative z-10" />
                                    <span className="leading-snug group-hover:text-shimmer transition-colors relative z-10">{cert}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
