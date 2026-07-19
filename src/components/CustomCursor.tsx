"use client";

import { useEffect, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";

/**
 * Custom cursor driven by motion values — no React setState on mousemove.
 * Pointer tracking must stay off the React render path so clicks (chat FAB,
 * nav, CTAs) stay within a healthy INP budget.
 */
export default function CustomCursor() {
    const [enabled, setEnabled] = useState(false);
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const isHovering = useMotionValue(0);
    const springX = useSpring(rawX, { stiffness: 600, damping: 32 });
    const springY = useSpring(rawY, { stiffness: 600, damping: 32 });

    const dotScale = useTransform(isHovering, (v) => (v ? 0 : 1));
    const dotOpacity = useTransform(isHovering, (v) => (v ? 0 : 1));
    const ringScale = useTransform(isHovering, (v) => (v ? 1.6 : 1));
    const ringBorder = useTransform(isHovering, (v) =>
        v ? "rgba(0,102,255,0.85)" : "rgba(0,102,255,0.4)",
    );

    useEffect(() => {
        if (typeof window === "undefined") return;
        const isCoarse = window.matchMedia("(pointer: coarse)").matches;
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (isCoarse || prefersReduced) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot capability gate
        setEnabled(true);

        const onMove = (e: MouseEvent) => {
            rawX.set(e.clientX);
            rawY.set(e.clientY);
        };

        const onOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;
            const clickable = !!(
                target.closest("a") ||
                target.closest("button") ||
                target.closest("[role='button']")
            );
            isHovering.set(clickable ? 1 : 0);
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseover", onOver, { passive: true });
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
        };
    }, [rawX, rawY, isHovering]);

    if (!enabled) return null;

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-[var(--color-electric-blue)] rounded-full pointer-events-none z-[9999] mix-blend-screen print:hidden"
                style={{
                    x: rawX,
                    y: rawY,
                    translateX: "-50%",
                    translateY: "-50%",
                    scale: dotScale,
                    opacity: dotOpacity,
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-[var(--color-electric-blue)]/40 bg-transparent rounded-full pointer-events-none z-[9998] print:hidden"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    scale: ringScale,
                    borderColor: ringBorder,
                }}
            />
        </>
    );
}
