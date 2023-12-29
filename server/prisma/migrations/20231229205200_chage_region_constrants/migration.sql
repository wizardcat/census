-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_region" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "parent_id" INTEGER,
    "name_uk" TEXT,
    "name_en" TEXT,
    "name_ru" TEXT NOT NULL,
    "document_id" INTEGER NOT NULL,
    CONSTRAINT "region_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "document" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_region" ("document_id", "id", "name_en", "name_ru", "name_uk", "parent_id") SELECT "document_id", "id", "name_en", "name_ru", "name_uk", "parent_id" FROM "region";
DROP TABLE "region";
ALTER TABLE "new_region" RENAME TO "region";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
