"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    strength?: number;
}

export default function MagneticButton({ children, className = "", onClick, strength = 30 }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const controls = useAnimation();
    const prefersReducedMotion = useReducedMotion();

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReducedMotion) return;

        const { clientX, clientY } = e;
        const boundingRect = ref.current?.getBoundingClientRect();

        if (boundingRect) {
            const { width, height, left, top } = boundingRect;
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            setPosition({ x, y });
        }
    };

    const reset = () => {
        if (prefersReducedMotion) return;

        setPosition({ x: 0, y: 0 });
        controls.start({ x: 0, y: 0 });
    };

    useEffect(() => {
        if (prefersReducedMotion) return;

        const { x, y } = position;

        if (x !== 0 || y !== 0) {
            controls.start({
                x: x * (strength / 100),
                y: y * (strength / 100),
                transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 }
            });
        }
    }, [position, controls, strength]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={controls}
            onClick={onClick}
            className={`cursor-pointer ${className}`}
            style={{ display: "inline-block" }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.div>
    );
}
