/*
  Warnings:

  - You are about to drop the `UmrahPackagePricePackagePrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UmrahPackagePricePackagePrice" DROP CONSTRAINT "UmrahPackagePricePackagePrice_package_id_fkey";

-- DropTable
DROP TABLE "UmrahPackagePricePackagePrice";

-- CreateTable
CREATE TABLE "UmrahPackagePrice" (
    "price_id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,
    "quint_price" DECIMAL(65,30) NOT NULL,
    "quad_price" DECIMAL(65,30) NOT NULL,
    "triple_price" DECIMAL(65,30) NOT NULL,
    "double_price" DECIMAL(65,30) NOT NULL,
    "child_without_bed_price" DECIMAL(65,30) NOT NULL,
    "infant_price" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UmrahPackagePrice_pkey" PRIMARY KEY ("price_id")
);

-- AddForeignKey
ALTER TABLE "UmrahPackagePrice" ADD CONSTRAINT "UmrahPackagePrice_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "UmrahPackage"("package_id") ON DELETE CASCADE ON UPDATE CASCADE;
