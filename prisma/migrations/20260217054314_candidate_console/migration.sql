/*
  Warnings:

  - You are about to alter the column `resultJson` on the `ShareableReport` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("json")` to `Json`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShareableReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submissionId" TEXT NOT NULL,
    "modelUsed" TEXT,
    "fitScore" INTEGER NOT NULL,
    "resultJson" JSONB NOT NULL,
    "publicSlug" TEXT NOT NULL,
    CONSTRAINT "ShareableReport_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "JobDescriptionSubmission" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ShareableReport" ("createdAt", "fitScore", "id", "modelUsed", "publicSlug", "resultJson", "submissionId") SELECT "createdAt", "fitScore", "id", "modelUsed", "publicSlug", "resultJson", "submissionId" FROM "ShareableReport";
DROP TABLE "ShareableReport";
ALTER TABLE "new_ShareableReport" RENAME TO "ShareableReport";
CREATE UNIQUE INDEX "ShareableReport_publicSlug_key" ON "ShareableReport"("publicSlug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
