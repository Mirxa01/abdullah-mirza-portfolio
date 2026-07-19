"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    startTransition,
} from "react";
import dynamic from "next/dynamic";
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
import QuickReplies from "./QuickReplies";
import { useToast } from "../ToastProvider";
import { CHAT_LIMITS } from "@/lib/chat/validate";
import { GREETING_MESSAGE } from "@/lib/chat/systemPrompt";

/** Lazy — react-markdown + remark-gfm are heavy; keep them off the FAB click path. */
const ChatMessage = dynamic(() => import("./ChatMessage"), {
    ssr: false,
    loading: () => (
        <div className="flex justify-start px-1 py-2">
            <div className="h-16 w-[70%] rounded-2xl bg-white/5 animate-pulse" />
        </div>
    ),
});

const STORAGE_KEY = "abdullah_chat_v1";
const MAX_INPUT = CHAT_LIMITS.MAX_CONTENT_LENGTH;

const DEFAULT_QUICK_REPLIES: QuickReply[] = [
    { label: "Get a price estimate", value: "I'd like a price estimate" },
    { label: "Brainstorm my idea", value: "Help me brainstorm" },
    {
        label: "Skip — WhatsApp Abdullah",
        value: "open_whatsapp",
        action: "whatsapp",
    },
];

interface PersistedState {
    messages: ChatMessageType[];
    brief: ProjectBrief;
    phase: ChatPhase;
    suggestedReplies: QuickReply[];
}

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

function seedGreeting(): ChatMessageType {
    return {
        id: uid(),
        role: "assistant",
        content: GREETING_MESSAGE,
        createdAt: Date.now(),
    };
}

