"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, MenuContent, MenuItem } from "@/components/ui/dropdown-menu";

const desktopItems = [
  { href: "/", label: "Stories" },
  { href: "/evidence", label: "Evidence" },
  { href: "/resume", label: "Resume" },
  { href: "/about/what-im-not", label: "What I'm Not" },
  { href: "/hiring", label: "Hiring Manager Mode" },
];

const mobilePrimary = [
  { href: "/", label: "Stories" },
  { href: "/hiring", label: "Hiring" },
  { href: "/evidence", label: "Evidence" },
];

const mobileMore = [
  { href: "/resume", label: "Resume" },
  { href: "/about/what-im-not", label: "What I'm Not" },
  { href: "/fit-check", label: "Fit Check" },
];

export function SiteNav() {
  return (
    <>
      <div className="hidden items-center gap-5 text-[15px] text-muted-foreground md:flex md:text-base">
        {desktopItems.map((item) => (
          <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3 text-[15px] text-muted-foreground md:hidden">
        {mobilePrimary.map((item) => (
          <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
            {item.label}
          </Link>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-[15px] text-muted-foreground">
              More <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <MenuContent align="end">
            {mobileMore.map((item) => (
              <MenuItem key={item.href} asChild>
                <Link href={item.href}>{item.label}</Link>
              </MenuItem>
            ))}
          </MenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
