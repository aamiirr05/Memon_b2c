-- CreateEnum
CREATE TYPE "StatusCustomizedPackage" AS ENUM ('Pending', 'Approved', 'Rejected');

-- CreateTable
CREATE TABLE "CustomizedPackage" (
    "custom_package_id" TEXT NOT NULL,
    "user_id" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "booking_type" TEXT NOT NULL,
    "travel_class" TEXT NOT NULL,
    "makkah_hotel_name" TEXT,
    "medina_hotel_name" TEXT,
    "room_type" TEXT,
    "adults" INTEGER NOT NULL,
    "kids" INTEGER DEFAULT 0,
    "status" "StatusCustomizedPackage" NOT NULL DEFAULT 'Pending',
    "additional_info" VARCHAR(300),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomizedPackage_pkey" PRIMARY KEY ("custom_package_id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "testimonial_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "review" VARCHAR(300) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("testimonial_id")
);

-- AddForeignKey
ALTER TABLE "CustomizedPackage" ADD CONSTRAINT "CustomizedPackage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("registration_id") ON DELETE CASCADE ON UPDATE CASCADE;
