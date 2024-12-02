import prisma from ".././db/db.config.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  userLoginInputValidation,
  userSignupInputValidation,
} from "../utils/validator/user.validator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import fs from "fs";
import path from "path";

// Nodemailer OTP config

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

// OTP Generation and Storing Logic

const generateOTP = () => {
  return crypto.randomInt(100000, 999999); // Generates a 6-digit OTP
};

const otpStorage = new Map();

const storeOTP = (email, otp) => {
  const expiresAt = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
  otpStorage.set(email, { otp, expiresAt });
};

// Access and Refresh Token Generation Function

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

// All user auth routes

const registerUser = asyncHandler(async (req, res) => {
  const {
    salutation,
    firstname,
    lastname,
    email,
    contact,
    password,
    confirmpassword,
  } = req.body;

  if (
    [
      salutation,
      firstname,
      lastname,
      email,
      contact,
      password,
      confirmpassword,
    ].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

  let error = userSignupInputValidation({
    salutation,
    first_name: firstname,
    last_name: lastname,
    email,
    contact,
    password,
    confirm_password: confirmpassword,
  });

  if (error) {
    throw new ApiError(400, `Validation Error: ${error[0].message}`);
  }

  const normalizedEmail = email.toLowerCase();

  const userExists = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });
  if (userExists) {
    throw new ApiError(400, "User with email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      salutation,
      first_name: firstname,
      last_name: lastname,
      email: normalizedEmail,
      contact,
      password: hashedPassword,
    },
    select: {
      registration_id: true,
      salutation: true,
      first_name: true,
      last_name: true,
      email: true,
      contact: true,
      created_at: true,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and Password is required");
  }

  let normalizedEmail = email.toLowerCase();

  let validationError = userLoginInputValidation({
    email: normalizedEmail,
    password,
  });

  if (validationError) {
    console.log(validationError);
    throw new ApiError(400, `Validation Error: ${validationError[0].message}`);
  }

  let userExist = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!userExist) {
    throw new ApiError(404, "User with this email does not exist!");
  }

  let isPasswordCorrect = await bcrypt.compare(password, userExist.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const accessToken = await generateAccessToken(
    userExist.registration_id,
    userExist.email
  );

  const refreshToken = await generateRefreshToken(userExist.registration_id);

  const loggedInUser = await prisma.user.findUnique({
    where: {
      registration_id: userExist.registration_id,
    },
    select: {
      salutation: true,
      registration_id: true,
      first_name: true,
      last_name: true,
      email: true,
      contact: true,
      created_at: true,
    },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Logged in Successfully"
      )
    );
});

const sendOtp = asyncHandler(async (req, res) => {
  let { email, username } = req.body;

  const __dirname = path.dirname(new URL(import.meta.url).pathname);

  if (!email || !username) {
    throw new ApiError(400, "Email is required");
  }

  const otp = generateOTP();

  const normalizedDirname = __dirname.startsWith("/")
    ? __dirname.slice(1)
    : __dirname;

  const parentDir = path.resolve(normalizedDirname, "..");

  const templatePath = path.join(parentDir, "emailTemplate.html");

  console.log("__dirname:", __dirname); // The current directory
  console.log("parentDir:", parentDir); // The parent directory
  console.log("templatePath:", templatePath); // The full path to the template

  let htmlContent = fs.readFileSync(templatePath, "utf8");

  htmlContent = htmlContent
    .replace("{{userName}}", username)
    .replace("{{otp}}", otp);

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: "Your OTP Verification Code",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);

    storeOTP(email, otp);

    return res.status(200).json(new ApiResponse(200, "OTP sent successfully"));
  } catch (error) {
    console.error("Error sending OTP:", error);

    throw new ApiError(500, "Failed to send OTP");
  }
});

const verifyOtp = asyncHandler(async (req, res) => {
  let { email, inputOtp } = req.body;

  if (!email || !inputOtp) {
    throw new ApiError(400, "Email and Otp is required");
  }

  const record = await otpStorage.get(email);

  if (!record) {
    throw new ApiError(404, "No OTP request found for this email.");
  }

  const { otp, expiresAt } = record;

  if (Date.now() > expiresAt) {
    otpStorage.delete(email);
    throw new ApiError(400, "OTP expired");
  }

  if (otp !== parseInt(inputOtp, 10)) {
    throw new ApiError(400, "Invalid OTP");
  }

  otpStorage.delete(email); // OTP verified, clean up

  return res.status(200).json(new ApiResponse(200, "Email Verified!"));
});

const logoutUser = asyncHandler(
  asyncHandler(async (req, res) => {
    const user = req.user;

    await prisma.user.update({
      where: { registration_id: user.registration_id },
      data: { refresh_token: null },
    });

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, "User logged out sucessfully"));
  })
);

const refreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  console.log(decodedToken);

  const user = await prisma.user.findUnique({
    where: {
      registration_id: decodedToken?.registrationId,
    },
  });

  console.log("User", user);

  console.log("Incoming", incomingRefreshToken);

  console.log("Old", user.refresh_token);

  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (incomingRefreshToken !== user.refresh_token) {
    throw new ApiError(401, "Refresh token expired or used");
  }

  const accessToken = await generateAccessToken(
    user.registration_id,
    user.email
  );

  const newRefreshToken = await generateRefreshToken(user.registration_id);

  const options = {
    secure: true,
    httpOnly: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          newRefreshToken,
        },
        "Access token refreshed"
      )
    );
});

export {
  registerUser,
  loginUser,
  sendOtp,
  verifyOtp,
  logoutUser,
  refreshToken,
};
