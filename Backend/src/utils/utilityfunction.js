import { ApiError } from "./ApiErrors.js";
import { uploadOnCloudinary, deleteImageFromCloudinary } from "./cloudinary.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import prisma from "../db/db.config.js";
import fs from "fs";
import path from "path";

// ****************** Nodemailer OTP config ******************

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  port: 465,
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_APP_PASSWORD,
  },
});

// ****************** OTP Generation and Storing Logic ******************

const generateOTP = () => {
  return crypto.randomInt(100000, 999999); // Generates a 6-digit OTP
};

// ********** Helper function to safely parse JSON **********

const safeParseJSON = (data) => {
  try {
    console.log("Data before parsing:", data);

    // If it's already an object or array, return as is
    if (typeof data === "object" && data !== null) {
      // If the data is an array, check if it contains nested JSON strings
      if (Array.isArray(data)) {
        return data.map((item) => {
          // Recursively parse if the item is a JSON string
          if (
            typeof item === "string" &&
            (item.startsWith("{") || item.startsWith("["))
          ) {
            return safeParseJSON(item);
          }
          return item;
        });
      }
      return data;
    }

    // If it's a JSON string, parse it
    if (typeof data === "string") {
      if (data.startsWith("[") || data.startsWith("{")) {
        const parsed = JSON.parse(data);

        // Check if the parsed value is an array of JSON strings or objects
        if (Array.isArray(parsed)) {
          return parsed.map((item) => {
            // Recursively parse nested strings or objects
            if (
              typeof item === "string" &&
              (item.startsWith("{") || item.startsWith("["))
            ) {
              return safeParseJSON(item);
            }
            return item;
          });
        }

        return parsed;
      }
      throw new Error("Invalid JSON format");
    }

    throw new Error("Unsupported data type for JSON parsing");
  } catch (error) {
    throw new ApiError(500, `JSON Parsing Error: ${error.message}`);
  }
};

// ********** Helper function to safely convert to a number **********

const safeConvertToNumber = (value, defaultValue = 0) => {
  try {
    const num = Number(value);
    console.log(num);

    if (isNaN(num)) {
      throw new Error("Invalid number");
    }
    return num;
  } catch (error) {
    throw new ApiError(400, `Number Conversion Error: ${error.message}`);
  }
};

// ****************** Users Access and Refresh Token Generation Function  ******************

const generateAccessTokenForUser = async (registrationId, email) => {
  try {
    const accessToken = jwt.sign(
      {
        registrationId,
        email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    return accessToken;
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating token");
  }
};

const generateRefreshTokenForUser = async (registrationId) => {
  try {
    const refreshToken = jwt.sign(
      {
        registrationId,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );

    await prisma.user.update({
      where: {
        registration_id: registrationId,
      },
      data: {
        refresh_token: refreshToken,
      },
    });

    return refreshToken;
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating token");
  }
};

// ****************** Users Access and Refresh Token Generation Function  ******************

const generateAccessTokenForAdmin = async (adminId, email, isAdmin) => {
  try {
    const accessToken = jwt.sign(
      {
        adminId,
        email,
        isAdmin,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    return accessToken;
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating token");
  }
};

const generateRefreshTokenForAdmin = async (adminId, isAdmin) => {
  try {
    const refreshToken = jwt.sign(
      {
        adminId,
        isAdmin,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );

    await prisma.admin.update({
      where: {
        admin_id: adminId,
      },
      data: {
        refresh_token: refreshToken,
      },
    });

    return refreshToken;
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating token");
  }
};

// ********** Helper Function To Check If Image Is Valid Image Or Not **********

const isValidImage = (fileName) => {
  const validExtensions = [".jpg", ".jpeg", ".png"];
  const fileExtension = path.extname(fileName).toLowerCase();
  return validExtensions.includes(fileExtension);
};

// ********** Helper Function To Delete All Temporary Files From Server **********

const deleteTempFiles = () => {
  const directoryPath = path.resolve("public", "temp"); // Ensure path is correct for `public\\temp\\`

  try {
    if (!fs.existsSync(directoryPath)) {
      console.log("Directory does not exist:", directoryPath);
      return;
    }

    const files = fs.readdirSync(directoryPath); // Read all files in the directory

    for (const file of files) {
      const filePath = path.join(directoryPath, file); // Get the full file path

      if (filePath === path.join(directoryPath, ".gitkeep")) {
        continue;
      }

      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath); // Delete the file
        console.log(`Deleted file: ${filePath}`);
      }
    }

    console.log(
      "All files have been deleted from the directory:",
      directoryPath
    );
  } catch (error) {
    console.error("Error deleting files:", error.message);
  }
};

// Helper Function To Handle Image Uploading On Cloudinary **********

const uploadImages = async (imageCategory, imagePaths) => {
  const uploadedImages = [];
  try {
    if (!imagePaths || imagePaths.length === 0) {
      throw new ApiError(400, "No Images Found");
    }

    for (const image of imagePaths) {
      const uploadedImage = await uploadOnCloudinary(image);

      if (uploadedImage?.error) {
        throw new ApiError(
          500,
          `Error While Uploading Image: ${image} - ${uploadedImage.error}`
        );
      }

      uploadedImages.push({
        public_id: uploadedImage.public_id,
        secure_url: uploadedImage.secure_url,
      });
    }
    return { [imageCategory]: uploadedImages };
  } catch (error) {
    if (uploadedImages > 0) {
      await Promise.all(
        uploadedImages.map((img) => deleteImageFromCloudinary(img.public_id))
      );
    }

    deleteTempFiles();

    throw new ApiError(
      500,
      `Error While Uploading Images: ${error.message || error}`
    );
  }
};

// ********** EXPORT *********

export {
  transporter,
  generateOTP,
  safeParseJSON,
  safeConvertToNumber,
  generateAccessTokenForUser,
  generateRefreshTokenForUser,
  generateAccessTokenForAdmin,
  generateRefreshTokenForAdmin,
  isValidImage,
  deleteTempFiles,
  uploadImages,
};
