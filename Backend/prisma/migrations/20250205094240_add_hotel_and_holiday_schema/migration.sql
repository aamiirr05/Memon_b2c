-- AlterTable
ALTER TABLE "CustomizedPackage" ALTER COLUMN "adults" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "EnquiryUmrah" ALTER COLUMN "total_adults" SET DEFAULT 0,
ALTER COLUMN "total_children" SET DEFAULT 0,
ALTER COLUMN "total_infants" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "EnquiryHotel" (
    "enquiry_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "check_in_date" TEXT NOT NULL,
    "check_out_date" TEXT NOT NULL,
    "number_of_nights" INTEGER NOT NULL,
    "number_of_rooms" INTEGER NOT NULL,
    "room_type" TEXT NOT NULL,
    "meal_plan" TEXT NOT NULL,
    "number_of_adults" INTEGER NOT NULL DEFAULT 0,
    "number_of_children" INTEGER NOT NULL DEFAULT 0,
    "special_request" TEXT,

    CONSTRAINT "EnquiryHotel_pkey" PRIMARY KEY ("enquiry_id")
);

-- CreateTable
CREATE TABLE "EnquiryHoliday" (
    "enquiry_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nationlaity" TEXT NOT NULL,
    "preferred_date" TEXT NOT NULL,
    "number_of_nights" INTEGER NOT NULL,
    "number_of_adults" INTEGER NOT NULL DEFAULT 0,
    "number_of_children" INTEGER NOT NULL DEFAULT 0,
    "preferred_departure_city" TEXT NOT NULL,

    CONSTRAINT "EnquiryHoliday_pkey" PRIMARY KEY ("enquiry_id")
);
