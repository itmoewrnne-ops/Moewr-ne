/*
  Warnings:

  - You are about to drop the column `gallery` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `impactStats` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `milestones` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `QuickLink` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `QuickLink` table. All the data in the column will be lost.
  - Added the required column `href` to the `QuickLink` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'Droplets',
    "image" TEXT,
    "location" TEXT,
    "budget" TEXT,
    "timeline" TEXT,
    "progress" INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "departmentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Project_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("budget", "createdAt", "departmentId", "description", "id", "location", "progress", "status", "timeline", "title", "updatedAt") SELECT "budget", "createdAt", "departmentId", "description", "id", "location", "progress", "status", "timeline", "title", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_QuickLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'FileText',
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_QuickLink" ("active", "createdAt", "icon", "id", "order", "title", "updatedAt") SELECT "active", "createdAt", coalesce("icon", 'FileText') AS "icon", "id", "order", "title", "updatedAt" FROM "QuickLink";
DROP TABLE "QuickLink";
ALTER TABLE "new_QuickLink" RENAME TO "QuickLink";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
