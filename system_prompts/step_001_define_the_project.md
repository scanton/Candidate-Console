.You are building a Next.js (App Router) site called "Candidate Console" — a sleek, professional, elegant interactive resume + evidence portfolio. Use pnpm. The goal in this phase is ONLY: UI skeleton + content model + sample content + basic reading/rendering of MDX + JSON. Do NOT implement AI calls yet. Do scaffold API routes for later.

PRIMARY GOALS

1. Next.js app scaffold with pnpm, TypeScript, Tailwind, and a clean design system.
2. Content system:
   - Hero Stories as MDX with typed frontmatter fields
   - Evidence Library as JSON with a defined schema and validation
3. Pages:
   - Home: Hero Story grid with filtering
   - Hero Story detail page (slug)
   - Evidence Library page with filters
   - Resume View (print-friendly)
   - "What I’m Not" page
4. Minimal UI polish: elegant typography, spacing, subtle motion, accessibility, fast.
5. Storage scaffolding for JD submissions + shareable reports (NO anonymization for now):
   - Implement DB layer with Prisma.
   - Local dev: SQLite.
   - Production-ready: code should allow swapping DATABASE_URL to Postgres later (Neon/Vercel Postgres).
6. API routes scaffolding:
   - POST /api/fit-check (stub response, but store JD submission + create report)
   - GET /api/report/[id] (fetch stored report)
   - Note: “fit-check” response can be mock/dummy; focus is data flow and storage.

TECH STACK

- Next.js App Router, TypeScript
- Tailwind CSS
- Use shadcn/ui components for consistent elegant UI (Button, Card, Badge, Input, Tabs, etc.)
- Use Contentlayer for MDX content ingestion and typed frontmatter (preferred)
- Use Zod for schema validation
- Use Prisma for DB models (JD submissions + reports)
- Use lucide-react icons
- Use Framer Motion for a few subtle transitions ONLY (optional but tasteful)

DESIGN / STYLE REQUIREMENTS

- Sleek, professional, elegant.
- Neutral palette, lots of whitespace, strong typographic hierarchy.
- No loud gradients. Subtle borders/shadows.
- Sticky top nav. Responsive.
- Favor “scannable” layouts: cards, chips, short bullets, expandable sections.
- Every page should look “production-ready” even with sample data.

INFORMATION ARCHITECTURE
A) Content (MDX) = hero stories
B) Data (JSON) = evidence items, skills/tags lists (optional)
C) DB = JD submissions + shareable reports

CONTENT MODELS

1. Hero Story (MDX frontmatter)
   Required fields:

- title: string
- slug: string (derived from filename ok)
- timeframe: string (e.g., "2022–2024")
- role: string
- org: string
- summary: string (1–2 sentences)
- highlights: string[] (3–5 bullets)
- tags: string[] (skills/themes)
- metrics: { label: string; value: string }[] (optional)
- evidenceIds: string[] (references to Evidence JSON)
- featured: boolean (for homepage)
  Body MDX can contain sections like Problem / Constraints / Approach / Results / Lessons.

2. Evidence Item (JSON)
   Fields:

- id: string (e.g., "ev_system_design_doc")
- type: "repo" | "doc" | "demo" | "talk" | "article" | "case-study" | "other"
- title: string
- description: string
- url?: string
- date?: string (ISO)
- tags: string[]
- relatedStorySlugs: string[]
  Validate with Zod on load.

DATABASE MODELS (Prisma)

- JobDescriptionSubmission:
  - id (cuid)
  - createdAt
  - rawText (string, potentially long)
  - source ("site" default)
  - userAgent (optional)
  - ip (optional, but implement carefully; ok to leave null)
- ShareableReport:
  - id (cuid)
  - createdAt
  - submissionId (FK)
  - modelUsed (string, nullable for now)
  - fitScore (int 0-100)
  - resultJson (json) // store the full report object
  - publicSlug (string, unique) // short slug for sharing

