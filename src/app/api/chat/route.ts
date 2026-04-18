/**
 * AI Chat agent API route.
 *
 * Calls OpenAI (GPT-4o-mini) with structured JSON output to produce a
 * conversation turn including: assistant message, brief updates, suggested
 * quick replies, and an optional tool call (compute_quote / generate_prd).
 *
 * Falls back to a deterministic rule-based responder when OPENAI_API_KEY
 * is missing or the API errors — so the chat always works in the demo.
 */
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { computeQuote } from "@/lib/chat/pricing";
import { generatePRD } from "@/lib/chat/prd";
import { GREETING_MESSAGE, RESPONSE_JSON_SCHEMA, SYSTEM_PROMPT } from "@/lib/chat/systemPrompt";
import type {
    ChatPhase,
    ChatRequest,
    ChatResponse,
    ProjectBrief,
    ProjectType,
    QuickReply,
} from "@/lib/chat/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// Lightweight in-memory rate limiter (per IP)
// 30 requests / 10 minutes — survives within a warm serverless instance.
// ---------------------------------------------------------------------------
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 30;
const ipBuckets = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
    const now = Date.now();
    const arr = (ipBuckets.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
    if (arr.length >= RATE_MAX) {
        ipBuckets.set(ip, arr);
        return false;
    }
    arr.push(now);
    ipBuckets.set(ip, arr);
    return true;
}

function getClientIp(req: NextRequest): string {
    const fwd = req.headers.get("x-forwarded-for");
    if (fwd) return fwd.split(",")[0]?.trim() || "unknown";
    return req.headers.get("x-real-ip") ?? "unknown";
}

// ---------------------------------------------------------------------------
// Brief merge helper — deep-merges new updates onto the existing brief,
// arrays are unioned (deduped).
// ---------------------------------------------------------------------------
function mergeBrief(prev: ProjectBrief, updates: Partial<ProjectBrief>): ProjectBrief {
    const out: ProjectBrief = { ...prev };
    for (const [k, v] of Object.entries(updates)) {
        if (v === null || v === undefined) continue;
        if (Array.isArray(v)) {
            const existing = (out[k as keyof ProjectBrief] as string[] | undefined) ?? [];
            const merged = Array.from(new Set([...existing, ...(v as string[])]));
            (out as Record<string, unknown>)[k] = merged;
        } else {
            (out as Record<string, unknown>)[k] = v;
        }
    }
    return out;
}

// ---------------------------------------------------------------------------
// Rule-based fallback — keyword routing when OpenAI is unavailable.
// Keeps the agent functional with deterministic phase transitions.
// ---------------------------------------------------------------------------
const PROJECT_TYPE_KEYWORDS: Record<ProjectType, RegExp> = {
    landing: /\b(landing|marketing site|website|brochure|portfolio site)\b/i,
    web_app: /\b(web app|webapp|saas|dashboard|portal|admin panel)\b/i,
    mobile_app: /\b(mobile|ios|android|app store|react native|flutter)\b/i,
    ai_integration: /\b(ai|gpt|llm|chatbot|agent|copilot|machine learning)\b/i,
    automation: /\b(automation|n8n|zapier|make|workflow|integrate)\b/i,
    ecommerce: /\b(ecommerce|e-commerce|shop|store|shopify|cart|checkout)\b/i,
    saas: /\b(saas|subscription|multi[- ]tenant|platform)\b/i,
};

function detectProjectType(text: string): ProjectType | undefined {
    for (const [type, re] of Object.entries(PROJECT_TYPE_KEYWORDS) as Array<[ProjectType, RegExp]>) {
        if (re.test(text)) return type;
    }
    return undefined;
}

function detectComplexity(text: string): ProjectBrief["complexity"] {
    if (/\b(enterprise|large scale|fortune|sso|saml|compliance)\b/i.test(text))
        return "Enterprise";
    if (/\b(mvp|prototype|simple|small|quick|lean)\b/i.test(text)) return "MVP";
    if (/\b(standard|production|full)\b/i.test(text)) return "Standard";
    return undefined;
}

function detectTimeline(text: string): ProjectBrief["timeline"] {
    if (/\b(asap|urgent|rush|immediately|next week)\b/i.test(text)) return "ASAP";
    if (/\b(1[- ]?3 months|month or two|6 weeks|two months)\b/i.test(text))
        return "1-3 months";
    if (/\b(3[- ]?6 months|quarter|half year)\b/i.test(text)) return "3-6 months";
    if (/\b(flexible|no rush|whenever)\b/i.test(text)) return "Flexible";
    return undefined;
}

