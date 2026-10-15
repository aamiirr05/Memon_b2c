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
    END $$;`,
    `ALTER TABLE "InvoiceItem" ADD COLUMN IF NOT EXISTS "sort_order" INTEGER NOT NULL DEFAULT 0;`
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

// ******** Auto-Verify WalkIn Tables ********
const initWalkInTables = async () => {
  const statements = [
    `CREATE TABLE IF NOT EXISTS "WalkInCustomer" (
      "id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "phone" TEXT NOT NULL,
      "email" TEXT,
      "address" TEXT,
      "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "WalkInCustomer_pkey" PRIMARY KEY ("id")
    )`,
    `CREATE TABLE IF NOT EXISTS "WalkInInvoice" (
      "id" TEXT NOT NULL,
      "invoice_number" TEXT NOT NULL,
      "customer_id" TEXT NOT NULL,
      "invoice_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "hijri_year" TEXT NOT NULL,
      "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "WalkInInvoice_pkey" PRIMARY KEY ("id")
    )`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "WalkInInvoice_invoice_number_key" ON "WalkInInvoice"("invoice_number")`,
    `CREATE INDEX IF NOT EXISTS "WalkInInvoice_customer_id_idx" ON "WalkInInvoice"("customer_id")`,
    `CREATE INDEX IF NOT EXISTS "WalkInInvoice_invoice_number_idx" ON "WalkInInvoice"("invoice_number")`,
    `CREATE TABLE IF NOT EXISTS "WalkInInvoiceItem" (
      "id" TEXT NOT NULL,
      "invoice_id" TEXT NOT NULL,
      "particulars" TEXT NOT NULL,
      "pax_quantity" INTEGER NOT NULL,
      "rate_per_pax" DECIMAL(10, 2) NOT NULL,
      "total_amount" DECIMAL(12, 2) NOT NULL,
      "sort_order" INTEGER NOT NULL DEFAULT 0,
      "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "WalkInInvoiceItem_pkey" PRIMARY KEY ("id")
    )`,
    `CREATE INDEX IF NOT EXISTS "WalkInInvoiceItem_invoice_id_idx" ON "WalkInInvoiceItem"("invoice_id")`,
    `CREATE TABLE IF NOT EXISTS "WalkInPayment" (
      "id" TEXT NOT NULL,
      "invoice_id" TEXT NOT NULL,
      "payment_date" TIMESTAMP(3) NOT NULL,
      "amount_paid" DECIMAL(12, 2) NOT NULL,
      "received_by" TEXT NOT NULL,
      "notes" TEXT,
      "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "WalkInPayment_pkey" PRIMARY KEY ("id")
    )`,
    `CREATE INDEX IF NOT EXISTS "WalkInPayment_invoice_id_idx" ON "WalkInPayment"("invoice_id")`,
    `DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'WalkInInvoice_customer_id_fkey') THEN
        ALTER TABLE "WalkInInvoice" ADD CONSTRAINT "WalkInInvoice_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "WalkInCustomer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'WalkInInvoiceItem_invoice_id_fkey') THEN
        ALTER TABLE "WalkInInvoiceItem" ADD CONSTRAINT "WalkInInvoiceItem_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "WalkInInvoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'WalkInPayment_invoice_id_fkey') THEN
        ALTER TABLE "WalkInPayment" ADD CONSTRAINT "WalkInPayment_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "WalkInInvoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
      END IF;
    END $$;`
  ];

  for (const sql of statements) {
    try {
      await prisma.$executeRawUnsafe(sql);
    } catch (err) {
      console.error("WalkIn table init error on statement:", err?.message || err);
    }
  }
  console.log("WalkIn tables initialized successfully.");
};

// ******** DB Connection ********

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to DB!!");
    await initDepartureTables();
    await initWalkInTables();
  } catch (error) {
    console.log("Connection to DB Failed:", error);
    process.exit(1);
  }
};

export { connectDB };
export default prisma;
