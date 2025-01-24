/*
  Warnings:

  - You are about to drop the column `star` on the `Hotel` table. All the data in the column will be lost.
  - Added the required column `hotel_category` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotel_location` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotel_star` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meal_basis` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "star",
ADD COLUMN     "hotel_category" TEXT NOT NULL,
ADD COLUMN     "hotel_location" TEXT NOT NULL,
ADD COLUMN     "hotel_star" INTEGER NOT NULL,
ADD COLUMN     "meal_basis" TEXT NOT NULL;
