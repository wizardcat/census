-- CreateTable
CREATE TABLE "document" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name_uk" TEXT,
    "name_en" TEXT,
    "name_ru" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "language_group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name_uk" TEXT,
    "name_en" TEXT,
    "name_ru" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "language" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name_uk" TEXT,
    "name_en" TEXT,
    "name_ru" TEXT NOT NULL,
    "language_group_id" INTEGER NOT NULL,
    CONSTRAINT "language_language_group_id_fkey" FOREIGN KEY ("language_group_id") REFERENCES "language_group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "region" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "parent_id" INTEGER,
    "name_uk" TEXT,
    "name_en" TEXT,
    "name_ru" TEXT NOT NULL,
    "document_id" INTEGER NOT NULL,
    CONSTRAINT "region_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "document" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "region_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "region" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "census" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "males" INTEGER NOT NULL,
    "females" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,
    "region_id" INTEGER NOT NULL,
    CONSTRAINT "census_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "census_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "region" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
