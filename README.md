# portfolio-site

Personal portfolio of **vindows** — Master Student in Business Information Systems
and Working Student with 3+ years of experience in Java, TypeScript, and infrastructure.

Built with [Astro](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com), and deployed on [Vercel](https://vercel.com).
Published at **[vindows.dev](https://vindows.dev)**.

## Stack

- **Astro** (`output: 'static'`) — islands architecture, zero JS by default
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- **MDX** + Astro Content Collections for blog posts and project write-ups
- **TypeScript** (strict mode)
- **IBM Plex Sans / Mono** via Google Fonts
- **Vercel Analytics** + **Speed Insights** for page views and Core Web Vitals

## Features

- 🌍 **Bilingual (EN/DE)** — URL-prefix strategy with type-safe `t()` function
- 🌙 **Dark-first design** — amber-accented theme with light mode toggle, persisted in localStorage
- 📊 **Live GitHub integration** — pinned repos, contribution calendar, and repo stats fetched at build time
- 📝 **MDX blog** — content collections with Zod-validated frontmatter
- 🏗️ **Project showcase** — detail pages per project with KPIs and architecture diagrams
- 📜 **Certificates** — current credentials with expiration dates
- 📡 **RSS feeds** — separate feeds for EN (`/rss.xml`) and DE (`/de/rss.xml`)

## Getting started

```bash
npm install
npm run dev        # fetches GitHub data, starts dev server
```

Open `http://localhost:4321` in your browser.

## Scripts

| Script                  | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| `npm run dev`           | Sync GitHub data + start dev server                            |
| `npm run build`         | Production build (runs `sync:github` first)                    |
| `npm run preview`       | Preview the production build locally                           |
| `npm run sync:github`   | Fetch GitHub stats into `src/data/generated/github-stats.json` |
| `npm run typecheck`     | Run `astro check` (TypeScript + Astro diagnostics)             |
| `npm run lint`          | Lint with ESLint                                               |
| `npm run format`        | Format with Prettier                                           |

## Environment variables

Create `.env.local` in the project root:

```
GITHUB_TOKEN=ghp_xxxxx   # optional; without it, GitHub data falls back to sample data
```

The build never fails because of a missing token: without it, or if the GitHub API is
unavailable, `sync:github` copies a sample snapshot and exits successfully.

When deploying on Vercel, set `GITHUB_TOKEN` as an **Environment Variable**
in Project → Settings → Environment Variables.

## Project structure

```
src/
├── components/
│   ├── layout/         # Header, Footer, SEOHead, ThemeScript, LangScript
│   ├── sections/       # Hero, BlogPreview, GitHubDashboard, ProjectShowcase, etc.
│   └── ui/             # Button, Badge, Card, Section, Container
├── config/             # Constants (SITE_URL, NAV_ITEMS)
├── content/            # MDX content collections (blog, projects) — EN + DE
│   ├── blog/en/        # English blog posts
│   ├── blog/de/        # German blog posts
│   ├── projects/en/    # English project write-ups
│   └── projects/de/    # German project write-ups
├── data/               # Static data (site metadata, skills, certificates)
├── i18n/               # Translation dictionaries and type-safe t() function
├── layouts/            # BaseLayout, ProjectLayout
├── lib/github/         # Typed REST/GraphQL GitHub client with Zod validation
├── pages/              # Astro route pages (EN + DE)
└── styles/             # Tailwind v4 @theme config, CSS custom properties
```

## Deployment

The site is deployed on **Vercel**. Every push to `main` triggers a production
build. `@vercel/analytics` and `@vercel/speed-insights` are wired in
automatically via `BaseLayout.astro`.
