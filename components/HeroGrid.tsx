"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { MotionCard } from "@/components/motion/MotionCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Story = {
  slug: string;
  title: string;
  timeframe: string;
  role: string;
  org: string;
  summary: string;
  tags: string[];
  featured: boolean;
};

export function HeroGrid({ stories }: { stories: Story[] }) {
  return (
    <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {stories.map((story) => (
        <StaggerItem key={story.slug}>
          <Link href={`/stories/${story.slug}`}>
            <MotionCard>
              <Card className="h-full transition-all hover:border-foreground/20 hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    {story.featured ? <Badge>Featured</Badge> : null}
                    <Badge variant="outline">{story.timeframe}</Badge>
                  </div>
                  <CardTitle className="font-serif text-xl leading-snug">{story.title}</CardTitle>
                  <CardDescription>
                    {story.role} · {story.org}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{story.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {story.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm text-foreground">
                    Read story <ArrowUpRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </MotionCard>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
