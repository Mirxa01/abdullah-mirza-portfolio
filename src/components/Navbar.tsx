"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import PrintButton from "./PrintButton";
import { buildWhatsappLink, navLinks, WHATSAPP_DISPLAY } from "@/lib/data";

/** Lightweight scroll-spy: tracks which section is currently in viewport. */
function useActiveSection(ids: string[]): string | null {
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible) setActive(`#${visible.target.id}`);
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
        );
        ids.forEach((id) => {
            const el = document.querySelector(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [ids]);

    return active;
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const activeHref = useActiveSection(navLinks.map((l) => l.href));

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 24);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 print:static print:bg-white ${
                scrolled ? "py-3" : "py-5"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={`relative flex items-center justify-between rounded-full transition-all duration-300 ${
                        scrolled
                            ? "bg-black/70 backdrop-blur-xl border border-white/[0.08] px-3 sm:px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                            : "bg-transparent border border-transparent px-2 sm:px-4 py-2"
                    } print:rounded-none print:border-0 print:bg-white print:px-0`}
                >
                    {/* Brand */}
                    <a
                        href="#hero"
                        className="flex items-center gap-2.5 group"
                        aria-label="Abdullah Mirza — home"
                    >
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-[var(--color-electric-blue)] to-purple-600 flex items-center justify-center text-white font-black text-base italic group-hover:scale-105 transition-transform print:bg-black print:from-black print:to-black">
                            A
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-sm font-black tracking-tight text-white print:text-black">
                                Abdullah Mirza
                            </span>
                            <span className="text-[9px] tracking-[0.2em] uppercase text-white/40 mt-0.5 print:text-gray-500">
                                Founder · Engineer
                            </span>
                        </div>
                    </a>

                    {/* Desktop nav */}
                    <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((link) => {
                            const isActive = activeHref === link.href;
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`relative px-3 py-1.5 text-[12px] font-semibold tracking-wide transition-colors print:hidden ${
                                        isActive
                                            ? "text-white"
                                            : "text-white/55 hover:text-white"
                                    }`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-active-pill"
                                            className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.06]"
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                </a>
                            );
                        })}
                    </div>

                    {/* Desktop CTAs */}
                    <div className="hidden lg:flex items-center gap-2">
                        <PrintButton />
                        <a
                            href={buildWhatsappLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-400/60 text-emerald-300 transition-all print:hidden"
                            title={`WhatsApp Abdullah · ${WHATSAPP_DISPLAY}`}
                            aria-label="WhatsApp Abdullah"
                        >
                            <MessageCircle className="w-4 h-4" />
                        </a>
                        <a
                            href="#contact"
                            className="btn btn-primary !py-2 !px-4 !text-xs print:hidden"
                        >
                            Contact
                        </a>
                    </div>

                    {/* Mobile right cluster */}
                    <div className="flex items-center gap-1.5 lg:hidden">
                        <a
                            href={buildWhatsappLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 print:hidden"
                            aria-label="WhatsApp Abdullah"
                        >
                            <MessageCircle className="w-4 h-4" />
                        </a>
                        <PrintButton />
                        <button
                            type="button"
                            className="text-white p-1.5 rounded-md hover:bg-white/5 transition-colors print:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={
                                mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
                            }
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {mobileMenuOpen ? (
                                    <motion.span
                                        key="x"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.18 }}
                                        className="block"
                                    >
                                        <X size={22} />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.18 }}
                                        className="block"
                                    >
                                        <Menu size={22} />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile sheet */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="lg:hidden fixed inset-0 top-0 bg-black/60 backdrop-blur-sm z-40 print:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.div
                            key="sheet"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                            className="lg:hidden absolute top-full left-3 right-3 mt-2 z-50 rounded-2xl bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden print:hidden"
                        >
                            <ul className="py-2">
                                {navLinks.map((link) => {
                                    const isActive = activeHref === link.href;
                                    return (
                                        <li key={link.name}>
                                            <a
                                                href={link.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`flex items-center justify-between px-5 py-3 text-sm font-semibold transition-colors ${
                                                    isActive
                                                        ? "text-white bg-white/[0.04]"
                                                        : "text-white/70 hover:text-white hover:bg-white/[0.03]"
                                                }`}
                                            >
                                                <span>{link.name}</span>
                                                {isActive && (
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-electric-blue)] shadow-[0_0_8px_rgba(0,102,255,0.6)]" />
                                                )}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="border-t border-white/[0.06] p-3 grid grid-cols-2 gap-2">
                                <a
                                    href="#contact"
                                    className="btn btn-primary !py-2.5 !text-xs"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Contact
                                </a>
                                <a
                                    href={buildWhatsappLink()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-whatsapp !py-2.5 !text-xs"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                    WhatsApp
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
