import { z } from "zod";

export const evidenceTypeSchema = z.enum([
  "repo",
  "doc",
  "demo",
  "talk",
  "article",
  "case-study",
  "other",
]);

export const evidenceItemSchema = z.object({
  id: z.string().min(3),
  type: evidenceTypeSchema,
  title: z.string().min(2),
  description: z.string().min(5),
  url: z.string().url().optional(),
  date: z.string().datetime().optional(),
  tags: z.array(z.string().min(1)).min(1),
  relatedStorySlugs: z.array(z.string().min(1)),
});

export const evidenceListSchema = z.array(evidenceItemSchema);

export type EvidenceItem = z.infer<typeof evidenceItemSchema>;
