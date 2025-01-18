/*
  Warnings:

  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `enterpriseAccount` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `private_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `cep` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Store_private_id_key";

-- DropIndex
DROP INDEX "Store_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Store";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Funcionarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT,
    "cpf" TEXT
);

-- CreateTable
CREATE TABLE "Estimates" (
    "estimateId" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "desc" TEXT,
    "date" TEXT,
    "items" TEXT,
    "descont" TEXT DEFAULT '0'
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "address" TEXT,
    "contact" TEXT
);

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
    "useChild" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Account" ("id", "theme") SELECT "id", coalesce("theme", 'sys') AS "theme" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE TABLE "new_User" (
    "public_id" TEXT NOT NULL PRIMARY KEY,
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verification" TEXT,
    "isVerificated" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "LastModify" DATETIME NOT NULL,
    "cep" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'https://utfs.io/f/SHkctA3zZK7UNJJh7RPsirWFqgMZSXO8ta0lynz9TEYoj2Hv',
    "cnpj" TEXT DEFAULT '0',
    "razao" TEXT
);
INSERT INTO "new_User" ("LastModify", "avatar", "email", "id", "isVerificated", "password", "verification") SELECT "LastModify", "avatar", "email", "id", "isVerificated", "password", "verification" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_public_id_key" ON "User"("public_id");
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Funcionarios_email_key" ON "Funcionarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionarios_cpf_key" ON "Funcionarios"("cpf");

-- CreateIndex
CREATE INDEX "Client_userId_idx" ON "Client"("userId");
