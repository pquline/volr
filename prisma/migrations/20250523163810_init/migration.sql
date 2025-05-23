-- CreateTable
CREATE TABLE "Line" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'bus',
    "stations" TEXT[],
    "isCustom" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "city" TEXT NOT NULL,
    "station" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lineId" TEXT NOT NULL,
    "lineName" TEXT NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Line_city_idx" ON "Line"("city");

-- CreateIndex
CREATE INDEX "Line_name_idx" ON "Line"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Line_city_name_key" ON "Line"("city", "name");

-- CreateIndex
CREATE INDEX "Entry_city_idx" ON "Entry"("city");

-- CreateIndex
CREATE INDEX "Entry_station_idx" ON "Entry"("station");

-- CreateIndex
CREATE INDEX "Entry_lineId_idx" ON "Entry"("lineId");

-- CreateIndex
CREATE INDEX "Entry_lineName_idx" ON "Entry"("lineName");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_lineId_fkey" FOREIGN KEY ("lineId") REFERENCES "Line"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
