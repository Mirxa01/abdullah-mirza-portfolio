"use client";

import { usePathname } from "next/navigation";
import CustomCursor from "@/components/CustomCursor";
import { ScrollObserver } from "@/components/ScrollObserver";
import { ToastProvider } from "@/components/ToastProvider";
import ChatWidget from "@/components/chat/ChatWidget";

/**
 * Marketing chrome (cursor, chat, toasts, ambient glows) — skipped on `/cv`
 * so the printable resume page stays clean on screen and in print.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isCvPage = pathname === "/cv";

    if (isCvPage) {
        return <div className="cv-shell">{children}</div>;
    }

    return (
        <>
            <ScrollObserver />
            <CustomCursor />
            <div className="glow-effect screen-only" style={{ top: "-10%", left: "-5%" }} />
            <div className="glow-effect screen-only" style={{ top: "40%", right: "-10%" }} />
            <div className="glow-effect screen-only" style={{ bottom: "-5%", left: "20%" }} />
            <ToastProvider>
                {children}
                <div className="screen-only">
                    <ChatWidget />
                </div>
            </ToastProvider>
        </>
    );
}
