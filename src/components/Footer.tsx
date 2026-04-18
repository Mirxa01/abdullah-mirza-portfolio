"use client";

import Link from "next/link";
import { Linkedin, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import {
    EMAIL_ADDRESS,
    SAR_PER_USD,
    WHATSAPP_DISPLAY,
    buildWhatsappLink,
    socialLinks,
    ventures,
} from "@/lib/data";

const socialIcons: Record<string, React.ReactNode> = {
    LinkedIn: <Linkedin className="w-3.5 h-3.5" />,
    WhatsApp: <MessageCircle className="w-3.5 h-3.5" />,
    Email: <Mail className="w-3.5 h-3.5" />,
};

const navColumn = [
    { name: "Executive Profile", href: "#executive-profile" },
    { name: "Selected Work", href: "#ventures" },
    { name: "Services & Pricing", href: "#services" },
    { name: "Leadership", href: "#leadership" },
    { name: "Career", href: "#career-progression" },
    { name: "Contact", href: "#contact" },
];

export default function Footer() {
    return (
        <footer
            id="site-footer"
            className="relative bg-[var(--bg-primary)] print:hidden"
            aria-labelledby="footer-heading"
        >
            {/* Smooth color transition from Contact's surface-2 down into bg-primary */}
            <div
                aria-hidden="true"
                className="pointer-events-none h-16 -mt-16 bg-gradient-to-b from-transparent to-[var(--bg-primary)]"
            />
            {/* Hairline accent — softer than border-t */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
            />

            <h2 id="footer-heading" className="sr-only">
                Site footer
            </h2>

            <div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-14 sm:pt-16 pb-10 sm:pb-12"
                style={{
                    paddingBottom: "calc(env(safe-area-inset-bottom) + 2.5rem)",
                }}
            >
                <div className="grid gap-10 sm:gap-12 sm:grid-cols-2 lg:grid-cols-12">
                    {/* Brand */}
                    <div className="lg:col-span-5 max-w-md">
                        <Link
                            href="#hero"
                            className="inline-flex items-center gap-2.5 mb-4 group"
                            aria-label="Back to top"
                        >
                            <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--color-electric-blue)] to-purple-600 flex items-center justify-center text-white font-black text-lg italic group-hover:scale-105 transition-transform">
                                A
                            </span>
                            <span className="text-base font-black tracking-tight text-white">
                                Abdullah Mirza
                            </span>
                        </Link>
                        <p className="text-sm text-white/55 leading-relaxed font-light mb-6">
                            Founder, engineer, and operator building AI-driven platforms,
                            logistics infrastructure, and scalable commerce ecosystems from
                            Riyadh, Saudi Arabia.
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.href}
                                    target={s.href.startsWith("http") ? "_blank" : undefined}
                                    rel={
                                        s.href.startsWith("http")
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-semibold text-white/70 hover:text-white hover:border-white/25 hover:bg-white/[0.06] transition-colors"
                                    title={s.handle}
                                >
                                    {socialIcons[s.name]}
                                    {s.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns — single grid on mobile keeps the footer compact */}
                    <div className="grid grid-cols-2 gap-8 sm:contents lg:col-span-7 lg:grid lg:grid-cols-3 lg:gap-8">
                        {/* Navigate */}
                        <div>
                            <h3 className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/40 mb-4">
                                Navigate
                            </h3>
                            <ul className="space-y-2.5">
                                {navColumn.map((l) => (
                                    <li key={l.name}>
                                        <a
                                            href={l.href}
                                            className="text-sm text-white/65 hover:text-white transition-colors"
                                        >
                                            {l.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Selected Work */}
                        <div>
                            <h3 className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/40 mb-4">
                                Selected Work
                            </h3>
                            <ul className="space-y-2.5">
                                {ventures.map((v) => (
                                    <li key={v.title}>
                                        <a
                                            href={v.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-white/65 hover:text-white transition-colors inline-flex items-center gap-1 group"
                                        >
                                            <span>{v.title}</span>
                                            <ArrowUpRight className="w-3 h-3 text-white/25 group-hover:text-white/60 transition-colors" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="col-span-2 lg:col-span-1">
                            <h3 className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/40 mb-4">
                                Get in touch
                            </h3>
                            <ul className="space-y-2.5">
                                <li>
                                    <a
                                        href={`mailto:${EMAIL_ADDRESS}`}
                                        className="text-sm text-white/65 hover:text-white transition-colors break-all"
                                    >
                                        {EMAIL_ADDRESS}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={buildWhatsappLink()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-white/65 hover:text-emerald-300 transition-colors"
                                    >
                                        {WHATSAPP_DISPLAY}
                                    </a>
                                </li>
                                <li className="text-sm text-white/45 font-light">
                                    Riyadh, Saudi Arabia
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 sm:mt-14 pt-6 border-t border-white/[0.05] flex flex-col-reverse sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
                    <div className="text-[11px] sm:text-xs text-white/40 font-light">
                        © {new Date().getFullYear()} Abdullah Mirza · All rights reserved
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] sm:text-xs text-white/35 font-light">
                        <span>SAR {SAR_PER_USD} / USD (indicative)</span>
                        <span className="text-white/20" aria-hidden="true">
                            ·
                        </span>
                        <span>Built with Next.js · Tailwind · Framer Motion</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
