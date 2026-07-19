import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

/**
 * Dynamic sitemap generation for SEO.
 * Next.js automatically serves this at /sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: SITE.URL,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
    ];
}
