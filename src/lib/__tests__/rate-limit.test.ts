/**
 * Unit tests for the shared sliding-window rate limiter and IP resolver.
 */
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { createRateLimiter, getClientIp } from "../rate-limit";

describe("createRateLimiter", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("allows up to max requests inside the window", () => {
        const limiter = createRateLimiter(60_000, 3);
        expect(limiter.check("a")).toBe(true);
        expect(limiter.check("a")).toBe(true);
        expect(limiter.check("a")).toBe(true);
        expect(limiter.check("a")).toBe(false);
    });

    it("isolates buckets per key", () => {
        const limiter = createRateLimiter(60_000, 1);
        expect(limiter.check("a")).toBe(true);
        expect(limiter.check("a")).toBe(false);
        expect(limiter.check("b")).toBe(true);
    });

    it("resets after the window elapses", () => {
        const limiter = createRateLimiter(1_000, 1);
        expect(limiter.check("a")).toBe(true);
        expect(limiter.check("a")).toBe(false);
        vi.advanceTimersByTime(1_001);
        expect(limiter.check("a")).toBe(true);
    });

    it("sweeps stale keys so the map does not grow forever", () => {
        const limiter = createRateLimiter(1_000, 1);
        expect(limiter.check("old")).toBe(true);
        expect(limiter.size()).toBe(1);
        vi.advanceTimersByTime(1_001);
        // Next check triggers a sweep of expired buckets.
        expect(limiter.check("new")).toBe(true);
        expect(limiter.size()).toBe(1);
    });

    it("reset() clears all buckets", () => {
        const limiter = createRateLimiter(60_000, 1);
        expect(limiter.check("a")).toBe(true);
        expect(limiter.check("a")).toBe(false);
        limiter.reset();
        expect(limiter.check("a")).toBe(true);
        expect(limiter.size()).toBe(1);
    });
});

describe("getClientIp", () => {
    it("prefers x-real-ip when present", () => {
        const headers = new Headers({
            "x-real-ip": "203.0.113.10",
            "x-forwarded-for": "198.51.100.1, 203.0.113.10",
        });
        expect(getClientIp(headers)).toBe("203.0.113.10");
    });

    it("uses the leftmost x-forwarded-for hop", () => {
        const headers = new Headers({
            "x-forwarded-for": "198.51.100.1, 203.0.113.10",
        });
        expect(getClientIp(headers)).toBe("198.51.100.1");
    });

    it("returns unknown when no IP headers are present", () => {
        expect(getClientIp(new Headers())).toBe("unknown");
    });
});
