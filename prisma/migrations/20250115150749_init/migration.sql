-- CreateTable
CREATE TABLE "Line" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "stations" TEXT[],

    CONSTRAINT "Line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "edits" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "city" TEXT NOT NULL,
    "line" TEXT NOT NULL,
    "station" TEXT NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);
