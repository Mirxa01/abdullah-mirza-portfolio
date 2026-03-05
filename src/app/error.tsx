"use client";

import { useEffect } from "react";

/**
 * Global error boundary for unhandled runtime errors.
 * Catches client-side errors and provides a user-friendly fallback UI.
 */
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("[Runtime Error]", error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-[#050505]">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8">
                <span className="text-3xl">⚠</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                Something went wrong
            </h1>
            <p className="text-[var(--color-text-muted)] text-base sm:text-lg max-w-md mb-8 leading-relaxed font-light">
                An unexpected error occurred. Please try again or return to the homepage.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={reset}
                    className="px-6 py-3 rounded-full bg-white text-black font-bold text-sm tracking-wide hover:bg-gray-100 transition-colors"
                >
                    Try Again
                </button>
                <a
                    href="/"
                    className="px-6 py-3 rounded-full border border-white/20 text-white font-bold text-sm tracking-wide hover:bg-white/10 transition-colors"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
}
