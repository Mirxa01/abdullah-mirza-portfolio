"use client";

import { motion } from "framer-motion";

interface InteractiveButtonProps {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
    as?: "button" | "a";
    href?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export default function InteractiveButton({
    children,
    onClick,
    className = "",
    as = "button",
    href,
    type = "button",
    disabled = false
}: InteractiveButtonProps) {
    const commonProps = {
        onClick,
        className: `focus:outline-none transition-shadow ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
        style: { display: "inline-block" }
    };

    const motionProps = {
        whileHover: disabled ? {} : { scale: 1.02, y: -2 },
        whileTap: disabled ? {} : { scale: 0.95, y: 0 },
        transition: { type: "spring" as const, stiffness: 400, damping: 15 }
    };

    if (as === "a" && href) {
        return (
            <motion.a href={href} {...commonProps} {...motionProps}>
                {children}
            </motion.a>
        );
    }

    return (
        <motion.button type={type} disabled={disabled} {...commonProps} {...motionProps}>
            {children}
        </motion.button>
    );
}
