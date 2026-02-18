export default function WhatImNotPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-6 rounded-lg border bg-card p-8">
      <h1 className="font-serif text-4xl tracking-tight">What I&apos;m Not</h1>
      <p className="text-muted-foreground">Clear boundaries make collaboration faster and expectations healthier.</p>
      <ul className="list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
        <li>I am not a lone-wolf engineer who ignores product and people context.</li>
        <li>I am not interested in shipping velocity that sacrifices reliability or trust.</li>
        <li>I am not attached to a single stack when the problem calls for different tools.</li>
        <li>I am not optimizing for cleverness over clarity.</li>
      </ul>
    </article>
  );
}
