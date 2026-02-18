-- CreateTable
CREATE TABLE "JobDescriptionSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rawText" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'site',
    "userAgent" TEXT,
    "ip" TEXT
);

-- CreateTable
CREATE TABLE "ShareableReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submissionId" TEXT NOT NULL,
    "modelUsed" TEXT,
    "fitScore" INTEGER NOT NULL,
    "resultJson" JSON NOT NULL,
    "publicSlug" TEXT NOT NULL,
    CONSTRAINT "ShareableReport_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "JobDescriptionSubmission" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ShareableReport_publicSlug_key" ON "ShareableReport"("publicSlug");
