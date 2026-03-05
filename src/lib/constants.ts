/**
 * Shared animation presets and configuration constants.
 * Prevents duplication of easing curves and viewport settings across components.
 */
import type { Variants } from "framer-motion";

/** Shared fluid easing curve used throughout the portfolio */
export const FLUID_EASE = [0.23, 1, 0.32, 1] as const;

/** Default viewport trigger configuration for scroll animations */
export const DEFAULT_VIEWPORT = { once: true, margin: "-100px" } as const;

/** Standard section fade-in animation (slide up + fade) */
export const sectionFadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: DEFAULT_VIEWPORT,
    transition: { duration: 1, ease: FLUID_EASE },
} as const;

/** Slide-in from left animation */
export const slideInLeft = {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: DEFAULT_VIEWPORT,
    transition: { duration: 1, ease: FLUID_EASE },
} as const;

/** Slide-in from right animation */
export const slideInRight = {
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: DEFAULT_VIEWPORT,
    transition: { duration: 1, ease: FLUID_EASE, delay: 0.2 },
} as const;

/** Staggered container variants for list animations */
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

/** Spring-based child item variants for list animations */
export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
};

/** Fast stagger variants (used for certification badges, etc.) */
export const fastStaggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
};

/** Snappy spring item variants */
export const fastStaggerItem: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 400, damping: 20 },
    },
};

/** Contact form validation rules */
export const VALIDATION = {
    NAME_MIN_LENGTH: 3,
    SUBJECT_MIN_LENGTH: 3,
    MESSAGE_MIN_LENGTH: 11,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

/** Site metadata constants */
export const SITE = {
    URL: "https://abdullahmirza.com",
    NAME: "Abdullah Mirza Portfolio",
    TITLE: "Abdullah Mirza | Entrepreneur | AI Platform Builder | Logistics & E-Commerce Executive",
    DESCRIPTION: "Founder-operator portfolio of Abdullah Mirza: AI-driven platform architect, logistics and supply chain executive, and Vision 2030-aligned entrepreneur in Riyadh, Saudi Arabia.",
} as const;
