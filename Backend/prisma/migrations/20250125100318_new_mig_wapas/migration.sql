-- CreateEnum
CREATE TYPE "StatusCustomizedPackage" AS ENUM ('Pending', 'Approved', 'Rejected');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Approved', 'Rejected');

-- CreateEnum
CREATE TYPE "StatusHotelPackage" AS ENUM ('true', 'false');

-- CreateEnum
CREATE TYPE "StatusPackage" AS ENUM ('true', 'false');

-- CreateTable
CREATE TABLE "Admin" (
    "admin_id" TEXT NOT NULL,
    "admin_username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "contact" VARCHAR(15) NOT NULL,
    "refresh_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("admin_id")
);

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
CREATE TABLE "EnquiryUmrah" (
    "enquiry_id" TEXT NOT NULL,
    "user_id" TEXT,
    "salutation" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "package_type" TEXT NOT NULL,
    "package_name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "traveller_date" TEXT NOT NULL,
    "total_adults" INTEGER NOT NULL,
    "total_children" INTEGER NOT NULL,
    "total_infants" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnquiryUmrah_pkey" PRIMARY KEY ("enquiry_id")
);

-- CreateTable
CREATE TABLE "EnquiryVisa" (
    "enquiry_id" TEXT NOT NULL,
    "user_id" TEXT,
    "salutation" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "visa_country" TEXT NOT NULL,
    "visa_type" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnquiryVisa_pkey" PRIMARY KEY ("enquiry_id")
);

-- CreateTable
CREATE TABLE "EnquiryForex" (
    "enquiry_id" TEXT NOT NULL,
    "user_id" TEXT,
    "salutation" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "amount_required" DECIMAL(65,30) NOT NULL,
    "country" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnquiryForex_pkey" PRIMARY KEY ("enquiry_id")
);

-- CreateTable
CREATE TABLE "EnquiryContact" (
    "enquiry_id" TEXT NOT NULL,
    "user_id" TEXT,
    "salutation" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnquiryContact_pkey" PRIMARY KEY ("enquiry_id")
);

-- CreateTable
CREATE TABLE "Hotel" (
    "hotel_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "hotel_name" TEXT NOT NULL,
    "hotel_category" TEXT NOT NULL,
    "hotel_images" JSONB NOT NULL,
    "hotel_country" TEXT NOT NULL,
    "hotel_city" TEXT NOT NULL,
    "hotel_description" TEXT NOT NULL,
    "hotel_distance" TEXT NOT NULL,
    "meal_basis" TEXT NOT NULL,
    "hotel_location" TEXT NOT NULL,
    "amenities" TEXT[],
    "hotel_star" INTEGER NOT NULL,
    "is_active" "StatusHotelPackage" NOT NULL DEFAULT 'true',
    "featured" "StatusHotelPackage" NOT NULL DEFAULT 'false',
    "term_condition" TEXT[],
    "booking_terms" TEXT[],
    "cancellation_policy" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("hotel_id")
);

-- CreateTable
CREATE TABLE "Room" (
    "room_id" TEXT NOT NULL,
    "hotel_id" TEXT NOT NULL,
    "quint_price" DECIMAL(10,2) NOT NULL,
    "quad_price" DECIMAL(10,2) NOT NULL,
    "triple_price" DECIMAL(10,2) NOT NULL,
    "double_price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("room_id")
);

-- CreateTable
CREATE TABLE "UmrahPackage" (
    "package_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "package_name" VARCHAR(200) NOT NULL,
    "package_image" JSONB NOT NULL,
    "package_type" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "makkah_itinerary" JSONB NOT NULL,
    "medina_itinerary" JSONB NOT NULL,
    "inclusion" TEXT[],
    "exclusion" TEXT[],
    "group_dates" TEXT[],
    "booking_deadline" TEXT NOT NULL,
    "total_days" INTEGER NOT NULL,
    "total_nights" INTEGER NOT NULL,
    "mak_hotel_name" VARCHAR(200) NOT NULL,
    "mak_hotel_images" JSONB NOT NULL,
    "mak_hotel_star" INTEGER NOT NULL,
    "mak_hotel_location" TEXT NOT NULL,
    "med_hotel_name" VARCHAR(200) NOT NULL,
    "med_hotel_images" JSONB NOT NULL,
    "med_hotel_star" INTEGER NOT NULL,
    "med_hotel_location" TEXT NOT NULL,
    "cancellation_policy" TEXT[],
    "term_condition" TEXT[],
    "booking_terms" TEXT[],
    "departure_city" TEXT NOT NULL,
    "arrival_city" TEXT NOT NULL,
    "is_active" "StatusPackage" NOT NULL DEFAULT 'true',
    "featured" "StatusPackage" NOT NULL DEFAULT 'false',
    "base_price" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "final_price" INTEGER NOT NULL,
    "you_saved" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UmrahPackage_pkey" PRIMARY KEY ("package_id")
);

