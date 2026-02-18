import Link from "next/link";
import { notFound } from "next/navigation";
import { allHeroStories } from "contentlayer/generated";

import { MdxBody } from "@/components/MdxBody";
import { FadeIn } from "@/components/motion/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { evidenceItems } from "@/lib/content";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return allHeroStories.map((story) => ({ slug: story.slug }));
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = allHeroStories.find((item) => item.slug === slug);

  if (!story) {
    notFound();
  }

  const relatedEvidence = evidenceItems.filter((item) => story.evidenceIds.includes(item.id));
  return (
    <article className="mx-auto max-w-5xl space-y-8">
      <FadeIn>
        <header className="rounded-lg border bg-card p-6 md:p-8">
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge>{story.timeframe}</Badge>
            <Badge variant="outline">
              {story.role} · {story.org}
            </Badge>
          </div>
          <h1 className="font-serif text-4xl tracking-tight md:text-5xl">{story.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{story.summary}</p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-base text-muted-foreground">
            {story.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </header>
      </FadeIn>

      {story.metrics?.length ? (
        <FadeIn>
          <section className="grid gap-4 sm:grid-cols-3">
            {story.metrics.map((metric) => (
              <Card key={metric.label}>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">{metric.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{metric.value}</p>
                </CardContent>
              </Card>
            ))}
          </section>
        </FadeIn>
      ) : null}

      <FadeIn>
        <section className="rounded-lg border bg-card p-6 md:p-8">
          <div className="prose prose-zinc prose-lg max-w-3xl dark:prose-invert prose-shell mx-auto">
            <MdxBody code={story.body.code} />
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="space-y-3">
          <h2 className="font-serif text-2xl">Related Evidence</h2>
          <div className="grid gap-3">
            {relatedEvidence.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  {item.url ? (
                    <Link href={item.url} target="_blank" className="mt-2 inline-block text-sm underline-offset-4 hover:underline">
                      Open artifact
                    </Link>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </FadeIn>
    </article>
  );
}
