/**
 * Reusable section primitives — enforce consistent spacing, max-width,
 * and header layout across every section. Replaces the ad-hoc kicker
 * + heading pattern that was duplicated in every section component.
 */
import type { ReactNode } from "react";

interface SectionProps {
    id?: string;
    children: ReactNode;
    className?: string;
    maxWidth?: "default" | "narrow" | "wide";
    bg?: "default" | "subtle";
}

const MAX_WIDTHS = {
    narrow: "max-w-4xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
} as const;

export function Section({
    id,
    children,
    className = "",
    maxWidth = "default",
    bg = "default",
}: SectionProps) {
    return (
        <section
            id={id}
            className={`section-y relative overflow-hidden ${
                bg === "subtle" ? "bg-[var(--color-surface-2)]" : ""
            } ${className}`}
        >
            <div
                className={`mx-auto px-4 sm:px-6 lg:px-12 relative z-10 ${MAX_WIDTHS[maxWidth]}`}
            >
                {children}
            </div>
        </section>
    );
}

interface SectionHeaderProps {
    eyebrow: string;
    title: ReactNode;
    description?: ReactNode;
    align?: "left" | "center";
    className?: string;
}

/**
 * Standardized section header — kicker pill + display heading + optional lede.
 * Used at the top of every section for visual consistency.
 */
export function SectionHeader({
    eyebrow,
    title,
    description,
    align = "left",
    className = "",
}: SectionHeaderProps) {
    return (
        <div
            className={`mb-12 sm:mb-16 ${
                align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl"
            } ${className}`}
        >
            <span
                className={`kicker mb-5 ${align === "center" ? "mx-auto" : ""}`}
                style={{ display: align === "center" ? "inline-flex" : "inline-flex" }}
            >
                <span className="kicker-dot" />
                {eyebrow}
            </span>
            <h2 className="heading-display mt-4">{title}</h2>
            {description && (
                <p className="mt-5 text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed font-light">
                    {description}
                </p>
            )}
        </div>
    );
}
