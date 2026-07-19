import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

/**
 * Dynamic sitemap generation for SEO.
 * Next.js automatically serves this at /sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    return [
        {
            url: SITE.URL,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${SITE.URL}/cv`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];
}
