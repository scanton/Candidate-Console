import { notFound } from "next/navigation";
import Link from "next/link";

import { CopyButton } from "@/components/CopyButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { ReportGate } from "@/components/ReportGate";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

type ReportPageProps = {
  params: Promise<{ publicSlug: string }>;
};

type ReportResult = {
  fitScore: number;
  strongMatches: string[];
  mediumMatches: string[];
  gaps: string[];
  suggestedInterviewQuestions: string[];
  linkedStorySlugs: string[];
};

export default async function ReportPage({ params }: ReportPageProps) {
  const { publicSlug } = await params;

  const report = await prisma.shareableReport.findUnique({
    where: { publicSlug },
  });

  if (!report) {
    notFound();
  }

  const result = report.resultJson as unknown as ReportResult;
  const summary = [
    `Fit Score: ${result.fitScore}`,
    `Strong Matches: ${result.strongMatches.join(", ")}`,
    `Medium Matches: ${result.mediumMatches.join(", ")}`,
    `Gaps: ${result.gaps.join(", ")}`,
    `Stories: ${result.linkedStorySlugs.join(", ")}`,
  ].join("\n");

  return (
    <ReportGate slug={publicSlug}>
      <div className="mx-auto max-w-4xl space-y-6">
        <FadeIn>
          <header className="rounded-lg border bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="font-serif text-3xl tracking-tight">Shareable Fit Report</h1>
              <ScoreBadge score={report.fitScore} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Generated {new Date(report.createdAt).toLocaleString()} · Mock analysis only. No external AI used in this phase.
            </p>
            <div className="mt-4">
              <CopyButton value={summary} />
            </div>
          </header>
        </FadeIn>

        <FadeIn>
          <section className="grid gap-4 md:grid-cols-3">
            <ReportSection title="Strong Matches" items={result.strongMatches} />
            <ReportSection title="Medium Matches" items={result.mediumMatches} />
            <ReportSection title="Gaps" items={result.gaps} />
          </section>
        </FadeIn>

        <FadeIn>
          <Card>
            <CardHeader>
              <CardTitle>Suggested Interview Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {result.suggestedInterviewQuestions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn>
          <Card>
            <CardHeader>
              <CardTitle>Linked Hero Stories</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {result.linkedStorySlugs.map((slug) => (
                  <li key={slug}>
                    <Link href={`/stories/${slug}`} className="underline-offset-4 hover:underline">
                      /stories/{slug}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </ReportGate>
  );
}

function ReportSection({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
