"use client";

import { CopyButton } from "@/components/CopyButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function HiringInterviewPlan({
  thirtyMin,
  sixtyMin,
}: {
  thirtyMin: readonly string[];
  sixtyMin: readonly string[];
}) {
  const summary = ["30-minute plan", ...thirtyMin, "", "60-minute plan", ...sixtyMin].join("\n");

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
        <CardTitle className="font-serif text-2xl">Interview plan</CardTitle>
        <CopyButton value={summary} />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="thirty">
          <TabsList>
            <TabsTrigger value="thirty">30-minute</TabsTrigger>
            <TabsTrigger value="sixty">60-minute</TabsTrigger>
          </TabsList>
          <TabsContent value="thirty">
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
              {thirtyMin.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="sixty">
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
              {sixtyMin.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
