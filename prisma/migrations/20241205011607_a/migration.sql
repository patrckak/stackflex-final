/*
  Warnings:

  - You are about to drop the column `lastModify` on the `Estimates` table. All the data in the column will be lost.
  - You are about to alter the column `descont` on the `Estimates` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "theme" TEXT NOT NULL DEFAULT 'sys',
    "usePDV" BOOLEAN NOT NULL DEFAULT false,
    "useStock" BOOLEAN NOT NULL DEFAULT false,
    "useFinance" BOOLEAN NOT NULL DEFAULT false,
    "useWhatsapp" BOOLEAN NOT NULL DEFAULT false,
    "useChild" BOOLEAN NOT NULL DEFAULT false,
    "earnings" INTEGER NOT NULL DEFAULT 0,
    "monthlyEarnings" INTEGER NOT NULL DEFAULT 0,
    "plan" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Account" ("id", "theme", "useChild", "useFinance", "usePDV", "useStock", "useWhatsapp") SELECT "id", "theme", "useChild", "useFinance", "usePDV", "useStock", "useWhatsapp" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE TABLE "new_Estimates" (
    "estimateId" TEXT NOT NULL PRIMARY KEY,
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "desc" TEXT,
    "date" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Aguardando Aprovação',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "items" TEXT,
    "value" INTEGER NOT NULL DEFAULT 0,
    "descont" INTEGER DEFAULT 0
);
INSERT INTO "new_Estimates" ("clientId", "date", "desc", "descont", "estimateId", "id", "items") SELECT "clientId", "date", "desc", "descont", "estimateId", "id", "items" FROM "Estimates";
DROP TABLE "Estimates";
ALTER TABLE "new_Estimates" RENAME TO "Estimates";
CREATE INDEX "Estimates_id_idx" ON "Estimates"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
