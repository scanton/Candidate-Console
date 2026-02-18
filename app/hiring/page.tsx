import Link from "next/link";

import { FadeIn } from "@/components/motion/FadeIn";
import { MotionCard } from "@/components/motion/MotionCard";
import { HiringInterviewPlan } from "@/components/HiringInterviewPlan";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { evidenceItems, featuredStories } from "@/lib/content";
import { siteConfig } from "@/lib/siteConfig";

export default function HiringPage() {
  const highlights = featuredStories.slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <FadeIn>
        <section className="rounded-xl border bg-card p-7 shadow-soft">
          <h1 className="font-serif text-4xl tracking-tight md:text-5xl">Hiring Manager Mode</h1>
          <p className="mt-3 max-w-3xl text-lg text-muted-foreground">{siteConfig.hiring.intro}</p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <h2 className="font-serif text-2xl">At-a-glance</h2>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                {siteConfig.hiring.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Domains</p>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.hiring.domains.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Strengths</p>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.hiring.strengths.map((item) => (
                    <Badge key={item} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Role types</p>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.hiring.roleTypes.map((item) => (
                    <Badge key={item} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Evidence artifacts available: {evidenceItems.length}</p>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="space-y-4">
          <h2 className="font-serif text-3xl tracking-tight">Evidence-backed highlights</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {highlights.map((story) => (
              <MotionCard key={story.slug}>
                <Card className="h-full transition-all hover:border-foreground/20 hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl">{story.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {story.role} · {story.org}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{story.summary}</p>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {story.highlights.slice(0, 2).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {story.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link href={`/stories/${story.slug}`} className="inline-block text-sm underline-offset-4 hover:underline">
                      View story
                    </Link>
                  </CardContent>
                </Card>
              </MotionCard>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="space-y-4">
          <h2 className="font-serif text-3xl tracking-tight">Common concerns, answered</h2>
          <div className="grid gap-3">
            {siteConfig.hiring.concerns.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-muted-foreground">{item.body}</p>
                  <Link href={item.href} className="text-sm underline-offset-4 hover:underline">
                    Related proof
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <HiringInterviewPlan
          thirtyMin={siteConfig.hiring.interviewPlan.thirtyMin}
          sixtyMin={siteConfig.hiring.interviewPlan.sixtyMin}
        />
      </FadeIn>

      <FadeIn>
        <section className="rounded-lg border bg-card p-6">
          <h2 className="font-serif text-2xl">Fit report preview</h2>
          <p className="mt-2 text-muted-foreground">
            Run a lightweight fit-check flow using a pasted job description and generate a shareable report link.
          </p>
          <div className="mt-4 flex gap-3">
            <Link href="/fit-check">
              <Button>Open Fit Check Preview</Button>
            </Link>
            <Link href="/evidence">
              <Button variant="outline">Review Evidence Library</Button>
            </Link>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
