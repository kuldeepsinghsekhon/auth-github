/*
  Warnings:

  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Products";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image_url" TEXT,
    "name" TEXT,
    "status" TEXT,
    "price" INTEGER,
    "stock" INTEGER,
    "available_at" DATETIME NOT NULL
);
