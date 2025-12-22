# Copilot / AI agent instructions

This repo is a collection of small, self-contained Next.js tutorial projects (organized under `Day_*`). These notes help an AI coding agent make focused, safe, and useful changes.

- **Big picture:** Each `Day_*` folder is a standalone Next.js app (see `Day_1/my-app`, `Day_3/nextjs-dashboard`, `Day_12/booking-appointment`). Most use the App Router (`app/`), TypeScript, and Next.js config files (`next.config.ts`, `next-env.d.ts`). Prefer making changes scoped to a single `Day_*` folder unless the change is cross-cutting.

- **Where to look first:**
  - Project entry: `package.json` inside the day's folder (e.g. `Day_1/my-app/package.json`) — check `scripts` before running commands.
  - Routing and components: the `app/` directory (pages, layouts, server vs client components).
  - Styling: `postcss.config.mjs`, `tailwind.config.ts` and `app/globals.css` or `styles/`.

- **Build / dev / lint workflows:**
  - Use the package manager indicated by the folder (presence of `pnpm-lock.yaml` → prefer `pnpm`). Typical commands: `pnpm install`, `pnpm dev` (or `npm run dev`), `pnpm build`, `pnpm start`.
  - Lint with the `lint` script when present (many folders include `eslint.config.mjs` and a `lint` script).

- **Project-specific conventions:**
  - App Router (`app/`) patterns are used: prefer server components by default, add `'use client'` at top of files that need client behavior.
  - Types: `next-env.d.ts` and `tsconfig.json` are present; extend types there when adding global types.
  - Tailwind and PostCSS: projects often wire Tailwind — change `tailwind.config.ts` and `postcss.config.mjs` together.

- **Integration and backend patterns:**
  - Some projects include server-side integrations (see `Day_5/nextjs-dashboard/auth.ts` and `Day_5/nextjs-dashboard/proxy.ts`) — these use `next-auth`, `postgres` and `bcrypt`.
  - When modifying auth or DB code, inspect `auth.config.ts`, `auth.ts` and any direct DB client usage (e.g. `postgres(process.env.POSTGRES_URL)`), and preserve existing error handling and validation (`zod` usage).

- **Editing & dependency rules:**
  - Add dependencies to the specific day's `package.json` and run the folder's package-manager install command. Do not add repository-level workspace tooling unless requested.
  - Keep changes local to one day unless fixing a shared config (rare).

- **Examples (concrete):**
  - Start local dev for Day 1: `cd Day_1/my-app && pnpm install && pnpm dev` (or `npm install && npm run dev` if `pnpm-lock.yaml` is absent).
  - Auth pattern: credential validation in `Day_5/nextjs-dashboard/auth.ts` uses `zod` for input parsing and `bcrypt.compare` for password checks — keep that validation flow intact when editing login logic.

- **What not to assume:**
  - There is no single monorepo build: each Day_* is effectively independent.
  - Tests are not present in most folders — do not add test frameworks without confirming scope.

If anything in this file is unclear or you want more detail (examples for a specific Day_*), tell me which day and I will expand the instructions or merge an existing guidance file into this one.
