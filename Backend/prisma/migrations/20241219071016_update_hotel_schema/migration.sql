/*
  Warnings:

  - You are about to alter the column `quint_price` on the `Room` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `quad_price` on the `Room` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `triple_price` on the `Room` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `double_price` on the `Room` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - Added the required column `star` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Visa` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusHotelPackage" AS ENUM ('true', 'false');

-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "amenities" TEXT[],
ADD COLUMN     "booking_terms" TEXT[],
ADD COLUMN     "cancellation_policy" TEXT[],
ADD COLUMN     "featured" "StatusHotelPackage" NOT NULL DEFAULT 'false',
ADD COLUMN     "is_active" "StatusHotelPackage" NOT NULL DEFAULT 'true',
ADD COLUMN     "star" TEXT NOT NULL,
ADD COLUMN     "term_condition" TEXT[];

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "quint_price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "quad_price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "triple_price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "double_price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Visa" ADD COLUMN     "booking_terms" TEXT[],
ADD COLUMN     "cancellation_policy" TEXT[],
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "term_condition" TEXT[];
