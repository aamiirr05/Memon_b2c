import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

// ******** Auto-Verify Departure Tables ********
const initDepartureTables = async () => {
  const statements = [
    `CREATE TABLE IF NOT EXISTS "Departure" (
      "id" TEXT NOT NULL,
      "departure_date" TIMESTAMP(3) NOT NULL,
      "return_date" TIMESTAMP(3) NOT NULL,
      "departure_city" TEXT NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'active',
      "is_published" BOOLEAN NOT NULL DEFAULT false,
      "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Departure_pkey" PRIMARY KEY ("id")
    )`,
    `CREATE TABLE IF NOT EXISTS "Flight" (
      "id" TEXT NOT NULL,
      "departure_id" TEXT NOT NULL,
      "airline" TEXT NOT NULL,
      "flight_number" TEXT NOT NULL,
      "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
    )`,
    `CREATE TABLE IF NOT EXISTS "PackageTier" (
      "id" TEXT NOT NULL,
      "departure_id" TEXT NOT NULL,
      "tier_name" TEXT NOT NULL,
      "total_seats" INTEGER NOT NULL,
      "available_seats" INTEGER NOT NULL,
      "makkah_hotel" TEXT NOT NULL,
      "madina_hotel" TEXT NOT NULL,
      "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "PackageTier_pkey" PRIMARY KEY ("id")
    )`,
    `CREATE INDEX IF NOT EXISTS "Departure_departure_date_idx" ON "Departure"("departure_date")`,
    `CREATE INDEX IF NOT EXISTS "Departure_is_published_idx" ON "Departure"("is_published")`,
    `CREATE INDEX IF NOT EXISTS "Flight_departure_id_idx" ON "Flight"("departure_id")`,
    `CREATE INDEX IF NOT EXISTS "PackageTier_departure_id_idx" ON "PackageTier"("departure_id")`,
    `DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Flight_departure_id_fkey') THEN
        ALTER TABLE "Flight" ADD CONSTRAINT "Flight_departure_id_fkey" FOREIGN KEY ("departure_id") REFERENCES "Departure"("id") ON DELETE CASCADE ON UPDATE CASCADE;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PackageTier_departure_id_fkey') THEN
        ALTER TABLE "PackageTier" ADD CONSTRAINT "PackageTier_departure_id_fkey" FOREIGN KEY ("departure_id") REFERENCES "Departure"("id") ON DELETE CASCADE ON UPDATE CASCADE;
      END IF;
    END $$;`
  ];

  for (const sql of statements) {
    try {
      await prisma.$executeRawUnsafe(sql);
    } catch (err) {
      console.error("Table init error on statement:", err?.message || err);
    }
  }
  console.log("Departure tables initialized successfully.");
};

// ******** DB Connection ********

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to DB!!");
    await initDepartureTables();
  } catch (error) {
    console.log("Connection to DB Failed:", error);
    process.exit(1);
  }
};

export { connectDB };
export default prisma;
