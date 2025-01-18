/*
  Warnings:

  - You are about to alter the column `value` on the `Estimates` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Estimates" (
    "estimateId" TEXT NOT NULL PRIMARY KEY,
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "description" TEXT,
    "date" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Aguardando Aprovação',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "items" TEXT,
    "value" REAL NOT NULL DEFAULT 0,
    "descont" INTEGER DEFAULT 0
);
INSERT INTO "new_Estimates" ("clientId", "createdAt", "date", "descont", "description", "estimateId", "id", "items", "status", "value") SELECT "clientId", "createdAt", "date", "descont", "description", "estimateId", "id", "items", "status", "value" FROM "Estimates";
DROP TABLE "Estimates";
ALTER TABLE "new_Estimates" RENAME TO "Estimates";
CREATE INDEX "Estimates_id_idx" ON "Estimates"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