function quickRepliesForPhase(phase: ChatPhase): QuickReply[] {
    const wa: QuickReply = {
        label: "Skip — WhatsApp Abdullah",
        value: "Connect me with Abdullah",
        action: "whatsapp",
    };
    switch (phase) {
        case "greet":
            return [
                { label: "Get a price estimate", value: "I'd like a price estimate for my project" },
                { label: "Brainstorm my idea", value: "Help me brainstorm my project idea" },
                wa,
            ];
        case "discover":
            return [
                { label: "Web app", value: "I want to build a web app" },
                { label: "Mobile app", value: "I want to build a mobile app" },
                { label: "AI integration", value: "I need an AI integration" },
                wa,
            ];
        case "scope":
            return [
                { label: "MVP", value: "Let's start with an MVP" },
                { label: "Standard", value: "I need a standard production build" },
                { label: "Enterprise", value: "I need an enterprise-grade build" },
                wa,
            ];
        case "estimate":
            return [
                { label: "Generate PRD", value: "Generate the PRD for me", action: "send" },
                { label: "Refine scope", value: "Let me refine the scope" },
                wa,
            ];
        case "prd":
            return [
                { label: "Download PRD", value: "download_prd", action: "download_prd" },
                { label: "Copy PRD", value: "copy_prd", action: "copy_prd" },
                { label: "Send to WhatsApp", value: "send_to_whatsapp", action: "whatsapp" },
            ];
        case "handoff":
            return [
                { label: "WhatsApp Abdullah", value: "open_whatsapp", action: "whatsapp" },
                { label: "Start over", value: "reset", action: "reset" },
            ];
    }
}

interface ModelTurn {
    message: string;
    phase: ChatPhase;
    briefUpdates: Partial<ProjectBrief>;
    suggestedReplies: QuickReply[];
    callTool: "compute_quote" | "generate_prd" | null;
}

function ruleBasedTurn(messages: ChatRequest["messages"], brief: ProjectBrief): ModelTurn {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const text = lastUser?.content ?? "";
    const lowered = text.toLowerCase();

    // Empty / first turn
    if (messages.length === 0 || (!lastUser && messages.length <= 1)) {
        return {
            message: GREETING_MESSAGE,
            phase: "greet",
            briefUpdates: {},
            suggestedReplies: quickRepliesForPhase("greet"),
            callTool: null,
        };
    }

    // WhatsApp intent
    if (/\b(whatsapp|call|talk to abdullah|connect)\b/i.test(lowered)) {
        return {
            message: `No problem — Abdullah will be happy to chat directly. Tap the WhatsApp button below to message him.`,
            phase: "handoff",
            briefUpdates: {},
            suggestedReplies: quickRepliesForPhase("handoff"),
            callTool: null,
        };
    }

    const updates: Partial<ProjectBrief> = {};
    const detectedType = detectProjectType(lowered);
    if (detectedType && !brief.projectType) updates.projectType = detectedType;
    const complexity = detectComplexity(lowered);
    if (complexity) updates.complexity = complexity;
    const timeline = detectTimeline(lowered);
    if (timeline) updates.timeline = timeline;

    const merged = mergeBrief(brief, updates);

    // Estimate trigger
    if (
        /\b(estimate|quote|price|cost|how much|budget)\b/i.test(lowered) &&
        merged.projectType
    ) {
        return {
            message: `Here's a price estimate based on what you've shared. Final scope is confirmed during a discovery call.`,
            phase: "estimate",
            briefUpdates: updates,
            suggestedReplies: quickRepliesForPhase("estimate"),
            callTool: "compute_quote",
        };
    }

    // PRD trigger
    if (/\b(prd|requirements|document|spec)\b/i.test(lowered) && merged.projectType) {
        return {
            message: `Generating your PRD now — you can download, copy, or send it to Abdullah on WhatsApp.`,
            phase: "prd",
            briefUpdates: updates,
            suggestedReplies: quickRepliesForPhase("prd"),
            callTool: "generate_prd",
        };
    }

    // Discover phase — no project type yet
    if (!merged.projectType) {
        return {
            message: `Got it. To give you a sharp estimate, what kind of project do you have in mind? You can pick one below or describe it in your own words.`,
            phase: "discover",
            briefUpdates: updates,
            suggestedReplies: quickRepliesForPhase("discover"),
            callTool: null,
        };
    }

    // Scope phase — collect complexity/features/timeline
    if (!merged.complexity || (merged.features?.length ?? 0) === 0) {
        return {
            message: `Great — a ${merged.projectType.replace("_", " ")} project. What scale are we thinking? And what are the must-have features?`,
            phase: "scope",
            briefUpdates: updates,
            suggestedReplies: quickRepliesForPhase("scope"),
            callTool: null,
        };
    }

    // Default: ready to estimate
    return {
        message: `I have enough to give you a price estimate. Want me to compute it?`,
        phase: "estimate",
        briefUpdates: updates,
        suggestedReplies: quickRepliesForPhase("estimate"),
        callTool: null,
    };
}

