"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { stats } from "@/lib/data";

/**
 * Smoothly counts from 0 → target value when scrolled into view.
 * Uses requestAnimationFrame for consistent timing regardless of value size.
 */
const AnimatedCounter = ({
    value,
    prefix = "",
    suffix = "",
    duration = 1600,
}: {
    value: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
}) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const prefersReduced = useReducedMotion();

    useEffect(() => {
        if (!isInView) return;
        if (prefersReduced) {
            setCount(value);
            return;
        }
        let raf = 0;
        const start = performance.now();
        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(eased * value));
            if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [isInView, value, duration, prefersReduced]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}
            {count}
            {suffix}
        </span>
    );
};

export default function ExecutiveProfile() {
    return (
        <section
            id="executive-profile"
            className="section-y relative overflow-hidden"
        >
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[260px] bg-[var(--color-electric-blue)]/8 blur-[120px] rounded-full -z-10 print:hidden"
                aria-hidden="true"
            />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
                <motion.span
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="kicker mx-auto mb-8"
                >
                    <span className="kicker-dot" />
                    Executive Profile
                </motion.span>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-xl sm:text-2xl md:text-[1.75rem] lg:text-3xl font-light leading-[1.45] text-white/85 max-w-4xl mx-auto"
                >
                    A <span className="text-white font-semibold">serial entrepreneur</span> and developer with{" "}
                    <span className="text-white font-semibold">11 years</span> of expertise. I specialize in{" "}
                    <span className="text-white font-semibold">App &amp; Website Development</span>, crafting custom{" "}
                    <span className="heading-accent font-semibold">AI-based solutions</span>, and building powerful
                    automated workflows that transform business operations.
                </motion.p>

                <div className="mt-14 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                            className="surface surface-hover p-5 sm:p-6 text-center group"
                        >
                            <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent group-hover:from-[var(--color-electric-blue)] group-hover:to-white transition-all duration-300">
                                <AnimatedCounter
                                    value={stat.value}
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                />
                            </div>
                            <div className="text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-white/50 group-hover:text-white/80 transition-colors">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
