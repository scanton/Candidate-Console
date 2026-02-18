We have an existing Next.js App Router project (Candidate Console) already running. Your job is to make a “Polish Pass v1” focusing on readability, landing hero, motion, and a Hiring Manager Mode experience, plus a soft gate on public reports.

CONSTRAINTS

- Do NOT break existing routes or content loading.
- Keep the sleek/professional/elegant design.
- No loud gradients, no gimmicky animations.
- All changes should be production-ready and cohesive.
- Use Tailwind + shadcn/ui + Framer Motion (tasteful).
- Keep mock data where needed; no external AI calls yet.

GOALS

1. Increase overall font size and readability globally (the site feels too small).
2. Improve the homepage hero section to feel premium and scannable.
3. Add subtle motion/transitions (page load + card hover + section reveals).
4. Implement “Hiring Manager Mode”:
   - A dedicated page that outputs a structured, employer-friendly summary.
   - A toggle/entry point from the homepage and/or navbar.
   - Uses existing hero stories + evidence links (no AI yet).
5. Add a “soft gate” for shareable reports:
   - Reports remain publicly accessible by link.
   - On first view, show a lightweight gate (“Confirm you’re evaluating me for a role” + checkbox + continue).
   - Remember acceptance in localStorage for that report slug (and optionally globally).
   - Must not require login.

IMPLEMENTATION DETAILS

A) GLOBAL TYPOGRAPHY / READABILITY

- Set a larger base font size and better line height:
  - Update Tailwind configuration and/or global styles to raise default typography.
  - Ensure headings scale appropriately.
- Improve max-width and line-length for reading:
  - Use a consistent content container, e.g., max-w-5xl for general, max-w-3xl for long-form MDX.
- Make MDX content look great:
  - Ensure prose styling using @tailwindcss/typography if not already.
  - Add a prose class for MDX rendering with increased font size (prose-lg or custom).
- Ensure contrast is readable and spacing is generous.

B) HOMEPAGE HERO POLISH
Homepage should start with a premium “hero” section that communicates:

- “Evidence-backed career stories”
- “Paste a job description → get an honest fit report (coming/preview)”
- Clear CTAs:
  - “Explore Hero Stories”
  - “Hiring Manager Mode”
  - “View Evidence”
    Design requirements:
- Keep it elegant: subtle border, soft shadow, minimal accent.
- Include quick “stats chips” driven from data:
  - e.g., number of hero stories, evidence items, key tags count
- Include a “Featured stories” row or grid below hero.

C) MOTION (FRAMER MOTION)
Add:

- Page transition wrapper (subtle fade + rise, 150–250ms).
- Card hover micro-interactions (lift 2–4px, shadow slightly stronger).
- Section reveal on scroll for home sections (very subtle).
  Important: Do not overuse motion. It should feel premium and restrained.

Implementation suggestion:

- Create a components/motion/ folder:
  - MotionProvider (client component)
  - FadeIn, Stagger, MotionCard wrappers
- Ensure animations respect reduced motion preference.

D) HIRING MANAGER MODE
Add a new route: /hiring
This page should look like a “candidate evaluation console” that a hiring manager can skim quickly.

Sections:

1. “At-a-glance”
   - Short intro
   - A few curated strengths (hard-coded for now but easy to edit in a config file)
   - Chips: domains / strengths / role types
2. “Evidence-backed highlights”
   - Pull top 4–6 featured hero stories with:
     - title, summary, 2 highlights, key tags
     - CTA: view story
3. “Common concerns, answered”
   - Provide 5 items that demonstrate honesty:
     - “Where I’m strongest”
     - “Where I’m still growing”
     - “What I’d want to clarify early”
     - “What success looks like in 30 days”
     - “What roles are NOT a fit”
   - For each, link to relevant story/evidence or /about/what-im-not
4. “Interview plan”
   - Provide 30-min and 60-min interview plans as tabbed sections:
     - 30-min: 4 blocks of questions
     - 60-min: deeper blocks + practical scenario prompts
   - Include “Copy plan” button
5. “Fit report preview”
   - A button/link to the existing Fit Check page/flow (if present) or to the POST /api/fit-check demo UI (see below).
   - If there is no UI yet, create a minimal /fit-check page:
     - textarea for JD
     - submit -> calls /api/fit-check
     - shows the report and link to /reports/[slug]

Navigation:

- Add “Hiring Manager Mode” to the top nav.
- Add CTA button on homepage hero.

E) SOFT GATE FOR /reports/[publicSlug]
Modify the report page:

- When a user hits /reports/[slug], show a soft gate component first unless already accepted:
  - Title: “Quick confirmation”
  - Copy: “This report is intended for evaluating me for a role. Please confirm you’re viewing it for hiring consideration.”
  - Checkbox: “I’m evaluating this candidate for a job opportunity.”
  - Button: “Continue to report”
  - Secondary: “View anyway” link that still continues but logs a different localStorage flag (optional).
- Store acceptance in localStorage:
  - Key: candidate_console_report_gate:<slug> = "accepted"
- If accepted, show the report normally.

F) CODE QUALITY / CONFIGURATION

- Create a small config file (e.g., /lib/siteConfig.ts) for:
  - name, tagline
  - hiring mode curated bullets
  - any repeated copy
- Ensure TypeScript types are correct.
- Keep components small and reusable.
- Ensure lint/build succeeds.

G) DELIVERABLES

- Implement the above changes in the existing codebase.
- Update README with any new scripts/deps.
- If tailwind typography plugin is added, install and configure it.

CHECKLIST

- Fonts feel comfortably readable across the site.
- Homepage hero looks premium and includes Hiring Manager Mode CTA.
- Motion feels subtle and elegant.
- /hiring page exists and is genuinely useful to a hiring manager.
- /reports/[slug] shows a soft gate once per device/session (localStorage).
- Add a minimal /fit-check page UI if it doesn’t exist yet.

DO THE WORK NOW. Modify files as needed. Keep design consistent with existing components.
