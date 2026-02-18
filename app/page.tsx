import Link from "next/link";

import { HomeClient } from "@/components/HomeClient";
import { FadeIn } from "@/components/motion/FadeIn";
import { MotionCard } from "@/components/motion/MotionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { evidenceItems, featuredStories, getTags, stories } from "@/lib/content";
import { siteConfig } from "@/lib/siteConfig";

export default function HomePage() {
  const tags = getTags();
  const stats = [
    { label: "Hero stories", value: String(stories.length) },
    { label: "Evidence artifacts", value: String(evidenceItems.length) },
    { label: "Core themes", value: String(tags.length) },
  ];

  return (
    <div className="space-y-12">
      <FadeIn>
        <section className="rounded-xl border border-border/80 bg-card px-6 py-8 shadow-soft md:px-8 md:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <Badge variant="outline">{siteConfig.tagline}</Badge>
              <h1 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl">
                Evidence-backed career stories for serious hiring conversations
              </h1>
              <p className="max-w-3xl text-lg text-muted-foreground">{siteConfig.valueProp}</p>
              <p className="text-sm text-muted-foreground">
                Paste a job description to preview an honest fit report. Mock scoring for this phase.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="#hero-stories">
                  <Button>Explore Hero Stories</Button>
                </Link>
                <Link href="/hiring">
                  <Button variant="outline">Hiring Manager Mode</Button>
                </Link>
                <Link href="/evidence">
                  <Button variant="ghost">View Evidence</Button>
                </Link>
                <Link href="/fit-check">
                  <Button variant="ghost">Fit Check Preview</Button>
                </Link>
              </div>
            </div>
            <div className="grid gap-3 self-end">
              {stats.map((item) => (
                <div key={item.label} className="rounded-lg border bg-background px-4 py-3">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-serif text-3xl tracking-tight">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="space-y-4">
          <h2 className="font-serif text-3xl tracking-tight">Featured Stories</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {featuredStories.slice(0, 3).map((story) => (
              <MotionCard key={story.slug}>
                <Link href={`/stories/${story.slug}`}>
                  <Card className="h-full transition-all hover:border-foreground/20 hover:shadow-md">
                    <CardHeader>
                      <CardTitle className="font-serif text-2xl">{story.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{story.summary}</p>
                      <div className="flex flex-wrap gap-2">
                        {story.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </MotionCard>
            ))}
          </div>
        </section>
      </FadeIn>

      <section id="hero-stories" className="scroll-mt-24 space-y-5">
        <div className="space-y-2">
          <h2 className="font-serif text-3xl tracking-tight">All Hero Stories</h2>
          <p className="text-muted-foreground">Filter by themes, search by outcomes, and open detailed story writeups with evidence links.</p>
        </div>
        <HomeClient stories={stories} tags={tags} />
      </section>
    </div>
  );
}
