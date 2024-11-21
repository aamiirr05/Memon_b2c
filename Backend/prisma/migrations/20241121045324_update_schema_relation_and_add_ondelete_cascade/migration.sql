/*
  Warnings:

  - You are about to drop the column `confirm_password` on the `UserRegistration` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `EnquiryContact` table without a default value. This is not possible if the table is not empty.
  - Made the column `salutation` on table `EnquiryContact` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `user_id` to the `EnquiryForex` table without a default value. This is not possible if the table is not empty.
  - Made the column `salutation` on table `EnquiryForex` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `user_id` to the `EnquiryUmrah` table without a default value. This is not possible if the table is not empty.
  - Made the column `salutation` on table `EnquiryUmrah` required. This step will fail if there are existing NULL values in that column.
  - Made the column `package_type` on table `EnquiryUmrah` required. This step will fail if there are existing NULL values in that column.
  - Made the column `package_name` on table `EnquiryUmrah` required. This step will fail if there are existing NULL values in that column.
  - Made the column `traveller_date` on table `EnquiryUmrah` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `user_id` to the `EnquiryVisa` table without a default value. This is not possible if the table is not empty.
  - Made the column `salutation` on table `EnquiryVisa` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `admin_id` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admin_id` to the `Visa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Package" DROP CONSTRAINT "Package_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "PackagePrice" DROP CONSTRAINT "PackagePrice_package_id_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_hotel_id_fkey";

-- AlterTable
ALTER TABLE "EnquiryContact" ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "salutation" SET NOT NULL;

-- AlterTable
ALTER TABLE "EnquiryForex" ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "salutation" SET NOT NULL;

-- AlterTable
ALTER TABLE "EnquiryUmrah" ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "salutation" SET NOT NULL,
ALTER COLUMN "package_type" SET NOT NULL,
ALTER COLUMN "package_name" SET NOT NULL,
ALTER COLUMN "traveller_date" SET NOT NULL;

-- AlterTable
ALTER TABLE "EnquiryVisa" ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "salutation" SET NOT NULL;

-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "admin_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserRegistration" DROP COLUMN "confirm_password";

-- AlterTable
ALTER TABLE "Visa" ADD COLUMN     "admin_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "EnquiryUmrah" ADD CONSTRAINT "EnquiryUmrah_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserRegistration"("registration_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnquiryVisa" ADD CONSTRAINT "EnquiryVisa_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserRegistration"("registration_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnquiryForex" ADD CONSTRAINT "EnquiryForex_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserRegistration"("registration_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnquiryContact" ADD CONSTRAINT "EnquiryContact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserRegistration"("registration_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("admin_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "Hotel"("hotel_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("admin_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackagePrice" ADD CONSTRAINT "PackagePrice_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "Package"("package_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visa" ADD CONSTRAINT "Visa_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("admin_id") ON DELETE CASCADE ON UPDATE CASCADE;