-- CreateTable
CREATE TABLE "UmrahPackagePrice" (
    "price_id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,
    "quint_price" DECIMAL(10,2) NOT NULL,
    "quad_price" DECIMAL(10,2) NOT NULL,
    "triple_price" DECIMAL(10,2) NOT NULL,
    "double_price" DECIMAL(10,2) NOT NULL,
    "child_without_bed_price" DECIMAL(10,2) NOT NULL,
    "infant_price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UmrahPackagePrice_pkey" PRIMARY KEY ("price_id")
);

-- CreateTable
CREATE TABLE "HolidayPackage" (
    "admin_id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,
    "package_name" VARCHAR(200) NOT NULL,
    "package_images" JSONB NOT NULL,
    "package_type" VARCHAR(100) NOT NULL,
    "category" TEXT[],
    "description" TEXT NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "hotel_name" VARCHAR(200) NOT NULL,
    "hotel_images" JSONB NOT NULL,
    "hotel_star" INTEGER NOT NULL,
    "itinerary" JSONB NOT NULL,
    "group_dates" TEXT[],
    "total_days" INTEGER NOT NULL,
    "total_nights" INTEGER NOT NULL,
    "base_price" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "final_price" INTEGER NOT NULL,
    "you_saved" INTEGER NOT NULL,
    "inclusion" TEXT[],
    "exclusion" TEXT[],
    "booking_deadline" TEXT NOT NULL,
    "cancellation_policy" TEXT[],
    "term_condition" TEXT[],
    "booking_terms" TEXT[],
    "departure_city" TEXT NOT NULL,
    "arrival_city" TEXT NOT NULL,
    "transport_mode" TEXT NOT NULL,
    "is_active" "StatusPackage" NOT NULL DEFAULT 'true',
    "featured" "StatusPackage" NOT NULL DEFAULT 'false',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HolidayPackage_pkey" PRIMARY KEY ("package_id")
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

-- CreateTable
CREATE TABLE "User" (
    "registration_id" TEXT NOT NULL,
    "salutation" VARCHAR(10) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "contact" VARCHAR(15) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refresh_token" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("registration_id")
);

-- CreateTable
CREATE TABLE "Visa" (
    "visa_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "visa_country" TEXT NOT NULL,
    "visa_type" TEXT NOT NULL,
    "visa_image" JSONB NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "processing_time" TEXT NOT NULL,
    "validity" TEXT NOT NULL,
    "stay_period" INTEGER NOT NULL,
    "entry" TEXT NOT NULL,
    "document_requirement" TEXT[],
    "basic_requirement" TEXT[],
    "term_condition" TEXT[],
    "booking_terms" TEXT[],
    "cancellation_policy" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visa_pkey" PRIMARY KEY ("visa_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "CustomizedPackage" ADD CONSTRAINT "CustomizedPackage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("registration_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnquiryUmrah" ADD CONSTRAINT "EnquiryUmrah_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("registration_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnquiryVisa" ADD CONSTRAINT "EnquiryVisa_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("registration_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnquiryForex" ADD CONSTRAINT "EnquiryForex_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("registration_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnquiryContact" ADD CONSTRAINT "EnquiryContact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("registration_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("admin_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "Hotel"("hotel_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UmrahPackage" ADD CONSTRAINT "UmrahPackage_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("admin_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UmrahPackagePrice" ADD CONSTRAINT "UmrahPackagePrice_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "UmrahPackage"("package_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HolidayPackage" ADD CONSTRAINT "HolidayPackage_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("admin_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visa" ADD CONSTRAINT "Visa_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("admin_id") ON DELETE CASCADE ON UPDATE CASCADE;
