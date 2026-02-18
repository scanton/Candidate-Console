import type { Metadata } from "next";
import Link from "next/link";

import "@/app/globals.css";
import { PageTransition } from "@/components/motion/PageTransition";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: "Interactive resume and evidence portfolio",
};

const navItems = [
  { href: "/", label: "Stories" },
  { href: "/hiring", label: "Hiring Manager Mode" },
  { href: "/evidence", label: "Evidence" },
  { href: "/resume", label: "Resume" },
  { href: "/about/what-im-not", label: "What I'm Not" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="relative min-h-screen bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.08),transparent_60%)]">
          <nav className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur">
            <div className="container flex h-16 max-w-6xl items-center justify-between">
              <Link href="/" className="font-serif text-lg tracking-tight">
                {siteConfig.name}
              </Link>
              <div className="flex items-center gap-5 text-sm text-muted-foreground">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          <main className="container max-w-6xl py-12">
            <PageTransition>{children}</PageTransition>
          </main>
          <footer className="border-t border-border/80 py-8 text-center text-sm text-muted-foreground">
            Candidate Console. Evidence-first storytelling.
          </footer>
        </div>
      </body>
    </html>
  );
}
