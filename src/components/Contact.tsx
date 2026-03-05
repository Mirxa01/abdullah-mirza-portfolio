"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "./ToastProvider";
import { contactInfo } from "@/lib/data";
import { slideInLeft, slideInRight } from "@/lib/constants";
import { VALIDATION } from "@/lib/constants";
import type { ContactFormState, ContactApiResponse } from "@/lib/types";

/** Validates form fields against shared validation rules */
function getValidation(formState: ContactFormState) {
    return {
        name: formState.name.length >= VALIDATION.NAME_MIN_LENGTH,
        email: VALIDATION.EMAIL_REGEX.test(formState.email),
        subject: formState.subject.length >= VALIDATION.SUBJECT_MIN_LENGTH,
        message: formState.message.length >= VALIDATION.MESSAGE_MIN_LENGTH,
    };
}

/** Maps contact info type to its corresponding icon */
const contactIcons: Record<string, { icon: React.ReactNode; hoverColor: string }> = {
    email: {
        icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-electric-blue)]" />,
        hoverColor: "group-hover:bg-[var(--color-electric-blue)]/10 group-hover:border-[var(--color-electric-blue)]/20",
    },
    phone: {
        icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-muted-gold)]" />,
        hoverColor: "group-hover:bg-[var(--color-muted-gold)]/10 group-hover:border-[var(--color-muted-gold)]/20",
    },
    location: {
        icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />,
        hoverColor: "",
    },
};

