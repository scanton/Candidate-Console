import { defineDocumentType, defineNestedType, makeSource } from "contentlayer/source-files";

const Metric = defineNestedType(() => ({
  name: "Metric",
  fields: {
    label: { type: "string", required: true },
    value: { type: "string", required: true },
  },
}));

export const HeroStory = defineDocumentType(() => ({
  name: "HeroStory",
  filePathPattern: `stories/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    timeframe: { type: "string", required: true },
    role: { type: "string", required: true },
    org: { type: "string", required: true },
    summary: { type: "string", required: true },
    highlights: { type: "list", of: { type: "string" }, required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    metrics: { type: "list", of: Metric, required: false },
    evidenceIds: { type: "list", of: { type: "string" }, required: true },
    featured: { type: "boolean", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("stories/", ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [HeroStory],
});
