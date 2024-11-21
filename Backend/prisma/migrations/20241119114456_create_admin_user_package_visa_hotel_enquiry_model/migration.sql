-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Approved', 'Rejected');

-- CreateTable
CREATE TABLE "Admin" (
    "admin_id" TEXT NOT NULL,
    "admin_username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "contact" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "EnquiryUmrah" (
    "enquiry_id" TEXT NOT NULL,
    "salutation" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "package_type" TEXT,
    "package_name" TEXT,
    "contact" TEXT NOT NULL,
    "traveller_date" TIMESTAMP(3),
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
    "salutation" TEXT,
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
    "salutation" TEXT,
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
    "salutation" TEXT,
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
    "hotel_name" TEXT NOT NULL,
    "hotel_city" TEXT NOT NULL,
    "hotel_description" TEXT NOT NULL,
    "hotel_images" TEXT[],
    "hotel_distance" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("hotel_id")
);

-- CreateTable
CREATE TABLE "Room" (
    "room_id" TEXT NOT NULL,
    "hotel_id" TEXT NOT NULL,
    "quint_price" DECIMAL(65,30) NOT NULL,
    "quad_price" DECIMAL(65,30) NOT NULL,
    "triple_price" DECIMAL(65,30) NOT NULL,
    "double_price" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("room_id")
);

-- CreateTable
CREATE TABLE "Package" (
    "package_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "package_name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "group_dates" TIMESTAMP(3)[],
    "total_days" INTEGER NOT NULL,
    "total_nights" INTEGER NOT NULL,
    "mak_hotel_name" VARCHAR(100) NOT NULL,
    "mak_hotel_images" TEXT[],
    "med_hotel_name" VARCHAR(100),
    "med_hotel_images" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("package_id")
);

-- CreateTable
CREATE TABLE "PackagePrice" (
    "price_id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,
    "quint_price" DECIMAL(65,30) NOT NULL,
    "quad_price" DECIMAL(65,30) NOT NULL,
    "triple_price" DECIMAL(65,30) NOT NULL,
    "double_price" DECIMAL(65,30) NOT NULL,
    "child_without_bed_price" DECIMAL(65,30) NOT NULL,
    "infant_price" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PackagePrice_pkey" PRIMARY KEY ("price_id")
);

-- CreateTable
CREATE TABLE "UserRegistration" (
    "registration_id" TEXT NOT NULL,
    "salutation" VARCHAR(10) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "contact" VARCHAR(15) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "confirm_password" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRegistration_pkey" PRIMARY KEY ("registration_id")
);

-- CreateTable
CREATE TABLE "Visa" (
    "visa_id" TEXT NOT NULL,
    "visa_country" TEXT NOT NULL,
    "visa_type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visa_pkey" PRIMARY KEY ("visa_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRegistration_email_key" ON "UserRegistration"("email");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "Hotel"("hotel_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackagePrice" ADD CONSTRAINT "PackagePrice_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "Package"("package_id") ON DELETE RESTRICT ON UPDATE CASCADE;
