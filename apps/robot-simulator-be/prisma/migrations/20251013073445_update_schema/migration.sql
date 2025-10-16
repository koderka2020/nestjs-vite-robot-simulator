/*
  Warnings:

  - You are about to drop the column `updated_at` on the `RobotHistory` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RobotHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "direction" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_RobotHistory" ("created_at", "direction", "id", "x", "y") SELECT "created_at", "direction", "id", "x", "y" FROM "RobotHistory";
DROP TABLE "RobotHistory";
ALTER TABLE "new_RobotHistory" RENAME TO "RobotHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
