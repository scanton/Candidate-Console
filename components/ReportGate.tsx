"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function reportKey(slug: string) {
  return `candidate_console_report_gate:${slug}`;
}

const globalKey = "candidate_console_report_gate:global";

export function ReportGate({ slug, children }: { slug: string; children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const reportAccepted = localStorage.getItem(reportKey(slug)) === "accepted";
    const globalAccepted = localStorage.getItem(globalKey) === "accepted";
    setAccepted(reportAccepted || globalAccepted);
    setReady(true);
  }, [slug]);

  const gateHidden = useMemo(() => ready && accepted, [ready, accepted]);

  if (!ready) {
    return null;
  }

  if (gateHidden) {
    return <>{children}</>;
  }

  const continueToReport = (mode: "accepted" | "anyway") => {
    localStorage.setItem(reportKey(slug), mode === "accepted" ? "accepted" : "viewed_anyway");
    if (mode === "accepted") {
      localStorage.setItem(globalKey, "accepted");
    }
    setAccepted(true);
  };

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle className="font-serif text-3xl">Quick confirmation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-muted-foreground">
          This report is intended for evaluating me for a role. Please confirm you&apos;re viewing it for hiring consideration.
        </p>
        <label className="flex items-start gap-3 rounded-md border p-3 text-sm">
          <input type="checkbox" className="mt-1" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <span>I&apos;m evaluating this candidate for a job opportunity.</span>
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => continueToReport("accepted")} disabled={!checked}>
            Continue to report
          </Button>
          <button className="text-sm text-muted-foreground underline-offset-4 hover:underline" onClick={() => continueToReport("anyway")}>
            View anyway
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
