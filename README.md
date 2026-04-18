# Abdullah Mirza — Portfolio

> Founder-operator portfolio showcasing AI-driven platforms, logistics infrastructure, and scalable commerce ecosystems.

## Tech Stack

| Layer        | Technology                              |
| ------------ | --------------------------------------- |
| Framework    | [Next.js 16](https://nextjs.org/)       |
| Language     | TypeScript 5.9                          |
| UI Library   | React 19                                |
| Styling      | Tailwind CSS 4                          |
| Animations   | Framer Motion 12                        |
| Icons        | Lucide React                            |
| AI           | OpenAI GPT-4o-mini (Aria assistant)     |
| Deployment   | Vercel (via GitHub Actions)             |

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your OPENAI_API_KEY

# Start dev server
pnpm dev

# Open http://localhost:3000
```

## Environment Variables

| Variable          | Required | Description                                                      |
| ----------------- | -------- | ---------------------------------------------------------------- |
| `OPENAI_API_KEY`  | Optional | Powers the Aria AI chat assistant. Falls back to rule-based mode if omitted. |

## AI Chat Assistant — Aria

The portfolio includes **Aria**, an embedded AI agent that talks to visitors,
brainstorms project ideas, and generates a downloadable PRD with **USD + SAR
price estimates**. Visitors can also skip the bot and connect with Abdullah
directly on WhatsApp (+966 59 999 6575).

Key features:

- Floating chat button (mobile: full-screen sheet · desktop: side panel)
- Context-aware quick-reply chips that drive the conversation forward
- Deterministic pricing engine (USD + SAR, with feature/timeline multipliers)
- One-click PRD generation, download (`.md`), copy, and WhatsApp share
- Conversation persistence via `localStorage`
- Per-IP rate limiting (30 messages / 10 min)
- Graceful rule-based fallback when `OPENAI_API_KEY` is missing

## Available Scripts

| Script          | Description                           |
| --------------- | ------------------------------------- |
| `pnpm dev`      | Start development server              |
| `pnpm build`    | Production build                      |
| `pnpm start`    | Start production server               |
| `pnpm lint`     | Run ESLint                            |
| `pnpm format`   | Format code with Prettier             |
| `pnpm type-check` | TypeScript type checking            |
| `pnpm test`     | Run unit tests (Vitest)               |
| `pnpm test:watch` | Run tests in watch mode             |

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/        # AI chat agent endpoint (OpenAI + fallback)
│   │   └── contact/     # Contact form API route
│   ├── error.tsx        # Global error boundary
│   ├── globals.css      # Design tokens & animations
│   ├── layout.tsx       # Root layout with SEO metadata + ChatWidget
│   ├── loading.tsx      # Route transition skeleton
│   ├── not-found.tsx    # Custom 404 page
│   ├── page.tsx         # Home page composition
│   ├── robots.ts        # robots.txt generation
│   └── sitemap.ts       # sitemap.xml generation
├── components/
│   ├── chat/            # AI chat agent UI
│   │   ├── ChatWidget.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── QuickReplies.tsx
│   │   ├── QuoteCard.tsx
│   │   └── PRDPreview.tsx
│   ├── Services.tsx     # Services & pricing section
│   ├── Hero.tsx         # Landing section with typewriter
│   ├── Navbar.tsx       # Responsive navigation
│   ├── Contact.tsx      # Contact form with API integration
│   └── ...              # Other section & utility components
└── lib/
    ├── chat/            # AI chat engine
    │   ├── pricing.ts   # Deterministic USD + SAR pricing engine
    │   ├── prd.ts       # PRD markdown generator
    │   ├── systemPrompt.ts
    │   └── types.ts
    ├── constants.ts     # Shared animation presets & validation rules
    ├── data.ts          # Centralized content data + services pricing
    └── types.ts         # Shared TypeScript interfaces
```

## Architecture

- **Data Layer**: All content data is centralized in `src/lib/data.ts` — components import data rather than defining it inline
- **Type Safety**: Shared interfaces in `src/lib/types.ts` ensure consistency across components
- **Animation Presets**: Reusable animation configs in `src/lib/constants.ts` (DRY)
- **API Routes**: Contact form hits `/api/contact` for server-side validation
- **SEO**: JSON-LD structured data, Open Graph, Twitter cards, dynamic sitemap & robots.txt

## Deployment

Automatic via GitHub Actions on push to `main`:

1. **Quality Gate** — type-check → lint → test
2. **Deploy** — build & deploy to Vercel (only if quality gate passes)
