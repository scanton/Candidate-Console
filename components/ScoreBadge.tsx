import { Badge } from "@/components/ui/badge";

export function ScoreBadge({ score }: { score: number }) {
  const label = score >= 80 ? "Strong" : score >= 65 ? "Promising" : "Emerging";
  return <Badge className="px-3 py-1 text-sm">Fit {score} · {label}</Badge>;
}
