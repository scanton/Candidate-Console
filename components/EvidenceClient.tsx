"use client";

import { useMemo, useState } from "react";

import { EvidenceList } from "@/components/EvidenceList";
import { Input } from "@/components/ui/input";
import type { EvidenceItem } from "@/lib/zod";

export function EvidenceClient({ items, storySlugs }: { items: EvidenceItem[]; storySlugs: string[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [tag, setTag] = useState("all");
  const [story, setStory] = useState("all");

  const types = useMemo(() => Array.from(new Set(items.map((item) => item.type))).sort(), [items]);
  const tags = useMemo(() => Array.from(new Set(items.flatMap((item) => item.tags))).sort(), [items]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return items.filter((item) => {
      const queryMatch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q));
      const typeMatch = type === "all" || item.type === type;
      const tagMatch = tag === "all" || item.tags.includes(tag);
      const storyMatch = story === "all" || item.relatedStorySlugs.includes(story);
      return queryMatch && typeMatch && tagMatch && storyMatch;
    });
  }, [items, query, type, tag, story]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 rounded-lg border bg-card p-4 md:grid-cols-4">
        <Input placeholder="Search evidence..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="h-10 rounded-md border bg-card px-3 text-sm" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="all">All types</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select className="h-10 rounded-md border bg-card px-3 text-sm" value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="all">All tags</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select className="h-10 rounded-md border bg-card px-3 text-sm" value={story} onChange={(e) => setStory(e.target.value)}>
          <option value="all">All related stories</option>
          {storySlugs.map((slug) => (
            <option key={slug} value={slug}>
              {slug}
            </option>
          ))}
        </select>
      </div>
      <EvidenceList items={filtered} />
    </div>
  );
}
