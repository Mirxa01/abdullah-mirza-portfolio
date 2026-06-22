/**
 * Unit tests for the PRD generator.
 * Verifies the markdown contains all required sections, reflects the brief and
 * quote, produces a safe filename, and degrades gracefully on a sparse brief.
 */
import { describe, it, expect } from "vitest";
import { generatePRD } from "../chat/prd";
import { computeQuote } from "../chat/pricing";
import type { ProjectBrief } from "../chat/types";

function prdFor(brief: ProjectBrief) {
    const quote = computeQuote(brief);
    return generatePRD(brief, quote);
}

describe("generatePRD — structure", () => {
    const brief: ProjectBrief = {
        projectType: "saas",
        title: "Acme Ops Platform",
        complexity: "Standard",
        features: ["Auth", "Billing", "Realtime dashboards"],
        integrations: ["Stripe", "Slack"],
        languages: ["English", "Arabic"],
    };
    const prd = prdFor(brief);

    it("includes every numbered section heading", () => {
        const required = [
            "## 1. Executive Summary",
            "## 2. Goals & Outcomes",
            "## 3. Target Users",
            "## 4. Core Features",
            "## 5. Integrations",
            "## 6. Non-Functional Requirements",
            "## 7. Recommended Tech Stack",
            "## 8. Milestones & Timeline",
            "## 9. Investment",
            "## 10. Next Steps",
        ];
        for (const heading of required) {
            expect(prd.markdown).toContain(heading);
        }
    });

    it("uses the brief title as the document title", () => {
        expect(prd.markdown.startsWith("# Acme Ops Platform")).toBe(true);
    });

    it("lists the brief's features and integrations", () => {
        expect(prd.markdown).toContain("- Auth");
        expect(prd.markdown).toContain("- Stripe");
        expect(prd.markdown).toContain("- Slack");
    });

    it("embeds the investment range in both currencies", () => {
        const quote = computeQuote(brief);
        expect(prd.markdown).toContain("$");
        expect(prd.markdown).toContain("SAR");
        expect(prd.markdown).toContain(`${quote.weeks.min}`);
    });
});

describe("generatePRD — filename + summary", () => {
    it("produces a slugified, dated .md filename", () => {
        const prd = prdFor({ projectType: "web_app", title: "My Cool App!" });
        expect(prd.filename).toMatch(/^PRD-my-cool-app-\d{4}-\d{2}-\d{2}\.md$/);
    });

    it("produces a one-line summary with tier and timeline", () => {
        const prd = prdFor({ projectType: "web_app", title: "App", complexity: "MVP" });
        expect(prd.summary).toContain("App");
        expect(prd.summary).toContain("MVP");
        expect(prd.summary).toMatch(/weeks/);
    });
});

describe("generatePRD — graceful defaults", () => {
    it("fills sensible placeholders when the brief is sparse", () => {
        const prd = prdFor({});
        expect(prd.markdown).toContain("## 4. Core Features");
        expect(prd.markdown).toContain("Core flows defined during discovery");
        expect(prd.markdown).toContain("TBD during discovery");
        // Title falls back to the service name.
        expect(prd.markdown).toMatch(/^# .*Project/m);
    });
});
