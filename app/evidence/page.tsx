import { EvidenceClient } from "@/components/EvidenceClient";
import { evidenceItems, stories } from "@/lib/content";

export default function EvidencePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-serif text-4xl tracking-tight">Evidence Library</h1>
        <p className="text-muted-foreground">A searchable library of repos, docs, demos, talks, and supporting artifacts.</p>
      </header>
      <EvidenceClient items={evidenceItems} storySlugs={stories.map((story) => story.slug)} />
    </div>
  );
}
