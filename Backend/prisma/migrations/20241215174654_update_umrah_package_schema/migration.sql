/*
  Warnings:

  - Added the required column `final_price` to the `UmrahPackage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UmrahPackage" ADD COLUMN     "final_price" INTEGER NOT NULL;
