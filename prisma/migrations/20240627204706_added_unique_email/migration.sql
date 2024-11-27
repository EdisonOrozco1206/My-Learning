/*
  Warnings:

  - You are about to alter the column `category` on the `Course` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to drop the column `content` on the `Lection` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `portait` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "portait" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" INTEGER NOT NULL,
    "instructor_id" INTEGER NOT NULL,
    CONSTRAINT "Course_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("category", "description", "id", "instructor_id", "price", "title") SELECT "category", "description", "id", "instructor_id", "price", "title" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_id_key" ON "Course"("id");
CREATE TABLE "new_Lection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
