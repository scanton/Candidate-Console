"use client";

import { useMemo, useState } from "react";

import { HeroGrid } from "@/components/HeroGrid";
import { TagFilters } from "@/components/TagFilters";
import { Input } from "@/components/ui/input";

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

export function HomeClient({ stories, tags }: { stories: Story[]; tags: string[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return stories.filter((story) => {
      const queryMatch =
        !q ||
        story.title.toLowerCase().includes(q) ||
        story.summary.toLowerCase().includes(q) ||
        story.tags.some((tag) => tag.toLowerCase().includes(q));
      const tagMatch = activeTag === "all" || story.tags.includes(activeTag);
      return queryMatch && tagMatch;
    });
  }, [stories, query, activeTag]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 rounded-lg border border-border bg-card p-5 md:grid-cols-3 md:p-6">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search stories, themes, outcomes..." className="text-base" />
        <div className="md:col-span-2">
          <TagFilters tags={tags} activeTag={activeTag} onTag={setActiveTag} />
        </div>
      </div>
      <HeroGrid stories={filtered} />
      {!filtered.length ? <p className="text-sm text-muted-foreground">No stories match your filters.</p> : null}
    </div>
  );
}
