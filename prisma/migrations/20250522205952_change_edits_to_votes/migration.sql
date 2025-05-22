/*
  Warnings:

  - You are about to drop the column `edits` on the `Entry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "edits",
ADD COLUMN     "votes" INTEGER NOT NULL DEFAULT 0;
