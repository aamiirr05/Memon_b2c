/*
  Warnings:

  - Added the required column `package_type` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Made the column `med_hotel_name` on table `Package` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "package_type" VARCHAR(100) NOT NULL,
ALTER COLUMN "package_name" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "group_dates" SET NOT NULL,
ALTER COLUMN "group_dates" SET DATA TYPE TEXT,
ALTER COLUMN "mak_hotel_name" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "med_hotel_name" SET NOT NULL,
ALTER COLUMN "med_hotel_name" SET DATA TYPE VARCHAR(200);
