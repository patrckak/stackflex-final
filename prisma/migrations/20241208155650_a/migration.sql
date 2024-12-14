/*
  Warnings:

  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `Estimates` table. All the data in the column will be lost.
  - You are about to drop the column `LastModify` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isVerificated` on the `User` table. All the data in the column will be lost.
  - The required column `clientId` was added to the `Client` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Funcionarios` table without a default value. This is not possible if the table is not empty.

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
    "earnings" INTEGER NOT NULL DEFAULT 0,
    "monthlyEarnings" INTEGER NOT NULL DEFAULT 0,
    "plan" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Account" ("earnings", "id", "monthlyEarnings", "plan", "theme", "useChild", "useFinance", "usePDV", "useStock", "useWhatsapp") SELECT "earnings", "id", "monthlyEarnings", "plan", "theme", "useChild", "useFinance", "usePDV", "useStock", "useWhatsapp" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE TABLE "new_Client" (
    "clientId" TEXT NOT NULL PRIMARY KEY,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hasDebt" BOOLEAN NOT NULL DEFAULT false,
    "address" TEXT,
    "contact" TEXT
);
INSERT INTO "new_Client" ("address", "contact", "id") SELECT "address", "contact", "id" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_clientId_key" ON "Client"("clientId");
CREATE UNIQUE INDEX "Client_id_key" ON "Client"("id");
CREATE INDEX "Client_id_idx" ON "Client"("id");
CREATE TABLE "new_Estimates" (
    "estimateId" TEXT NOT NULL PRIMARY KEY,
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "description" TEXT,
    "date" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Aguardando Aprovação',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "items" TEXT,
    "value" INTEGER NOT NULL DEFAULT 0,
    "descont" INTEGER DEFAULT 0
);
INSERT INTO "new_Estimates" ("clientId", "createdAt", "date", "descont", "estimateId", "id", "items", "status", "value") SELECT "clientId", "createdAt", "date", "descont", "estimateId", "id", "items", "status", "value" FROM "Estimates";
DROP TABLE "Estimates";
ALTER TABLE "new_Estimates" RENAME TO "Estimates";
CREATE INDEX "Estimates_id_idx" ON "Estimates"("id");
CREATE TABLE "new_Funcionarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 1,
    "email" TEXT,
    "cpf" TEXT
);
INSERT INTO "new_Funcionarios" ("cpf", "email", "id") SELECT "cpf", "email", "id" FROM "Funcionarios";
DROP TABLE "Funcionarios";
ALTER TABLE "new_Funcionarios" RENAME TO "Funcionarios";
CREATE UNIQUE INDEX "Funcionarios_email_key" ON "Funcionarios"("email");
CREATE UNIQUE INDEX "Funcionarios_cpf_key" ON "Funcionarios"("cpf");
CREATE TABLE "new_User" (
    "public_id" TEXT NOT NULL PRIMARY KEY,
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verification" TEXT,
    "password" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'https://utfs.io/f/SHkctA3zZK7UNJJh7RPsirWFqgMZSXO8ta0lynz9TEYoj2Hv',
    "cnpj" TEXT DEFAULT '0',
    "razao" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("avatar", "cep", "cidade", "cnpj", "email", "endereco", "firstname", "id", "lastname", "password", "public_id", "razao", "verification") SELECT "avatar", "cep", "cidade", "cnpj", "email", "endereco", "firstname", "id", "lastname", "password", "public_id", "razao", "verification" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_public_id_key" ON "User"("public_id");
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
