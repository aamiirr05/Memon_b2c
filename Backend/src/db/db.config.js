import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

// ******** DB Connection ********

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to DB!!");
  } catch (error) {
    console.log("Connection to DB Failed:", error);
    process.exit(1);
  }
};

export { connectDB };
export default prisma;
