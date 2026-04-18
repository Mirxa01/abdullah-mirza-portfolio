/**
 * Shared TypeScript interfaces for the portfolio application.
 * Centralizes type definitions used across multiple components.
 */

/** Navigation link used in the Navbar */
export interface NavLink {
    name: string;
    href: string;
}

/** Venture/startup card data */
export interface Venture {
    title: string;
    description: string;
    /** Live website URL (used for clickable card / "Visit site" link) */
    url: string;
    /** Display label for the URL — defaults to hostname */
    domain?: string;
    color: string;
    /** Optional brand logo path; falls back to text initial when omitted */
    logo?: string;
    /** Optional cover image path; falls back to gradient hero when omitted */
    image?: string;
}

/** Career timeline entry */
export interface TimelineEvent {
    role: string;
    company: string;
    highlights: string[];
}

/** Executive leadership role */
export interface LeadershipRole {
    company: string;
    role: string;
    period: string;
    icon: React.ReactNode;
    points: string[];
}

/** Core competency item */
export interface Competency {
    name: string;
    icon: React.ReactNode;
}

/** Statistic counter displayed in the Executive Profile */
export interface Stat {
    value: number;
    prefix: string;
    suffix?: string;
    label: string;
}

/** Contact information entry */
export interface ContactInfo {
    type: "email" | "phone" | "location" | "whatsapp";
    label: string;
    value: string;
    displayValue: string;
    href?: string;
}

/** Social profile link */
export interface SocialLink {
    name: string;
    href: string;
    handle?: string;
}

/** Pricing tier for a service offering */
export interface ServiceTier {
    name: "MVP" | "Standard" | "Enterprise";
    description: string;
    usdMin: number;
    usdMax: number;
    weeksMin: number;
    weeksMax: number;
    features: string[];
}

/** Service offered by Abdullah, used by both pricing engine and Services section */
export interface Service {
    id:
        | "landing"
        | "web_app"
        | "mobile_app"
        | "ai_integration"
        | "automation"
        | "ecommerce"
        | "saas";
    title: string;
    tagline: string;
    description: string;
    icon: string; // lucide icon name
    color: string;
    tiers: ServiceTier[];
}

/** Contact form field state */
export interface ContactFormState {
    name: string;
    email: string;
    subject: string;
    message: string;
}

/** Contact form validation state */
export interface ContactFormValidation {
    name: boolean;
    email: boolean;
    subject: boolean;
    message: boolean;
}

/** API response from the contact endpoint */
export interface ContactApiResponse {
    success: boolean;
    message: string;
}
