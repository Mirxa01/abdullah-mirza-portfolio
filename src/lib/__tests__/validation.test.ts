/**
 * Unit tests for contact form validation logic.
 * Tests the shared validation rules used on both client and server.
 */
import { describe, it, expect } from "vitest";
import { VALIDATION } from "../constants";

/** Client-side validation matching the Contact component */
function validateContactForm(data: { name: string; email: string; subject: string; message: string }) {
    return {
        name: data.name.length >= VALIDATION.NAME_MIN_LENGTH,
        email: VALIDATION.EMAIL_REGEX.test(data.email),
        subject: data.subject.length >= VALIDATION.SUBJECT_MIN_LENGTH,
        message: data.message.length >= VALIDATION.MESSAGE_MIN_LENGTH,
    };
}

describe("Contact Form Validation", () => {
    it("should reject empty fields", () => {
        const result = validateContactForm({ name: "", email: "", subject: "", message: "" });
        expect(result.name).toBe(false);
        expect(result.email).toBe(false);
        expect(result.subject).toBe(false);
        expect(result.message).toBe(false);
    });

    it("should reject too-short name", () => {
        const result = validateContactForm({ name: "AB", email: "a@b.com", subject: "Test", message: "Hello world!!" });
        expect(result.name).toBe(false);
    });

    it("should accept valid name", () => {
        const result = validateContactForm({ name: "John Doe", email: "a@b.com", subject: "Test", message: "Hello world!!" });
        expect(result.name).toBe(true);
    });

    it("should reject invalid emails", () => {
        const invalidEmails = ["", "notanemail", "missing@", "@missing.com", "spaces in@email.com"];
        invalidEmails.forEach((email) => {
            const result = validateContactForm({ name: "Test", email, subject: "Test", message: "Hello world!!" });
            expect(result.email).toBe(false);
        });
    });

    it("should accept valid emails", () => {
        const validEmails = ["user@example.com", "test.user@domain.co", "hello+tag@gmail.com"];
        validEmails.forEach((email) => {
            const result = validateContactForm({ name: "Test", email, subject: "Test", message: "Hello world!!" });
            expect(result.email).toBe(true);
        });
    });

    it("should reject too-short subject", () => {
        const result = validateContactForm({ name: "Test", email: "a@b.com", subject: "Hi", message: "Hello world!!" });
        expect(result.subject).toBe(false);
    });

    it("should reject too-short message", () => {
        const result = validateContactForm({ name: "Test", email: "a@b.com", subject: "Test", message: "Short" });
        expect(result.message).toBe(false);
    });

    it("should accept a fully valid form", () => {
        const result = validateContactForm({
            name: "Abdullah Mirza",
            email: "abdullahmirxa786@gmail.com",
            subject: "Executive Opportunity",
            message: "I would like to discuss a potential partnership opportunity with your team.",
        });
        expect(Object.values(result).every(Boolean)).toBe(true);
    });
});

describe("Validation Constants", () => {
    it("should have reasonable minimum lengths", () => {
        expect(VALIDATION.NAME_MIN_LENGTH).toBeGreaterThanOrEqual(2);
        expect(VALIDATION.SUBJECT_MIN_LENGTH).toBeGreaterThanOrEqual(2);
        expect(VALIDATION.MESSAGE_MIN_LENGTH).toBeGreaterThanOrEqual(10);
    });

    it("EMAIL_REGEX should be a valid RegExp", () => {
        expect(VALIDATION.EMAIL_REGEX).toBeInstanceOf(RegExp);
    });
});
