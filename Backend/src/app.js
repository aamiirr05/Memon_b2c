import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "../src/utils/logger.js";
import morgan from "morgan";

// Express App Initialization
const app = express();

// Cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// Json & Cookie-Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Custom Logger
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

//routes import
import userRoute from "./routes/user.routes.js";

// route declaration
app.use("/api/v1/users", userRoute);

app.use((err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err.stack);

  // Send a structured JSON response
  res.status(err.statusCode || 500).json({
    success: err.success,
    statusCode: err.statusCode || 500,
    message: err.message,
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export { app };
