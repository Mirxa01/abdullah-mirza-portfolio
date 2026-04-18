/**
 * Deterministic pricing engine.
 *
 * Inputs a ProjectBrief and outputs a structured Quote with USD + SAR ranges,
 * timeline weeks, line-item breakdown, and assumptions. Used by both the
 * chat API route (as a tool the model can call) and the UI (as a fallback).
 */
import { SAR_PER_USD, services } from "../data";
import type {
    ComplexityTier,
    ProjectBrief,
    ProjectType,
    Quote,
    QuoteBreakdownItem,
} from "./types";

/** Feature multipliers — adders applied on top of the base tier price. */
const FEATURE_MULTIPLIERS: Record<string, { label: string; pct: number }> = {
    auth: { label: "Authentication & accounts", pct: 0.05 },
    payments: { label: "Payments / billing integration", pct: 0.1 },
    dashboards: { label: "Admin dashboards & analytics", pct: 0.1 },
    integrations: { label: "Third-party integrations", pct: 0.08 },
    realtime: { label: "Realtime / sockets", pct: 0.1 },
    ai: { label: "AI / LLM features", pct: 0.15 },
    notifications: { label: "Push / email notifications", pct: 0.05 },
    multitenant: { label: "Multi-tenant / workspaces", pct: 0.12 },
    sso: { label: "SSO / SAML", pct: 0.1 },
    offline: { label: "Offline mode", pct: 0.08 },
    maps: { label: "Maps / geolocation", pct: 0.06 },
    chat: { label: "In-app chat / messaging", pct: 0.1 },
    cms: { label: "CMS / content tooling", pct: 0.06 },
    api: { label: "Public API", pct: 0.08 },
};

const TIMELINE_RUSH_PCT = 0.2;
const MULTI_LANG_PCT = 0.1;
const WHITE_LABEL_PCT = 0.25;

/** Heuristic feature key extractor — matches free-text features to multipliers. */
function detectFeatureKeys(features: string[] = []): string[] {
    const text = features.join(" ").toLowerCase();
    const matched = new Set<string>();
    const map: Array<[RegExp, string]> = [
        [/\b(auth|login|sign[- ]?up|account|user)\b/, "auth"],
        [/\b(pay|payment|billing|subscription|stripe|checkout)\b/, "payments"],
        [/\b(dashboard|analytics|report|chart|metric)\b/, "dashboards"],
        [/\b(integrat|api|webhook|connector|sync)\b/, "integrations"],
        [/\b(realtime|real[- ]time|websocket|live|socket)\b/, "realtime"],
        [/\b(ai|gpt|llm|chatbot|agent|copilot|ml)\b/, "ai"],
        [/\b(notif|push|email|sms|whatsapp)\b/, "notifications"],
        [/\b(multi[- ]?tenant|workspace|organi[sz]ation)\b/, "multitenant"],
        [/\b(sso|saml|oauth|enterprise auth)\b/, "sso"],
        [/\b(offline|sync)\b/, "offline"],
        [/\b(map|location|geo|gps)\b/, "maps"],
        [/\b(chat|message|inbox|dm)\b/, "chat"],
        [/\b(cms|content|blog|editor)\b/, "cms"],
        [/\b(public api|developer api|sdk)\b/, "api"],
    ];
    for (const [re, key] of map) if (re.test(text)) matched.add(key);
    return Array.from(matched);
}

/** Resolves complexity from a brief, falling back to "Standard". */
function resolveComplexity(brief: ProjectBrief): ComplexityTier {
    if (brief.complexity) return brief.complexity;
    const featureCount = brief.features?.length ?? 0;
    if (featureCount >= 8) return "Enterprise";
    if (featureCount >= 4) return "Standard";
    return "MVP";
}

/** Round to nearest $100 for clean presentation. */
function roundUsd(n: number): number {
    return Math.round(n / 100) * 100;
}

/**
 * Compute a quote from a project brief.
 * Deterministic — same input always produces same output.
 */
export function computeQuote(brief: ProjectBrief): Quote {
    const projectType: ProjectType = brief.projectType ?? "web_app";
    const service = services.find((s) => s.id === projectType) ?? services[1];
    const complexity = resolveComplexity(brief);
    const tier =
        service.tiers.find((t) => t.name === complexity) ?? service.tiers[1];

    let usdMin = tier.usdMin;
    let usdMax = tier.usdMax;
    let weeksMin = tier.weeksMin;
    let weeksMax = tier.weeksMax;

    const breakdown: QuoteBreakdownItem[] = [
        {
            label: `${service.title} — ${tier.name}`,
            impact: `$${tier.usdMin.toLocaleString()} – $${tier.usdMax.toLocaleString()} base`,
        },
    ];

    // Feature adders
    const featureKeys = detectFeatureKeys(brief.features);
    for (const key of featureKeys) {
        const m = FEATURE_MULTIPLIERS[key];
        if (!m) continue;
        const deltaMin = usdMin * m.pct;
        const deltaMax = usdMax * m.pct;
        usdMin += deltaMin;
        usdMax += deltaMax;
        breakdown.push({
            label: m.label,
            impact: `+${Math.round(m.pct * 100)}%`,
            delta: deltaMax,
        });
    }

    // Timeline rush
    if (brief.timeline === "ASAP") {
        usdMin *= 1 + TIMELINE_RUSH_PCT;
        usdMax *= 1 + TIMELINE_RUSH_PCT;
        weeksMin = Math.max(1, Math.round(weeksMin * 0.7));
        weeksMax = Math.max(weeksMin + 1, Math.round(weeksMax * 0.7));
        breakdown.push({
            label: "Rush timeline (ASAP)",
            impact: `+${Math.round(TIMELINE_RUSH_PCT * 100)}%`,
        });
    }

    // Multi-language
    if ((brief.languages?.length ?? 0) > 1) {
        usdMin *= 1 + MULTI_LANG_PCT;
        usdMax *= 1 + MULTI_LANG_PCT;
        breakdown.push({
            label: `Multi-language (${brief.languages?.join(", ")})`,
            impact: `+${Math.round(MULTI_LANG_PCT * 100)}%`,
        });
    }

    // White-label
    if (brief.whiteLabel) {
        usdMin *= 1 + WHITE_LABEL_PCT;
        usdMax *= 1 + WHITE_LABEL_PCT;
        breakdown.push({
            label: "White-label / resellable",
            impact: `+${Math.round(WHITE_LABEL_PCT * 100)}%`,
        });
    }

    usdMin = roundUsd(usdMin);
    usdMax = roundUsd(usdMax);

    const sarMin = roundUsd(usdMin * SAR_PER_USD);
    const sarMax = roundUsd(usdMax * SAR_PER_USD);

    const assumptions = [
        "Estimate based on the information shared so far — final scope confirmed during discovery call.",
        "Includes design, development, QA, and one revision cycle per milestone.",
        "Hosting, third-party SaaS subscriptions, and paid APIs billed separately.",
        `SAR conversion at ${SAR_PER_USD} per USD (indicative).`,
    ];

    return {
        projectType,
        complexity,
        usd: { min: usdMin, max: usdMax },
        sar: { min: sarMin, max: sarMax },
        weeks: { min: weeksMin, max: weeksMax },
        breakdown,
        assumptions,
        serviceTitle: service.title,
    };
}

/** Format helpers used by both QuoteCard and PRD generator. */
export const formatUsd = (n: number) =>
    `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
export const formatSar = (n: number) =>
    `SAR ${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
