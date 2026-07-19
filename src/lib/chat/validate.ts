/**
 * Runtime validation for `/api/chat` request bodies.
 *
 * Never trust the client: roles, content length, and brief shape are checked
 * before any model call, pricing, or PRD generation runs.
 */
import type {
    ChatPhase,
    ChatRequest,
    ComplexityTier,
    ProjectBrief,
    ProjectType,
} from "./types";

/** Mirrors the client composer cap in ChatWidget. */
export const CHAT_LIMITS = {
    MAX_MESSAGES: 20,
    MAX_CONTENT_LENGTH: 800,
    MAX_TITLE_LENGTH: 120,
    MAX_SUMMARY_LENGTH: 2000,
    MAX_NOTES_LENGTH: 2000,
    MAX_TARGET_USERS_LENGTH: 500,
    MAX_BUDGET_LENGTH: 80,
    MAX_FEATURES: 30,
    MAX_FEATURE_LENGTH: 120,
    MAX_INTEGRATIONS: 20,
    MAX_INTEGRATION_LENGTH: 80,
    MAX_LANGUAGES: 10,
    MAX_LANGUAGE_LENGTH: 40,
} as const;

const PROJECT_TYPES: readonly ProjectType[] = [
    "landing",
    "web_app",
    "mobile_app",
    "ai_integration",
    "automation",
    "ecommerce",
    "saas",
] as const;

const COMPLEXITY_TIERS: readonly ComplexityTier[] = ["MVP", "Standard", "Enterprise"] as const;

const TIMELINES: readonly NonNullable<ProjectBrief["timeline"]>[] = [
    "ASAP",
    "1-3 months",
    "3-6 months",
    "Flexible",
] as const;

const ALLOWED_ROLES = new Set(["user", "assistant"]);

export interface ValidatedChatRequest {
    messages: Array<{ role: "user" | "assistant"; content: string }>;
    brief: ProjectBrief;
}

export type ChatValidationResult =
    | { ok: true; value: ValidatedChatRequest }
    | { ok: false; error: string };

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asOptionalString(
    value: unknown,
    maxLength: number,
    field: string,
): { ok: true; value?: string } | { ok: false; error: string } {
    if (value === undefined || value === null) return { ok: true, value: undefined };
    if (typeof value !== "string") {
        return { ok: false, error: `Invalid ${field}.` };
    }
    const trimmed = value.trim();
    if (trimmed.length === 0) return { ok: true, value: undefined };
    if (trimmed.length > maxLength) {
        return { ok: false, error: `${field} is too long.` };
    }
    return { ok: true, value: trimmed };
}

function asStringArray(
    value: unknown,
    maxItems: number,
    maxItemLength: number,
    field: string,
): { ok: true; value?: string[] } | { ok: false; error: string } {
    if (value === undefined || value === null) return { ok: true, value: undefined };
    if (!Array.isArray(value)) {
        return { ok: false, error: `Invalid ${field}.` };
    }
    if (value.length > maxItems) {
        return { ok: false, error: `Too many ${field}.` };
    }
    const out: string[] = [];
    for (const item of value) {
        if (typeof item !== "string") {
            return { ok: false, error: `Invalid ${field} entry.` };
        }
        const trimmed = item.trim();
        if (!trimmed) continue;
        if (trimmed.length > maxItemLength) {
            return { ok: false, error: `${field} entry is too long.` };
        }
        out.push(trimmed);
    }
    return { ok: true, value: out.length > 0 ? out : undefined };
}