// ---------------------------------------------------------------------------
// OpenAI invocation
// ---------------------------------------------------------------------------
async function modelTurn(
    messages: ChatRequest["messages"],
    brief: ProjectBrief,
    apiKey: string
): Promise<ModelTurn> {
    const client = new OpenAI({ apiKey });

    const sys = `${SYSTEM_PROMPT}

# Current project brief (so far)
${JSON.stringify(brief, null, 2)}`;

    const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.6,
        max_tokens: 700,
        messages: [
            { role: "system", content: sys },
            ...messages.map((m) => ({
                role: m.role as "user" | "assistant",
                content: m.content,
            })),
        ],
        response_format: RESPONSE_JSON_SCHEMA,
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw) as {
        message: string;
        phase: ChatPhase;
        briefUpdates: Partial<ProjectBrief>;
        suggestedReplies: QuickReply[];
        callTool: "compute_quote" | "generate_prd" | null;
    };

    // Sanitize null values out of briefUpdates
    const cleanUpdates: Partial<ProjectBrief> = {};
    for (const [k, v] of Object.entries(parsed.briefUpdates ?? {})) {
        if (v !== null && v !== undefined) {
            (cleanUpdates as Record<string, unknown>)[k] = v;
        }
    }

    // Sanitize null actions
    const replies = (parsed.suggestedReplies ?? []).map((r) => ({
        ...r,
        action: r.action ?? undefined,
    }));

    return {
        message: parsed.message,
        phase: parsed.phase,
        briefUpdates: cleanUpdates,
        suggestedReplies: replies,
        callTool: parsed.callTool,
    };
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
    const ip = getClientIp(req);
    if (!rateLimit(ip)) {
        return NextResponse.json(
            {
                message:
                    "Too many requests. Please slow down — or message Abdullah directly on WhatsApp.",
                phase: "handoff" as ChatPhase,
                suggestedReplies: quickRepliesForPhase("handoff"),
                brief: {},
                fallback: true,
            } satisfies ChatResponse,
            { status: 429 }
        );
    }

    let body: ChatRequest;
    try {
        body = (await req.json()) as ChatRequest;
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const messages = Array.isArray(body.messages) ? body.messages.slice(-20) : [];
    const brief = body.brief ?? {};

    const apiKey = process.env.OPENAI_API_KEY;

    let turn: ModelTurn;
    let fallback = false;
    if (!apiKey) {
        turn = ruleBasedTurn(messages, brief);
        fallback = true;
    } else {
        try {
            turn = await modelTurn(messages, brief, apiKey);
        } catch (err) {
            console.error("[chat] OpenAI error", err);
            turn = ruleBasedTurn(messages, brief);
            fallback = true;
        }
    }

    const updatedBrief = mergeBrief(brief, turn.briefUpdates);

    const response: ChatResponse = {
        message: turn.message,
        phase: turn.phase,
        suggestedReplies:
            turn.suggestedReplies && turn.suggestedReplies.length > 0
                ? turn.suggestedReplies
                : quickRepliesForPhase(turn.phase),
        brief: updatedBrief,
        fallback,
    };

    // Tool execution
    if (turn.callTool === "compute_quote" && updatedBrief.projectType) {
        response.quote = computeQuote(updatedBrief);
    }
    if (turn.callTool === "generate_prd" && updatedBrief.projectType) {
        const quote = computeQuote(updatedBrief);
        response.quote = quote;
        response.prd = generatePRD(updatedBrief, quote);
    }

    return NextResponse.json(response);
}

/** GET — used by ChatWidget to fetch the initial greeting without a round-trip cost. */
export async function GET() {
    return NextResponse.json({
        message: GREETING_MESSAGE,
        phase: "greet" as ChatPhase,
        suggestedReplies: quickRepliesForPhase("greet"),
        brief: {} as ProjectBrief,
        fallback: !process.env.OPENAI_API_KEY,
    } satisfies ChatResponse);
}
