"use client";

import { motion } from "framer-motion";
import {
    Globe,
    Layers,
    Smartphone,
    Sparkles,
    Zap,
    ShoppingCart,
    Rocket,
    ArrowRight,
    Check,
    type LucideIcon,
} from "lucide-react";
import { services, SAR_PER_USD } from "@/lib/data";
import type { Service } from "@/lib/types";

const ICON_MAP: Record<string, LucideIcon> = {
    Globe,
    Layers,
    Smartphone,
    Sparkles,
    Zap,
    ShoppingCart,
    Rocket,
};

const formatUsd = (n: number) =>
    `$${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`;
const formatSar = (n: number) =>
    `SAR ${(n / 1000).toFixed(0)}K`;

function ServiceCard({ service, index }: { service: Service; index: number }) {
    const Icon = ICON_MAP[service.icon] ?? Layers;
    const minPrice = Math.min(...service.tiers.map((t) => t.usdMin));
    const maxPrice = Math.max(...service.tiers.map((t) => t.usdMax));
    const minWeeks = Math.min(...service.tiers.map((t) => t.weeksMin));
    const maxWeeks = Math.max(...service.tiers.map((t) => t.weeksMax));

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.04 }}
            className="surface surface-hover relative group h-full flex flex-col p-6 overflow-hidden"
        >
            {/* Color glow accent */}
            <div
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
                style={{ background: service.color }}
                aria-hidden="true"
            />

            {/* Header */}
            <div className="flex items-start gap-3.5 mb-4 relative z-10">
                <div
                    className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center border border-white/10"
                    style={{
                        background: `${service.color}15`,
                        color: service.color,
                    }}
                >
                    <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-semibold text-white tracking-tight leading-snug">
                        {service.title}
                    </h3>
                    <p className="text-[11px] text-white/45 mt-0.5">{service.tagline}</p>
                </div>
            </div>

            <p className="text-[13px] text-white/65 leading-relaxed mb-5 relative z-10">
                {service.description}
            </p>

            {/* Pricing summary */}
            <div className="grid grid-cols-2 gap-2 mb-5 relative z-10">
                <div className="rounded-xl border border-white/[0.06] bg-black/30 p-3">
                    <div className="text-[9px] font-bold tracking-widest text-white/40 uppercase mb-1">
                        USD
                    </div>
                    <div className="text-sm font-bold text-white tabular-nums">
                        {formatUsd(minPrice)}{" "}
                        <span className="text-white/40 font-normal">–</span>{" "}
                        {formatUsd(maxPrice)}
                    </div>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-black/30 p-3">
                    <div className="text-[9px] font-bold tracking-widest text-white/40 uppercase mb-1">
                        SAR
                    </div>
                    <div className="text-sm font-bold text-white tabular-nums">
                        {formatSar(minPrice * SAR_PER_USD)}{" "}
                        <span className="text-white/40 font-normal">–</span>{" "}
                        {formatSar(maxPrice * SAR_PER_USD)}
                    </div>
                </div>
            </div>

            {/* Tiers */}
            <div className="space-y-1.5 mb-5 relative z-10 flex-1">
                {service.tiers.map((tier) => (
                    <div
                        key={tier.name}
                        className="flex items-center justify-between gap-2 text-[12px]"
                    >
                        <div className="flex items-center gap-2 min-w-0">
                            <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span className="font-semibold text-white/90">{tier.name}</span>
                            <span className="text-white/40 truncate hidden sm:inline">
                                {tier.description}
                            </span>
                        </div>
                        <span className="text-white/55 font-mono tabular-nums shrink-0">
                            {formatUsd(tier.usdMin)}+
                        </span>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.06] relative z-10">
                <span className="text-[11px] text-white/45">
                    {minWeeks}–{maxWeeks} weeks
                </span>
                <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-electric-blue)] hover:gap-1.5 transition-all"
                >
                    Get a quote <ArrowRight className="w-3 h-3" />
                </a>
            </div>
        </motion.article>
    );
}

export default function Services() {
    return (
        <section
            id="services"
            className="section-y relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                <div className="mb-12 sm:mb-16 max-w-3xl">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="kicker mb-5"
                    >
                        <span className="kicker-dot" />
                        Services &amp; Pricing
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="heading-display mb-5"
                    >
                        Transparent pricing.{" "}
                        <span className="heading-accent">Built for outcomes.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed font-light"
                    >
                        Indicative ranges in USD and SAR for every service. Final scope is
                        confirmed during a discovery call. Need a precise quote?{" "}
                        <span className="text-[var(--color-muted-gold)] font-semibold">
                            Chat with Aria
                        </span>{" "}
                        — the AI assistant in the corner.
                    </motion.p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {services.map((service, i) => (
                        <ServiceCard key={service.id} service={service} index={i} />
                    ))}
                </div>

                <p className="mt-10 text-center text-xs text-white/40">
                    Currency conversion at SAR {SAR_PER_USD} per USD (indicative)
                </p>
            </div>
        </section>
    );
}
