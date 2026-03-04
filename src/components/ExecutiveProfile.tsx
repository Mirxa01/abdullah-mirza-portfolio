"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedCounter = ({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const incrementTime = (duration / end) || 10;
            const timer = setInterval(() => {
                start += Math.ceil(end / 20) || 1;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(start);
                }
            }, incrementTime);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

export default function ExecutiveProfile() {
    return (
        <section id="executive-profile" className="py-20 sm:py-28 relative overflow-hidden cyber-grid">
            {/* Subtle background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[var(--color-electric-blue)]/5 blur-[120px] rounded-full -z-10 animate-pulse-glow print:hidden"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                >
                    <h2 className="text-[var(--color-muted-gold)] font-bold tracking-[0.3em] uppercase text-xs mb-8 sm:mb-10">
                        Executive Profile
                    </h2>

                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-[1.5] text-gray-300">
                        A <span className="text-white font-bold">serial entrepreneur</span> and developer with <span className="text-white font-bold">11 years</span> of expertise. I specialize in <span className="text-white font-bold">App & Website Development</span>, crafting custom <span className="animated-gradient font-bold drop-shadow-[0_0_10px_rgba(0,102,255,0.3)]">AI-based solutions</span>, and building powerful automated workflows that transform business operations.
                    </p>

                    <div className="mt-10 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 relative z-10">
                        {[
                            { value: 11, suffix: "+", prefix: "", label: "Years of Experience" },
                            { value: 4, prefix: "", label: "Ventures Founded" },
                            { value: 50, prefix: "", suffix: "+", label: "Automated Workflows" },
                            { value: 100, prefix: "", suffix: "%", label: "Custom Solutions" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="text-center group"
                            >
                                <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-1 sm:mb-2 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 group-hover:from-[var(--color-electric-blue)] group-hover:to-white transition-all duration-300">
                                    <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                                </div>
                                <div className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-white/50 group-hover:text-white/80 transition-colors">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
