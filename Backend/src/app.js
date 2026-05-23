import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "../src/utils/logger.js";
import morgan from "morgan";
import { limiter } from "./utils/utilityfunction.js";
import { deleteTempFiles } from "./utils/utilityfunction.js";

// ******** Express App Initialization ********
const app = express();

// ******** Cors ********
const allowedOrigins = [
  "https://memonhajumrahtours.com",
  "https://www.memonhajumrahtours.com",
  "https://memon-b2c.vercel.app",
  process.env.CLIENT_URL_LOCAL,
  process.env.CLIENT_URL_PROD,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Trust Proxy for Render
app.set("trust proxy", 1);

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
          method: message?.split(" ")[0],
          url: message?.split(" ")[1],
          status: message?.split(" ")[2],
          responseTime: message?.split(" ")[3],
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
import hotelRoute from "./routes/hotel.routes.js";
import visaRoute from "./routes/visa.routes.js";
import adminEnquiryRoutes from "./routes/adminenquiry.routes.js";

// ******** Rate Limiter ********

app.use("/api/v1/users/enquiry", limiter);

// ******** Route Declaration ********
app.use("/api/v1/users", userRoute);
app.use("/api/v1/users/enquiry", enquiryRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/admin/packages", [umrahPackageRoute, holidayPackageRoute]);
app.use("/api/v1/admin/hotel", hotelRoute);
app.use("/api/v1/admin/visa", visaRoute);
app.use("/api/v1/admin/enquiry", adminEnquiryRoutes);

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