export default function Contact() {
    const { addToast } = useToast();
    const [formState, setFormState] = useState<ContactFormState>({ name: "", email: "", subject: "", message: "" });
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validState = getValidation(formState);
    const isReadyToSubmit = Object.values(validState).every(Boolean);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isReadyToSubmit || isSubmitting) return;

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formState),
            });

            const data: ContactApiResponse = await response.json();

            if (!response.ok || !data.success) {
                addToast(data.message || "Something went wrong. Please try again.", "error");
                return;
            }

            setIsSuccess(true);
            addToast("Your message has been successfully sent.", "success");

            setTimeout(() => {
                setIsSuccess(false);
                setFormState({ name: "", email: "", subject: "", message: "" });
            }, 4000);
        } catch {
            addToast("Network error. Please check your connection and try again.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCopy = (value: string, label: string) => {
        navigator.clipboard.writeText(value);
        addToast(`${label} copied to clipboard`, "info");
    };

    return (
        <section id="contact" className="py-24 sm:py-32 relative bg-[var(--color-charcoal-medium)] overflow-hidden cyber-grid">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-electric-blue)]/5 blur-[120px] rounded-full -z-10 animate-pulse-glow print:hidden"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-start">

                    <motion.div {...slideInLeft}>
                        <h2 className="text-[var(--color-electric-blue)] font-bold tracking-[0.3em] uppercase text-xs mb-6 sm:mb-8">
                            Get In Touch
                        </h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 sm:mb-10 text-white leading-[1.1]">
                            Let&apos;s Build Scalable Infrastructure <br className="hidden sm:block" />
                            <span className="animated-gradient drop-shadow-[0_0_10px_rgba(0,102,255,0.3)]">What Comes Next.</span>
                        </h2>

                        <p className="text-[var(--color-text-muted)] text-base sm:text-lg md:text-xl font-light mb-10 sm:mb-16 leading-relaxed max-w-lg">
                            Open for custom app & website development projects, technical co-founder roles, strategic AI integrations, and automated operational overhauls.
                        </p>

                        <div className="space-y-6 sm:space-y-10">
                            {contactInfo.map((info) => {
                                const config = contactIcons[info.type];
                                const isCopyable = info.type === "email" || info.type === "phone";

                                const content = (
                                    <div className={`${isCopyable ? "group" : ""} flex items-center gap-4 sm:gap-6 w-full text-left`}>
                                        <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 ${config.hoverColor} transition-all shrink-0`}>
                                            {config.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-[10px] sm:text-xs font-bold tracking-widest text-white/40 uppercase mb-1">{info.label}</div>
                                            <div className={`text-base sm:text-lg md:text-xl font-medium text-white ${isCopyable ? "group-hover:text-[var(--color-electric-blue)]" : ""} transition-colors truncate`}>
                                                {info.displayValue}
                                            </div>
                                        </div>
                                    </div>
                                );

                                if (isCopyable) {
                                    return (
                                        <button
                                            key={info.type}
                                            onClick={() => handleCopy(info.value, info.label)}
                                            className="w-full"
                                            aria-label={`Copy ${info.label} to clipboard`}
                                        >
                                            {content}
                                        </button>
                                    );
                                }

                                return <div key={info.type}>{content}</div>;
                            })}
                        </div>
                    </motion.div>

                    <motion.div
                        {...slideInRight}
                        className="glass-card p-5 sm:p-8 md:p-12 lg:p-16 rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] border-white/5 relative print:hidden"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 relative">
                            {/* Honeypot field for bot detection — hidden from real users */}
                            <input
                                type="text"
                                name="honeypot"
                                tabIndex={-1}
                                autoComplete="off"
                                className="absolute opacity-0 w-0 h-0 pointer-events-none"
                                aria-hidden="true"
                            />

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
                                            className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4"
                                        >
                                            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
                                        </motion.div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Message Sent</h3>
                                        <p className="text-[var(--color-text-muted)] text-center max-w-[250px] text-sm sm:text-base">Thank you for reaching out. I will respond to your inquiry shortly.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="grid sm:grid-cols-2 gap-5 sm:gap-8">
                                {/* Name field */}
                                <div className="space-y-2 sm:space-y-3 relative group">
                                    <label htmlFor="contact-name" className="text-[10px] sm:text-xs font-bold tracking-widest text-white/40 uppercase ml-1 flex justify-between items-center">
                                        Full Name
                                        {validState.name && focusedField !== "name" && (
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] rounded-full" />
                                            </motion.div>
                                        )}
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        onFocus={() => setFocusedField("name")}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="John Doe"
                                        className={`w-full bg-white/5 border ${validState.name ? 'border-emerald-500/30' : 'border-white/10'} rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white hover:bg-white/10 focus:outline-none focus:border-[var(--color-electric-blue)] focus:ring-2 focus:ring-[var(--color-electric-blue)]/50 focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all`}
                                    />
                                </div>
                                {/* Email field */}
                                <div className="space-y-2 sm:space-y-3 relative group">
                                    <label htmlFor="contact-email" className="text-[10px] sm:text-xs font-bold tracking-widest text-white/40 uppercase ml-1 flex justify-between items-center">
                                        Email Address
                                        {validState.email && focusedField !== "email" && (
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] rounded-full" />
                                            </motion.div>
                                        )}
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        onFocus={() => setFocusedField("email")}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="john@example.com"
                                        className={`w-full bg-white/5 border ${validState.email ? 'border-emerald-500/30' : 'border-white/10'} rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white hover:bg-white/10 focus:outline-none focus:border-[var(--color-electric-blue)] focus:ring-2 focus:ring-[var(--color-electric-blue)]/50 focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all`}
                                    />
                                </div>
                            </div>
                            {/* Subject field */}
                            <div className="space-y-2 sm:space-y-3 relative group">
                                <label htmlFor="contact-subject" className="text-[10px] sm:text-xs font-bold tracking-widest text-white/40 uppercase ml-1 flex justify-between items-center">
                                    Subject
                                    {validState.subject && focusedField !== "subject" && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] rounded-full" />
                                        </motion.div>
                                    )}
                                </label>
                                <input
                                    id="contact-subject"
                                    type="text"
                                    value={formState.subject}
                                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                    onFocus={() => setFocusedField("subject")}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Executive Opportunity"
                                    className={`w-full bg-white/5 border ${validState.subject ? 'border-emerald-500/30' : 'border-white/10'} rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white hover:bg-white/10 focus:outline-none focus:border-[var(--color-electric-blue)] focus:ring-2 focus:ring-[var(--color-electric-blue)]/50 focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all`}
                                />
                            </div>
                            {/* Message field */}
                            <div className="space-y-2 sm:space-y-3 relative group">
                                <label htmlFor="contact-message" className="text-[10px] sm:text-xs font-bold tracking-widest text-white/40 uppercase ml-1 flex justify-between items-center">
                                    Message
                                    {validState.message && focusedField !== "message" && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] rounded-full" />
                                        </motion.div>
                                    )}
                                </label>
                                <textarea
                                    id="contact-message"
                                    rows={4}
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    onFocus={() => setFocusedField("message")}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Enter your message..."
                                    className={`w-full bg-white/5 border ${validState.message ? 'border-emerald-500/30' : 'border-white/10'} rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white hover:bg-white/10 focus:outline-none focus:border-[var(--color-electric-blue)] focus:ring-2 focus:ring-[var(--color-electric-blue)]/50 focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all resize-none`}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                animate={isReadyToSubmit ? {
                                    scale: [1, 1.02, 1],
                                    boxShadow: ["0 0 0px rgba(0,102,255,0)", "0 0 20px rgba(0,102,255,0.6)", "0 0 0px rgba(0,102,255,0)"]
                                } : {}}
                                transition={{ repeat: isReadyToSubmit ? Infinity : 0, duration: 2 }}
                                disabled={!isReadyToSubmit || isSubmitting}
                                className={`w-full font-bold py-4 sm:py-5 rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-3 group relative overflow-hidden text-sm sm:text-base ${isReadyToSubmit ? 'bg-white text-black hover:bg-[var(--color-electric-blue)] hover:text-white cursor-pointer' : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5'}`}
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Send className={`w-4 h-4 sm:w-5 sm:h-5 ${isReadyToSubmit ? 'group-hover:text-white transition-colors' : 'text-white/30'}`} />
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-20 sm:mt-32 pt-8 sm:pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
                <div className="text-[var(--color-text-muted)] text-xs sm:text-sm font-light text-center sm:text-left">
                    © {new Date().getFullYear()} Abdullah Mirza. All rights reserved.
                </div>
                <div className="flex items-center gap-8">
                    <a href="#" className="text-[var(--color-text-muted)] hover:text-white transition-colors text-xs sm:text-sm font-medium">LinkedIn</a>
                </div>
            </div>
        </section>
    );
}
