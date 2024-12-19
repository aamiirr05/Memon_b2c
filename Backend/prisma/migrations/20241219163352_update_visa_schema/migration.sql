/*
  Warnings:

  - You are about to drop the column `image` on the `Visa` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Visa` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - Added the required column `document_requirement` to the `Visa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entry` to the `Visa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processing_time` to the `Visa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stay_period` to the `Visa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validity` to the `Visa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visa_image` to the `Visa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Visa" DROP COLUMN "image",
ADD COLUMN     "basic_requirement" TEXT[],
ADD COLUMN     "document_requirement" JSONB NOT NULL,
ADD COLUMN     "entry" TEXT NOT NULL,
ADD COLUMN     "processing_time" TEXT NOT NULL,
ADD COLUMN     "stay_period" INTEGER NOT NULL,
ADD COLUMN     "validity" TEXT NOT NULL,
ADD COLUMN     "visa_image" JSONB NOT NULL,
ALTER COLUMN "price" SET DATA TYPE INTEGER;
