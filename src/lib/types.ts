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
    logo: string;
    color: string;
    image: string;
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
    type: "email" | "phone" | "location";
    label: string;
    value: string;
    displayValue: string;
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