function parseBrief(raw: unknown): { ok: true; value: ProjectBrief } | { ok: false; error: string } {
    if (raw === undefined || raw === null) {
        return { ok: true, value: {} };
    }
    if (!isPlainObject(raw)) {
        return { ok: false, error: "Invalid brief." };
    }

    const brief: ProjectBrief = {};

    if (raw.projectType !== undefined && raw.projectType !== null) {
        if (typeof raw.projectType !== "string" || !PROJECT_TYPES.includes(raw.projectType as ProjectType)) {
            return { ok: false, error: "Invalid project type." };
        }
        brief.projectType = raw.projectType as ProjectType;
    }

    if (raw.complexity !== undefined && raw.complexity !== null) {
        if (
            typeof raw.complexity !== "string" ||
            !COMPLEXITY_TIERS.includes(raw.complexity as ComplexityTier)
        ) {
            return { ok: false, error: "Invalid complexity." };
        }
        brief.complexity = raw.complexity as ComplexityTier;
    }

    if (raw.timeline !== undefined && raw.timeline !== null) {
        if (
            typeof raw.timeline !== "string" ||
            !TIMELINES.includes(raw.timeline as NonNullable<ProjectBrief["timeline"]>)
        ) {
            return { ok: false, error: "Invalid timeline." };
        }
        brief.timeline = raw.timeline as NonNullable<ProjectBrief["timeline"]>;
    }

    if (raw.whiteLabel !== undefined && raw.whiteLabel !== null) {
        if (typeof raw.whiteLabel !== "boolean") {
            return { ok: false, error: "Invalid whiteLabel." };
        }
        brief.whiteLabel = raw.whiteLabel;
    }

    const title = asOptionalString(raw.title, CHAT_LIMITS.MAX_TITLE_LENGTH, "title");
    if (!title.ok) return title;
    if (title.value) brief.title = title.value;

    const summary = asOptionalString(raw.summary, CHAT_LIMITS.MAX_SUMMARY_LENGTH, "summary");
    if (!summary.ok) return summary;
    if (summary.value) brief.summary = summary.value;

    const notes = asOptionalString(raw.notes, CHAT_LIMITS.MAX_NOTES_LENGTH, "notes");
    if (!notes.ok) return notes;
    if (notes.value) brief.notes = notes.value;

    const targetUsers = asOptionalString(
        raw.targetUsers,
        CHAT_LIMITS.MAX_TARGET_USERS_LENGTH,
        "targetUsers",
    );
    if (!targetUsers.ok) return targetUsers;
    if (targetUsers.value) brief.targetUsers = targetUsers.value;

    const budget = asOptionalString(raw.budget, CHAT_LIMITS.MAX_BUDGET_LENGTH, "budget");
    if (!budget.ok) return budget;
    if (budget.value) brief.budget = budget.value;

    const features = asStringArray(
        raw.features,
        CHAT_LIMITS.MAX_FEATURES,
        CHAT_LIMITS.MAX_FEATURE_LENGTH,
        "features",
    );
    if (!features.ok) return features;
    if (features.value) brief.features = features.value;

    const integrations = asStringArray(
        raw.integrations,
        CHAT_LIMITS.MAX_INTEGRATIONS,
        CHAT_LIMITS.MAX_INTEGRATION_LENGTH,
        "integrations",
    );
    if (!integrations.ok) return integrations;
    if (integrations.value) brief.integrations = integrations.value;

    const languages = asStringArray(
        raw.languages,
        CHAT_LIMITS.MAX_LANGUAGES,
        CHAT_LIMITS.MAX_LANGUAGE_LENGTH,
        "languages",
    );
    if (!languages.ok) return languages;
    if (languages.value) brief.languages = languages.value;

    return { ok: true, value: brief };
}

/**
 * Validate and normalize a raw JSON body into a safe ChatRequest shape.
 * Rejects system-role injection, oversized content, and malformed briefs.
 */
export function validateChatRequest(body: unknown): ChatValidationResult {
    if (!isPlainObject(body)) {
        return { ok: false, error: "Invalid request body." };
    }

    if (!Array.isArray(body.messages)) {
        return { ok: false, error: "messages must be an array." };
    }

    if (body.messages.length > CHAT_LIMITS.MAX_MESSAGES) {
        return { ok: false, error: "Too many messages." };
    }

    const messages: ValidatedChatRequest["messages"] = [];
    for (const entry of body.messages) {
        if (!isPlainObject(entry)) {
            return { ok: false, error: "Invalid message." };
        }
        const role = entry.role;
        const content = entry.content;
        if (typeof role !== "string" || !ALLOWED_ROLES.has(role)) {
            return { ok: false, error: "Invalid message role." };
        }
        if (typeof content !== "string") {
            return { ok: false, error: "Invalid message content." };
        }
        const trimmed = content.trim();
        if (!trimmed) {
            return { ok: false, error: "Message content cannot be empty." };
        }
        if (trimmed.length > CHAT_LIMITS.MAX_CONTENT_LENGTH) {
            return { ok: false, error: "Message content is too long." };
        }
        messages.push({ role: role as "user" | "assistant", content: trimmed });
    }

    const briefResult = parseBrief(body.brief);
    if (!briefResult.ok) return briefResult;

    return {
        ok: true,
        value: {
            messages,
            brief: briefResult.value,
        },
    };
}

/** Type guard helper used by tests / callers that already have a typed body. */
export function toChatRequest(value: ValidatedChatRequest): ChatRequest {
    return value;
}

export const CHAT_PHASES: readonly ChatPhase[] = [
    "greet",
    "discover",
    "scope",
    "estimate",
    "prd",
    "handoff",
] as const;
