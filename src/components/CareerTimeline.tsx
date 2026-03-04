"use client";

import { motion } from "framer-motion";
import { History } from "lucide-react";

const timelineEvents = [
    {
        role: "General Manager",
        company: "SafeBox",
        highlights: [
            "Spearheading regional operations, P&L ownership, and strategic growth initiatives",
            "Establishing market-entry frameworks for new service verticals"
        ]
    },
    {
        role: "Regional Operations Manager",
        company: "Safe Arrival",
        highlights: [
            "Launched a 32,000 m² automated fulfillment center in under 90 days",
            "Scaled daily order volume by 200% within the first quarter",
            "Delivered 30% YoY revenue growth through operational excellence",
            "Eliminated 75% of fulfillment backlogs via process re-engineering"
        ]
    },
    {
        role: "Operations Manager",
        company: "SLS Express",
        highlights: [
            "Managed high-volume last-mile delivery networks spanning multiple cities",
            "Introduced real-time fleet tracking and route optimization systems"
        ]
    },
    {
        role: "Operations Supervisor",
        company: "SLS Express",
        highlights: [
            "Supervised cross-dock operations with 300+ daily fleet movements",
            "Reduced average delivery time by 18% through dispatch optimization"
        ]
    },
    {
        role: "Inventory Supervisor",
        company: "Jollychic",
        highlights: [
            "Led 300+ inventory staff across large-scale e-commerce warehouse operations",
            "Maintained 99.5% inventory accuracy across 500K+ SKUs"
        ]
    },
    {
        role: "Inbound Supervisor",
        company: "Jollychic",
        highlights: [
            "Directed 170+ staff ensuring 99%+ inbound processing SLA compliance",
            "Processed 50K+ units daily during peak promotional periods"
        ]
    },
    {
        role: "Direct Sales Supervisor",
        company: "Callem Middle East",
        highlights: [
            "Built and managed high-performance B2C acquisition teams",
            "Exceeded quarterly revenue targets by 25% consistently"
        ]
    }
];

export default function CareerTimeline() {
    return (
        <section id="career-progression" className="py-32 relative bg-[var(--color-charcoal-medium)] overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="max-w-5xl mx-auto px-6 md:px-12 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                    className="mb-20 text-center"
                >
                    <div className="flex items-center justify-center gap-3 mb-6 text-[var(--color-muted-gold)]">
                        <History className="w-5 h-5" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase">Chronology of Impact</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Career <span className="animated-gradient drop-shadow-[0_0_10px_rgba(0,102,255,0.3)]">Progression</span>
                    </h2>
                </motion.div>

                <div className="relative ml-4 md:ml-12 space-y-16 py-8">
                    {/* Glowing timeline track */}
                    <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[var(--color-electric-blue)] to-transparent opacity-50 shadow-[0_0_10px_rgba(0,102,255,0.8)]"></div>

                    {timelineEvents.map((event, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="relative pl-10 md:pl-16 group"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute top-2 -left-0 w-4 h-4 rounded-full bg-[var(--color-charcoal-base)] border-2 border-white/10 group-hover:border-[var(--color-electric-blue)] group-hover:shadow-[0_0_15px_rgba(0,102,255,0.8)] transition-all duration-500 z-10 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[var(--color-electric-blue)] transition-colors duration-500"></div>
                            </div>

                            {/* Hover Glow */}
                            <div className="absolute top-0 -left-1 w-20 h-20 bg-[var(--color-electric-blue)]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-4">
                                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-shimmer transition-colors">{event.role}</h3>
                                <div className="text-[var(--color-muted-gold)] font-bold text-xs tracking-[0.2em] uppercase py-1 px-3 rounded-md bg-white/5 border border-white/5">{event.company}</div>
                            </div>

                            {event.highlights.length > 0 && (
                                <div className="grid gap-3">
                                    {event.highlights.map((highlight, j) => (
                                        <div key={j} className="flex gap-4 items-start text-gray-400 font-light leading-relaxed max-w-2xl">
                                            <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[var(--color-electric-blue)]/40 transition-colors shrink-0"></div>
                                            <span className="text-lg">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
