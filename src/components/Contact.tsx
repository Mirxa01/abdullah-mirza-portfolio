"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
    const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Simple validation criteria
    const validState = {
        name: formState.name.length > 2,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email),
        subject: formState.subject.length > 2,
        message: formState.message.length > 10,
    };

    const isReadyToSubmit = Object.values(validState).every(Boolean);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isReadyToSubmit) return;

        setIsSubmitting(true);
        // Simulate network delay for anticipation
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);

            // Auto reset after showing celebration
            setTimeout(() => {
                setIsSuccess(false);
                setFormState({ name: "", email: "", subject: "", message: "" });
            }, 4000);
        }, 800);
    };

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
                            Open for custom app & website development projects, technical co-founder roles, strategic AI integrations, and automated operational overhauls.
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
                        <form onSubmit={handleSubmit} className="space-y-8 relative">
                            <AnimatePresence>
                                {isSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md rounded-2xl"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: [1.5, 1] }}
                                            transition={{ type: "spring", bounce: 0.5 }}
                                            className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4"
                                        >
                                            <CheckCircle2 className="w-10 h-10 text-green-400" />
                                        </motion.div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Message Sent</h3>
                                        <p className="text-[var(--color-text-muted)] text-center max-w-[250px]">Thank you for reaching out. I will respond to your inquiry shortly.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3 relative group">
                                    <label className="text-xs font-bold tracking-widest text-white/40 uppercase ml-1 flex justify-between items-center">
                                        Full Name
                                        {validState.name && focusedField !== "name" && (
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] rounded-full" />
                                            </motion.div>
                                        )}
                                    </label>
                                    <input
                                        type="text"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        onFocus={() => setFocusedField("name")}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="John Doe"
                                        className={`w-full bg-white/5 border ${validState.name ? 'border-emerald-500/30' : 'border-white/10'} rounded-2xl px-6 py-4 text-white hover:bg-white/10 focus:outline-none focus:border-[var(--color-electric-blue)] focus:ring-2 focus:ring-[var(--color-electric-blue)]/50 focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all`}
                                    />
                                </div>
                                <div className="space-y-3 relative group">
                                    <label className="text-xs font-bold tracking-widest text-white/40 uppercase ml-1 flex justify-between items-center">
                                        Email Address
                                        {validState.email && focusedField !== "email" && (
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] rounded-full" />
                                            </motion.div>
                                        )}
                                    </label>
                                    <input
                                        type="email"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        onFocus={() => setFocusedField("email")}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="john@example.com"
                                        className={`w-full bg-white/5 border ${validState.email ? 'border-emerald-500/30' : 'border-white/10'} rounded-2xl px-6 py-4 text-white hover:bg-white/10 focus:outline-none focus:border-[var(--color-electric-blue)] focus:ring-2 focus:ring-[var(--color-electric-blue)]/50 focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all`}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3 relative group">
                                <label className="text-xs font-bold tracking-widest text-white/40 uppercase ml-1 flex justify-between items-center">
                                    Subject
                                    {validState.subject && focusedField !== "subject" && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] rounded-full" />
                                        </motion.div>
                                    )}
                                </label>
                                <input
                                    type="text"
                                    value={formState.subject}
                                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                    onFocus={() => setFocusedField("subject")}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Executive Opportunity"
                                    className={`w-full bg-white/5 border ${validState.subject ? 'border-emerald-500/30' : 'border-white/10'} rounded-2xl px-6 py-4 text-white hover:bg-white/10 focus:outline-none focus:border-[var(--color-electric-blue)] focus:ring-2 focus:ring-[var(--color-electric-blue)]/50 focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all`}
                                />
                            </div>
                            <div className="space-y-3 relative group">
                                <label className="text-xs font-bold tracking-widest text-white/40 uppercase ml-1 flex justify-between items-center">
                                    Message
                                    {validState.message && focusedField !== "message" && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] rounded-full" />
                                        </motion.div>
                                    )}
                                </label>
                                <textarea
                                    rows={4}
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    onFocus={() => setFocusedField("message")}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Enter your message..."
                                    className={`w-full bg-white/5 border ${validState.message ? 'border-emerald-500/30' : 'border-white/10'} rounded-2xl px-6 py-4 text-white hover:bg-white/10 focus:outline-none focus:border-[var(--color-electric-blue)] focus:ring-2 focus:ring-[var(--color-electric-blue)]/50 focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all resize-none`}
                                />
                            </div>

                            <motion.button
                                animate={isReadyToSubmit ? {
                                    scale: [1, 1.02, 1],
                                    boxShadow: ["0 0 0px rgba(0,102,255,0)", "0 0 20px rgba(0,102,255,0.6)", "0 0 0px rgba(0,102,255,0)"]
                                } : {}}
                                transition={{ repeat: isReadyToSubmit ? Infinity : 0, duration: 2 }}
                                disabled={!isReadyToSubmit || isSubmitting}
                                className={`w-full font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 group relative overflow-hidden ${isReadyToSubmit ? 'bg-white text-black hover:bg-[var(--color-electric-blue)] hover:text-white cursor-pointer' : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5'}`}
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Send className={`w-5 h-5 ${isReadyToSubmit ? 'group-hover:text-white transition-colors' : 'text-white/30'}`} />
                                        <span className={isReadyToSubmit ? 'group-hover:text-shimmer transition-colors' : ''}>
                                            {isReadyToSubmit ? 'Send Message' : 'Complete All Fields'}
                                        </span>
                                    </>
                                )}
                            </motion.button>
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
