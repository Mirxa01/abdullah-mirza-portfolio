import type { MetadataRoute } from "next";

/**
 * Dynamic sitemap generation for SEO.
 * Next.js automatically serves this at /sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://abdullahmirza.com";

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
    ];
}
