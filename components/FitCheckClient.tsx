"use client";

import { useState } from "react";

import { ScoreBadge } from "@/components/ScoreBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FitReport = {
  fitScore: number;
  strongMatches: string[];
  mediumMatches: string[];
  gaps: string[];
  suggestedInterviewQuestions: string[];
  linkedStorySlugs: string[];
};

export function FitCheckClient() {
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<FitReport | null>(null);
  const [reportUrl, setReportUrl] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    setLoading(true);
    setReport(null);
    setReportUrl(null);

    try {
      const res = await fetch("/api/fit-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescriptionText }),
      });

      if (!res.ok) {
        setError("Could not generate report. Please provide a fuller job description.");
        return;
      }

      const data = (await res.json()) as { report: FitReport; reportUrl: string };
      setReport(data.report);
      setReportUrl(data.reportUrl);
    } catch {
      setError("Request failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-2xl">Fit check preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            value={jobDescriptionText}
            onChange={(e) => setJobDescriptionText(e.target.value)}
            className="min-h-52 w-full rounded-md border bg-card p-3 text-sm leading-6"
            placeholder="Paste a job description here..."
          />
          <div className="flex items-center gap-3">
            <Button onClick={submit} disabled={loading || jobDescriptionText.trim().length < 80}>
              {loading ? "Generating..." : "Generate fit report"}
            </Button>
            <p className="text-sm text-muted-foreground">Mock analysis only in this phase.</p>
          </div>
          {error ? <p className="text-sm text-red-700">{error}</p> : null}
        </CardContent>
      </Card>

      {report ? (
        <Card>
          <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
            <CardTitle className="font-serif text-2xl">Report preview</CardTitle>
            <ScoreBadge score={report.fitScore} />
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div>
              <strong className="text-foreground">Strong matches:</strong> {report.strongMatches.join(", ")}
            </div>
            <div>
              <strong className="text-foreground">Medium matches:</strong> {report.mediumMatches.join(", ")}
            </div>
            <div>
              <strong className="text-foreground">Gaps:</strong> {report.gaps.join(", ")}
            </div>
            {reportUrl ? (
              <a href={reportUrl} className="inline-block text-foreground underline-offset-4 hover:underline">
                Open shareable report
              </a>
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
