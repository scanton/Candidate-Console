# Candidate Console

Sleek Next.js App Router portfolio for hero stories, evidence browsing, and mock fit-check report sharing.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn-style UI components
- Framer Motion (subtle transitions)
- Contentlayer for MDX hero stories
- Zod for JSON schema validation
- Prisma + SQLite (local), with a Postgres-ready schema variant

## Quick Start

1. Install dependencies:

```bash
pnpm install
```

2. Run Prisma migration (local SQLite):

```bash
pnpm prisma:migrate
```

3. Start dev server:

```bash
pnpm dev
```

4. Optional DB inspector:

```bash
pnpm prisma:studio
```

## Content

- Hero stories (MDX): `content/stories/*.mdx`
- Evidence data (JSON + Zod validation): `data/evidence.json`

## API Endpoints

- `POST /api/fit-check`
  - Input: `{ "jobDescriptionText": "..." }`
  - Stores `JobDescriptionSubmission`, creates mock `ShareableReport`, returns `{ reportUrl, report }`
- `GET /api/report/[publicSlug]`
  - Returns stored report JSON by share slug

## Routes

- `/` home story grid + tag/search filters
- `/stories/[slug]` hero story detail with MDX and related evidence
- `/evidence` evidence library filters
- `/resume` print-friendly resume
- `/about/what-im-not` boundary statement page
- `/hiring` structured hiring-manager evaluation view
- `/fit-check` minimal JD-to-report demo UI
- `/reports/[publicSlug]` public report page with copy-summary action

## Report Soft Gate

- `/reports/[publicSlug]` includes a lightweight confirmation gate on first view.
- Acceptance is stored in `localStorage`:
  - `candidate_console_report_gate:<slug>`
  - Optional global acceptance: `candidate_console_report_gate:global`

## Database Notes

- Local schema: `prisma/schema.prisma` (SQLite)
- Postgres-ready schema: `prisma/schema.postgres.prisma`

To switch for production, point `DATABASE_URL` to Postgres and use `prisma/schema.postgres.prisma` with Prisma commands.
