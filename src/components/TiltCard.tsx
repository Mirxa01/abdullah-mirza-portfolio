"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    maxTilt?: number;
}

export default function TiltCard({ children, className = "", maxTilt = 15 }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    // Spring configuration for smooth physics
    const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
    const rotateX = useSpring(0, springConfig);
    const rotateY = useSpring(0, springConfig);
    const scale = useSpring(1, springConfig);
    const shimmerPosition = useSpring(-100, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        // Calculate cursor position relative to card center (normalized from -1 to 1)
        const xPercent = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const yPercent = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

        // Apply tilt (inverted so it tilts toward the mouse)
        rotateX.set(yPercent * -maxTilt);
        rotateY.set(xPercent * maxTilt);

        // Move shimmer effect based on mouse X position
        shimmerPosition.set(xPercent * 100);
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
        scale.set(1.02); // Slight pop forward on hover
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        rotateX.set(0);
        rotateY.set(0);
        scale.set(1);
        shimmerPosition.set(-100);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
            }}
            className={`relative w-full h-full ${className}`}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    scale,
                    transformStyle: "preserve-3d",
                }}
                className="w-full h-full relative rounded-2xl"
            >
                {/* Hardware acceleration force */}
                <div style={{ transform: "translateZ(0)" }} className="absolute inset-0">
                    {children}
                </div>

                {/* 3D Shimmer Overlay */}
                <motion.div
                    className="pointer-events-none absolute inset-0 z-50 rounded-2xl overflow-hidden"
                    style={{ transform: "translateZ(1px)" }}
                >
                    <motion.div
                        className="absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
                        style={{ x: shimmerPosition }}
                        animate={{ opacity: isHovering ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
