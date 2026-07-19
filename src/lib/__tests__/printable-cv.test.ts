/**
 * Ensures printable-CV source data stays complete and consistent.
 */
import { describe, it, expect } from "vitest";
import {
    PROFESSIONAL_TITLE,
    cvSummary,
    competencyNames,
    certifications,
    education,
    leadershipRoles,
    timelineEvents,
    ventures,
    EMAIL_ADDRESS,
    LINKEDIN_URL,
    SITE_URL,
} from "../data";

describe("Printable CV source data", () => {
    it("has a consistent professional title and summary", () => {
        expect(PROFESSIONAL_TITLE).toBe("Founder · Builder · Operator");
        expect(cvSummary.length).toBeGreaterThan(60);
    });

    it("includes contact channels used in the print header", () => {
        expect(EMAIL_ADDRESS).toMatch(/@/);
        expect(LINKEDIN_URL).toMatch(/^https:\/\/www\.linkedin\.com\//);
        expect(SITE_URL).toMatch(/^https:\/\//);
    });

    it("has leadership roles with periods and points", () => {
        expect(leadershipRoles.length).toBeGreaterThanOrEqual(1);
        leadershipRoles.forEach((role) => {
            expect(role.period.length).toBeGreaterThan(0);
            expect(role.points.length).toBeGreaterThan(0);
        });
    });

    it("has compactable career and product sections", () => {
        expect(timelineEvents.length).toBeGreaterThanOrEqual(3);
        expect(ventures.length).toBeGreaterThanOrEqual(3);
        expect(competencyNames.length).toBeGreaterThanOrEqual(5);
        expect(certifications.length).toBeGreaterThanOrEqual(5);
        expect(education.institution).toContain("Punjab");
    });
});
