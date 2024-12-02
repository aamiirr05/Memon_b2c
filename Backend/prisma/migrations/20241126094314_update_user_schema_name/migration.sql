/*
  Warnings:

  - You are about to drop the `UserRegistration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EnquiryContact" DROP CONSTRAINT "EnquiryContact_user_id_fkey";

-- DropForeignKey
ALTER TABLE "EnquiryForex" DROP CONSTRAINT "EnquiryForex_user_id_fkey";

-- DropForeignKey
ALTER TABLE "EnquiryUmrah" DROP CONSTRAINT "EnquiryUmrah_user_id_fkey";

-- DropForeignKey
ALTER TABLE "EnquiryVisa" DROP CONSTRAINT "EnquiryVisa_user_id_fkey";

-- DropTable
DROP TABLE "UserRegistration";

-- CreateTable
CREATE TABLE "User" (
    "registration_id" TEXT NOT NULL,
    "salutation" VARCHAR(10) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "contact" VARCHAR(15) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("registration_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "EnquiryUmrah" ADD CONSTRAINT "EnquiryUmrah_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("registration_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnquiryVisa" ADD CONSTRAINT "EnquiryVisa_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("registration_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnquiryForex" ADD CONSTRAINT "EnquiryForex_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("registration_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnquiryContact" ADD CONSTRAINT "EnquiryContact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("registration_id") ON DELETE CASCADE ON UPDATE CASCADE;
