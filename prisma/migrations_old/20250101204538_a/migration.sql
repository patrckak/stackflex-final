-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Estimates" (
    "estimateId" TEXT NOT NULL PRIMARY KEY,
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "clientAddress" TEXT,
    "clientNumber" TEXT,
    "clientCadastro" TEXT,
    "description" TEXT,
    "date" TEXT,
    "key" INTEGER NOT NULL DEFAULT 0,
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
