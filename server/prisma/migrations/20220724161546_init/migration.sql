/*
  Warnings:

  - Added the required column `regionId` to the `Census` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Region" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "parentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Census" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "males" INTEGER,
    "females" INTEGER,
    "langGroupId" INTEGER NOT NULL,
    "langId" INTEGER,
    "regionId" INTEGER NOT NULL,
    CONSTRAINT "Census_langGroupId_fkey" FOREIGN KEY ("langGroupId") REFERENCES "LangGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Census_langId_fkey" FOREIGN KEY ("langId") REFERENCES "Lang" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Census_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Census" ("females", "id", "langGroupId", "langId", "males") SELECT "females", "id", "langGroupId", "langId", "males" FROM "Census";
DROP TABLE "Census";
ALTER TABLE "new_Census" RENAME TO "Census";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Region_parentId_key" ON "Region"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");
