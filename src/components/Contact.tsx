"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle } from "lucide-react";
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
const contactIcons: Record<string, { icon: React.ReactNode; tint: string }> = {
    email: {
        icon: <Mail className="w-5 h-5 text-[var(--color-electric-blue)]" />,
        tint: "bg-[var(--color-electric-blue)]/10 border-[var(--color-electric-blue)]/20",
    },
    whatsapp: {
        icon: <MessageCircle className="w-5 h-5 text-emerald-400" />,
        tint: "bg-emerald-500/10 border-emerald-500/25",
    },
    phone: {
        icon: <Phone className="w-5 h-5 text-[var(--color-muted-gold)]" />,
        tint: "bg-[var(--color-muted-gold)]/10 border-[var(--color-muted-gold)]/20",
    },
    location: {
        icon: <MapPin className="w-5 h-5 text-purple-400" />,
        tint: "bg-purple-500/10 border-purple-500/20",
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
        <section
            id="contact"
            className="section-y relative bg-[var(--color-surface-2)] overflow-hidden"
        >
            <div
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-electric-blue)]/8 blur-[120px] rounded-full -z-10 print:hidden"
                aria-hidden="true"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    <motion.div {...slideInLeft}>
                        <span className="kicker mb-5">
                            <span className="kicker-dot" />
                            Get In Touch
                        </span>
                        <h2 className="heading-display mt-4 mb-5 sm:mb-6">
                            Let&apos;s build{" "}
                            <span className="heading-accent">what comes next.</span>
                        </h2>

                        <p className="text-base sm:text-lg text-[var(--color-text-muted)] font-light mb-10 leading-relaxed max-w-lg">
                            Open for custom app &amp; website development projects, technical co-founder roles, strategic AI integrations, and automated operational overhauls.
                        </p>

                        <div className="space-y-3">
                            {contactInfo.map((info) => {
                                const config = contactIcons[info.type];
                                const isWhatsapp = info.type === "whatsapp";
                                const isCopyable = info.type === "email" || info.type === "phone";

                                const content = (
                                    <div className="group flex items-center gap-4 w-full text-left p-3 -m-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                                        <div
                                            className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-all ${config.tint} group-hover:scale-105`}
                                        >
                                            {config.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-[10px] font-bold tracking-[0.18em] text-white/40 uppercase mb-1">
                                                {info.label}
                                            </div>
                                            <div className="text-sm sm:text-base font-medium text-white truncate">
                                                {info.displayValue}
                                            </div>
                                        </div>
                                    </div>
                                );

                                if (isWhatsapp && info.href) {
                                    return (
                                        <a
                                            key={info.type}
                                            href={info.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full"
                                            aria-label="Open WhatsApp chat with Abdullah"
                                        >
                                            {content}
                                        </a>
                                    );
                                }

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
                        className="surface-elevated p-6 sm:p-8 lg:p-10 relative print:hidden"
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
        </section>
    );
}
