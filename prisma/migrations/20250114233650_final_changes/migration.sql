-- CreateTable
CREATE TABLE "Lection_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "lection_id" INTEGER NOT NULL,
    "viewed_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Lection_User_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lection_User_lection_id_fkey" FOREIGN KEY ("lection_id") REFERENCES "Lection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "course_id" INTEGER NOT NULL,
    CONSTRAINT "Lection_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lection" ("course_id", "id", "position", "title") SELECT "course_id", "id", "position", "title" FROM "Lection";
DROP TABLE "Lection";
ALTER TABLE "new_Lection" RENAME TO "Lection";
CREATE UNIQUE INDEX "Lection_id_key" ON "Lection"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Lection_User_user_id_lection_id_key" ON "Lection_User"("user_id", "lection_id");
