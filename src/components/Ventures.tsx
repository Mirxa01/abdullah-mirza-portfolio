"use client";

import { motion } from "framer-motion";
import { ArrowRight, Milestone } from "lucide-react";
import Image from "next/image";
import TiltCard from "./TiltCard";

const ventures = [
    {
        title: "SourceKom",
        description: "Enterprise-grade asset booking & exchange platform connecting industrial suppliers with procurement teams across Saudi Arabia.",
        logo: "/logos/sourcekom.png",
        color: "var(--color-electric-blue)",
        image: "/generated_images/venture-sourcekom.png"
    },
    {
        title: "HabibiStay",
        description: "AI-enhanced hospitality marketplace transforming short-term rentals in KSA. Powered by SARA — an intelligent booking concierge.",
        logo: "/logos/habibistay.webp",
        color: "var(--color-muted-gold)",
        image: "/generated_images/venture-habibistay.png"
    },
    {
        title: "Arabclue",
        description: "AI-powered digital intelligence engine turning regional market data into actionable business insights.",
        logo: "/logos/arabclue.png",
        color: "#a855f7",
        image: "/generated_images/venture-arabclue.png"
    },
    {
        title: "DaddysCart",
        description: "Full-stack e-commerce venture engineering next-generation digital retail experiences for the Saudi consumer.",
        logo: "/logos/daddyscart.png",
        color: "#34d399",
        image: "/generated_images/venture-daddyscart.png"
    }
];

const bulletPoints = [
    "Engineering scalable Apps, Websites & SaaS platforms",
    "Integrating AI to unlock operational efficiency",
    "Automating workflows to reduce manual overhead",
    "Full product lifecycle — from ideation to deployment"
];

export default function Ventures() {
    return (
        <section id="ventures" className="py-24 sm:py-32 relative overflow-hidden transition-colors duration-500 hover:bg-white/[0.02]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1 }}
                        className="lg:col-span-5"
                    >
                        <div className="flex items-center gap-3 mb-6 text-[var(--color-electric-blue)]">
                            <Milestone className="w-5 h-5" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase">Venture Portfolio</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8">
                            Developer & <br />
                            <span className="animated-gradient drop-shadow-[0_0_10px_rgba(0,102,255,0.3)]">Solutions Architect</span>
                        </h2>

                        <p className="text-[var(--color-text-muted)] text-base sm:text-lg mb-10 leading-relaxed font-light">
                            Building custom software that solves real business challenges — from high-performance apps and websites to sophisticated AI integrations and zero-touch automated workflows.
                        </p>

                        <div className="space-y-4">
                            {bulletPoints.map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    className="flex items-center gap-4 text-gray-200 border-l border-white/5 pl-5 group hover:border-[var(--color-electric-blue)] transition-colors py-1"
                                >
                                    <ArrowRight className="w-4 h-4 text-[var(--color-electric-blue)] group-hover:translate-x-1 transition-transform" />
                                    <span className="text-sm font-medium">{point}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {ventures.map((venture, i) => (
                            <motion.div
                                key={venture.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <TiltCard maxTilt={12}>
                                    <div className="glass-card rounded-2xl group transition-all duration-500 overflow-hidden relative glow-border h-full">
                                        {/* Background image with overlay */}
                                        <div className="h-32 sm:h-36 w-full relative overflow-hidden" style={{ transform: "translateZ(30px)" }}>
                                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500 z-10" />
                                            <Image
                                                src={venture.image}
                                                alt={`${venture.title} background`}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
                                                loading="lazy"
                                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                            />
                                            {/* Logo badge */}
                                            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500 overflow-hidden p-1 sm:p-1.5" style={{ transform: "translateZ(50px)" }}>
                                                <Image
                                                    src={venture.logo}
                                                    alt={`${venture.title} logo`}
                                                    width={40}
                                                    height={40}
                                                    loading="lazy"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        </div>
                                        {/* Content */}
                                        <div className="p-4 sm:p-6 relative z-10 bg-black/40 backdrop-blur-sm" style={{ transform: "translateZ(20px)" }}>
                                            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 tracking-tight group-hover:text-[var(--color-electric-blue)] transition-colors text-white">{venture.title}</h3>
                                            <p className="text-[var(--color-text-muted)] text-xs sm:text-sm leading-relaxed font-light">{venture.description}</p>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
