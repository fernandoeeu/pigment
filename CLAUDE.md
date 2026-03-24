# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A "color game" web app built with the Better-T-Stack. Turborepo monorepo using Bun as package manager.

## Commands

```bash
bun install                # Install dependencies
bun run dev                # Start all apps in dev mode
bun run dev:web            # Start only the web app (port 3001)
bun run build              # Build all apps
bun run check-types        # TypeScript type-checking across all packages

# Database (SQLite/Turso + Drizzle)
bun run db:local           # Start local SQLite via turso dev (creates local.db)
bun run db:push            # Push schema changes to database
bun run db:generate        # Generate Drizzle migrations
bun run db:migrate         # Run migrations
bun run db:studio          # Open Drizzle Studio UI
```

## Architecture

Monorepo with `apps/` and `packages/` workspaces:

- **`apps/web`** — Fullstack app using TanStack Start (SSR) + TanStack Router (file-based routing) + React 19 + Vite. Routes live in `src/routes/`, file-based routing generates `routeTree.gen.ts`. Uses `@tanstack/react-query` for data fetching.
- **`packages/db`** — Drizzle ORM over SQLite/Turso. Schema in `src/schema/`, DB client exported from `src/index.ts`. Drizzle config reads `.env` from `apps/web/.env`.
- **`packages/ui`** — Shared shadcn/ui components (Tailwind v4 + `tw-animate-css`). Import as `@color-game/ui/components/button`. Add components with `npx shadcn@latest add <name> -c packages/ui`.
- **`packages/env`** — Type-safe env vars via `@t3-oss/env-core`. Server env (`DATABASE_URL`, `CORS_ORIGIN`, `NODE_ENV`) in `src/server.ts`, client env (VITE_-prefixed) in `src/web.ts`.
- **`packages/config`** — Shared `tsconfig.base.json` extended by all packages.

## Key Conventions

- All env vars live in `apps/web/.env` — the DB package reads from there via relative path (`../../apps/web/.env`).
- Package imports use workspace protocol: `@color-game/db`, `@color-game/ui`, `@color-game/env`.
- TypeScript strict mode with `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`.
- Tailwind v4 (CSS-first config via `@tailwindcss/vite` plugin, global styles in `packages/ui/src/styles/globals.css`).
- The app defaults to dark mode (`<html className="dark">`).
