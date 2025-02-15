import dotenv from "dotenv";
import { connectDB } from "./db/db.config.js";
import { app } from "./app.js";
import prisma from "./db/db.config.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3000;

// Connects the DB before any request handling
connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connection to DB Failed:", err);
  });

// Gracefully Shutdown the connection on server shutdown
process.on("SIGINT", async () => {
  console.log("SIGINT received. Cleaning up...");
  await prisma.$disconnect();
  console.log("Database disconnected.");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Cleaning up...");
  await prisma.$disconnect();
  console.log("Database disconnected.");
  process.exit(0);
});
