"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-32 relative bg-[var(--color-charcoal-medium)] overflow-hidden cyber-grid">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-electric-blue)]/5 blur-[120px] rounded-full -z-10 animate-pulse-glow"></div>
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-start">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <h2 className="text-[var(--color-electric-blue)] font-bold tracking-[0.3em] uppercase text-xs mb-8">
                            Get In Touch
                        </h2>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-10 text-white leading-[1.1]">
                            Let’s Build Scalable Infrastructure <br />
                            <span className="animated-gradient drop-shadow-[0_0_10px_rgba(0,102,255,0.3)]">What Comes Next.</span>
                        </h2>

                        <p className="text-[var(--color-text-muted)] text-xl font-light mb-16 leading-relaxed max-w-lg">
                            Open for C-level leadership roles, strategic partnerships, joint ventures, and transformative technology investments.
                        </p>

                        <div className="space-y-10">
                            <a href="mailto:abdullahmirxa786@gmail.com" className="group flex items-center gap-6">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-[var(--color-electric-blue)]/10 group-hover:border-[var(--color-electric-blue)]/20 transition-all">
                                    <Mail className="w-6 h-6 text-[var(--color-electric-blue)]" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold tracking-widest text-white/40 uppercase mb-1">Email</div>
                                    <div className="text-xl font-medium text-white group-hover:text-[var(--color-electric-blue)] transition-colors">abdullahmirxa786@gmail.com</div>
                                </div>
                            </a>

                            <a href="tel:+966590040418" className="group flex items-center gap-6">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-[var(--color-muted-gold)]/10 group-hover:border-[var(--color-muted-gold)]/20 transition-all">
                                    <Phone className="w-6 h-6 text-[var(--color-muted-gold)]" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold tracking-widest text-white/40 uppercase mb-1">Direct Line</div>
                                    <div className="text-xl font-medium text-white group-hover:text-[var(--color-muted-gold)] transition-colors">+966 590 04 0418</div>
                                </div>
                            </a>

                            <div className="group flex items-center gap-6">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <MapPin className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold tracking-widest text-white/40 uppercase mb-1">Location</div>
                                    <div className="text-xl font-medium text-white">Riyadh, Saudi Arabia</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
                        className="glass-card p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] border-white/5 relative"
                    >
                        <form className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold tracking-widest text-white/40 uppercase ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white hover:bg-white/10 focus:outline-none focus:border-[var(--color-electric-blue)] focus:ring-2 focus:ring-[var(--color-electric-blue)]/50 focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold tracking-widest text-white/40 uppercase ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white hover:bg-white/10 focus:outline-none focus:border-[var(--color-electric-blue)] focus:ring-2 focus:ring-[var(--color-electric-blue)]/50 focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-bold tracking-widest text-white/40 uppercase ml-1">Subject</label>
                                <input
                                    type="text"
                                    placeholder="Executive Opportunity"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white hover:bg-white/10 focus:outline-none focus:border-[var(--color-electric-blue)] focus:ring-2 focus:ring-[var(--color-electric-blue)]/50 focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-bold tracking-widest text-white/40 uppercase ml-1">Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="Enter your message..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white hover:bg-white/10 focus:outline-none focus:border-[var(--color-electric-blue)] focus:ring-2 focus:ring-[var(--color-electric-blue)]/50 focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all resize-none"
                                />
                            </div>
                            <button className="w-full bg-white text-black font-bold py-5 rounded-2xl hover:bg-[var(--color-electric-blue)] hover:shadow-[0_0_25px_rgba(0,102,255,0.5)] transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 group">
                                <Send className="w-5 h-5 group-hover:text-white transition-colors" />
                                <span className="group-hover:text-shimmer transition-colors">Send Message</span>
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>

            {/* Minimal Footer */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-[var(--color-text-muted)] text-sm font-light">
                    © {new Date().getFullYear()} Abdullah Mirza. All rights reserved.
                </div>
                <div className="flex items-center gap-8">
                    <a href="#" className="text-[var(--color-text-muted)] hover:text-white transition-colors text-sm font-medium">LinkedIn</a>
                </div>
            </div>
        </section>
    );
}
