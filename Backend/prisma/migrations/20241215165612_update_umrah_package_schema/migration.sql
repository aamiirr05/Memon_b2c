/*
  Warnings:

  - Added the required column `base_price` to the `UmrahPackage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UmrahPackage" ADD COLUMN     "base_price" INTEGER NOT NULL,
ADD COLUMN     "discount" INTEGER;
