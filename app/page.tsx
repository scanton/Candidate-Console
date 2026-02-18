import { HomeClient } from "@/components/HomeClient";
import { getTags, stories } from "@/lib/content";

export default function HomePage() {
  const tags = getTags();
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="font-serif text-4xl tracking-tight md:text-5xl">Candidate Console</h1>
        <p className="max-w-3xl text-muted-foreground">
          Curated hero stories and evidence artifacts showing execution quality, strategic judgment, and measurable outcomes.
        </p>
      </section>
      <HomeClient stories={stories} tags={tags} />
    </div>
  );
}
