/**
 * Type definitions for the AI chat agent.
 * Shared between the API route, the ChatWidget UI, and the pricing/PRD engines.
 */
import type { Service } from "../types";

/** A single chat message in the conversation log. */
export interface ChatMessage {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    /** Optional structured payloads attached to an assistant turn */
    quote?: Quote;
    prd?: PRDPayload;
    createdAt: number;
}

/** Quick-reply chip suggested by the assistant or backend. */
export interface QuickReply {
    label: string;
    value: string;
    /** Optional intent — UI can route to a special action instead of sending a message */
    action?: "send" | "whatsapp" | "reset" | "download_prd" | "copy_prd";
    icon?: string;
}

/** Conversation phase used to drive context-aware quick replies. */
export type ChatPhase =
    | "greet"
    | "discover"
    | "scope"
    | "estimate"
    | "prd"
    | "handoff";

/** Project type id (matches Service.id from data.ts). */
export type ProjectType = Service["id"];

/** Complexity tier the visitor selects. */
export type ComplexityTier = "MVP" | "Standard" | "Enterprise";

/** Structured project brief — accumulated across the conversation. */
export interface ProjectBrief {
    projectType?: ProjectType;
    title?: string;
    summary?: string;
    targetUsers?: string;
    features?: string[];
    integrations?: string[];
    timeline?: "ASAP" | "1-3 months" | "3-6 months" | "Flexible";
    budget?: string;
    languages?: string[];
    complexity?: ComplexityTier;
    whiteLabel?: boolean;
    notes?: string;
}

/** Single line in the price breakdown. */
export interface QuoteBreakdownItem {
    label: string;
    /** Multiplier applied (e.g. 1.1 for +10%) or fixed USD amount */
    impact: string;
    delta?: number; // USD
}

/** Output of the pricing engine. */
export interface Quote {
    projectType: ProjectType;
    complexity: ComplexityTier;
    usd: { min: number; max: number };
    sar: { min: number; max: number };
    weeks: { min: number; max: number };
    breakdown: QuoteBreakdownItem[];
    assumptions: string[];
    serviceTitle: string;
}

/** Output of the PRD generator. */
export interface PRDPayload {
    markdown: string;
    summary: string; // short summary for WhatsApp
    filename: string;
}

/** Request body for /api/chat. */
export interface ChatRequest {
    messages: Array<Pick<ChatMessage, "role" | "content">>;
    brief: ProjectBrief;
}

/** Response body for /api/chat (non-streaming). */
export interface ChatResponse {
    message: string;
    phase: ChatPhase;
    suggestedReplies: QuickReply[];
    brief: ProjectBrief;
    quote?: Quote;
    prd?: PRDPayload;
    fallback?: boolean; // true when running rule-based mode (no API key)
}
