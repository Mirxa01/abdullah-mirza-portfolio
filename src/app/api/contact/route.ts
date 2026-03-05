/**
 * Contact form API route handler.
 * Validates and processes contact form submissions server-side.
 * Currently logs to the server console — swap in an email service (Resend, SendGrid, etc.) as needed.
 */
import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
    name: string;
    email: string;
    subject: string;
    message: string;
    honeypot?: string; // Bot detection — should always be empty
}

/** Server-side validation matching the client-side rules */
function validatePayload(data: ContactPayload): string | null {
    if (data.honeypot) {
        // Honeypot field was filled — almost certainly a bot
        return "Invalid submission.";
    }

    if (!data.name || data.name.trim().length < 3) {
        return "Name must be at least 3 characters.";
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        return "A valid email address is required.";
    }

    if (!data.subject || data.subject.trim().length < 3) {
        return "Subject must be at least 3 characters.";
    }

    if (!data.message || data.message.trim().length < 11) {
        return "Message must be at least 11 characters.";
    }

    // Basic XSS prevention — strip potential script tags
    const dangerousPattern = /<script[\s>]|javascript:/i;
    if (dangerousPattern.test(data.message) || dangerousPattern.test(data.subject)) {
        return "Invalid characters detected.";
    }

    return null;
}

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as ContactPayload;

        const error = validatePayload(body);
        if (error) {
            return NextResponse.json(
                { success: false, message: error },
                { status: 400 }
            );
        }

        // Sanitize inputs
        const sanitized = {
            name: body.name.trim(),
            email: body.email.trim().toLowerCase(),
            subject: body.subject.trim(),
            message: body.message.trim(),
        };

        // --- Replace this block with a real email service ---
        // Example with Resend:
        //   const resend = new Resend(process.env.RESEND_API_KEY);
        //   await resend.emails.send({
        //     from: "portfolio@abdullahmirza.com",
        //     to: "abdullahmirxa786@gmail.com",
        //     subject: `[Portfolio] ${sanitized.subject}`,
        //     text: `From: ${sanitized.name} (${sanitized.email})\n\n${sanitized.message}`,
        //   });

        console.log("[Contact Form Submission]", {
            timestamp: new Date().toISOString(),
            ...sanitized,
        });
        // --- End service block ---

        return NextResponse.json(
            { success: true, message: "Message received. Thank you for reaching out." },
            { status: 200 }
        );
    } catch {
        console.error("[Contact API Error]", "Failed to process contact form submission");
        return NextResponse.json(
            { success: false, message: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }
}
