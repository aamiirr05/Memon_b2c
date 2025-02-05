/*
  Warnings:

  - You are about to drop the column `nationlaity` on the `EnquiryHoliday` table. All the data in the column will be lost.
  - Added the required column `nationality` to the `EnquiryHoliday` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EnquiryHoliday" DROP COLUMN "nationlaity",
ADD COLUMN     "nationality" TEXT NOT NULL;
