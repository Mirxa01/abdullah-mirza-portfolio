/**
 * PRD (Product Requirements Document) generator.
 *
 * Assembles a structured markdown PRD from a ProjectBrief + Quote, suitable
 * for downloading as a .md file or copy/pasting into Notion/Docs.
 */
import { buildWhatsappLink, services, WHATSAPP_DISPLAY } from "../data";
import { formatSar, formatUsd } from "./pricing";
import type { PRDPayload, ProjectBrief, Quote } from "./types";

const slug = (s: string) =>
    s
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 60);

/** Recommend a tech stack heuristically based on project type. */
function recommendStack(projectType: ProjectBrief["projectType"]): string[] {
    switch (projectType) {
        case "landing":
            return ["Next.js 16", "Tailwind CSS 4", "Vercel", "Sanity CMS (optional)"];
        case "web_app":
            return [
                "Next.js 16 (App Router)",
                "TypeScript",
                "Tailwind + shadcn/ui",
                "Supabase / Postgres",
                "Stripe billing",
                "Vercel hosting",
            ];
        case "mobile_app":
            return [
                "React Native + Expo",
                "TypeScript",
                "Supabase / Firebase",
                "RevenueCat (IAP)",
                "Sentry monitoring",
            ];
        case "ai_integration":
            return [
                "OpenAI / Anthropic",
                "Vercel AI SDK",
                "Pinecone or pgvector",
                "Edge functions",
                "LangSmith / evals",
            ];
        case "automation":
            return [
                "n8n (self-hosted)",
                "Make.com",
                "Custom Node.js scripts",
                "Webhooks + queues",
            ];
        case "ecommerce":
            return [
                "Shopify Hydrogen / Next.js commerce",
                "Stripe / Mada / Tabby",
                "Algolia search",
                "Klaviyo email",
            ];
        case "saas":
            return [
                "Next.js 16",
                "Postgres (Neon / Supabase)",
                "Stripe billing",
                "Clerk / Auth.js",
                "Vercel + edge",
            ];
        default:
            return ["Next.js 16", "TypeScript", "Tailwind CSS"];
    }
}

/** Generate a PRD markdown + short summary suitable for WhatsApp. */
export function generatePRD(brief: ProjectBrief, quote: Quote): PRDPayload {
    const service =
        services.find((s) => s.id === (brief.projectType ?? "web_app")) ?? services[1];
    const title = brief.title?.trim() || `${service.title} Project`;
    const today = new Date().toISOString().split("T")[0];
    const filename = `PRD-${slug(title)}-${today}.md`;

    const features =
        brief.features && brief.features.length > 0
            ? brief.features
            : ["Core flows defined during discovery"];
    const integrations =
        brief.integrations && brief.integrations.length > 0
            ? brief.integrations
            : ["TBD during discovery"];
    const stack = recommendStack(brief.projectType);

    const milestoneWeeks = Math.max(2, Math.round(quote.weeks.max / 4));
    const milestones = [
        { name: "Discovery & Design", week: Math.max(1, Math.round(milestoneWeeks * 0.5)) },
        { name: "Build — Phase 1 (Core)", week: milestoneWeeks * 2 },
        { name: "Build — Phase 2 (Integrations)", week: milestoneWeeks * 3 },
        { name: "QA, Launch & Handover", week: quote.weeks.max },
    ];

    const investmentLine = `${formatUsd(quote.usd.min)} – ${formatUsd(quote.usd.max)} (${formatSar(quote.sar.min)} – ${formatSar(quote.sar.max)})`;

    const markdown = `# ${title}

> Product Requirements Document — generated ${today}
> Prepared by **Abdullah Mirza** · [WhatsApp](${buildWhatsappLink(`Hi Abdullah, I'd like to discuss the ${title} project.`)}) · ${WHATSAPP_DISPLAY}

---

## 1. Executive Summary

${brief.summary?.trim() || `A ${service.title.toLowerCase()} project (${quote.complexity} tier) engineered for measurable impact. This PRD outlines the goals, scope, and investment required to ship a production-grade solution.`}

**Project type:** ${service.title}
**Complexity tier:** ${quote.complexity}
**Estimated timeline:** ${quote.weeks.min}–${quote.weeks.max} weeks
**Investment range:** ${investmentLine}

---

## 2. Goals & Outcomes

- Deliver a production-ready ${service.title.toLowerCase()} aligned with business objectives
- Optimize for measurable outcomes (conversion, efficiency, revenue, retention)
- Establish a foundation that scales with the business
${brief.notes ? `- ${brief.notes}` : ""}

---

## 3. Target Users

${brief.targetUsers?.trim() || "Primary persona to be confirmed during discovery — typically end-users, internal operators, and admin stakeholders."}

---

## 4. Core Features

${features.map((f) => `- ${f}`).join("\n")}

---

## 5. Integrations

${integrations.map((i) => `- ${i}`).join("\n")}

---

## 6. Non-Functional Requirements

- **Performance:** Sub-200ms p95 server response, Lighthouse ≥ 90 for web
- **Security:** OWASP top-10 hardening, secure secrets management, encrypted at rest
- **Accessibility:** WCAG 2.1 AA target
- **Observability:** Logging, error tracking (Sentry), uptime monitoring
- **Localization:** ${brief.languages?.join(", ") || "English (additional languages on request)"}

---

## 7. Recommended Tech Stack

${stack.map((s) => `- ${s}`).join("\n")}

---

## 8. Milestones & Timeline

| # | Milestone | Target Week |
|---|-----------|-------------|
${milestones.map((m, i) => `| ${i + 1} | ${m.name} | Week ${m.week} |`).join("\n")}

Total duration: **${quote.weeks.min}–${quote.weeks.max} weeks**.

---

## 9. Investment

| Currency | Range |
|----------|-------|
| USD | ${formatUsd(quote.usd.min)} – ${formatUsd(quote.usd.max)} |
| SAR | ${formatSar(quote.sar.min)} – ${formatSar(quote.sar.max)} |

### Pricing breakdown
${quote.breakdown.map((b) => `- **${b.label}** — ${b.impact}`).join("\n")}

### Assumptions
${quote.assumptions.map((a) => `- ${a}`).join("\n")}

---

## 10. Next Steps

1. Confirm scope & sign engagement letter
2. Kick-off discovery workshop (1–2 sessions)
3. Begin design + build sprints

**Ready to start?** [Message Abdullah on WhatsApp](${buildWhatsappLink(`Hi Abdullah, I'd like to move forward with the ${title} project (${formatUsd(quote.usd.min)}–${formatUsd(quote.usd.max)} range).`)}) — ${WHATSAPP_DISPLAY}

---

*This PRD was generated by Abdullah Mirza's AI assistant. All figures are indicative and finalized after a discovery call.*
`;

    const summary = `${title} — ${quote.complexity} tier · ${quote.weeks.min}-${quote.weeks.max} weeks · ${formatUsd(quote.usd.min)}-${formatUsd(quote.usd.max)} (${formatSar(quote.sar.min)}-${formatSar(quote.sar.max)})`;

    return { markdown, summary, filename };
}
