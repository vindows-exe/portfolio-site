# portfolio-site

Personal portfolio of **vindows** — Backend & Infrastructure Engineer (Java/Spring Boot, Go, AWS,
Kubernetes). Built with [Astro](https://astro.build) (static output), Preact islands, Tailwind CSS v4,
and MDX-backed content collections.

## Stack

- **Astro** (`output: 'static'`) — islands architecture, zero JS by default
- **Preact** via `@astrojs/preact` — reserved for future interactive islands (`src/islands/`, currently unused)
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **MDX** + Astro Content Collections for blog posts and project write-ups
- **TypeScript** (strict mode)
- **Vitest** for unit tests, **ESLint** + **Prettier** for linting/formatting

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Script                  | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| `npm run dev`           | Start the local dev server                                     |
| `npm run build`         | Type-safe production build (runs `sync:github` first)          |
| `npm run preview`       | Preview the production build locally                           |
| `npm run sync:github`   | Fetch GitHub stats into `src/data/generated/github-stats.json` |
| `npm run lint`          | Lint the codebase with ESLint                                  |
| `npm run lint:fix`      | Lint and auto-fix                                              |
| `npm run format`        | Format the codebase with Prettier                              |
| `npm run format:check`  | Check formatting without writing                               |
| `npm run typecheck`     | Run `astro check` (TypeScript + Astro template diagnostics)    |
| `npm run test`          | Run the Vitest test suite once                                 |
| `npm run test:watch`    | Run Vitest in watch mode                                       |
| `npm run test:coverage` | Run Vitest with coverage report                                |

## Environment variables

Copy `.env.example` to `.env` and fill in the values:

```
GITHUB_TOKEN=       # optional; without it, GitHub Pinned Repos + Contribution Calendar fall back to sample data
GITHUB_USERNAME=vindows
```

The build never fails because of GitHub API issues: without a token, or if the GitHub API is
unavailable, `npm run sync:github` copies `src/data/generated/github-stats.sample.json` to
`src/data/generated/github-stats.json` (git-ignored) and exits successfully.

## Project structure

See `src/` for the Astro source. Notable conventions:

- `src/components/ui` — small, dependency-free UI primitives (Button, Badge, Card, ...)
- `src/components/layout` — Header, Footer, SEOHead, ThemeScript
- `src/components/sections` — one folder per homepage section
- `src/lib/github` — typed GitHub REST/GraphQL client, consumed only by `scripts/fetch-github-data.ts`
- `src/content` — Zod-validated MDX content collections (`blog`, `projects`)
- `src/data` — static site data (site metadata, skills, certificates) + generated GitHub snapshot

## Known gaps

This section is kept up to date as placeholder assets get replaced with real ones:

- `public/fonts/` — IBM Plex Sans/Mono `.woff2` files are not yet included; see the CSS comment in
  `src/styles/global.css` for the exact filenames expected.
