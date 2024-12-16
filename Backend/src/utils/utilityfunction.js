import nodemailer from "nodemailer";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { ApiError } from "./ApiErrors.js";
import prisma from "../db/db.config.js";

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

const safeParseJSON = (data, defaultValue = []) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("JSON Parsing Error:", error.message);
    return defaultValue;
  }
};

// ********** Helper function to safely convert to a number **********

const safeConvertToNumber = (value, defaultValue = 0) => {
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
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
};
