/*
  Warnings:

  - The `group_dates` column on the `UmrahPackage` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `quint_price` on the `UmrahPackagePrice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `quad_price` on the `UmrahPackagePrice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `triple_price` on the `UmrahPackagePrice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `double_price` on the `UmrahPackagePrice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `child_without_bed_price` on the `UmrahPackagePrice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `infant_price` on the `UmrahPackagePrice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - Added the required column `arrival_city` to the `UmrahPackage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `booking_deadline` to the `UmrahPackage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departure_city` to the `UmrahPackage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `makkah_itinerary` to the `UmrahPackage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medina_itinerary` to the `UmrahPackage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusPackage" AS ENUM ('true', 'false');

-- AlterTable
ALTER TABLE "UmrahPackage" ADD COLUMN     "arrival_city" TEXT NOT NULL,
ADD COLUMN     "booking_deadline" TEXT NOT NULL,
ADD COLUMN     "booking_terms" TEXT[],
ADD COLUMN     "cancellation_policy" TEXT[],
ADD COLUMN     "departure_city" TEXT NOT NULL,
ADD COLUMN     "exclusion" TEXT[],
ADD COLUMN     "featured" "StatusPackage" NOT NULL DEFAULT 'false',
ADD COLUMN     "inclusion" TEXT[],
ADD COLUMN     "is_active" "StatusPackage" NOT NULL DEFAULT 'true',
ADD COLUMN     "makkah_itinerary" JSONB NOT NULL,
ADD COLUMN     "medina_itinerary" JSONB NOT NULL,
ADD COLUMN     "term_condition" TEXT[],
DROP COLUMN "group_dates",
ADD COLUMN     "group_dates" TEXT[];

-- AlterTable
ALTER TABLE "UmrahPackagePrice" ALTER COLUMN "quint_price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "quad_price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "triple_price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "double_price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "child_without_bed_price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "infant_price" SET DATA TYPE DECIMAL(10,2);
