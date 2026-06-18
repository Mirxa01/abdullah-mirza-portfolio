/**
 * Contact form API route handler.
 *
 * Validates and sanitizes submissions server-side, then delivers a real
 * notification email to the site owner via Resend (see `src/lib/email.ts`).
 * When no email provider is configured, the route responds honestly and points
 * the visitor at the direct channels surfaced in the UI instead of pretending
 * the message went through.
 */
import { NextRequest, NextResponse } from "next/server";
import { buildContactEmail, sanitizeContact, validateContact, type ContactPayload } from "@/lib/contact";
import { isEmailConfigured, sendContactEmail } from "@/lib/email";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Lightweight in-memory rate limiter (per IP) — 5 submissions / 10 minutes.
// Survives within a warm serverless instance; a determined abuser cycling cold
// starts is still bounded by Resend's own quotas.
// ---------------------------------------------------------------------------
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const ipBuckets = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
    const now = Date.now();
    const recent = (ipBuckets.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
    if (recent.length >= RATE_MAX) {
        ipBuckets.set(ip, recent);
        return false;
    }
    recent.push(now);
    ipBuckets.set(ip, recent);
    return true;
}

function getClientIp(req: NextRequest): string {
    const fwd = req.headers.get("x-forwarded-for");
    if (fwd) return fwd.split(",")[0]?.trim() || "unknown";
    return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
    const ip = getClientIp(request);
    if (!rateLimit(ip)) {
        return NextResponse.json(
            {
                success: false,
                message:
                    "Too many submissions. Please wait a few minutes — or reach out directly via WhatsApp or email.",
            },
            { status: 429 },
        );
    }

    let body: ContactPayload;
    try {
        body = (await request.json()) as ContactPayload;
    } catch {
        return NextResponse.json({ success: false, message: "Invalid request format." }, { status: 400 });
    }

    const error = validateContact(body);
    if (error) {
        return NextResponse.json({ success: false, message: error }, { status: 400 });
    }

    const sanitized = sanitizeContact(body);

    // No provider configured — be honest rather than dropping the lead silently.
    if (!isEmailConfigured()) {
        console.warn("[contact] RESEND_API_KEY not set — submission could not be delivered.", {
            email: sanitized.email,
            subject: sanitized.subject,
        });
        return NextResponse.json(
            {
                success: false,
                message:
                    "Direct messaging is temporarily unavailable. Please reach out via WhatsApp or email — both are listed above.",
            },
            { status: 503 },
        );
    }

    const email = buildContactEmail(sanitized);
    const result = await sendContactEmail(email, sanitized.email);

    if (!result.ok) {
        if (result.reason === "send_failed") {
            console.error("[contact] Email delivery failed:", result.error);
        }
        return NextResponse.json(
            {
                success: false,
                message:
                    "Something went wrong sending your message. Please try again, or reach out via WhatsApp or email.",
            },
            { status: 502 },
        );
    }

    return NextResponse.json(
        { success: true, message: "Message sent. Thank you for reaching out — I'll respond shortly." },
        { status: 200 },
    );
}
