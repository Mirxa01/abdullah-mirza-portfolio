"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, MessageCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import {
    buildWhatsappLink,
    typewriterText,
    heroExpertise,
    heroNumbers,
    heroTagline,
} from "@/lib/data";

/**
 * Typewriter effect — types text character by character.
 * Renders the full text immediately on the server and during the
 * first paint, then "rewinds" client-side and re-types it. This way
 * the hero copy is always readable even if JS is slow or fails.
 */
const TypewriterText = () => {
    const [displayedText, setDisplayedText] = useState(typewriterText);
    const [index, setIndex] = useState(typewriterText.length);
    const [hasMounted, setHasMounted] = useState(false);

    // On client mount, rewind and re-type the text for the animation effect.
    useEffect(() => {
        setHasMounted(true);
        setDisplayedText("");
        setIndex(0);
    }, []);

    useEffect(() => {
        if (!hasMounted) return;
        if (index < typewriterText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + typewriterText.charAt(index));
                setIndex((prev) => prev + 1);
            }, 14);
            return () => clearTimeout(timeout);
        }
    }, [index, hasMounted]);

    return (
        <p className="text-base sm:text-lg text-[var(--color-text-muted)] mb-8 sm:mb-10 max-w-2xl leading-relaxed font-light min-h-[180px] sm:min-h-[140px] md:min-h-[120px]">
            {displayedText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-[3px] h-5 bg-[var(--color-electric-blue)] ml-1 align-middle translate-y-0.5"
            />
        </p>
    );
};

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-[92vh] flex items-center pt-28 sm:pt-32 pb-20 overflow-hidden cyber-grid print:min-h-0 print:pt-0 print:pb-0"
        >
            {/* Ambient background blurs */}
            <div
                className="absolute -top-20 -right-20 w-[520px] h-[520px] bg-[var(--color-electric-blue)]/15 blur-[140px] rounded-full -z-10 print:hidden"
                aria-hidden="true"
            />
            <div
                className="absolute -bottom-32 -left-20 w-[440px] h-[440px] bg-purple-500/10 blur-[140px] rounded-full -z-10 print:hidden"
                aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60 pointer-events-none -z-10 print:hidden" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-10">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    {/* Copy column — visible from first paint, no JS-gated opacity */}
                    <div className="lg:col-span-7 order-2 lg:order-1 fade-in-up">
                        {/* Eyebrow */}
                        <div className="kicker mb-6">
                            <span className="kicker-dot" />
                            {heroTagline}
                        </div>

                        {/* Headline */}
                        <h1 className="heading-hero mb-6">
                            <span className="heading-accent">Architecting</span>
                            <br className="hidden sm:block" />
                            Intelligent Apps,{" "}
                            <em className="text-gradient-soft">Websites</em>{" "}
                            &amp; Automated Solutions.
                        </h1>

                        <TypewriterText />

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-3 mb-12">
                            <a href="#services" className="btn btn-primary group">
                                Get a quote
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                            <a href="#ventures" className="btn btn-secondary">
                                Explore Ventures
                            </a>
                            <a
                                href={buildWhatsappLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp"
                            >
                                <MessageCircle className="w-4 h-4" />
                                WhatsApp
                            </a>
                        </div>

                        {/* Quick stats / proof */}
                        <div className="grid sm:grid-cols-2 gap-6 sm:gap-10 pt-8 border-t border-white/[0.06]">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="w-3.5 h-3.5 text-[var(--color-muted-gold)]" />
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-muted-gold)]">
                                        Expertise
                                    </span>
                                </div>
                                <ul className="space-y-1.5">
                                    {heroExpertise.map((item) => (
                                        <li
                                            key={item}
                                            className="text-xs sm:text-sm text-white/70 leading-relaxed"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-electric-blue)] shadow-[0_0_6px_rgba(0,102,255,0.6)]" />
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-electric-blue)]">
                                        By the Numbers
                                    </span>
                                </div>
                                <ul className="space-y-1.5">
                                    {heroNumbers.map((item) => (
                                        <li
                                            key={item}
                                            className="text-xs sm:text-sm text-white/70 leading-relaxed"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Portrait column */}
                    <div className="lg:col-span-5 relative order-1 lg:order-2 mx-auto w-[240px] sm:w-[300px] lg:w-full max-w-[420px] fade-in-up [animation-delay:0.15s]">
                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                            {/* gradient frame */}
                            <div className="absolute inset-0 rounded-3xl pointer-events-none z-20 ring-1 ring-inset ring-white/10" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/40 via-transparent to-transparent z-10 pointer-events-none" />

                            <Image
                                src="/images/profile-hero.png"
                                alt="Abdullah Mirza — executive portrait"
                                fill
                                priority
                                sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 420px"
                                className="object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                            />

                            {/* Floating availability tag */}
                            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2.5 print:hidden">
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className="relative flex w-2 h-2 shrink-0">
                                        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping" />
                                        <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
                                    </span>
                                    <span className="text-[11px] font-semibold text-white truncate">
                                        Available for new projects
                                    </span>
                                </div>
                                <span className="text-[10px] text-white/50 font-mono shrink-0">
                                    Riyadh · KSA
                                </span>
                            </div>
                        </div>

                        {/* Decorative blurs */}
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[var(--color-electric-blue)]/15 blur-3xl -z-10 print:hidden" />
                        <div className="absolute -top-12 -left-12 w-44 h-44 bg-[var(--color-muted-gold)]/10 blur-3xl -z-10 print:hidden" />
                    </div>
                </div>
            </div>

            {/* Scroll cue */}
            <a
                href="#executive-profile"
                className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center text-white/40 hover:text-white transition-colors print:hidden"
                aria-label="Scroll to next section"
            >
                <div className="w-px h-10 bg-gradient-to-b from-[var(--color-electric-blue)]/60 to-transparent mb-2" />
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-4 h-4" />
                </motion.div>
            </a>
        </section>
    );
}
