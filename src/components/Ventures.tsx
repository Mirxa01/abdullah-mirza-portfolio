"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, Globe } from "lucide-react";
import Image from "next/image";
import TiltCard from "./TiltCard";
import { ventures, ventureBulletPoints } from "@/lib/data";
import type { Venture } from "@/lib/types";

/**
 * Builds a soft branded gradient hero for ventures that don't have a
 * dedicated cover image yet — uses the venture's accent color.
 */
function gradientFromColor(color: string): string {
    return `linear-gradient(135deg, ${color}33 0%, ${color}11 50%, transparent 100%)`;
}

function VentureCard({ venture }: { venture: Venture }) {
    const initial = venture.title.charAt(0).toUpperCase();
    const hasImage = Boolean(venture.image);
    const hasLogo = Boolean(venture.logo);
    const display = venture.domain ?? venture.title.toLowerCase();

    return (
        <a
            href={venture.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-2xl"
            aria-label={`Visit ${venture.title} — ${display}`}
        >
            <article className="relative h-full surface surface-hover overflow-hidden rounded-2xl flex flex-col">
                {/* Cover */}
                <div
                    className="relative aspect-[16/9] overflow-hidden"
                    style={{ transform: "translateZ(20px)" }}
                >
                    {hasImage ? (
                        <>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                            <Image
                                src={venture.image as string}
                                alt={`${venture.title} preview`}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                                loading="lazy"
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </>
                    ) : (
                        // Fallback: branded gradient hero with large monogram
                        <div
                            className="absolute inset-0 flex items-center justify-center overflow-hidden"
                            style={{
                                background: gradientFromColor(venture.color),
                            }}
                        >
                            {/* Subtle dot pattern */}
                            <div
                                className="absolute inset-0 opacity-[0.06]"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(#fff 1px, transparent 1px)",
                                    backgroundSize: "20px 20px",
                                }}
                                aria-hidden="true"
                            />
                            <span
                                className="relative text-7xl sm:text-8xl font-black tracking-tighter opacity-90 group-hover:scale-110 transition-transform duration-700"
                                style={{ color: venture.color }}
                                aria-hidden="true"
                            >
                                {initial}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        </div>
                    )}

                    {/* Logo / monogram badge */}
                    <div
                        className="absolute top-3 left-3 z-20 w-11 h-11 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center overflow-hidden"
                        style={{ transform: "translateZ(40px)" }}
                    >
                        {hasLogo ? (
                            <div className="w-full h-full p-2 flex items-center justify-center">
                                <Image
                                    src={venture.logo as string}
                                    alt=""
                                    width={32}
                                    height={32}
                                    loading="lazy"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ) : (
                            <span
                                className="text-base font-black"
                                style={{ color: venture.color }}
                                aria-hidden="true"
                            >
                                {initial}
                            </span>
                        )}
                    </div>

                    {/* Domain pill */}
                    <div
                        className="absolute top-3 right-3 z-20 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono font-medium text-white/70 opacity-90 group-hover:text-white transition-colors"
                        style={{ transform: "translateZ(40px)" }}
                    >
                        <Globe className="w-2.5 h-2.5" />
                        <span className="truncate max-w-[120px]">{display}</span>
                    </div>

                    {/* Hover external-link arrow */}
                    <div
                        className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300"
                        style={{ transform: "translateZ(40px)" }}
                    >
                        <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                </div>

                {/* Body */}
                <div
                    className="p-5 sm:p-6 flex flex-col flex-1"
                    style={{ transform: "translateZ(15px)" }}
                >
                    <h3 className="text-lg font-semibold tracking-tight text-white mb-2 group-hover:text-[var(--color-electric-blue)] transition-colors">
                        {venture.title}
                    </h3>
                    <p className="text-[13px] text-white/60 leading-relaxed font-light flex-1">
                        {venture.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                        <span className="font-mono text-white/40">{display}</span>
                        <span className="inline-flex items-center gap-1 font-semibold text-[var(--color-electric-blue)] group-hover:gap-1.5 transition-all">
                            Visit site <ArrowUpRight className="w-3 h-3" />
                        </span>
                    </div>
                </div>

                {/* Color accent line */}
                <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${venture.color}, transparent)`,
                    }}
                />
            </article>
        </a>
    );
}

export default function Ventures() {
    return (
        <section id="ventures" className="section-y relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Intro column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5 lg:sticky lg:top-32"
                    >
                        <span className="kicker mb-5">
                            <span className="kicker-dot" />
                            Selected Work
                        </span>
                        <h2 className="heading-display mb-6">
                            Sites &amp; products{" "}
                            <span className="heading-accent">shipped to the world.</span>
                        </h2>
                        <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed font-light mb-8">
                            A selection of live websites and platforms designed, engineered,
                            and operated end-to-end — spanning marketplaces, AI studios,
                            commerce, and consumer brands.
                        </p>

                        <ul className="space-y-3">
                            {ventureBulletPoints.map((point, i) => (
                                <motion.li
                                    key={point}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                                    className="flex items-start gap-3 text-sm sm:text-base"
                                >
                                    <span className="shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-electric-blue)]/15 text-[var(--color-electric-blue)]">
                                        <Check className="w-3 h-3" />
                                    </span>
                                    <span className="text-white/80 leading-relaxed">
                                        {point}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Cards grid */}
                    <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 sm:gap-5">
                        {ventures.map((venture, i) => (
                            <motion.div
                                key={venture.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: i * 0.06 }}
                            >
                                <TiltCard maxTilt={6}>
                                    <VentureCard venture={venture} />
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
