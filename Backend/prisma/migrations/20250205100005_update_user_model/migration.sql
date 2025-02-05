-- AlterTable
ALTER TABLE "EnquiryHoliday" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "EnquiryHotel" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "EnquiryHotel" ADD CONSTRAINT "EnquiryHotel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("registration_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnquiryHoliday" ADD CONSTRAINT "EnquiryHoliday_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("registration_id") ON DELETE CASCADE ON UPDATE CASCADE;
