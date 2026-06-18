/**
 * Unit tests for the deterministic pricing engine.
 * Verifies determinism, tier resolution, feature/timeline/locale multipliers,
 * SAR conversion, and currency formatting.
 */
import { describe, it, expect } from "vitest";
import { computeQuote, formatSar, formatUsd } from "../chat/pricing";
import { SAR_PER_USD, services } from "../data";
import type { ProjectBrief } from "../chat/types";

describe("computeQuote — determinism", () => {
    it("produces identical output for identical input", () => {
        const brief: ProjectBrief = {
            projectType: "web_app",
            complexity: "Standard",
            features: ["auth", "payments", "dashboard"],
        };
        expect(computeQuote(brief)).toEqual(computeQuote(brief));
    });
});

describe("computeQuote — defaults", () => {
    it("defaults to web_app when no project type is given", () => {
        const quote = computeQuote({});
        expect(quote.projectType).toBe("web_app");
        expect(quote.serviceTitle).toBe("Web Applications");
    });

    it("infers complexity from feature count when not specified", () => {
        expect(computeQuote({ projectType: "web_app", features: [] }).complexity).toBe("MVP");
        expect(
            computeQuote({
                projectType: "web_app",
                features: ["a", "b", "c", "d"],
            }).complexity,
        ).toBe("Standard");
        expect(
            computeQuote({
                projectType: "web_app",
                features: ["a", "b", "c", "d", "e", "f", "g", "h"],
            }).complexity,
        ).toBe("Enterprise");
    });
});

describe("computeQuote — base tier pricing", () => {
    it("uses the catalog base range for a tier with no modifiers", () => {
        const landingMvp = services.find((s) => s.id === "landing")!.tiers.find((t) => t.name === "MVP")!;
        const quote = computeQuote({ projectType: "landing", complexity: "MVP" });
        expect(quote.usd.min).toBe(landingMvp.usdMin);
        expect(quote.usd.max).toBe(landingMvp.usdMax);
        expect(quote.weeks.min).toBe(landingMvp.weeksMin);
        expect(quote.weeks.max).toBe(landingMvp.weeksMax);
    });
});

describe("computeQuote — multipliers", () => {
    it("adds cost for detected features", () => {
        const base = computeQuote({ projectType: "web_app", complexity: "MVP", features: [] });
        const withPayments = computeQuote({
            projectType: "web_app",
            complexity: "MVP",
            features: ["Stripe payments and billing"],
        });
        expect(withPayments.usd.max).toBeGreaterThan(base.usd.max);
        expect(withPayments.breakdown.some((b) => /Payments/i.test(b.label))).toBe(true);
    });

    it("applies a rush premium and compresses the timeline for ASAP", () => {
        const normal = computeQuote({ projectType: "web_app", complexity: "Standard" });
        const rushed = computeQuote({
            projectType: "web_app",
            complexity: "Standard",
            timeline: "ASAP",
        });
        expect(rushed.usd.max).toBeGreaterThan(normal.usd.max);
        expect(rushed.weeks.max).toBeLessThan(normal.weeks.max);
        expect(rushed.breakdown.some((b) => /Rush/i.test(b.label))).toBe(true);
    });

    it("applies a multi-language premium when more than one language is set", () => {
        const single = computeQuote({
            projectType: "landing",
            complexity: "Standard",
            languages: ["English"],
        });
        const multi = computeQuote({
            projectType: "landing",
            complexity: "Standard",
            languages: ["English", "Arabic"],
        });
        expect(multi.usd.max).toBeGreaterThan(single.usd.max);
    });

    it("applies a white-label premium", () => {
        const base = computeQuote({ projectType: "saas", complexity: "Standard" });
        const wl = computeQuote({ projectType: "saas", complexity: "Standard", whiteLabel: true });
        expect(wl.usd.max).toBeGreaterThan(base.usd.max);
    });
});

describe("computeQuote — currency + rounding", () => {
    it("rounds USD to the nearest hundred", () => {
        const quote = computeQuote({
            projectType: "web_app",
            complexity: "Standard",
            features: ["auth", "payments", "ai"],
            timeline: "ASAP",
        });
        expect(quote.usd.min % 100).toBe(0);
        expect(quote.usd.max % 100).toBe(0);
    });

    it("derives SAR from USD at the configured rate (within rounding)", () => {
        const quote = computeQuote({ projectType: "landing", complexity: "MVP" });
        expect(Math.abs(quote.sar.max - quote.usd.max * SAR_PER_USD)).toBeLessThanOrEqual(100);
    });

    it("always yields min <= max", () => {
        for (const service of services) {
            for (const tier of service.tiers) {
                const q = computeQuote({ projectType: service.id, complexity: tier.name });
                expect(q.usd.min).toBeLessThanOrEqual(q.usd.max);
                expect(q.weeks.min).toBeLessThanOrEqual(q.weeks.max);
            }
        }
    });
});

describe("currency formatters", () => {
    it("formats USD with a leading symbol and thousands separators", () => {
        expect(formatUsd(12000)).toBe("$12,000");
    });
    it("formats SAR with a prefix and thousands separators", () => {
        expect(formatSar(45000)).toBe("SAR 45,000");
    });
});
