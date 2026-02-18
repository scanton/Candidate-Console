import { FadeIn } from "@/components/motion/FadeIn";
import { stories } from "@/lib/content";

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 print:space-y-4">
      <FadeIn>
        <header className="space-y-2">
          <h1 className="font-serif text-4xl tracking-tight md:text-5xl">Resume View</h1>
          <p className="text-muted-foreground">Condensed, print-friendly overview of role progression and outcomes.</p>
        </header>
      </FadeIn>

      <FadeIn>
        <section className="space-y-4">
          {stories.map((story) => (
            <article key={story.slug} className="rounded-lg border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-serif text-2xl">{story.title}</h2>
                <span className="text-sm text-muted-foreground">{story.timeframe}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {story.role} · {story.org}
              </p>
              <p className="mt-2 text-sm">{story.summary}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {story.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </FadeIn>
    </div>
  );
}
