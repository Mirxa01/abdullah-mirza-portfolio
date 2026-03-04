"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const rafRef = useRef<number | null>(null);
    const posRef = useRef({ x: 0, y: 0 });

    // Spring physics for smooth trailing effect
    const springX = useSpring(0, { stiffness: 500, damping: 28 });
    const springY = useSpring(0, { stiffness: 500, damping: 28 });

    // Check for touch device in useEffect (SSR-safe)
    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) {
            setIsTouchDevice(true);
        }
    }, []);

    useEffect(() => {
        if (isTouchDevice) return;

        const updateMousePosition = (e: MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY };
            springX.set(e.clientX);
            springY.set(e.clientY);

            // Use rAF to batch state updates and avoid layout thrashing
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                setMousePosition({ x: posRef.current.x, y: posRef.current.y });
            });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = !!(
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button")
            );
            setIsHovering(isClickable);
        };

        window.addEventListener("mousemove", updateMousePosition, { passive: true });
        window.addEventListener("mouseover", handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [springX, springY, isTouchDevice]);

    // Don't render on touch devices
    if (isTouchDevice) return null;

    return (
        <>
            {/* Core exact cursor dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-[var(--color-electric-blue)] rounded-full pointer-events-none z-[9999] mix-blend-screen print:hidden"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    scale: isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 1,
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
            />

            {/* Trailing ring (grows when hovering over links) */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-[var(--color-electric-blue)]/50 bg-[var(--color-electric-blue)]/5 rounded-full pointer-events-none z-[9998] shadow-[0_0_10px_rgba(0,102,255,0.3)] backdrop-invert transition-all flex items-center justify-center print:hidden"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? "rgba(0,102,255,0.15)" : "rgba(0,102,255,0.05)",
                    borderColor: isHovering ? "rgba(0,102,255,0.8)" : "rgba(0,102,255,0.5)",
                }}
            />

            {/* Ambient glow following the mouse */}
            <motion.div
                className="fixed top-0 left-0 w-64 h-64 bg-[var(--color-electric-blue)]/10 blur-3xl rounded-full pointer-events-none z-[9997] print:hidden"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </>
    );
}
