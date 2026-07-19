/**
 * Process-local sliding-window rate limiter.
 *
 * Suitable for warm serverless instances. Buckets are swept periodically so
 * long-lived processes do not retain stale IPs forever. Across cold starts /
 * multiple instances the limit is best-effort — pair with provider quotas
 * (OpenAI / Resend) for hard cost bounds.
 */
export interface RateLimiter {
    /** Returns true when the request is allowed. */
    check: (key: string) => boolean;
    /** Test helper — clears all buckets. */
    reset: () => void;
    /** Current bucket count (tests / diagnostics). */
    size: () => number;
}

export function createRateLimiter(windowMs: number, max: number): RateLimiter {
    const buckets = new Map<string, number[]>();
    let lastSweep = 0;

    function sweep(now: number): void {
        // Sweep at most once per window to keep check() cheap under load.
        if (now - lastSweep < windowMs) return;
        lastSweep = now;
        for (const [key, times] of buckets) {
            const recent = times.filter((t) => now - t < windowMs);
            if (recent.length === 0) buckets.delete(key);
            else buckets.set(key, recent);
        }
    }

    return {
        check(key: string): boolean {
            const now = Date.now();
            sweep(now);
            const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
            if (recent.length >= max) {
                buckets.set(key, recent);
                return false;
            }
            recent.push(now);
            buckets.set(key, recent);
            return true;
        },
        reset(): void {
            buckets.clear();
            lastSweep = 0;
        },
        size(): number {
            return buckets.size;
        },
    };
}

/**
 * Resolve a client IP from common reverse-proxy headers.
 * Prefers `x-real-ip` (single value from the edge) over the leftmost
 * `x-forwarded-for` hop, which is what Vercel populates with the client IP.
 */
export function getClientIp(headers: Headers): string {
    const realIp = headers.get("x-real-ip")?.trim();
    if (realIp) return realIp;

    const forwarded = headers.get("x-forwarded-for");
    if (forwarded) {
        const first = forwarded.split(",")[0]?.trim();
        if (first) return first;
    }

    return "unknown";
}
