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
| Deployment   | Vercel (via GitHub Actions)             |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Open http://localhost:3000
```

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
│   ├── api/contact/   # Contact form API route
│   ├── error.tsx       # Global error boundary
│   ├── globals.css     # Design tokens & animations
│   ├── layout.tsx      # Root layout with SEO metadata
│   ├── loading.tsx     # Route transition skeleton
│   ├── not-found.tsx   # Custom 404 page
│   ├── page.tsx        # Home page composition
│   ├── robots.ts       # robots.txt generation
│   └── sitemap.ts      # sitemap.xml generation
├── components/         # UI components (16 total)
│   ├── Hero.tsx         # Landing section with typewriter
│   ├── Navbar.tsx       # Responsive navigation
│   ├── Contact.tsx      # Contact form with API integration
│   └── ...             # Other section & utility components
└── lib/
    ├── constants.ts    # Shared animation presets & validation rules
    ├── data.ts         # Centralized content data
    └── types.ts        # Shared TypeScript interfaces
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
