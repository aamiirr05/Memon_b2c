/*
  Warnings:

  - Added the required column `hotel_country` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "hotel_country" TEXT NOT NULL;
