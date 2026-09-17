-- CreateTable
CREATE TABLE "Departure" (
    "id" TEXT NOT NULL,
    "departure_date" TIMESTAMP(3) NOT NULL,
    "return_date" TIMESTAMP(3) NOT NULL,
    "departure_city" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Departure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flight" (
    "id" TEXT NOT NULL,
    "departure_id" TEXT NOT NULL,
    "airline" TEXT NOT NULL,
    "flight_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageTier" (
    "id" TEXT NOT NULL,
    "departure_id" TEXT NOT NULL,
    "tier_name" TEXT NOT NULL,
    "total_seats" INTEGER NOT NULL,
    "available_seats" INTEGER NOT NULL,
    "makkah_hotel" TEXT NOT NULL,
    "madina_hotel" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PackageTier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Departure_departure_date_idx" ON "Departure"("departure_date");

-- CreateIndex
CREATE INDEX "Departure_is_published_idx" ON "Departure"("is_published");

-- CreateIndex
CREATE INDEX "Flight_departure_id_idx" ON "Flight"("departure_id");

-- CreateIndex
CREATE INDEX "PackageTier_departure_id_idx" ON "PackageTier"("departure_id");

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_departure_id_fkey" FOREIGN KEY ("departure_id") REFERENCES "Departure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageTier" ADD CONSTRAINT "PackageTier_departure_id_fkey" FOREIGN KEY ("departure_id") REFERENCES "Departure"("id") ON DELETE CASCADE ON UPDATE CASCADE;
