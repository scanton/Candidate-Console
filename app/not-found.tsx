import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl rounded-lg border bg-card p-8 text-center">
      <h1 className="font-serif text-3xl">Page not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">The resource does not exist or was removed.</p>
      <Link href="/" className="mt-4 inline-block text-sm underline-offset-4 hover:underline">
        Back to home
      </Link>
    </div>
  );
}
