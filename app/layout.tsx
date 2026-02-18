import type { Metadata } from "next";
import Link from "next/link";

import "@/app/globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { PageTransition } from "@/components/motion/PageTransition";
import { SiteNav } from "@/components/SiteNav";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: siteConfig.siteName,
  description: "Interactive resume and evidence portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-screen bg-background font-sans text-[17px] leading-relaxed text-foreground antialiased">
        <div className="relative min-h-screen bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.08),transparent_60%)]">
          <nav className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur">
            <div className="container flex h-16 max-w-6xl items-center justify-between">
              <Link href="/" className="font-serif text-lg tracking-tight">
                {siteConfig.siteName}
              </Link>
              <SiteNav />
            </div>
          </nav>
          <main className="container max-w-6xl py-14 md:py-16">
            <MotionProvider>
              <PageTransition>{children}</PageTransition>
            </MotionProvider>
          </main>
          <footer className="border-t border-border/80 py-8 text-center text-[15px] text-muted-foreground md:text-base">
            Candidate Console. Evidence-first storytelling.
          </footer>
        </div>
      </body>
    </html>
  );
}
