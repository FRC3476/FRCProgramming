# AGENTS.md — Frontend (React/TypeScript)

## Stack
- React 19 with TypeScript strict mode
- Next.js 15 (App Router)
- Tailwind CSS v4
- shadcn/ui for component primitives
- Vitest + Testing Library for unit/integration tests
- Playwright for browser automation and visual verification
- pnpm (never npm install or yarn)

## Commands
- `pnpm dev` — development server (port 3000)
- `pnpm test` — Vitest unit tests
- `pnpm test:e2e` — Playwright end-to-end tests
- `pnpm build` — production build
- `pnpm lint` — ESLint + Prettier

## Architecture
- `/app` — Next.js App Router pages and API routes
- `/components/ui` — shadcn/ui primitives (do not modify, regenerate with CLI)
- `/components` — application components
- `/lib` — utilities, data fetching, server actions
- `/tests` — Vitest unit tests
- `/e2e` — Playwright tests

## Component Conventions
- Functional components only (no class components)
- Do NOT add useMemo/useCallback by default; trust the React Compiler
- Use `startTransition` for non-urgent state updates
- Prefer server components; use `"use client"` only when needed
- shadcn/ui components install via `pnpm dlx shadcn@latest add <component>`
- Export components as named exports (not default)

## TypeScript
- Strict mode is on — no `any`, no `@ts-ignore`
- Use `satisfies` for type narrowing, not casting
- All API response shapes must have explicit types

## Constraints
- Never modify files in `/components/ui` directly
- Never add `console.log` to production code
- Tailwind utility classes only — no inline styles, no CSS-in-JS

## Completion Criteria
- `pnpm build` passes with no errors
- `pnpm test` all pass
- No TypeScript errors (`pnpm tsc --noEmit`)