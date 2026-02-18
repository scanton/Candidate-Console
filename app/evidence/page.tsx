import { EvidenceClient } from "@/components/EvidenceClient";
import { FadeIn } from "@/components/motion/FadeIn";
import { evidenceItems, stories } from "@/lib/content";

export default function EvidencePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <FadeIn>
        <header className="space-y-2">
          <h1 className="font-serif text-4xl tracking-tight md:text-5xl">Evidence Library</h1>
          <p className="text-muted-foreground">A searchable library of repos, docs, demos, talks, and supporting artifacts.</p>
        </header>
      </FadeIn>
      <FadeIn>
        <EvidenceClient items={evidenceItems} storySlugs={stories.map((story) => story.slug)} />
      </FadeIn>
    </div>
  );
}
