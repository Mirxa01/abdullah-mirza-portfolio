/**
 * Integration-style tests for the /api/contact route.
 * Covers validation, honeypot, rate limiting, and delivery paths.
 * Resend itself is a third-party service — the email module is mocked here
 * so we can assert route status codes without a live API key.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const { mockIsEmailConfigured, mockSendContactEmail } = vi.hoisted(() => ({
    mockIsEmailConfigured: vi.fn(() => false),
    mockSendContactEmail: vi.fn(),
}));

vi.mock("@/lib/email", () => ({
    isEmailConfigured: () => mockIsEmailConfigured(),
    sendContactEmail: (...args: unknown[]) => mockSendContactEmail(...args),
}));

import { POST, contactRateLimiter } from "@/app/api/contact/route";

const validBody = {
    name: "Abdullah Mirza",
    email: "visitor@example.com",
    subject: "Executive Opportunity",
    message: "I would like to discuss a potential partnership opportunity with your team.",
    honeypot: "",
};

function contactRequest(body: unknown, ip = "203.0.113.77"): NextRequest {
    return new NextRequest("http://localhost/api/contact", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "x-real-ip": ip,
        },
        body: JSON.stringify(body),
    });
}

describe("POST /api/contact", () => {
    beforeEach(() => {
        contactRateLimiter.reset();
        mockIsEmailConfigured.mockReset();
        mockSendContactEmail.mockReset();
        mockIsEmailConfigured.mockReturnValue(false);
    });

    afterEach(() => {
        contactRateLimiter.reset();
    });

    it("rejects invalid JSON", async () => {
        const req = new NextRequest("http://localhost/api/contact", {
            method: "POST",
            headers: { "content-type": "application/json", "x-real-ip": "10.0.0.2" },
            body: "not-json",
        });
        const res = await POST(req);
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.success).toBe(false);
    });

    it("rejects a filled honeypot", async () => {
        const res = await POST(contactRequest({ ...validBody, honeypot: "http://spam.example" }));
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.message).toBe("Invalid submission.");
    });

    it("rejects incomplete fields", async () => {
        const res = await POST(contactRequest({ ...validBody, name: "AB" }));
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.success).toBe(false);
        expect(data.message).toMatch(/Name/);
    });

    it("returns 503 when Resend is not configured", async () => {
        mockIsEmailConfigured.mockReturnValue(false);
        const res = await POST(contactRequest(validBody));
        expect(res.status).toBe(503);
        const data = await res.json();
        expect(data.success).toBe(false);
        expect(data.message).toMatch(/temporarily unavailable/i);
        expect(mockSendContactEmail).not.toHaveBeenCalled();
    });

    it("rate-limits after 5 submissions from the same IP", async () => {
        mockIsEmailConfigured.mockReturnValue(false);
        let lastStatus = 200;
        for (let i = 0; i < 6; i++) {
            const res = await POST(contactRequest(validBody, "198.51.100.42"));
            lastStatus = res.status;
        }
        expect(lastStatus).toBe(429);
    });

    it("delivers successfully when the email provider is configured", async () => {
        mockIsEmailConfigured.mockReturnValue(true);
        mockSendContactEmail.mockResolvedValue({ ok: true, id: "msg_test" });

        const res = await POST(contactRequest(validBody, "203.0.113.88"));
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data.success).toBe(true);
        expect(mockSendContactEmail).toHaveBeenCalledOnce();
    });

    it("returns 502 when email delivery fails", async () => {
        mockIsEmailConfigured.mockReturnValue(true);
        mockSendContactEmail.mockResolvedValue({
            ok: false,
            reason: "send_failed",
            error: "provider down",
        });

        const res = await POST(contactRequest(validBody, "203.0.113.89"));
        expect(res.status).toBe(502);
        const data = await res.json();
        expect(data.success).toBe(false);
    });
});
