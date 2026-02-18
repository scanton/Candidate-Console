import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

type RouteContext = {
  params: Promise<{ publicSlug: string }>;
};

export async function GET(_: Request, { params }: RouteContext) {
  const { publicSlug } = await params;
  const report = await prisma.shareableReport.findUnique({
    where: { publicSlug },
  });

  if (!report) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: report.id,
    publicSlug: report.publicSlug,
    createdAt: report.createdAt,
    fitScore: report.fitScore,
    result: report.resultJson,
  });
}
