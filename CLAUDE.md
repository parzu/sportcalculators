# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (next)
npm run build    # Production build (also runs static export)
npm test         # Run all tests (Vitest)
npm test -- --run  # Run tests once (non-watch mode)
npm run lint     # ESLint
```

## Architecture

**Next.js App Router** app (migrated from Pages Router in Phase 5). All routes map to files in `app/[slug]/page.tsx`.

Each calculator follows the same pattern:
1. `calculators/<Name>.tsx` — `'use client'` component with React state for the interactive widget
2. `components/` — reusable UI pieces (shared inputs, displays, Layout, AdSenseWidget)
3. `app/<slug>/page.tsx` — Server Component with `export const metadata` + the calculator component
4. `src/calculators.tsx` — central registry for nav/homepage entries (sport group, title, href)

**App Router structure:**
- `app/layout.tsx` — root layout (Server Component); HTML shell, Inter font via next/font, GA + AdSense scripts, Layout wrapper
- `app/not-found.tsx` — 404 page
- `app/page.tsx` — homepage (Server Component, calculator card grid)

**Styling** — Tailwind CSS v4 + shadcn/ui. Design tokens defined in `app/globals.css` via `@theme`. Key patterns:
- Calculator container: `mx-auto max-w-2xl rounded-lg border border-border bg-card p-5 shadow-sm`
- Section header: `-mx-5 mb-3 mt-1 bg-muted/50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground`
- Toggle button group: `<div className="flex">` + `<button>` with `cn()` for active state (`bg-primary text-primary-foreground`)
- shadcn components in `components/ui/`; base-ui primitives use `render` prop (not Radix `asChild`)

**Services layer** (`services/`) holds shared utilities — all `.ts` pure functions:
- `speedService.ts` — speed/pace unit conversions
- `timeService.ts` — time formatting helpers
- `distanceService.ts` — distance unit helpers
- `unitConstants.ts` — all conversion constants and IAAF scoring coefficients
- `combinedEventsService.ts` — Decathlon/Heptathlon IAAF formula logic
- `calculatorsService.ts` — legacy Heptathlon data (kept for reference)

**Tests** — Vitest + React Testing Library. Test files are in `tests/`. All service functions and calculator logic have coverage (83 tests). Calculator components that use React state/JSX cannot be directly imported into Vitest (OXC transformer); test their logic as pure functions instead.

## Adding a new calculator

1. Create `calculators/MyCalculator.tsx` with `'use client';` at the top
2. Create `app/my-calculator/page.tsx` — Server Component with `export const metadata` and the calculator component
3. Add an entry to `src/calculators.tsx` under the appropriate sport group
