"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";

const TypewriterText = () => {
    const text = "Serial entrepreneur and developer with 11 years of experience building custom apps and websites, engineering AI-powered solutions, and creating automated workflows that scale businesses effortlessly.";
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text.charAt(index));
                setIndex((prev) => prev + 1);
            }, 15); // typing speed
            return () => clearTimeout(timeout);
        }
    }, [index, text]);

    // Highlighting logic
    const highlightWords = [
        { phrase: "11 years of experience", class: "text-white font-semibold" },
        { phrase: "apps and websites", class: "text-white font-normal" }
    ];

    let renderText = displayedText;
    highlightWords.forEach(hw => {
        if (renderText.includes(hw.phrase)) {
            renderText = renderText.replace(hw.phrase, `<span class="${hw.class}">${hw.phrase}</span>`);
        } else {
            // Partial match highlighting logic would be overly complex for a simple typewriter, 
            // so we just render plain text until the full phrase is typed, or use a simpler approach.
        }
    });

    // Simpler approach: Just render the chunks if they match exactly.
    // Instead of complex parsing, let's just use dangerouslySetInnerHTML for the highlights once they appear, 
    // or just let it type out plain text and apply a subtle glow. 
    // Actually, a better way is to just apply the typewriter to the exact HTML structure if possible, but that's hard.
    // Let's just use plain text with a flickering cursor, it looks more "tech".

    return (
        <p className="text-lg md:text-xl text-[var(--color-text-muted)] mb-12 max-w-2xl leading-relaxed font-light min-h-[180px] sm:min-h-[140px] md:min-h-[120px]">
            {displayedText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-5 bg-[var(--color-electric-blue)] ml-1 align-middle"
            />
        </p>
    );
};

export default function Hero() {
    return (
        <section className="relative min-h-[96vh] flex items-center pt-28 pb-20 md:pt-24 md:pb-16 overflow-hidden cyber-grid" id="hero">
            <div className="glow-effect opacity-30 top-[-10%] right-[-5%] -z-10 animate-pulse" style={{ animationDuration: "8s" }}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a] pointer-events-none z-0"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col md:grid md:grid-cols-12 gap-10 md:gap-12 items-center z-10 mt-12 md:mt-0">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                    className="md:col-span-7 lg:col-span-8 order-2 md:order-1"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-muted-gold)] mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-[var(--color-muted-gold)] animate-pulse"></span>
                        Founder · Operator · Architect
                    </motion.div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
                        <span className="animated-gradient">Architecting</span> Intelligent Apps, Websites & Automated Solutions.
                    </h1>

                    <TypewriterText />

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto">
                        <a
                            href="#ventures"
                            className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold text-sm tracking-wide hover:scale-105 transition-all duration-300 w-full sm:w-auto overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">Explore Ventures <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                            <div className="absolute inset-0 bg-white group-hover:bg-gray-100 transition-colors z-0"></div>
                        </a>
                        <a
                            href="#executive-profile"
                            className="flex items-center justify-center px-8 py-4 rounded-full border border-white/20 glass-card hover:bg-white/10 hover:border-white/40 transition-all text-white font-semibold text-sm tracking-wide w-full sm:w-auto"
                        >
                            Executive Profile
                        </a>
                        <a
                            href="#contact"
                            className="flex items-center justify-center px-8 py-4 rounded-full border border-[var(--color-electric-blue)]/50 bg-[var(--color-electric-blue)]/10 hover:bg-[var(--color-electric-blue)]/30 hover:shadow-[0_0_20px_rgba(0,102,255,0.4)] transition-all text-white font-semibold text-sm tracking-wide w-full sm:w-auto group"
                        >
                            <span className="group-hover:text-white transition-colors">Contact</span>
                        </a>
                    </div>

                    <div className="mt-12 md:mt-16 flex flex-col sm:grid sm:grid-cols-2 gap-8 text-xs text-gray-500 uppercase tracking-widest border-t border-white/10 pt-8 md:pt-10">
                        <div>
                            <p className="font-bold text-white mb-3 text-[var(--color-muted-gold)]">Expertise</p>
                            <p className="leading-relaxed">
                                Full-Stack App & Website Development <br />
                                Custom AI Solutions & Integrations <br />
                                Automated Workflows & Process Engineering
                            </p>
                        </div>
                        <div>
                            <p className="font-bold text-white mb-3 text-[var(--color-muted-gold)]">By the Numbers</p>
                            <p className="leading-relaxed">
                                11+ Years of Entrepreneurial Experience <br />
                                4 High-Growth Ventures Founded <br />
                                Hundreds of Hours Saved via Automation
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 30 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
                    className="md:col-span-5 lg:col-span-4 relative order-1 md:order-2 w-[280px] sm:w-[340px] md:w-full mx-auto mb-4 md:mb-0"
                >
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card p-1">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/20 via-transparent to-transparent z-10" />

                        <motion.div
                            className="relative w-full h-full"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                        >
                            <Image
                                src="/images/profile-hero.png"
                                alt="Abdullah Mirza executive portrait"
                                fill
                                priority
                                className="object-cover object-top grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                            />
                        </motion.div>
                    </div>

                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--color-electric-blue)]/10 blur-3xl -z-10"></div>
                    <div className="absolute -top-10 -left-10 w-48 h-48 bg-[var(--color-muted-gold)]/5 blur-3xl -z-10"></div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center text-gray-500 z-10"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-electric-blue)]/50 to-transparent mb-4"></div>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-5 h-5 text-[var(--color-electric-blue)]" />
                </motion.div>
            </motion.div>
        </section>
    );
}
