/**
 * Unit tests for the email module's configuration detection and the honest
 * "not configured" path. Live delivery is exercised against the real Resend
 * API only when RESEND_API_KEY is present in the environment, so these tests
 * verify the deterministic, network-free behavior.
 */
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { buildContactEmail, sanitizeContact } from "../contact";

const ORIGINAL_KEY = process.env.RESEND_API_KEY;

afterEach(() => {
    if (ORIGINAL_KEY === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = ORIGINAL_KEY;
});

describe("isEmailConfigured", () => {
    beforeEach(() => {
        delete process.env.RESEND_API_KEY;
    });

    it("is false when no API key is set", async () => {
        const { isEmailConfigured } = await import("../email");
        expect(isEmailConfigured()).toBe(false);
    });

    it("is false for a blank/whitespace key", async () => {
        process.env.RESEND_API_KEY = "   ";
        const { isEmailConfigured } = await import("../email");
        expect(isEmailConfigured()).toBe(false);
    });

    it("is true once a non-empty key is present", async () => {
        process.env.RESEND_API_KEY = "re_test_key";
        const { isEmailConfigured } = await import("../email");
        expect(isEmailConfigured()).toBe(true);
    });
});

describe("sendContactEmail — not configured", () => {
    it("reports not_configured without attempting delivery", async () => {
        delete process.env.RESEND_API_KEY;
        const { sendContactEmail } = await import("../email");
        const email = buildContactEmail(
            sanitizeContact({
                name: "Tester",
                email: "tester@example.com",
                subject: "Hello there",
                message: "This is a sufficiently long message body for the test.",
            }),
        );
        const result = await sendContactEmail(email, "tester@example.com");
        expect(result.ok).toBe(false);
        if (!result.ok) expect(result.reason).toBe("not_configured");
    });
});
