/*
  Warnings:

  - The `document_requirement` column on the `Visa` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Visa" DROP COLUMN "document_requirement",
ADD COLUMN     "document_requirement" TEXT[];
