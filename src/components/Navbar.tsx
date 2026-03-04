"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Profile", href: "#executive-profile" },
        { name: "Ventures", href: "#ventures" },
        { name: "Leadership", href: "#leadership" },
        { name: "Expertise", href: "#competencies" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-4 md:py-6" : "py-6 md:py-8"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                <div className={`transition-all duration-500 rounded-full px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-between relative ${scrolled ? "bg-black/80 backdrop-blur-xl shadow-2xl glow-border" : "bg-transparent"}`}>

                    {/* Brand */}
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-electric-blue)] flex items-center justify-center text-white font-black text-xl italic group-hover:scale-110 transition-transform">A</div>
                        <span className="text-xl font-black tracking-tighter text-white uppercase italic">Abdullah <span className="text-[var(--color-electric-blue)] group-hover:text-white transition-colors">Mirza</span></span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 lg:gap-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-bold tracking-widest uppercase text-white/60 hover:text-white transition-all relative group hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            >
                                {link.name}
                                <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-muted-gold)] transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className="bg-white text-black text-xs font-black tracking-[0.2em] uppercase px-6 lg:px-8 py-3 rounded-full hover:bg-transparent hover:text-white border-2 border-transparent hover:border-white transition-all transform hover:scale-105 active:scale-95"
                        >
                            Contact
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 py-10 px-6 md:hidden flex flex-col items-center gap-8"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-2xl font-bold text-white/80 hover:text-white hover:scale-105 transition-all w-full text-center py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className="mt-4 bg-white text-black text-sm font-black tracking-[0.2em] uppercase px-10 py-4 rounded-full w-full max-w-[200px] text-center"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
