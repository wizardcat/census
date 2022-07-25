-- CreateTable
CREATE TABLE "LangGroup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Lang" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "lngGroupId" INTEGER NOT NULL,
    CONSTRAINT "Lang_lngGroupId_fkey" FOREIGN KEY ("lngGroupId") REFERENCES "LangGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Census" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "males" INTEGER,
    "females" INTEGER,
    "lngGroupId" INTEGER NOT NULL,
    "lngId" INTEGER,
    CONSTRAINT "Census_lngGroupId_fkey" FOREIGN KEY ("lngGroupId") REFERENCES "LangGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Census_lngId_fkey" FOREIGN KEY ("lngId") REFERENCES "Lang" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "LangGroup_name_key" ON "LangGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Lang_name_key" ON "Lang"("name");
