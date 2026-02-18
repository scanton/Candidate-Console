export const siteConfig = {
  siteName: "Candidate Console",
  tagline: "Evidence-backed career stories",
  shortIntro: "Career stories and evidence designed for clear, honest hiring evaluation.",
  valueProp: "Structured stories, proof artifacts, and an honest fit preview for hiring decisions.",
  hiring: {
    intro:
      "Hiring Manager Mode turns narrative into a quick evaluation view with strengths, concerns, evidence links, and interview structure.",
    strengths: [
      "Turns ambiguous hiring goals into measurable systems",
      "Balances delivery speed with reliability and decision quality",
      "Leads cross-functional execution without losing technical rigor",
    ],
    domains: ["Hiring Systems", "Platform Modernization", "Ops Excellence", "Product Delivery"],
    roleTypes: ["Staff Engineer", "Engineering Manager", "Technical Program Lead"],
    concerns: [
      {
        title: "Where I’m strongest",
        body: "Building execution systems where product, engineering, and operations need one source of truth.",
        href: "/stories/signal-driven-hiring",
      },
      {
        title: "Where I’m still growing",
        body: "Navigating highly regulated domains where compliance shapes roadmap sequencing.",
        href: "/stories/global-rollout",
      },
      {
        title: "What I’d want to clarify early",
        body: "Scope boundaries, decision rights, and what ‘good’ looks like in the first 30 days.",
        href: "/stories/platform-rebuild",
      },
      {
        title: "What success looks like in 30 days",
        body: "A clear execution map, baseline metrics, and alignment on operating cadence.",
        href: "/evidence",
      },
      {
        title: "What roles are not a fit",
        body: "Pure maintenance roles without ownership, ambiguity, or systems-level impact.",
        href: "/about/what-im-not",
      },
    ],
    interviewPlan: {
      thirtyMin: [
        "5m: role context and expected outcomes",
        "8m: one high-impact story and decision tradeoffs",
        "8m: collaboration style with partners and stakeholders",
        "9m: questions, risks, and next-step alignment",
      ],
      sixtyMin: [
        "10m: role success profile and constraints",
        "15m: deep dive on platform or hiring system redesign",
        "15m: practical scenario prompt and structured response",
        "10m: team operating model and communication rigor",
        "10m: fit concerns, mutual expectations, and close",
      ],
    },
  },
} as const;
