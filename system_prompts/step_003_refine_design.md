We have an existing Next.js App Router project (Candidate Console) using Tailwind + shadcn/ui. Implement a “Polish Pass v1” focusing on readability, landing hero, restrained motion, Hiring Manager Mode, shareable report soft gate, and a responsive navbar that avoids wrapping by adding a “More” dropdown on small screens.

CONSTRAINTS

- Do NOT break existing routes or content loading (MDX/JSON).
- Keep sleek/professional/elegant.
- No loud gradients. No bouncy animations.
- Keep mock analysis; do NOT add external AI calls yet.
- Use pnpm; keep code typed and clean.

GOALS

1. Improve global readability: larger base font, better line-height, better long-form MDX typography.
2. Improve homepage hero section to feel premium + clear CTAs.
3. Add subtle Framer Motion transitions (page fade/rise, card hover lift, section reveal).
4. Implement /hiring (Hiring Manager Mode) as a skimmable evaluation console.
5. Add soft gate for /reports/[publicSlug] (public by link, with a localStorage confirmation).
6. Update navbar:
   - On desktop: show full nav.
   - On mobile/small widths: show key items + “More” dropdown to avoid wrapping.
   - Keep it elegant and minimal.

A) TYPOGRAPHY / READABILITY

1. Update /app/layout.tsx:

- Add to <html> className: "h-full scroll-smooth"
- Update <body> className from just "font-sans" to include:
  - "min-h-screen font-sans antialiased text-[17px] leading-relaxed text-foreground bg-background"
- Increase nav/footer text size:
  - Replace "text-sm" usage in nav/footer with "text-[15px] md:text-base" (or similar)
- Consider slightly more vertical breathing room:
  - main: "py-12" -> "py-14 md:py-16" if it looks better

2. Update /app/globals.css:

- Add a small root font-size bump:
  html { font-size: 17px; }
  @media (min-width: 768px) { html { font-size: 18px; } }
- Ensure it doesn’t cause layout breakage; if it does, reduce desktop to 17px.

3. Add Tailwind Typography plugin:

- Install: @tailwindcss/typography
- Update tailwind.config.ts plugins to include require("@tailwindcss/typography")
- Keep your existing config structure.

4. Ensure MDX pages render with improved prose:

- Wherever you render story MDX, wrap content in:
  className="prose prose-zinc dark:prose-invert prose-lg max-w-3xl"
- Keep headings crisp and spacing generous.

B) HOMEPAGE HERO POLISH
On the homepage (/):

- Add a premium hero section at top:
  - Headline (large): “Evidence-backed career stories.”
  - Subheadline (1–2 lines): emphasize honest fit evaluation + proof.
  - CTAs:
    - Primary: “Hiring Manager Mode”
    - Secondary: “Explore Hero Stories”
    - Tertiary link: “Browse Evidence”
- Add 3–4 “stat chips” derived from content:
  - # stories
  - # evidence items
  - # unique tags
  - (optional) “Last updated” from newest story/evidence date if available
- Keep styling minimal and elegant: subtle border, soft shadow, whitespace.

C) MOTION (FRAMER MOTION, RESTRAINED)

- Add Framer Motion if not present.
- Respect reduced motion preference.
- Implement:
  - Page transition: subtle fade + 6–10px rise on mount
  - Card hover: lift 2–4px, shadow increases slightly
  - Section reveal: subtle opacity/translate on scroll for homepage sections
    Implementation suggestion:
- Create /components/motion/:
  - MotionProvider (client)
  - FadeIn (variant helper)
  - Stagger (variant helper)
  - MotionCard wrapper
- Use sparingly.

D) RESPONSIVE NAV WITH “MORE” DROPDOWN (MOBILE)
In /app/layout.tsx navbar:

- Desktop (md+):
  - Show full nav items inline (Stories, Evidence, Resume, What I’m Not, Hiring Manager Mode)
- Mobile (<md):
  - Show: Brand + 2–3 key links (e.g., Stories, Hiring, Evidence)
  - Add a “More” dropdown (shadcn/ui DropdownMenu) containing:
    - Resume
    - What I’m Not
    - Any additional links you have
- Ensure no wrapping on small widths.
- Keep typography and spacing elegant.

E) HIRING MANAGER MODE PAGE
Add /app/hiring/page.tsx with a skimmable “evaluation console”.
Sections:

1. At-a-glance:

- Short intro
- 4–6 curated strengths (pull from a config file)
- Chips: domains / strengths / role types (from config)

2. Evidence-backed highlights:

- Show top 4–6 featured stories (from MDX frontmatter featured=true)
- Each card: title, role/org/timeframe, summary, 2 highlights, key tags, link to story

3. Common concerns, answered (honesty section):

- 5 items:
  - Where I’m strongest
  - Where I’m still growing
  - What I’d clarify early
  - What success looks like in 30 days
  - Roles that are NOT a fit (link to /about/what-im-not)
- Link to relevant stories/evidence where possible

4. Interview plan:

- Tabs: 30-min / 60-min
- Each tab shows structured question blocks
- Add “Copy plan” button (copies plain text)

5. Fit report preview:

- If /fit-check does not exist, create /app/fit-check/page.tsx:
  - textarea job description
  - submit calls POST /api/fit-check
  - display report summary + link to /reports/[slug]

Add “Hiring Manager Mode” to nav and homepage hero CTA.

F) SOFT GATE FOR SHAREABLE REPORTS
Modify /reports/[publicSlug] page:

- Before showing report, show a soft gate unless accepted:
  - Title: “Quick confirmation”
  - Copy: “This report is intended for evaluating me for a role. Please confirm you’re viewing it for hiring consideration.”
  - Checkbox: “I’m evaluating this candidate for a job opportunity.”
  - Button: “Continue to report”
  - Secondary link: “View anyway” (still continues, but sets a separate localStorage flag)
- Persist acceptance:
  - localStorage key: candidate_console_report_gate:<slug> = "accepted"
- If accepted, render report normally.

G) CONFIG FILE FOR REPEATED COPY
Create /lib/siteConfig.ts containing:

- siteName, tagline, shortIntro
- hiring mode bullets, chips
- concerns/answers
- interview plans
  This keeps content editable without touching components.

H) QUALITY BAR

- pnpm dev runs cleanly.
- No nav wrapping on mobile.
- Typography feels comfortable.
- Motion feels premium, not “template-y”.
- /hiring is genuinely useful and skimmable.
- /reports gate works and remembers acceptance.

DELIVERABLES

- Apply changes across layout, home, MDX rendering, and new pages.
- Update tailwind.config.ts plugins to include typography plugin.
- If you add new deps, update README.
