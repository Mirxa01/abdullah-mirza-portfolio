"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

/** Screen-only toolbar for the dedicated `/cv` page. */
export default function CvToolbar() {
    return (
        <div className="screen-only sticky top-0 z-20 border-b border-black/8 bg-white/95 backdrop-blur-md pt-[env(safe-area-inset-top)]">
            <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-3 py-3 sm:px-6 sm:py-3.5">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 min-h-11 text-sm font-semibold text-black/65 transition-colors hover:text-black"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to portfolio
                </Link>
                <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 min-h-11 rounded-full bg-[#0066ff] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(0,102,255,0.35)] transition-opacity hover:opacity-90"
                >
                    <Printer className="h-4 w-4" />
                    <span className="hidden sm:inline">Print / Save as PDF</span>
                    <span className="sm:hidden">Print PDF</span>
                </button>
            </div>
            <p className="mx-auto max-w-4xl px-3 pb-3 text-xs text-black/40 sm:px-6">
                Tip: turn off &quot;Headers and footers&quot; in the print dialog for a clean CV.
            </p>
        </div>
    );
}
