import { allHeroStories } from "contentlayer/generated";

import evidenceData from "@/data/evidence.json";
import { evidenceListSchema } from "@/lib/zod";

export const stories = [...allHeroStories].sort((a, b) =>
  a.featured === b.featured ? a.title.localeCompare(b.title) : a.featured ? -1 : 1,
);

export const featuredStories = stories.filter((story) => story.featured);

const parsedEvidence = evidenceListSchema.safeParse(evidenceData);
if (!parsedEvidence.success) {
  throw new Error(`Invalid evidence JSON: ${parsedEvidence.error.message}`);
}

export const evidenceItems = parsedEvidence.data;

export function getStoryBySlug(slug: string) {
  return stories.find((story) => story.slug === slug);
}

export function getEvidenceByIds(ids: string[]) {
  const set = new Set(ids);
  return evidenceItems.filter((item) => set.has(item.id));
}

export function getTags() {
  return Array.from(new Set(stories.flatMap((story) => story.tags))).sort();
}
