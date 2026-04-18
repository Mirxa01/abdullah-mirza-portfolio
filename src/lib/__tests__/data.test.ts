/**
 * Unit tests for centralized portfolio data.
 * Validates data integrity — ensures no empty arrays, required fields populated,
 * and image paths follow expected patterns.
 */
import { describe, it, expect } from "vitest";
import {
    navLinks,
    ventures,
    timelineEvents,
    leadershipRoles,
    stats,
    certifications,
    competencyNames,
    professionalStrengths,
    contactInfo,
    ventureBulletPoints,
    heroExpertise,
    heroNumbers,
} from "../data";

describe("Navigation Links", () => {
    it("should have at least 3 nav links", () => {
        expect(navLinks.length).toBeGreaterThanOrEqual(3);
    });

    it("should have valid href starting with #", () => {
        navLinks.forEach((link) => {
            expect(link.href).toMatch(/^#/);
            expect(link.name.length).toBeGreaterThan(0);
        });
    });
});

describe("Ventures", () => {
    it("should have at least 1 venture", () => {
        expect(ventures.length).toBeGreaterThanOrEqual(1);
    });

    it("should have all required fields populated", () => {
        ventures.forEach((v) => {
            expect(v.title.length).toBeGreaterThan(0);
            expect(v.description.length).toBeGreaterThan(0);
            expect(v.color.length).toBeGreaterThan(0);
            // URL is required and must be a fully-qualified URL
            expect(v.url).toMatch(/^https?:\/\//);
        });
    });

    it("should have valid optional asset paths when provided", () => {
        ventures.forEach((v) => {
            if (v.logo) expect(v.logo).toMatch(/^\//);
            if (v.image) expect(v.image).toMatch(/^\//);
        });
    });

    it("should have bullet points", () => {
        expect(ventureBulletPoints.length).toBeGreaterThanOrEqual(1);
    });
});

describe("Career Timeline", () => {
    it("should have at least 1 timeline event", () => {
        expect(timelineEvents.length).toBeGreaterThanOrEqual(1);
    });

    it("should have non-empty role and company", () => {
        timelineEvents.forEach((event) => {
            expect(event.role.length).toBeGreaterThan(0);
            expect(event.company.length).toBeGreaterThan(0);
        });
    });

    it("should have highlights as arrays", () => {
        timelineEvents.forEach((event) => {
            expect(Array.isArray(event.highlights)).toBe(true);
        });
    });
});

describe("Leadership Roles", () => {
    it("should have at least 1 role", () => {
        expect(leadershipRoles.length).toBeGreaterThanOrEqual(1);
    });

    it("should have all required fields", () => {
        leadershipRoles.forEach((role) => {
            expect(role.company.length).toBeGreaterThan(0);
            expect(role.role.length).toBeGreaterThan(0);
            expect(role.period.length).toBeGreaterThan(0);
            expect(role.points.length).toBeGreaterThanOrEqual(1);
        });
    });
});

describe("Stats", () => {
    it("should have exactly 4 stats", () => {
        expect(stats).toHaveLength(4);
    });

    it("should have positive numeric values", () => {
        stats.forEach((stat) => {
            expect(stat.value).toBeGreaterThan(0);
            expect(stat.label.length).toBeGreaterThan(0);
        });
    });
});

describe("Certifications", () => {
    it("should have at least 5 certifications", () => {
        expect(certifications.length).toBeGreaterThanOrEqual(5);
    });

    it("should have non-empty strings", () => {
        certifications.forEach((cert) => {
            expect(cert.length).toBeGreaterThan(0);
        });
    });
});

describe("Competencies", () => {
    it("should have at least 5 competency names", () => {
        expect(competencyNames.length).toBeGreaterThanOrEqual(5);
    });

    it("should have professional strengths", () => {
        expect(professionalStrengths.length).toBeGreaterThanOrEqual(3);
    });
});

describe("Contact Info", () => {
    it("should have email, phone, and location", () => {
        const types = contactInfo.map((c) => c.type);
        expect(types).toContain("email");
        expect(types).toContain("phone");
        expect(types).toContain("location");
    });

    it("should have valid display values", () => {
        contactInfo.forEach((info) => {
            expect(info.displayValue.length).toBeGreaterThan(0);
            expect(info.value.length).toBeGreaterThan(0);
        });
    });
});

describe("Hero Content", () => {
    it("should have expertise items", () => {
        expect(heroExpertise.length).toBeGreaterThanOrEqual(2);
    });

    it("should have numbers/metrics", () => {
        expect(heroNumbers.length).toBeGreaterThanOrEqual(2);
    });
});
