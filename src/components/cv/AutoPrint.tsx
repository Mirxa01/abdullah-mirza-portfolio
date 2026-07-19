"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * When `/cv?print=1` is opened (from the nav Print button), trigger the
 * browser print dialog after the CV has painted.
 */
export default function AutoPrint() {
    const searchParams = useSearchParams();
    const shouldPrint = searchParams.get("print") === "1";

    useEffect(() => {
        if (!shouldPrint) return;
        const timer = window.setTimeout(() => {
            window.print();
            // Drop the query so refreshing doesn't re-open the dialog.
            const url = new URL(window.location.href);
            url.searchParams.delete("print");
            window.history.replaceState({}, "", url.pathname);
        }, 350);
        return () => window.clearTimeout(timer);
    }, [shouldPrint]);

    return null;
}
