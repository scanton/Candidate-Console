import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { EvidenceItem } from "@/lib/zod";

export function EvidenceList({ items }: { items: EvidenceItem[] }) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
              <Badge>{item.type}</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap items-center gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
              {item.date ? <span className="text-xs text-muted-foreground">{formatDate(item.date)}</span> : null}
              {item.url ? (
                <Link className="ml-auto text-sm text-foreground underline-offset-4 hover:underline" href={item.url} target="_blank">
                  Open artifact
                </Link>
              ) : null}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
