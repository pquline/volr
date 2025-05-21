-- CreateIndex
CREATE INDEX "Entry_city_idx" ON "Entry"("city");

-- CreateIndex
CREATE INDEX "Entry_city_lineName_idx" ON "Entry"("city", "lineName");

-- CreateIndex
CREATE INDEX "Entry_city_station_idx" ON "Entry"("city", "station");

-- CreateIndex
CREATE INDEX "Entry_createdAt_idx" ON "Entry"("createdAt");

-- CreateIndex
CREATE INDEX "Entry_updatedAt_idx" ON "Entry"("updatedAt");

-- CreateIndex
CREATE INDEX "Line_city_idx" ON "Line"("city");

-- CreateIndex
CREATE INDEX "Line_city_name_idx" ON "Line"("city", "name");
