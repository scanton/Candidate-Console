import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { featuredStories } from "@/lib/content";
import { prisma } from "@/lib/db";
import { makePublicSlug } from "@/lib/utils";

const fitCheckSchema = z.object({
  jobDescriptionText: z.string().min(80).max(30000),
});

function mockReport(jobDescriptionText: string) {
  const lowered = jobDescriptionText.toLowerCase();
  const strategyWeight = lowered.includes("strategy") ? 6 : 0;
  const architectureWeight = lowered.includes("architecture") ? 8 : 0;
  const leadershipWeight = lowered.includes("lead") ? 5 : 0;
  const fitScore = Math.min(96, 60 + strategyWeight + architectureWeight + leadershipWeight);

  return {
    fitScore,
    strongMatches: ["Platform modernization", "Structured hiring systems", "Cross-functional influence"],
    mediumMatches: ["Domain ramp speed", "Stakeholder onboarding"],
    gaps: ["Industry-specific regulations", "Legacy system footprint"],
    suggestedInterviewQuestions: [
      "Describe a time you balanced delivery speed with reliability constraints.",
      "How do you measure hiring signal quality over time?",
      "How would you adapt this system for a globally distributed organization?",
    ],
    linkedStorySlugs: featuredStories.slice(0, 3).map((story) => story.slug),
  };
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = fitCheckSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const submission = await prisma.jobDescriptionSubmission.create({
    data: {
      rawText: parsed.data.jobDescriptionText,
      source: "site",
      userAgent: request.headers.get("user-agent"),
      ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
    },
  });

  const report = mockReport(parsed.data.jobDescriptionText);
  const publicSlug = `${makePublicSlug(submission.id)}${Date.now().toString().slice(-2)}`;

  const stored = await prisma.shareableReport.create({
    data: {
      submissionId: submission.id,
      fitScore: report.fitScore,
      modelUsed: null,
      publicSlug,
      resultJson: report,
    },
  });

  return NextResponse.json({
    reportUrl: `/reports/${stored.publicSlug}`,
    report,
  });
}
