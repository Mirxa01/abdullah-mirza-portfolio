import type { MetadataRoute } from "next";

/**
 * Programmatic robots.txt generation.
 * Next.js automatically serves this at /robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: "https://abdullahmirza.com/sitemap.xml",
    };
}
