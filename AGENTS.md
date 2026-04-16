# AGENTS.md

This file defines the **non-negotiable** conventions for humans + coding agents working in this repo.

## Tooling (required)

- **Package manager**: **Yarn only**
  - ✅ Use: `yarn`, `yarn add`, `yarn remove`, `yarn dev`, `yarn build`, `yarn test`, `yarn lint`
  - ❌ Do not use: `npm`, `pnpm`, `bun`
- **UI primitives**: **shadcn/ui**
  - Add components with Yarn:
    - `yarn dlx shadcn@latest add <component>`
- **Styling**: **Tailwind CSS**
  - Use Tailwind utilities + design tokens (CSS variables) from `app/globals.css`.
  - Prefer `cn()` from `lib/utils.ts` for conditional className composition.

## Stack assumptions

- **Next.js App Router** (`app/`)
- **TypeScript** with `strict: true`
- **React Query** (`@tanstack/react-query`) for client-side data fetching/caching
- **ESLint** (Next core web vitals + TypeScript rules)
- **Jest** for tests

## Project structure conventions

- **Routes / pages**: `app/**`
  - Keep route files focused on orchestration; push UI into components.
- **Reusable UI**: `components/**`
  - If adding shadcn/ui components, prefer `components/ui/**` (create if missing).
- **Shared utilities**: `lib/**`
  - Keep `lib/utils.ts` as the canonical home for `cn()` and shared helpers.

## Next.js / React conventions

- **Server vs Client components**
  - Default to **Server Components** in `app/**` unless interactivity/state is needed.
  - Add `"use client"` only when required (event handlers, state, effects, React Query hooks).
- **Data fetching**
  - Prefer server-side data fetching for initial page data when possible.
  - Use React Query for client-driven data (filters, live updates, optimistic UI).
- **Performance**
  - Avoid unnecessary client boundaries.
  - Keep components small and memoize only when it measurably helps.

## Tailwind + shadcn/ui rules

- **Don’t hand-roll primitives** that shadcn/ui already provides (Button, Input, Dialog, etc.).
- **Use tokens** (e.g. `bg-background`, `text-foreground`, `border-border`) instead of hard-coded colors.
- **Class merging**
  - Use `cn()` for conditional classes.
  - Prefer variant patterns (`class-variance-authority`) for component variants.

## TypeScript rules

- **No `any`** (repo enforces `@typescript-eslint/no-explicit-any`).
- Prefer explicit types at module boundaries (public functions, component props, API responses).
- Keep types close to usage; don’t create global “types.ts” dumping grounds.

## Testing, linting, formatting

- **Lint**: `yarn lint` must pass.
- **Tests**: `yarn test` for any non-trivial logic change.
- **Format**: `yarn format` (Prettier).

## Accessibility & UX

- Ensure form controls have labels and proper aria attributes where needed.
- Keyboard navigation should work for interactive elements.
- Prefer clear empty/loading/error states (especially for data fetching flows).

## Dependencies

- Keep dependencies minimal; prefer existing packages already in `package.json`.
- When adding a dependency:
  - Use `yarn add <pkg>` (or `yarn add -D <pkg>`).
  - Explain why it’s needed in the PR/commit description.

## “Definition of done” for changes

- Runs locally with `yarn dev`.
- No new ESLint errors.
- Tailwind/shadcn styling follows tokens and patterns.
- Types are strict and no `any` was introduced.
- Tests updated/added when behavior changed.

