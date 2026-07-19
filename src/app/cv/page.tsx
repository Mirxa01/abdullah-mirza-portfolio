import type { Metadata } from "next";
import { Suspense } from "react";
import PrintableCV from "@/components/PrintableCV";
import AutoPrint from "@/components/cv/AutoPrint";
import CvToolbar from "@/components/cv/CvToolbar";
import { PROFESSIONAL_TITLE, cvSummary } from "@/lib/data";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
    title: `Abdullah Mirza — CV | ${PROFESSIONAL_TITLE}`,
    description: cvSummary,
    alternates: {
        canonical: "/cv",
    },
    openGraph: {
        title: `Abdullah Mirza — CV`,
        description: cvSummary,
        url: "/cv",
        siteName: SITE.NAME,
        type: "profile",
    },
    robots: {
        index: true,
        follow: true,
    },
};

/**
 * Dedicated CV page — reliable Print / Save as PDF target.
 * Avoids printing the animated marketing homepage (blank pages, washed text).
 */
export default function CvPage() {
    return (
        <div className="cv-page min-h-screen bg-white text-black">
            <CvToolbar />
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
                <PrintableCV variant="page" />
            </div>
            <Suspense fallback={null}>
                <AutoPrint />
            </Suspense>
        </div>
    );
}