ROUTES / PAGES (App Router)

- / (Home)
  - Hero story grid (featured first)
  - Filter chips for tags
  - Search input
- /stories/[slug]
  - Render MDX story
  - Show metadata + highlights + metrics
  - Show related evidence list
- /evidence
  - Evidence library list with filters (type, tags, related story)
- /resume
  - Print-friendly condensed resume view built from hero story metadata
- /about/what-im-not
  - Static MDX page or TSX page with clear statements

- /reports/[publicSlug]
  - Public shareable report page (reads from DB)
  - Display:
    - Fit score
    - Strong matches / medium matches / gaps (from resultJson)
    - Linked hero stories (from slugs)
    - Timestamp + disclaimer
  - Add “Copy summary” button

API ROUTES (Route Handlers)

1. POST /api/fit-check
   Input: { jobDescriptionText: string }
   Behavior:

- Validate input length and basic sanity.
- Store JobDescriptionSubmission.
- Create a mock “analysis result” object (deterministic-ish), e.g.:
  - fitScore: 72
  - strongMatches: [...]
  - mediumMatches: [...]
  - gaps: [...]
  - suggestedInterviewQuestions: [...]
  - linkedStorySlugs: [...] (choose 2–3 featured stories)
- Store ShareableReport with resultJson and a generated publicSlug (like 8–10 chars).
- Return: { reportUrl: "/reports/<slug>", report: <resultJson> }

2. GET /api/report/[publicSlug]

- Fetch ShareableReport by slug and return resultJson.

IMPORTANT: do not call any external AI in this phase. Mock only.

FILE STRUCTURE (suggested)

- app/
  - layout.tsx (nav/footer)
  - page.tsx
  - stories/[slug]/page.tsx
  - evidence/page.tsx
  - resume/page.tsx
  - about/what-im-not/page.tsx
  - reports/[publicSlug]/page.tsx
  - api/fit-check/route.ts
  - api/report/[publicSlug]/route.ts
- content/
  - stories/
    - <slug>.mdx (3 sample stories)
  - pages/
    - what-im-not.mdx (optional)
- data/
  - evidence.json (10 sample items)
- lib/
  - contentlayer/ (if needed)
  - content.ts (load stories, load evidence)
  - zod.ts (schemas)
  - db.ts (prisma client)
  - utils.ts
- prisma/
  - schema.prisma
- components/
  - ui/ (shadcn)
  - HeroGrid.tsx
  - TagFilters.tsx
  - EvidenceList.tsx
  - CopyButton.tsx
  - ScoreBadge.tsx

SETUP COMMANDS
Use pnpm. Provide a README with:

- pnpm install
- pnpm dev
- prisma migrate dev
- prisma studio

IMPLEMENTATION TASKS (do them in order)

1. Scaffold Next.js + Tailwind + TypeScript (pnpm create next-app).
2. Install and configure shadcn/ui.
3. Add Contentlayer and configure MDX stories with typed fields.
4. Add Zod schemas and loader for evidence.json.
5. Build the pages with sample content and working navigation.
6. Add Prisma + SQLite for local dev; create models; migrate.
7. Implement /api/fit-check mock that stores submission + report.
8. Implement /reports/[publicSlug] page reading DB report.
9. Ensure build passes and everything runs locally.

QUALITY BAR / ACCEPTANCE CRITERIA

- pnpm dev runs with no errors.
- Home page shows hero story cards from MDX with tag filtering and search.
- Story page renders MDX correctly and shows related evidence.
- Evidence page filters work.
- Resume page is clean and print-friendly.
- /api/fit-check stores a submission + creates a report; returns a valid reportUrl.
- /reports/[slug] renders a report from DB and has a “Copy summary” button.
- Code is clean, typed, and organized.

OUTPUT
Generate all necessary files. Do not leave TODO placeholders for critical paths. Keep mock scoring simple but coherent.
