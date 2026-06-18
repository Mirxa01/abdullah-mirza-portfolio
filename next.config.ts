import type { NextConfig } from "next";

const securityHeaders = [
    {
        key: "X-DNS-Prefetch-Control",
        value: "on",
    },
    {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
    },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
];

const nextConfig: NextConfig = {
    // Remove the "X-Powered-By" header to reduce information leakage
    poweredByHeader: false,

    // Use the system trust store when fetching build-time resources (e.g. the
    // Google Fonts CSS pulled by next/font). Makes `next build` succeed in
    // restricted / self-hosted CI environments behind a TLS-inspecting proxy.
    experimental: {
        turbopackUseSystemTlsCerts: true,
    },

    // Image optimization configuration
    images: {
        formats: ["image/avif", "image/webp"],
    },

    // Apply security headers to all routes
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: securityHeaders,
            },
        ];
    },
};

export default nextConfig;
