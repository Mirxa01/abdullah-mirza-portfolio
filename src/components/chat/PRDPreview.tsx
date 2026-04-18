"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, Download, FileText, Check, MessageCircle } from "lucide-react";
import { buildWhatsappLink } from "@/lib/data";
import type { PRDPayload } from "@/lib/chat/types";

interface Props {
    prd: PRDPayload;
}

export default function PRDPreview({ prd }: Props) {
    const [copied, setCopied] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleDownload = () => {
        const blob = new Blob([prd.markdown], { type: "text/markdown;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = prd.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(prd.markdown);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // ignore
        }
    };

    const waMessage = `Hi Abdullah, here's a PRD I generated with Aria:\n\n${prd.summary}\n\nCan we discuss next steps?`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="w-full max-w-[420px] rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-white/[0.02] to-[var(--color-electric-blue)]/10 backdrop-blur-md p-4 sm:p-5 shadow-[0_8px_30px_rgba(168,85,247,0.15)]"
        >
            <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-purple-300" />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold tracking-widest text-white/50 uppercase">
                        PRD Generated
                    </div>
                    <div className="text-sm font-semibold text-white truncate" title={prd.filename}>
                        {prd.filename}
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-black/40 border border-white/5 p-3 mb-3 max-h-32 overflow-hidden relative">
                <pre className="text-[10px] text-white/60 font-mono leading-relaxed whitespace-pre-wrap break-words line-clamp-6">
                    {prd.markdown.slice(0, 400)}…
                </pre>
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2">
                <button
                    type="button"
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-white/90 transition-colors"
                >
                    <Download className="w-3.5 h-3.5" />
                    Download
                </button>
                <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 text-white text-xs font-bold border border-white/10 hover:bg-white/15 transition-colors"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            Copied
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy
                        </>
                    )}
                </button>
            </div>

            <a
                href={buildWhatsappLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors"
            >
                <MessageCircle className="w-3.5 h-3.5" />
                Send to Abdullah on WhatsApp
            </a>

            <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="mt-2 w-full text-[11px] text-white/50 hover:text-white/80 transition-colors"
            >
                {expanded ? "Hide preview" : "Preview full PRD"}
            </button>

            {expanded && (
                <div className="mt-2 max-h-[260px] overflow-auto rounded-xl bg-black/40 border border-white/5 p-3">
                    <pre className="text-[10px] text-white/70 font-mono leading-relaxed whitespace-pre-wrap break-words">
                        {prd.markdown}
                    </pre>
                </div>
            )}
        </motion.div>
    );
}
