# Deploy to Vercel

This portfolio is a standard **Next.js App Router** app. Vercel already builds
preview deployments from GitHub PRs for the `abdullah-mirza` project. Production
goes live when `main` is updated (or when you promote a deployment in the
dashboard).

## 1. Confirm the Git integration

1. Open [Vercel → abdullah-mirza](https://vercel.com/mirxas-projects-7bb9fbf0/abdullah-mirza).
2. **Settings → Git** should point at `Mirxa27/abdullah-mirza-portfolio`.
3. **Production Branch** should be `main`.
4. Framework preset: **Next.js** (auto-detected; also set in `vercel.json`).

## 2. Set environment variables

**Settings → Environment Variables** — add these for **Production** and
**Preview** (and Development if you use `vercel env pull`):

| Name | Required | Notes |
| --- | --- | --- |
| `OPENAI_API_KEY` | Recommended | Powers Aria. Without it, chat runs in honest basic/fallback mode. |
| `RESEND_API_KEY` | Recommended | Delivers contact-form email. Without it, `/api/contact` returns 503 and points visitors to WhatsApp/email. |
| `CONTACT_TO_EMAIL` | Optional | Defaults to `abdullah@mirxaa.com`. |
| `CONTACT_FROM_EMAIL` | Optional for first tests; **required for real production mail** | Must be on a [Resend-verified domain](https://resend.com/domains). Example: `Portfolio <hello@mirxaa.com>`. Do not leave the shared `onboarding@resend.dev` sender in long-term production. |

After saving variables, **Redeploy** so the new values are picked up.

### CLI alternative (if you have Vercel auth locally)

```bash
pnpm dlx vercel login
pnpm dlx vercel link          # select the abdullah-mirza project
pnpm dlx vercel env add OPENAI_API_KEY production
pnpm dlx vercel env add RESEND_API_KEY production
pnpm dlx vercel env add CONTACT_FROM_EMAIL production
pnpm dlx vercel env pull .env.local
```

## 3. Connect the custom domain

1. **Settings → Domains** → add `abdullahmirza.com` and `www.abdullahmirza.com`.
2. Prefer **www** as the primary domain (or apex — pick one) and let Vercel
   redirect the other.
3. Point DNS as Vercel instructs (usually A/CNAME records).
4. Wait for TLS to become **Valid**.

> Note: If the domain is currently attached to a different Vercel project or
> static site, remove it there first, then attach it to **abdullah-mirza**.

## 4. Ship to production

```bash
# Local preflight (same checks as the quality gate)
pnpm verify:deploy

# Merge the release PR into main — Vercel auto-deploys production
# Or promote the latest ready preview from the Vercel dashboard
```

## 5. Post-deploy smoke checks

| Check | Expect |
| --- | --- |
| `GET /` | 200, portfolio hero loads |
| `GET /robots.txt` | Allows `/`, sitemap URL present |
| `GET /sitemap.xml` | Lists the site URL |
| `GET /opengraph-image` | Social card PNG |
| `GET /api/chat` | Greeting JSON (`fallback: true` if no OpenAI key) |
| `POST /api/contact` with valid JSON | `200` if Resend configured, else honest `503` |
| Nav **Print / Save as PDF** | Clean A4 CV (not the dark marketing page) |

## Build notes

- Install/build commands are pinned in `vercel.json` (`pnpm install --frozen-lockfile`, `pnpm build`).
- `package.json` sets `packageManager` + `pnpm.onlyBuiltDependencies` so **sharp**
  (Next.js image / OG) can compile its native binaries on Vercel.
- The app builds and runs without secrets; missing keys degrade gracefully.
- Region is `iad1` to match the project’s existing deployments; change in
  `vercel.json` if you prefer another Vercel region.
