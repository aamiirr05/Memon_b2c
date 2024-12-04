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

// ****************** Access and Refresh Token Generation Function ******************

const generateAccessToken = async (registrationId, email) => {
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

const generateRefreshToken = async (registrationId) => {
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

// ****** String To Number Conversion ******

const convertIntoNumber = (data) => {
  return parseInt(data, 10);
};

export {
  transporter,
  generateOTP,
  generateAccessToken,
  generateRefreshToken,
  convertIntoNumber,
};
