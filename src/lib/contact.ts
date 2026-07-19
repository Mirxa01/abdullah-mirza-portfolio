/**
 * Shared contact-form logic — validation, sanitization, and email templating.
 *
 * Used by the `/api/contact` route handler and exercised directly by unit
 * tests. Keeping this isolated from Next.js request plumbing means the rules
 * stay in lock-step with the client-side validation in `Contact.tsx` (both
 * read from the same `VALIDATION` constants) and can be verified in isolation.
 */
import { VALIDATION } from "./constants";

export interface ContactPayload {
    name: string;
    email: string;
    subject: string;
    message: string;
    /** Hidden honeypot field — must always be empty for genuine submissions. */
    honeypot?: string;
}

export interface SanitizedContact {
    name: string;
    email: string;
    subject: string;
    message: string;
}

/** Patterns we refuse to accept inside free-text fields. */
const DANGEROUS_PATTERN = /<script[\s>]|<\/script>|javascript:|on\w+\s*=/i;

/** Upper bounds to prevent abuse / oversized payloads. */
export const FIELD_LIMITS = {
    NAME_MAX: 120,
    EMAIL_MAX: 254,
    SUBJECT_MAX: 160,
    MESSAGE_MAX: 5000,
} as const;

export interface ContactFieldValidity {
    name: boolean;
    email: boolean;
    subject: boolean;
    message: boolean;
}

/**
 * Per-field validity used by the contact UI. Mirrors `validateContact` rules
 * (trim, max lengths, dangerous-pattern checks) so client and server stay aligned.
 */
export function getContactFieldValidity(
    data: Partial<ContactPayload> | null | undefined,
): ContactFieldValidity {
    const name = typeof data?.name === "string" ? data.name.trim() : "";
    const email = typeof data?.email === "string" ? data.email.trim() : "";
    const subject = typeof data?.subject === "string" ? data.subject.trim() : "";
    const message = typeof data?.message === "string" ? data.message.trim() : "";

    return {
        name:
            name.length >= VALIDATION.NAME_MIN_LENGTH &&
            name.length <= FIELD_LIMITS.NAME_MAX &&
            !DANGEROUS_PATTERN.test(name),
        email: VALIDATION.EMAIL_REGEX.test(email) && email.length <= FIELD_LIMITS.EMAIL_MAX,
        subject:
            subject.length >= VALIDATION.SUBJECT_MIN_LENGTH &&
            subject.length <= FIELD_LIMITS.SUBJECT_MAX &&
            !DANGEROUS_PATTERN.test(subject),
        message:
            message.length >= VALIDATION.MESSAGE_MIN_LENGTH &&
            message.length <= FIELD_LIMITS.MESSAGE_MAX &&
            !DANGEROUS_PATTERN.test(message),
    };
}

/**
 * Validate a raw contact payload.
 * Returns `null` when valid, or a human-readable error string when not.
 * Mirrors the client-side rules in `Contact.tsx` via the shared `VALIDATION`.
 */
export function validateContact(data: Partial<ContactPayload> | null | undefined): string | null {
    if (!data || typeof data !== "object") {
        return "Invalid submission.";
    }

    // Honeypot filled → almost certainly a bot. Reject without leaking why.
    if (typeof data.honeypot === "string" && data.honeypot.trim().length > 0) {
        return "Invalid submission.";
    }

    const name = typeof data.name === "string" ? data.name.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim() : "";
    const subject = typeof data.subject === "string" ? data.subject.trim() : "";
    const message = typeof data.message === "string" ? data.message.trim() : "";

    if (name.length < VALIDATION.NAME_MIN_LENGTH) {
        return `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters.`;
    }
    if (name.length > FIELD_LIMITS.NAME_MAX) {
        return "Name is too long.";
    }

    if (!VALIDATION.EMAIL_REGEX.test(email) || email.length > FIELD_LIMITS.EMAIL_MAX) {
        return "A valid email address is required.";
    }

    if (subject.length < VALIDATION.SUBJECT_MIN_LENGTH) {
        return `Subject must be at least ${VALIDATION.SUBJECT_MIN_LENGTH} characters.`;
    }
    if (subject.length > FIELD_LIMITS.SUBJECT_MAX) {
        return "Subject is too long.";
    }

    if (message.length < VALIDATION.MESSAGE_MIN_LENGTH) {
        return `Message must be at least ${VALIDATION.MESSAGE_MIN_LENGTH} characters.`;
    }
    if (message.length > FIELD_LIMITS.MESSAGE_MAX) {
        return "Message is too long.";
    }

    if (DANGEROUS_PATTERN.test(subject) || DANGEROUS_PATTERN.test(message) || DANGEROUS_PATTERN.test(name)) {
        return "Invalid characters detected.";
    }

    return null;
}

/** Normalize a validated payload into trimmed, canonical fields. */
export function sanitizeContact(data: ContactPayload): SanitizedContact {
    return {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        subject: data.subject.trim(),
        message: data.message.trim(),
    };
}

/** Escape a string for safe interpolation into HTML. */
export function escapeHtml(input: string): string {
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export interface ContactEmail {
    subject: string;
    html: string;
    text: string;
}

/**
 * Build the notification email (HTML + plain-text) sent to the site owner
 * when a visitor submits the contact form. All interpolated values are
 * HTML-escaped to neutralize injection via form input.
 */
export function buildContactEmail(contact: SanitizedContact): ContactEmail {
    const safe = {
        name: escapeHtml(contact.name),
        email: escapeHtml(contact.email),
        subject: escapeHtml(contact.subject),
        message: escapeHtml(contact.message),
    };
    const messageHtml = safe.message.replace(/\n/g, "<br />");
    const receivedAt = new Date().toISOString();

    const subject = `[Portfolio] ${contact.subject}`;

    const text = [
        `New contact form submission`,
        `---------------------------`,
        `Name:    ${contact.name}`,
        `Email:   ${contact.email}`,
        `Subject: ${contact.subject}`,
        `Time:    ${receivedAt}`,
        ``,
        `Message:`,
        contact.message,
    ].join("\n");

    const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#0a0a0a;font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif;color:#e5e5e5;">
    <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
      <h1 style="font-size:18px;margin:0 0 4px;color:#ffffff;">New contact form submission</h1>
      <p style="font-size:12px;color:#8a8a8a;margin:0 0 24px;">Received ${escapeHtml(receivedAt)}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:8px 0;color:#8a8a8a;width:88px;vertical-align:top;">Name</td>
          <td style="padding:8px 0;color:#ffffff;">${safe.name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#8a8a8a;vertical-align:top;">Email</td>
          <td style="padding:8px 0;"><a style="color:#3b82f6;text-decoration:none;" href="mailto:${safe.email}">${safe.email}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#8a8a8a;vertical-align:top;">Subject</td>
          <td style="padding:8px 0;color:#ffffff;">${safe.subject}</td>
        </tr>
      </table>
      <div style="margin-top:24px;padding:16px 20px;background:#141414;border:1px solid #262626;border-radius:12px;line-height:1.6;font-size:14px;color:#e5e5e5;">
        ${messageHtml}
      </div>
    </div>
  </body>
</html>`;

    return { subject, html, text };
}
