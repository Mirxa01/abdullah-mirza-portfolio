"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Spring physics for smooth trailing effect
    const springX = useSpring(0, { stiffness: 500, damping: 28 });
    const springY = useSpring(0, { stiffness: 500, damping: 28 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            springX.set(e.clientX);
            springY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over clickable elements
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [springX, springY]);

    // Don't render on entirely touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            {/* Core exact cursor dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-[var(--color-electric-blue)] rounded-full pointer-events-none z-[9999] mix-blend-screen"
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
                className="fixed top-0 left-0 w-8 h-8 border border-[var(--color-electric-blue)]/50 bg-[var(--color-electric-blue)]/5 rounded-full pointer-events-none z-[9998] shadow-[0_0_10px_rgba(0,102,255,0.3)] backdrop-invert transition-all flex items-center justify-center"
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
                className="fixed top-0 left-0 w-64 h-64 bg-[var(--color-electric-blue)]/10 blur-3xl rounded-full pointer-events-none z-[9997]"
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
