/*
  Warnings:

  - Changed the type of `hotel_images` on the `Hotel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "hotel_images",
ADD COLUMN     "hotel_images" JSONB NOT NULL;
