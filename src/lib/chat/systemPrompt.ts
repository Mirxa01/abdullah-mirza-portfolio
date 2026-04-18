/**
 * System prompt + tool schemas for the AI chat agent.
 * Defines Abdullah's persona, conversation rules, and the function tools
 * the model can invoke (compute_quote, generate_prd).
 */
import { services, WHATSAPP_DISPLAY } from "../data";

export const SYSTEM_PROMPT = `You are **Aria**, the AI assistant for Abdullah Mirza — a serial entrepreneur and full-stack engineer based in Riyadh, Saudi Arabia, with 11+ years of experience building AI-driven platforms, logistics infrastructure, e-commerce, and SaaS products.

# Your role
- Greet visitors warmly and discover what they want to build.
- Help them brainstorm and refine their project idea.
- Collect a structured project brief: project type, summary, target users, features, integrations, timeline, complexity, and language requirements.
- When you have enough information, call the \`compute_quote\` tool to give them a price estimate (in USD + SAR).
- After they see the quote, offer to call \`generate_prd\` to produce a downloadable Product Requirements Document.
- At any moment, offer them the option to skip and connect directly with Abdullah via WhatsApp at ${WHATSAPP_DISPLAY}.

# Tone
- Confident, warm, professional. Concise — usually 1–3 short paragraphs per turn.
- Use bullet lists when helpful. Avoid emojis unless the user uses them first.
- Speak as a partner, not a salesperson. Ask thoughtful clarifying questions.

# Conversation flow (phases)
1. **greet** — welcome, offer 3 paths (quote / brainstorm / WhatsApp).
2. **discover** — identify project type from these options: ${services.map((s) => s.title).join(", ")}.
3. **scope** — collect features, target users, timeline, complexity (MVP / Standard / Enterprise).
4. **estimate** — call \`compute_quote\` and explain the result.
5. **prd** — offer to generate PRD via \`generate_prd\`.
6. **handoff** — point them to WhatsApp for next steps.

# Rules
- Always think about what the next quick-reply suggestions should be (you'll return them in the suggestedReplies array).
- Never invent prices — always use the \`compute_quote\` tool for any number.
- If the user asks something off-topic (jokes, general AI questions), gently steer back to their project.
- If they're ready to just talk to Abdullah, give them the WhatsApp link directly.
- Be honest if you don't know something — offer to connect them with Abdullah.

# Output format
You must respond with valid JSON matching this schema:
{
  "message": "your reply to the user (markdown allowed)",
  "phase": "greet" | "discover" | "scope" | "estimate" | "prd" | "handoff",
  "briefUpdates": { ...partial ProjectBrief fields you learned this turn },
  "suggestedReplies": [{"label": "...", "value": "...", "action"?: "send"|"whatsapp"|"reset"|"download_prd"|"copy_prd"}],
  "callTool"?: "compute_quote" | "generate_prd"
}

Always include 2–4 suggestedReplies. Keep each label under 30 characters. Always include at least one WhatsApp option in later phases.`;

/** OpenAI chat completion JSON schema for response_format. */
export const RESPONSE_JSON_SCHEMA = {
    type: "json_schema" as const,
    json_schema: {
        name: "chat_turn",
        strict: true,
        schema: {
            type: "object",
            additionalProperties: false,
            properties: {
                message: { type: "string" },
                phase: {
                    type: "string",
                    enum: ["greet", "discover", "scope", "estimate", "prd", "handoff"],
                },
                briefUpdates: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        projectType: {
                            type: ["string", "null"],
                            enum: [
                                "landing",
                                "web_app",
                                "mobile_app",
                                "ai_integration",
                                "automation",
                                "ecommerce",
                                "saas",
                                null,
                            ],
                        },
                        title: { type: ["string", "null"] },
                        summary: { type: ["string", "null"] },
                        targetUsers: { type: ["string", "null"] },
                        features: {
                            type: ["array", "null"],
                            items: { type: "string" },
                        },
                        integrations: {
                            type: ["array", "null"],
                            items: { type: "string" },
                        },
                        timeline: {
                            type: ["string", "null"],
                            enum: ["ASAP", "1-3 months", "3-6 months", "Flexible", null],
                        },
                        complexity: {
                            type: ["string", "null"],
                            enum: ["MVP", "Standard", "Enterprise", null],
                        },
                        languages: {
                            type: ["array", "null"],
                            items: { type: "string" },
                        },
                        whiteLabel: { type: ["boolean", "null"] },
                        notes: { type: ["string", "null"] },
                        budget: { type: ["string", "null"] },
                    },
                    required: [
                        "projectType",
                        "title",
                        "summary",
                        "targetUsers",
                        "features",
                        "integrations",
                        "timeline",
                        "complexity",
                        "languages",
                        "whiteLabel",
                        "notes",
                        "budget",
                    ],
                },
                suggestedReplies: {
                    type: "array",
                    minItems: 1,
                    maxItems: 4,
                    items: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            label: { type: "string" },
                            value: { type: "string" },
                            action: {
                                type: ["string", "null"],
                                enum: [
                                    "send",
                                    "whatsapp",
                                    "reset",
                                    "download_prd",
                                    "copy_prd",
                                    null,
                                ],
                            },
                        },
                        required: ["label", "value", "action"],
                    },
                },
                callTool: {
                    type: ["string", "null"],
                    enum: ["compute_quote", "generate_prd", null],
                },
            },
            required: [
                "message",
                "phase",
                "briefUpdates",
                "suggestedReplies",
                "callTool",
            ],
        },
    },
};

/** Greeting message used as the very first assistant turn. */
export const GREETING_MESSAGE = `Hi! I'm **Aria**, Abdullah Mirza's AI assistant.

I can help you in three ways:

- **Get a price estimate** for your project (USD + SAR)
- **Brainstorm your idea** and shape it into a clear PRD
- **Connect you directly** with Abdullah on WhatsApp

How can I help today?`;
