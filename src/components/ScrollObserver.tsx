"use client";

import { useEffect } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export function ScrollObserver() {
    const { scrollYProgress } = useScroll();

    // The dark color mapped at the top of the page
    const startColor = "#050505";
    // Increase brightness significantly - a rich, elevated state-blue charcoal
    const endColor = "#1e293b";

    const backgroundTransform = useTransform(
        scrollYProgress,
        [0, 1],
        [startColor, endColor]
    );

    useMotionValueEvent(backgroundTransform, "change", (latest) => {
        // Apply the interpolated hex code natively to the document root
        document.documentElement.style.setProperty("--bg-primary", latest);
    });

    // Cleanup on unmount, resetting to default top-page color
    useEffect(() => {
        return () => {
            document.documentElement.style.setProperty("--bg-primary", startColor);
        };
    }, []);

    // This is purely a logic component orchestrating CSS variables; returns nothing to the DOM
    return null;
}
