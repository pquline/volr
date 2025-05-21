/*
  Warnings:

  - Changed the type of `order` on the `Line` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- Create a temporary column
ALTER TABLE "Line" ADD COLUMN "order_new" INTEGER;

-- Convert the data
UPDATE "Line" SET "order_new" = CAST("order" AS INTEGER);

-- Drop the old column and rename the new one
ALTER TABLE "Line" DROP COLUMN "order";
ALTER TABLE "Line" RENAME COLUMN "order_new" TO "order";

-- Make the column NOT NULL
ALTER TABLE "Line" ALTER COLUMN "order" SET NOT NULL;
