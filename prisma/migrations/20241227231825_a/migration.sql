/*
  Warnings:

  - You are about to drop the column `monthlyEarnings` on the `Account` table. All the data in the column will be lost.
  - You are about to alter the column `earnings` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

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
    "isVerificated" BOOLEAN NOT NULL DEFAULT false,
    "costs" REAL NOT NULL DEFAULT 0,
    "earnings" REAL NOT NULL DEFAULT 0,
    "plan" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Account" ("earnings", "id", "isVerificated", "plan", "theme", "useChild", "useFinance", "usePDV", "useStock", "useWhatsapp") SELECT "earnings", "id", "isVerificated", "plan", "theme", "useChild", "useFinance", "usePDV", "useStock", "useWhatsapp" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
