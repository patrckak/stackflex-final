-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "private_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0,
    "verification" TEXT,
    "isVerificated" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "LastModify" DATETIME NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'https://utfs.io/f/SHkctA3zZK7UNJJh7RPsirWFqgMZSXO8ta0lynz9TEYoj2Hv',
    "enterpriseAccount" BOOLEAN NOT NULL DEFAULT false,
    "storeId" TEXT
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "theme" TEXT
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "private_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_private_id_key" ON "User"("private_id");

-- CreateIndex
CREATE INDEX "User_storeId_idx" ON "User"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "Store_id_key" ON "Store"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Store_private_id_key" ON "Store"("private_id");
