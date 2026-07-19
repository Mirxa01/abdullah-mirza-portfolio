# AGENTS.md

## Cursor Cloud specific instructions

This is a single Next.js 16 (App Router, React 19, TypeScript) portfolio site for
"Abdullah Mirza". It uses **pnpm** (see `pnpm-lock.yaml`). There is no database,
container, or other backing service — the only process to run is the Next.js dev
server. Standard commands live in `README.md` and `package.json` scripts.

### Services

| Service | Command | Notes |
| --- | --- | --- |
| Next.js dev server (port 3000) | `pnpm dev` | The whole app: pages, `/api/chat`, `/api/contact`. Uses Turbopack. |

### Non-obvious notes

- **External integrations are optional and have graceful fallbacks.** No secrets are
  required to run or demo the app end-to-end:
  - Without `OPENAI_API_KEY`, `/api/chat` (the "Aria" assistant) uses a deterministic
    rule-based responder — chat, quotes (USD + SAR), and PRD generation still work.
  - Without `RESEND_API_KEY`, `/api/contact` intentionally returns HTTP 503
    ("temporarily unavailable") instead of crashing. A 503 there is expected behavior,
    not a bug, when no Resend key is set.
- `pnpm install` prints a warning about ignored build scripts (`esbuild`, `sharp`,
  `unrs-resolver`). These are optional native optimizations; lint, type-check, tests,
  dev server, and the full UI all work without approving them. Do not add an
  interactive `pnpm approve-builds` step.
- Quality gate (mirrors CI): `pnpm type-check` → `pnpm lint` → `pnpm test` (Vitest).
- Loading the site logs benign Next.js Image aspect-ratio console warnings; these are
  not errors.
