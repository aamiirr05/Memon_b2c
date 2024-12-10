/*
  Warnings:

  - Changed the type of `mak_hotel_images` on the `UmrahPackage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `med_hotel_images` on the `UmrahPackage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `package_image` on the `UmrahPackage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UmrahPackage" DROP COLUMN "mak_hotel_images",
ADD COLUMN     "mak_hotel_images" JSONB NOT NULL,
DROP COLUMN "med_hotel_images",
ADD COLUMN     "med_hotel_images" JSONB NOT NULL,
DROP COLUMN "package_image",
ADD COLUMN     "package_image" JSONB NOT NULL;
