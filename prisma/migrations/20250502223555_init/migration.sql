/*
  Warnings:

  - You are about to drop the column `line` on the `Entry` table. All the data in the column will be lost.
  - Added the required column `lineId` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lineName` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "line",
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lineId" INTEGER NOT NULL,
ADD COLUMN     "lineName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_lineId_fkey" FOREIGN KEY ("lineId") REFERENCES "Line"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
