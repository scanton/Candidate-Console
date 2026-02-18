"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {stories.map((story, index) => (
        <motion.div
          key={story.slug}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.04, duration: 0.25 }}
        >
          <Link href={`/stories/${story.slug}`}>
            <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-foreground/20">
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
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
