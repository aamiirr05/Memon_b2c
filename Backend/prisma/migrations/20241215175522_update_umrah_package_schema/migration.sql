/*
  Warnings:

  - Added the required column `you_saved` to the `UmrahPackage` table without a default value. This is not possible if the table is not empty.
  - Made the column `discount` on table `UmrahPackage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UmrahPackage" ADD COLUMN     "you_saved" INTEGER NOT NULL,
ALTER COLUMN "discount" SET NOT NULL,
ALTER COLUMN "discount" SET DEFAULT 0;
