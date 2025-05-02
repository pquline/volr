/*
  Warnings:

  - A unique constraint covering the columns `[city,name]` on the table `Line` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Line_city_name_key" ON "Line"("city", "name");