export default function ChatWidget() {
    const { addToast } = useToast();
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
    /** True when the API is running in rule-based mode (no OpenAI key / provider error). */
    const [isFallbackMode, setIsFallbackMode] = useState(false);

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
    // Hydration must run in an effect: localStorage is unavailable during SSR,
    // so lazy useState initializers would cause a server/client mismatch.
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const persisted = JSON.parse(raw) as PersistedState;
                /* eslint-disable react-hooks/set-state-in-effect -- one-shot hydration from persisted client storage */
                setMessages(persisted.messages || []);
                setBrief(persisted.brief || {});
                setPhase(persisted.phase || "greet");
                setSuggestedReplies(persisted.suggestedReplies || []);
                /* eslint-enable react-hooks/set-state-in-effect */
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
                const anyVisible = Array.from(visibility.values()).some((r) => r > 0.08);
                setHideFab(anyVisible);
            },
            { threshold: [0, 0.08, 0.25, 0.5], rootMargin: "0px 0px -18% 0px" }
        );
        targets.forEach((t) => obs.observe(t));
        return () => obs.disconnect();
    }, []);

    // ----- Initial greeting — local seed first (INP), API only refreshes fallback flag
    const fetchInitial = useCallback(async () => {
        try {
            const res = await fetch("/api/chat", { method: "GET" });
            const data: ChatResponse = await res.json();
            startTransition(() => {
                setIsFallbackMode(Boolean(data.fallback));
                // Only replace local seed if the server greeting differs meaningfully
                // and we still only have the single greeting turn.
                setMessages((prev) => {
                    if (prev.length !== 1 || prev[0]?.role !== "assistant") return prev;
                    if (prev[0].content === data.message) return prev;
                    return [
                        {
                            id: prev[0].id,
                            role: "assistant",
                            content: data.message,
                            createdAt: prev[0].createdAt,
                        },
                    ];
                });
                if (data.suggestedReplies?.length) {
                    setSuggestedReplies(data.suggestedReplies);
                }
                if (data.phase) setPhase(data.phase);
            });
        } catch {
            startTransition(() => setIsFallbackMode(true));
        }
    }, []);

    useEffect(() => {
        if (!open || !hasInitialized) return;
        // Soft refresh after panel is open — never blocks the open click.
        const t = window.setTimeout(() => {
            void fetchInitial();
        }, 0);
        return () => window.clearTimeout(t);
    }, [open, hasInitialized, fetchInitial]);

    // ----- Defer heavy message list until after the panel shell paints (INP)
    const [messagesReady, setMessagesReady] = useState(false);
    useEffect(() => {
        if (!open) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- reset when closed
            setMessagesReady(false);
            return;
        }
        let cancelled = false;
        const id = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (!cancelled) setMessagesReady(true);
            });
        });
        return () => {
            cancelled = true;
            cancelAnimationFrame(id);
        };
    }, [open]);

    // ----- Open handler — keep the click path cheap: no Framer, no await, seed locally
    const handleOpen = useCallback(() => {
        setUnreadHint(false);
        setMessages((prev) => {
            if (prev.length > 0) return prev;
            return [seedGreeting()];
        });
        setSuggestedReplies((prev) =>
            prev.length > 0 ? prev : DEFAULT_QUICK_REPLIES,
        );
        setOpen(true);
    }, []);

    // ----- Send message
    const sendMessage = useCallback(
        async (content: string) => {
            const trimmed = content.trim().slice(0, MAX_INPUT);
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
                // Only forward user/assistant turns — system prompts are server-owned.
                const payload: ChatRequest = {
                    messages: newMessages
                        .filter((m) => m.role === "user" || m.role === "assistant")
                        .slice(-CHAT_LIMITS.MAX_MESSAGES)
                        .map((m) => ({
                            role: m.role as "user" | "assistant",
                            content: m.content,
                        })),
                    brief,
                };
                const res = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                let data: ChatResponse & { error?: string };
                try {
                    data = (await res.json()) as ChatResponse & { error?: string };
                } catch {
                    throw new Error("Invalid response");
                }

                if (res.status === 429) {
                    const rateMsg: ChatMessageType = {
                        id: uid(),
                        role: "assistant",
                        content:
                            data.message ||
                            "Too many requests. Please slow down — or message Abdullah directly on WhatsApp.",
                        createdAt: Date.now(),
                    };
                    setMessages((m) => [...m, rateMsg]);
                    setSuggestedReplies(
                        data.suggestedReplies?.length
                            ? data.suggestedReplies
                            : [
                                  {
                                      label: "WhatsApp Abdullah",
                                      value: "open_whatsapp",
                                      action: "whatsapp",
                                  },
                              ],
                    );
                    setIsFallbackMode(true);
                    return;
                }

                if (!res.ok) {
                    const errMsg: ChatMessageType = {
                        id: uid(),
                        role: "assistant",
                        content:
                            data.error ||
                            data.message ||
                            "Hmm — something went wrong on my side. You can WhatsApp Abdullah while I recover.",
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
                    return;
                }

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
                setIsFallbackMode(Boolean(data.fallback));
            } catch {
                const errMsg: ChatMessageType = {
                    id: uid(),
                    role: "assistant",
                    content:
                        "I couldn't reach the server just now. WhatsApp Abdullah anytime — he'll pick it up from there.",
                    createdAt: Date.now(),
                };
                setMessages((m) => [...m, errMsg]);
                setIsFallbackMode(true);
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
        [messages, brief, isSending],
    );

    // ----- Reset
    const handleReset = () => {
        const greeting = seedGreeting();
        setMessages([greeting]);
        setBrief({});
        setPhase("greet");
        setSuggestedReplies(DEFAULT_QUICK_REPLIES);
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
            if (!prd) {
                addToast("No PRD available to copy yet.", "info");
                return;
            }
            void navigator.clipboard.writeText(prd.markdown).then(
                () => addToast("PRD copied to clipboard.", "success"),
                () => addToast("Could not copy PRD. Please try Download instead.", "error"),
            );
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
            {/* FAB — native button (no Framer whileTap/AnimatePresence on the click path) */}
            <button
                type="button"
                onClick={handleOpen}
                className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] print:hidden group transition-[opacity,transform] duration-200 ease-out will-change-transform ${
                    open || hideFab
                        ? "opacity-0 scale-90 pointer-events-none"
                        : "opacity-100 scale-100"
                }`}
                style={{
                    marginBottom: "env(safe-area-inset-bottom)",
                    marginRight: "env(safe-area-inset-right)",
                }}
                aria-label="Open chat with Aria, Abdullah's AI assistant"
                aria-hidden={open || hideFab}
                tabIndex={open || hideFab ? -1 : 0}
            >
                <span
                    className="absolute inset-0 rounded-full bg-[var(--color-electric-blue)] blur-2xl opacity-40 group-hover:opacity-70 transition-opacity"
                    aria-hidden="true"
                />
                <span className="relative flex items-center gap-2.5 min-h-11 pl-4 pr-5 py-3 rounded-full bg-gradient-to-br from-[var(--color-electric-blue)] to-purple-600 text-white shadow-[0_10px_30px_rgba(0,102,255,0.45)] border border-white/15 transition-transform duration-150 group-hover:scale-[1.03] group-active:scale-[0.97]">
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
            </button>

            {/* Panel — CSS enter animation; heavy message tree deferred via messagesReady */}
            {open && (
                <>
                    {isMobile && (
                        <div
                            className="fixed inset-0 z-[59] bg-black/60 backdrop-blur-sm print:hidden chat-backdrop-in"
                            onClick={() => setOpen(false)}
                            aria-hidden="true"
                        />
                    )}

                    <div
                        style={panelStyle}
                        className={
                            isMobile
                                ? "z-[60] bg-[#070707] flex flex-col print:hidden chat-panel-in-mobile"
                                : "fixed bottom-6 right-6 z-[60] w-[400px] max-w-[calc(100vw-3rem)] h-[640px] max-h-[calc(100vh-7rem)] rounded-3xl overflow-hidden border border-white/[0.08] bg-gradient-to-b from-[#0e0e0e] to-[#070707] shadow-[0_30px_80px_rgba(0,0,0,0.65)] flex flex-col print:hidden chat-panel-in"
                        }
                        role="dialog"
                        aria-modal="true"
                        aria-label="Chat with Aria"
                    >
                        {/* Header */}
                        <div className="relative shrink-0 px-4 py-3 border-b border-white/[0.06] bg-gradient-to-b from-white/[0.025] to-transparent flex items-center gap-3">
                            <div className="relative shrink-0">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-electric-blue)] to-purple-600 p-[1.5px]">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-black">
                                        <Image
                                            src="/images/profile-hero.png"
                                            alt=""
                                            width={36}
                                            height={36}
                                            sizes="36px"
                                            priority={false}
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
                                    {isFallbackMode && (
                                        <span
                                            className="inline-flex items-center text-[9px] font-bold tracking-[0.08em] uppercase px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30"
                                            title="Running in basic mode without the full AI model"
                                        >
                                            Basic
                                        </span>
                                    )}
                                </div>
                                <div className="text-[11px] text-white/45 truncate">
                                    {isFallbackMode
                                        ? "Basic mode · WhatsApp always available"
                                        : "Abdullah's assistant · replies instantly"}
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="inline-flex items-center justify-center min-w-11 min-h-11 p-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                                aria-label="Reset conversation"
                                title="Reset conversation"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="inline-flex items-center justify-center min-w-11 min-h-11 p-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
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
                            {!messagesReady ? (
                                <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4">
                                    <Loader2 className="w-5 h-5 text-white/40 animate-spin" />
                                    <p className="text-xs text-white/40">Opening…</p>
                                </div>
                            ) : (
                                <>
                                    {messages.map((m) => (
                                        <ChatMessage key={m.id} message={m} />
                                    ))}

                                    {isSending && (
                                        <div className="flex items-center gap-2 px-3 py-2">
                                            <div className="flex gap-1">
                                                {[0, 1, 2].map((i) => (
                                                    <span
                                                        key={i}
                                                        className="w-2 h-2 rounded-full bg-white/40 chat-dot-bounce"
                                                        style={{ animationDelay: `${i * 0.15}s` }}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[11px] text-white/40">
                                                Aria is thinking...
                                            </span>
                                        </div>
                                    )}

                                    {!isSending && suggestedReplies.length > 0 && (
                                        <QuickReplies
                                            replies={suggestedReplies}
                                            onPick={handleQuickReply}
                                        />
                                    )}
                                </>
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
                                        Prefer a human chat?
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
                        <div className="shrink-0 border-t border-white/10 p-3 bg-black/40">
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
                                    onClick={() => void sendMessage(input)}
                                    disabled={!input.trim() || isSending}
                                    className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[var(--color-electric-blue)] to-purple-600 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(0,102,255,0.5)] transition-shadow"
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
                    </div>
                </>
            )}
        </>
    );
}
