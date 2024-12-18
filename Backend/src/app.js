import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "../src/utils/logger.js";
import morgan from "morgan";
import { deleteTempFiles } from "./utils/utilityfunction.js";

// ******** Express App Initialization ********
const app = express();

// ******** Cors ********
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// ******** Json & Cookie-Parser ********
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// ******** Custom Logger ********
const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// ******** Routes Import ********
import userRoute from "./routes/user.routes.js";
import enquiryRoute from "./routes/enquiry.routes.js";
import adminRoute from "./routes/admin.routes.js";
import umrahPackageRoute from "./routes/umrah.package.routes.js";
import holidayPackageRoute from "./routes/holiday.package.routes.js";

// ******** Route Declaration ********
app.use("/api/v1/users", userRoute);
app.use("/api/v1/enquiry", enquiryRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/packages", [umrahPackageRoute, holidayPackageRoute]);

app.use((err, req, res, next) => {
  console.error(err.stack);

  // Prisma-specific error handling
  if (err.code === "P2025") {
    // Prisma error code for "Record not found"
    return res.status(404).json({
      success: false,
      message: "Resource not found.",
    });
  }

  if (err.name === "PrismaClientValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
    });
  }

  deleteTempFiles();

  // General error handling
  res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    // stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export { app };
