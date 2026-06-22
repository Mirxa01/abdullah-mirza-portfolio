/**
 * Email delivery via Resend.
 *
 * This is a real integration — when `RESEND_API_KEY` is configured the contact
 * form delivers a genuine email to the site owner. When the key is absent the
 * module reports `not_configured` so the API route can respond honestly and
 * steer the visitor to the direct channels (WhatsApp / email) shown in the UI,
 * rather than silently dropping the message.
 */
import { Resend } from "resend";
import { EMAIL_ADDRESS } from "./data";
import type { ContactEmail } from "./contact";

/** Recipient of contact-form notifications. Overridable via env. */
const TO_ADDRESS = process.env.CONTACT_TO_EMAIL?.trim() || EMAIL_ADDRESS;

/**
 * Sender address. Must be on a domain verified in Resend for production use.
 * Defaults to Resend's shared onboarding sender, which works for any account
 * out of the box so the integration is functional immediately.
 */
const FROM_ADDRESS = process.env.CONTACT_FROM_EMAIL?.trim() || "Portfolio Contact <onboarding@resend.dev>";

export type EmailResult =
    | { ok: true; id: string }
    | { ok: false; reason: "not_configured" }
    | { ok: false; reason: "send_failed"; error: string };

/** Whether an email provider is configured in this environment. */
export function isEmailConfigured(): boolean {
    return Boolean(process.env.RESEND_API_KEY?.trim());
}

/**
 * Deliver a contact-form notification email.
 *
 * @param email   Pre-rendered subject/html/text payload.
 * @param replyTo The visitor's email, so replies go straight to them.
 */
export async function sendContactEmail(email: ContactEmail, replyTo: string): Promise<EmailResult> {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
        return { ok: false, reason: "not_configured" };
    }

    try {
        const resend = new Resend(apiKey);
        const { data, error } = await resend.emails.send({
            from: FROM_ADDRESS,
            to: TO_ADDRESS,
            replyTo,
            subject: email.subject,
            html: email.html,
            text: email.text,
        });

        if (error) {
            return { ok: false, reason: "send_failed", error: error.message };
        }
        return { ok: true, id: data?.id ?? "unknown" };
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown email error";
        return { ok: false, reason: "send_failed", error: message };
    }
}
