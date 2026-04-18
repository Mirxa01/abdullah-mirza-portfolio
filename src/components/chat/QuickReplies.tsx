"use client";

import { motion } from "framer-motion";
import { MessageCircle, Send, RotateCcw, Download, Copy } from "lucide-react";
import type { QuickReply } from "@/lib/chat/types";

interface Props {
    replies: QuickReply[];
    onPick: (reply: QuickReply) => void;
    disabled?: boolean;
}

const ICONS: Record<NonNullable<QuickReply["action"]>, React.ReactNode> = {
    whatsapp: <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />,
    send: <Send className="w-3.5 h-3.5" />,
    reset: <RotateCcw className="w-3.5 h-3.5" />,
    download_prd: <Download className="w-3.5 h-3.5" />,
    copy_prd: <Copy className="w-3.5 h-3.5" />,
};

export default function QuickReplies({ replies, onPick, disabled }: Props) {
    if (!replies || replies.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-2 px-1"
        >
            {replies.map((reply, idx) => {
                const isWhatsapp = reply.action === "whatsapp";
                const icon = reply.action ? ICONS[reply.action] : null;
                return (
                    <button
                        key={`${reply.label}-${idx}`}
                        type="button"
                        disabled={disabled}
                        onClick={() => onPick(reply)}
                        className={`group inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                            isWhatsapp
                                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-400/50"
                                : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white"
                        }`}
                    >
                        {icon}
                        <span className="truncate max-w-[180px]">{reply.label}</span>
                    </button>
                );
            })}
        </motion.div>
    );
}
