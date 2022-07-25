/*
  Warnings:

  - You are about to drop the column `lngGroupId` on the `Lang` table. All the data in the column will be lost.
  - You are about to drop the column `lngGroupId` on the `Census` table. All the data in the column will be lost.
  - You are about to drop the column `lngId` on the `Census` table. All the data in the column will be lost.
  - Added the required column `langGroupId` to the `Lang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `langGroupId` to the `Census` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lang" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "langGroupId" INTEGER NOT NULL,
    CONSTRAINT "Lang_langGroupId_fkey" FOREIGN KEY ("langGroupId") REFERENCES "LangGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lang" ("id", "name") SELECT "id", "name" FROM "Lang";
DROP TABLE "Lang";
ALTER TABLE "new_Lang" RENAME TO "Lang";
CREATE UNIQUE INDEX "Lang_name_key" ON "Lang"("name");
CREATE TABLE "new_Census" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "males" INTEGER,
    "females" INTEGER,
    "langGroupId" INTEGER NOT NULL,
    "langId" INTEGER,
    CONSTRAINT "Census_langGroupId_fkey" FOREIGN KEY ("langGroupId") REFERENCES "LangGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Census_langId_fkey" FOREIGN KEY ("langId") REFERENCES "Lang" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Census" ("females", "id", "males") SELECT "females", "id", "males" FROM "Census";
DROP TABLE "Census";
ALTER TABLE "new_Census" RENAME TO "Census";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
