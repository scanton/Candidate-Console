import { FitCheckClient } from "@/components/FitCheckClient";
import { FadeIn } from "@/components/motion/FadeIn";

export default function FitCheckPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <FadeIn>
        <header className="space-y-2">
          <h1 className="font-serif text-4xl tracking-tight">Fit Check Preview</h1>
          <p className="text-muted-foreground">
            Paste a job description to generate a mock fit report and shareable link. This is a deterministic preview flow.
          </p>
        </header>
      </FadeIn>
      <FadeIn>
        <FitCheckClient />
      </FadeIn>
    </div>
  );
}
