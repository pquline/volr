/*
  Warnings:

  - The primary key for the `Line` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `comment` on table `Entry` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `order` to the `Line` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_lineId_fkey";

-- DropIndex
DROP INDEX "Entry_city_lineName_idx";

-- DropIndex
DROP INDEX "Entry_city_station_idx";

-- DropIndex
DROP INDEX "Entry_createdAt_idx";

-- DropIndex
DROP INDEX "Entry_updatedAt_idx";

-- DropIndex
DROP INDEX "Line_city_name_idx";

-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "comment" SET NOT NULL,
ALTER COLUMN "lineId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Line" DROP CONSTRAINT "Line_pkey",
ADD COLUMN     "order" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'bus',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Line_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Line_id_seq";

-- CreateIndex
CREATE INDEX "Entry_station_idx" ON "Entry"("station");

-- CreateIndex
CREATE INDEX "Entry_lineId_idx" ON "Entry"("lineId");

-- CreateIndex
CREATE INDEX "Entry_lineName_idx" ON "Entry"("lineName");

-- CreateIndex
CREATE INDEX "Line_name_idx" ON "Line"("name");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_lineId_fkey" FOREIGN KEY ("lineId") REFERENCES "Line"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
