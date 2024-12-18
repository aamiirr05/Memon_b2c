-- CreateTable
CREATE TABLE "HolidayPackage" (
    "admin_id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,
    "package_name" VARCHAR(200) NOT NULL,
    "package_images" JSONB NOT NULL,
    "package_type" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "hotel_name" VARCHAR(200) NOT NULL,
    "hotel_images" JSONB NOT NULL,
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

-- AddForeignKey
ALTER TABLE "HolidayPackage" ADD CONSTRAINT "HolidayPackage_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("admin_id") ON DELETE CASCADE ON UPDATE CASCADE;
