/*
  Warnings:

  - You are about to drop the column `order` on the `Line` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Line` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Line" DROP COLUMN "order",
DROP COLUMN "type";
