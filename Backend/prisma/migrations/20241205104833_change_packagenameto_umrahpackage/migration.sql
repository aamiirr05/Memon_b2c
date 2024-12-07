/*
  Warnings:

  - You are about to drop the `Package` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PackagePrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Package" DROP CONSTRAINT "Package_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "PackagePrice" DROP CONSTRAINT "PackagePrice_package_id_fkey";

-- DropTable
DROP TABLE "Package";

-- DropTable
DROP TABLE "PackagePrice";

-- CreateTable
CREATE TABLE "UmrahPackage" (
    "package_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "package_name" VARCHAR(200) NOT NULL,
    "package_type" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "group_dates" TEXT NOT NULL,
    "total_days" INTEGER NOT NULL,
    "total_nights" INTEGER NOT NULL,
    "mak_hotel_name" VARCHAR(200) NOT NULL,
    "mak_hotel_images" TEXT[],
    "med_hotel_name" VARCHAR(200) NOT NULL,
    "med_hotel_images" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UmrahPackage_pkey" PRIMARY KEY ("package_id")
);

-- CreateTable
CREATE TABLE "UmrahPackagePricePackagePrice" (
    "price_id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,
    "quint_price" DECIMAL(65,30) NOT NULL,
    "quad_price" DECIMAL(65,30) NOT NULL,
    "triple_price" DECIMAL(65,30) NOT NULL,
    "double_price" DECIMAL(65,30) NOT NULL,
    "child_without_bed_price" DECIMAL(65,30) NOT NULL,
    "infant_price" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UmrahPackagePricePackagePrice_pkey" PRIMARY KEY ("price_id")
);

-- AddForeignKey
ALTER TABLE "UmrahPackage" ADD CONSTRAINT "UmrahPackage_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("admin_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UmrahPackagePricePackagePrice" ADD CONSTRAINT "UmrahPackagePricePackagePrice_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "UmrahPackage"("package_id") ON DELETE CASCADE ON UPDATE CASCADE;
