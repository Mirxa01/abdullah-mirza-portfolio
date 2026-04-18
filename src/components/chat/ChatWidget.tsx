"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
    MessageCircle,
    X,
    Send,
    Sparkles,
    RotateCcw,
    Loader2,
} from "lucide-react";
import { buildWhatsappLink, WHATSAPP_DISPLAY } from "@/lib/data";
import type {
    ChatMessage as ChatMessageType,
    ChatPhase,
    ChatRequest,
    ChatResponse,
    ProjectBrief,
    QuickReply,
} from "@/lib/chat/types";
import ChatMessage from "./ChatMessage";
import QuickReplies from "./QuickReplies";

const STORAGE_KEY = "abdullah_chat_v1";
const MAX_INPUT = 800;

interface PersistedState {
    messages: ChatMessageType[];
    brief: ProjectBrief;
    phase: ChatPhase;
    suggestedReplies: QuickReply[];
}

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [brief, setBrief] = useState<ProjectBrief>({});
    const [phase, setPhase] = useState<ChatPhase>("greet");
    const [suggestedReplies, setSuggestedReplies] = useState<QuickReply[]>([]);
    const [input, setInput] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [unreadHint, setUnreadHint] = useState(true);
    const [hasInitialized, setHasInitialized] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const lastPRDRef = useRef<ChatMessageType["prd"] | null>(null);

    // ----- Mobile detection
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // ----- Restore from localStorage
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const persisted = JSON.parse(raw) as PersistedState;
                setMessages(persisted.messages || []);
                setBrief(persisted.brief || {});
                setPhase(persisted.phase || "greet");
                setSuggestedReplies(persisted.suggestedReplies || []);
                const lastPrdMsg = [...(persisted.messages || [])]
                    .reverse()
                    .find((m) => m.prd);
                if (lastPrdMsg?.prd) lastPRDRef.current = lastPrdMsg.prd;
            }
        } catch {
            // ignore
        } finally {
            setHasInitialized(true);
        }
    }, []);

    // ----- Persist on changes
    useEffect(() => {
        if (!hasInitialized) return;
        try {
            const data: PersistedState = {
                messages,
                brief,
                phase,
                suggestedReplies,
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch {
            // ignore quota errors
        }
    }, [messages, brief, phase, suggestedReplies, hasInitialized]);

    // ----- Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isSending, suggestedReplies]);

    // ----- Lock body scroll on mobile when open
    useEffect(() => {
        if (!open || !isMobile) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open, isMobile]);

    // ----- Esc to close (desktop only)
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    // ----- Hide FAB while Contact section OR Footer is in view (avoid overlap)
    const [hideFab, setHideFab] = useState(false);
    useEffect(() => {
        if (typeof IntersectionObserver === "undefined") return;
        const targets = [
            document.getElementById("contact"),
            document.getElementById("site-footer"),
        ].filter((el): el is HTMLElement => Boolean(el));
        if (targets.length === 0) return;

        const visibility = new Map<Element, number>();
        const obs = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    visibility.set(entry.target, entry.intersectionRatio);
                }
                const anyVisible = Array.from(visibility.values()).some((r) => r > 0.25);
                setHideFab(anyVisible);
            },
            { threshold: [0, 0.25, 0.5, 0.75] }
        );
        targets.forEach((t) => obs.observe(t));
        return () => obs.disconnect();
    }, []);

    // ----- Initial greeting fetch (only when first opened with empty state)
    const fetchInitial = useCallback(async () => {
        try {
            const res = await fetch("/api/chat", { method: "GET" });
            const data: ChatResponse = await res.json();
            const greeting: ChatMessageType = {
                id: uid(),
                role: "assistant",
                content: data.message,
                createdAt: Date.now(),
            };
            setMessages([greeting]);
            setPhase(data.phase);
            setSuggestedReplies(data.suggestedReplies);
        } catch {
            const fallback: ChatMessageType = {
                id: uid(),
                role: "assistant",
                content:
                    "Hi! I'm Aria, Abdullah's AI assistant. How can I help — get a quote, brainstorm, or chat directly?",
                createdAt: Date.now(),
            };
            setMessages([fallback]);
            setPhase("greet");
            setSuggestedReplies([
                { label: "Get a price estimate", value: "I'd like a price estimate" },
                { label: "Brainstorm my idea", value: "Help me brainstorm" },
                {
                    label: "Skip — WhatsApp Abdullah",
                    value: "open_whatsapp",
                    action: "whatsapp",
                },
            ]);
        }
    }, []);

    useEffect(() => {
        if (open && hasInitialized && messages.length === 0 && !isSending) {
            void fetchInitial();
        }
    }, [open, hasInitialized, messages.length, isSending, fetchInitial]);

    // ----- Open handler
    const handleOpen = () => {
        setOpen(true);
        setUnreadHint(false);
    };

    // ----- Send message
    const sendMessage = useCallback(
        async (content: string) => {
            const trimmed = content.trim();
            if (!trimmed || isSending) return;

            const userMsg: ChatMessageType = {
                id: uid(),
                role: "user",
                content: trimmed,
                createdAt: Date.now(),
            };
            const newMessages = [...messages, userMsg];
            setMessages(newMessages);
            setInput("");
            setSuggestedReplies([]);
            setIsSending(true);

            try {
                const payload: ChatRequest = {
                    messages: newMessages.map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                    brief,
                };
                const res = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                const data: ChatResponse = await res.json();

                const assistant: ChatMessageType = {
                    id: uid(),
                    role: "assistant",
                    content: data.message,
                    quote: data.quote,
                    prd: data.prd,
                    createdAt: Date.now(),
                };
                if (data.prd) lastPRDRef.current = data.prd;

                setMessages((m) => [...m, assistant]);
                setBrief(data.brief);
                setPhase(data.phase);
                setSuggestedReplies(data.suggestedReplies);
            } catch {
                const errMsg: ChatMessageType = {
                    id: uid(),
                    role: "assistant",
                    content:
                        "Sorry — I couldn't reach the server. You can WhatsApp Abdullah directly while I'm offline.",
                    createdAt: Date.now(),
                };
                setMessages((m) => [...m, errMsg]);
                setSuggestedReplies([
                    {
                        label: "WhatsApp Abdullah",
                        value: "open_whatsapp",
                        action: "whatsapp",
                    },
                ]);
            } finally {
                setIsSending(false);
            }
        },
        [messages, brief, isSending]
    );

    // ----- Reset
    const handleReset = () => {
        setMessages([]);
        setBrief({});
        setPhase("greet");
        setSuggestedReplies([]);
        lastPRDRef.current = null;
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {
            // ignore
        }
        void fetchInitial();
    };

    // ----- Quick reply handler — routes to special actions or sends as a message
    const handleQuickReply = (reply: QuickReply) => {
        if (reply.action === "whatsapp") {
            window.open(buildWhatsappLink(), "_blank", "noopener,noreferrer");
            return;
        }
        if (reply.action === "reset") {
            handleReset();
            return;
        }
        if (reply.action === "download_prd") {
            const prd = lastPRDRef.current;
            if (prd) {
                const blob = new Blob([prd.markdown], {
                    type: "text/markdown;charset=utf-8",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = prd.filename;
                a.click();
                URL.revokeObjectURL(url);
            }
            return;
        }
        if (reply.action === "copy_prd") {
            const prd = lastPRDRef.current;
            if (prd) void navigator.clipboard.writeText(prd.markdown);
            return;
        }
        void sendMessage(reply.value);
    };

    // ----- Auto-grow textarea
    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
    }, [input]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void sendMessage(input);
        }
    };

    const panelStyle = useMemo<React.CSSProperties>(() => {
        if (isMobile) {
            return {
                position: "fixed",
                inset: 0,
                paddingTop: "env(safe-area-inset-top)",
                paddingBottom: "env(safe-area-inset-bottom)",
            };
        }
        return {};
    }, [isMobile]);

    return (
        <>
            {/* Floating Action Button */}
            <AnimatePresence>
                {!open && (
                    <motion.button
                        key="fab"
                        type="button"
                        onClick={handleOpen}
                        initial={{ opacity: 0, scale: 0.6, y: 20 }}
                        animate={{
                            opacity: hideFab ? 0 : 1,
                            scale: hideFab ? 0.6 : 1,
                            y: 0,
                            pointerEvents: hideFab ? "none" : "auto",
                        }}
                        exit={{ opacity: 0, scale: 0.6, y: 20 }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] print:hidden group"
                        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
                        aria-label="Open chat with Aria, Abdullah's AI assistant"
                    >
                        <span className="absolute inset-0 rounded-full bg-[var(--color-electric-blue)] blur-2xl opacity-40 group-hover:opacity-70 transition-opacity" />
                        <span className="relative flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-full bg-gradient-to-br from-[var(--color-electric-blue)] to-purple-600 text-white shadow-[0_10px_30px_rgba(0,102,255,0.45)] border border-white/15">
                            <span className="relative flex w-5 h-5 items-center justify-center">
                                <MessageCircle className="w-5 h-5" />
                                {unreadHint && (
                                    <span className="absolute -top-1 -right-1 flex w-2.5 h-2.5">
                                        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping" />
                                        <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0066ff]" />
                                    </span>
                                )}
                            </span>
                            <span className="hidden sm:inline text-sm font-bold tracking-tight">
                                Chat with Aria
                            </span>
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Panel / Full-screen sheet */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Mobile backdrop */}
                        {isMobile && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[59] bg-black/60 backdrop-blur-sm print:hidden"
                                onClick={() => setOpen(false)}
                            />
                        )}

                        <motion.div
                            key="panel"
                            initial={
                                isMobile
                                    ? { opacity: 0, y: "100%" }
                                    : { opacity: 0, y: 20, scale: 0.96 }
                            }
                            animate={
                                isMobile
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 1, y: 0, scale: 1 }
                            }
                            exit={
                                isMobile
                                    ? { opacity: 0, y: "100%" }
                                    : { opacity: 0, y: 20, scale: 0.96 }
                            }
                            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                            style={panelStyle}
                            className={
                                isMobile
                                    ? "z-[60] bg-[#070707] flex flex-col print:hidden"
                                    : "fixed bottom-6 right-6 z-[60] w-[400px] max-w-[calc(100vw-3rem)] h-[640px] max-h-[calc(100vh-7rem)] rounded-3xl overflow-hidden border border-white/[0.08] bg-gradient-to-b from-[#0e0e0e] to-[#070707] shadow-[0_30px_80px_rgba(0,0,0,0.65)] flex flex-col print:hidden"
                            }
                            role="dialog"
                            aria-modal="true"
                            aria-label="Chat with Aria"
                        >
                            {/* Header */}
                            <div className="relative shrink-0 px-4 py-3 border-b border-white/[0.06] bg-gradient-to-b from-white/[0.025] to-transparent backdrop-blur-md flex items-center gap-3">
                                <div className="relative shrink-0">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-electric-blue)] to-purple-600 p-[1.5px]">
                                        <div className="w-full h-full rounded-full overflow-hidden bg-black">
                                            <Image
                                                src="/images/profile-hero.png"
                                                alt="Abdullah Mirza"
                                                width={40}
                                                height={40}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#070707]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-sm font-semibold text-white truncate">
                                            Aria
                                        </span>
                                        <span className="inline-flex items-center gap-0.5 text-[9px] font-bold tracking-[0.12em] uppercase px-1.5 py-0.5 rounded-full bg-[var(--color-electric-blue)]/12 text-[var(--color-electric-blue)] border border-[var(--color-electric-blue)]/25">
                                            <Sparkles className="w-2.5 h-2.5" />
                                            AI
                                        </span>
                                    </div>
                                    <div className="text-[11px] text-white/45 truncate">
                                        Abdullah&apos;s assistant · replies instantly
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                                    aria-label="Reset conversation"
                                    title="Reset conversation"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                    aria-label="Close chat"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-4 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.1)_transparent]"
                            >
                                {messages.length === 0 && !isSending && (
                                    <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4">
                                        <Loader2 className="w-5 h-5 text-white/40 animate-spin" />
                                        <p className="text-xs text-white/40">
                                            Loading conversation...
                                        </p>
                                    </div>
                                )}

                                {messages.map((m) => (
                                    <ChatMessage key={m.id} message={m} />
                                ))}

                                {isSending && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center gap-2 px-3 py-2"
                                    >
                                        <div className="flex gap-1">
                                            {[0, 1, 2].map((i) => (
                                                <motion.span
                                                    key={i}
                                                    className="w-2 h-2 rounded-full bg-white/40"
                                                    animate={{ y: [0, -4, 0] }}
                                                    transition={{
                                                        duration: 0.8,
                                                        repeat: Infinity,
                                                        delay: i * 0.15,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-[11px] text-white/40">
                                            Aria is thinking...
                                        </span>
                                    </motion.div>
                                )}

                                {!isSending && suggestedReplies.length > 0 && (
                                    <QuickReplies
                                        replies={suggestedReplies}
                                        onPick={handleQuickReply}
                                    />
                                )}
                            </div>

                            {/* WhatsApp CTA strip */}
                            <a
                                href={buildWhatsappLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mx-3 sm:mx-4 mb-2 flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/30 transition-colors"
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <div className="min-w-0">
                                        <div className="text-[11px] font-bold text-emerald-300 truncate">
                                            Prefer to skip the bot?
                                        </div>
                                        <div className="text-[10px] text-white/50 truncate">
                                            WhatsApp Abdullah · {WHATSAPP_DISPLAY}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[11px] font-bold text-emerald-400 shrink-0">
                                    Chat now →
                                </span>
                            </a>

                            {/* Composer */}
                            <div className="shrink-0 border-t border-white/10 p-3 bg-black/40 backdrop-blur-md">
                                <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-[var(--color-electric-blue)]/60 focus-within:shadow-[0_0_0_3px_rgba(0,102,255,0.15)] transition-all">
                                    <textarea
                                        ref={textareaRef}
                                        value={input}
                                        onChange={(e) =>
                                            setInput(e.target.value.slice(0, MAX_INPUT))
                                        }
                                        onKeyDown={handleKeyDown}
                                        placeholder="Tell me about your project..."
                                        rows={1}
                                        disabled={isSending}
                                        className="flex-1 bg-transparent resize-none outline-none text-sm text-white placeholder:text-white/30 max-h-[140px] py-1.5 leading-snug disabled:opacity-50"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => sendMessage(input)}
                                        disabled={!input.trim() || isSending}
                                        className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-electric-blue)] to-purple-600 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(0,102,255,0.5)] transition-shadow"
                                        aria-label="Send message"
                                    >
                                        {isSending ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Send className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                <div className="flex items-center justify-between mt-1.5 px-1">
                                    <span className="text-[10px] text-white/30">
                                        Enter to send · Shift+Enter for newline
                                    </span>
                                    <span className="text-[10px] text-white/30 tabular-nums">
                                        {input.length}/{MAX_INPUT}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
