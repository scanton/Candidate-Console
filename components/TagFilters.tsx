"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function TagFilters({
  tags,
  activeTag,
  onTag,
}: {
  tags: string[];
  activeTag: string;
  onTag: (tag: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => onTag("all")}>
        <Badge className={cn(activeTag === "all" ? "bg-primary text-primary-foreground" : "")}>All</Badge>
      </button>
      {tags.map((tag) => (
        <button key={tag} onClick={() => onTag(tag)}>
          <Badge className={cn(activeTag === tag ? "bg-primary text-primary-foreground" : "")}>
            {tag}
          </Badge>
        </button>
      ))}
    </div>
  );
}
