import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

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
        sitemap: `${SITE.URL}/sitemap.xml`,
    };
}
