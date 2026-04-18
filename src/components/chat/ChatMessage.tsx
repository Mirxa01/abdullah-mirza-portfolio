"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "@/lib/chat/types";
import QuoteCard from "./QuoteCard";
import PRDPreview from "./PRDPreview";

interface Props {
    message: ChatMessageType;
}

export default function ChatMessage({ message }: Props) {
    const isUser = message.role === "user";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
        >
            {!isUser && (
                <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-electric-blue)] to-purple-600 p-[2px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                        <Image
                            src="/images/profile-hero.png"
                            alt="Aria"
                            width={32}
                            height={32}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            )}

            <div
                className={`max-w-[85%] flex flex-col gap-2 ${isUser ? "items-end" : "items-start"}`}
            >
                <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed break-words ${
                        isUser
                            ? "bg-[var(--color-electric-blue)] text-white rounded-br-sm"
                            : "bg-white/5 text-white border border-white/10 rounded-bl-sm"
                    }`}
                >
                    <div className="prose prose-sm prose-invert max-w-none [&>p]:my-1 [&>ul]:my-1 [&>ol]:my-1 [&_strong]:text-white [&_a]:text-[var(--color-muted-gold)]">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                        </ReactMarkdown>
                    </div>
                </div>

                {message.quote && <QuoteCard quote={message.quote} />}
                {message.prd && <PRDPreview prd={message.prd} />}
            </div>

            {isUser && (
                <div className="shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white/60" />
                </div>
            )}
        </motion.div>
    );
}
