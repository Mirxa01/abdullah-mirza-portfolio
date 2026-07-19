"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

/** Screen-only toolbar for the dedicated `/cv` page. */
export default function CvToolbar() {
    return (
        <div className="screen-only sticky top-0 z-20 border-b border-black/10 bg-white/95 backdrop-blur-sm">
            <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-black/70 transition-colors hover:text-black"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to portfolio
                </Link>
                <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                    <Printer className="h-4 w-4" />
                    Print / Save as PDF
                </button>
            </div>
            <p className="mx-auto max-w-4xl px-4 pb-3 text-xs text-black/45 sm:px-6">
                Tip: in the print dialog, turn off &quot;Headers and footers&quot; for a clean CV.
            </p>
        </div>
    );
}
