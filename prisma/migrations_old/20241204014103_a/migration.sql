/*
  Warnings:

  - Added the required column `lastModify` to the `Estimates` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Estimates" (
    "estimateId" TEXT NOT NULL PRIMARY KEY,
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "desc" TEXT,
    "date" TEXT,
    "lastModify" DATETIME NOT NULL,
    "items" TEXT,
    "descont" TEXT DEFAULT '0'
);
INSERT INTO "new_Estimates" ("clientId", "date", "desc", "descont", "estimateId", "id", "items") SELECT "clientId", "date", "desc", "descont", "estimateId", "id", "items" FROM "Estimates";
DROP TABLE "Estimates";
ALTER TABLE "new_Estimates" RENAME TO "Estimates";
CREATE INDEX "Estimates_id_idx" ON "Estimates"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
