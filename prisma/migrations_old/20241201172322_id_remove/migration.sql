/*
  Warnings:

  - The primary key for the `Estimates` table will be changed. If it partially fails, the table could be left without primary key constraint.

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
    "items" TEXT,
    "descont" TEXT DEFAULT '0'
);
INSERT INTO "new_Estimates" ("clientId", "date", "desc", "descont", "estimateId", "id", "items") SELECT "clientId", "date", "desc", "descont", "estimateId", "id", "items" FROM "Estimates";
DROP TABLE "Estimates";
ALTER TABLE "new_Estimates" RENAME TO "Estimates";
CREATE INDEX "Estimates_id_idx" ON "Estimates"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
