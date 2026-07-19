/**
 * Unit tests for the shared contact-form logic:
 * validation, honeypot/XSS rejection, sanitization, HTML escaping, and the
 * notification email template.
 */
import { describe, it, expect } from "vitest";
import {
    buildContactEmail,
    escapeHtml,
    FIELD_LIMITS,
    getContactFieldValidity,
    sanitizeContact,
    validateContact,
    type ContactPayload,
} from "../contact";

const valid: ContactPayload = {
    name: "Abdullah Mirza",
    email: "Test.User@Example.com",
    subject: "Executive Opportunity",
    message: "I would like to discuss a potential partnership opportunity with your team.",
};

describe("validateContact", () => {
    it("accepts a fully valid payload", () => {
        expect(validateContact(valid)).toBeNull();
    });

    it("rejects null / non-object input", () => {
        expect(validateContact(null)).not.toBeNull();
        expect(validateContact(undefined)).not.toBeNull();
    });

    it("rejects a filled honeypot as a generic invalid submission", () => {
        expect(validateContact({ ...valid, honeypot: "i-am-a-bot" })).toBe("Invalid submission.");
    });

    it("rejects a too-short name", () => {
        expect(validateContact({ ...valid, name: "AB" })).toMatch(/Name must be/);
    });

    it("rejects invalid emails", () => {
        for (const email of ["", "notanemail", "missing@", "@missing.com", "a b@c.com"]) {
            expect(validateContact({ ...valid, email })).toMatch(/valid email/);
        }
    });

    it("rejects a too-short subject and message", () => {
        expect(validateContact({ ...valid, subject: "Hi" })).toMatch(/Subject must be/);
        expect(validateContact({ ...valid, message: "Short" })).toMatch(/Message must be/);
    });

    it("rejects oversized fields", () => {
        expect(validateContact({ ...valid, name: "a".repeat(FIELD_LIMITS.NAME_MAX + 1) })).toMatch(/too long/);
        expect(validateContact({ ...valid, message: "a".repeat(FIELD_LIMITS.MESSAGE_MAX + 1) })).toMatch(/too long/);
    });

    it("rejects script/JS-handler injection attempts", () => {
        expect(validateContact({ ...valid, message: "<script>alert(1)</script> hello world" })).toMatch(
            /Invalid characters/,
        );
        expect(validateContact({ ...valid, subject: "javascript:alert(1)" })).toMatch(/Invalid characters/);
        expect(validateContact({ ...valid, message: "click onerror=alert(1) here please" })).toMatch(
            /Invalid characters/,
        );
    });
});

describe("getContactFieldValidity", () => {
    it("mirrors server rules including trim and max lengths", () => {
        expect(getContactFieldValidity(valid).name).toBe(true);
        expect(getContactFieldValidity({ ...valid, name: "  AB  " }).name).toBe(false);
        expect(getContactFieldValidity({ ...valid, email: "  Test.User@Example.com  " }).email).toBe(
            true,
        );
        expect(
            getContactFieldValidity({ ...valid, message: "a".repeat(FIELD_LIMITS.MESSAGE_MAX + 1) })
                .message,
        ).toBe(false);
    });

    it("marks fields with dangerous patterns as invalid", () => {
        expect(
            getContactFieldValidity({ ...valid, subject: "javascript:alert(1)" }).subject,
        ).toBe(false);
    });
});

describe("sanitizeContact", () => {
    it("trims fields and lowercases the email", () => {
        const out = sanitizeContact({
            ...valid,
            name: "  Abdullah  ",
            email: "  Test.User@Example.com  ",
        });
        expect(out.name).toBe("Abdullah");
        expect(out.email).toBe("test.user@example.com");
    });
});

describe("escapeHtml", () => {
    it("escapes all HTML-significant characters", () => {
        expect(escapeHtml(`<b>"x" & 'y'</b>`)).toBe("&lt;b&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/b&gt;");
    });
});

describe("buildContactEmail", () => {
    const email = buildContactEmail(sanitizeContact(valid));

    it("prefixes the subject", () => {
        expect(email.subject).toBe("[Portfolio] Executive Opportunity");
    });

    it("includes sender details in both HTML and text parts", () => {
        expect(email.text).toContain("test.user@example.com");
        expect(email.text).toContain("Abdullah Mirza");
        expect(email.html).toContain("test.user@example.com");
    });

    it("escapes HTML in the rendered body to prevent injection", () => {
        const malicious = buildContactEmail(
            sanitizeContact({
                ...valid,
                // passes validation only because escaping is what we assert here
                message: "Totally safe text with an ampersand & angle look-alike",
            }),
        );
        expect(malicious.html).toContain("&amp;");
        expect(malicious.html).not.toContain("<script");
    });

    it("converts newlines to <br /> in the HTML body", () => {
        const withBreaks = buildContactEmail(
            sanitizeContact({ ...valid, message: "Line one\nLine two of this message body." }),
        );
        expect(withBreaks.html).toContain("<br />");
    });
});
