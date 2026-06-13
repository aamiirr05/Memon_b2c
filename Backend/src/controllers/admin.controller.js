import prisma from "../db/db.config.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  adminLoginInputValidation,
} from "../validator/admin.validator.js";
import {
  generateAccessTokenForAdmin,
  generateRefreshTokenForAdmin,
  sendOtp,
  otpStorage,
} from "../utils/utilityfunction.js";

// ****************** All Admin Auth Routes ******************

// *************** Check Auth ***************

const checkAuthAdmin = asyncHandler(async (req, res) => {
  try {
    const authHeader = req.headers?.authorization || req.headers?.Authorization;
    const headerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    const token = req.cookies?.accessToken || headerToken;

    if (!token) {
      throw new ApiError(401, "Token not found");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const admin = await prisma.admin.findUnique({
      where: {
        admin_id: decodedToken.adminId,
      },
      select: {
        admin_id: true,
        admin_username: true,
        password: true,
        email: true,
        contact: true,
        refresh_token: true,
        created_at: true,
      },
    });

    if (!admin) {
      throw new ApiError(404, "Invalid Token");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, admin, "User Authenticated"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

// ********** Login (Step 1 — verify credentials, send OTP) **********

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields must be filled");
  }

  const normalizedEmail = email?.toLowerCase();

  const inputError = adminLoginInputValidation({
    email: normalizedEmail,
    password,
  });

  if (inputError) {
    throw new ApiError(400, `Validation Error: ${inputError[0].message}`);
  }

  const adminExist = await prisma.admin.findUnique({
    where: { email: normalizedEmail },
  });

  if (!adminExist) {
    throw new ApiError(404, "Admin with this email does not exists");
  }

  const isValidPassword = await bcrypt.compare(password, adminExist.password);

  if (!isValidPassword) {
    throw new ApiError(401, "Invalid user credentials");
  }

  await sendOtp(adminExist.email, adminExist.admin_username);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { email: adminExist.email },
        "OTP sent to your registered email"
      )
    );
});

// ********** Verify Login OTP (Step 2 — issue tokens) **********

const verifyAdminLoginOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new ApiError(400, "Email and OTP are required");
  }

  const normalizedEmail = email.toLowerCase();
  const record = otpStorage.get(normalizedEmail);

  if (!record) {
    throw new ApiError(400, "OTP expired or not requested. Please login again.");
  }

  if (Date.now() > record.expiresAt) {
    otpStorage.delete(normalizedEmail);
    throw new ApiError(400, "OTP expired. Please login again.");
  }

  if (String(record.otp) !== String(otp)) {
    throw new ApiError(400, "Invalid OTP");
  }

  // OTP correct — clear it (one-time use)
  otpStorage.delete(normalizedEmail);

  const adminExist = await prisma.admin.findUnique({
    where: { email: normalizedEmail },
  });

  if (!adminExist) {
    throw new ApiError(404, "Admin not found");
  }

  const accessToken = await generateAccessTokenForAdmin(
    adminExist.admin_id,
    adminExist.email,
    true
  );

  const refreshToken = await generateRefreshTokenForAdmin(
    adminExist.admin_id,
    true
  );

  const loggedInAdmin = await prisma.admin.findUnique({
    where: {
      admin_id: adminExist.admin_id,
    },
    select: {
      admin_id: true,
      admin_username: true,
      email: true,
      contact: true,
      created_at: true,
    },
  });

  const accessTokenOptions = {
    secure: true,
    httpOnly: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const refreshTokenOptions = {
    secure: true,
    httpOnly: true,
    sameSite: "None",
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json(new ApiResponse(200, { ...loggedInAdmin, accessToken }, "Logged In Sucessfully"));
});

// ********** Logout **********

const logoutAdmin = asyncHandler(async (req, res) => {
  const admin = req.admin;

  await prisma.admin.update({
    where: { admin_id: admin.admin_id },
    data: { refresh_token: null },
  });

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User logged out sucessfully"));
});

// ********** Refresh Token **********

const refreshToken = asyncHandler(async (req, res) => {
  const incomingToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(
    incomingToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const admin = await prisma.admin.findUnique({
    where: { admin_id: decodedToken?.adminId },
  });

  if (!admin) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (incomingToken !== admin.refresh_token) {
    throw new ApiError(401, "Refresh Token Used or Expired");
  }

  const accessToken = await generateAccessTokenForAdmin(
    admin.admin_id,
    admin.email,
    true
  );

  // Do NOT rotate the refresh token — this allows multiple devices to stay logged in
  const accessTokenOptions = {
    secure: true,
    httpOnly: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .json(
      new ApiResponse(
        200,
        { accessToken },
        "Access token refreshed"
      )
    );
});

// ********** Get Current Admin **********

const getAdmin = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  res.status(200).json(new ApiResponse(200, admin, "User fetched sucessfully"));
});

// *************** Export Controller ***************

export {
  checkAuthAdmin,
  loginAdmin,
  verifyAdminLoginOtp,
  logoutAdmin,
  refreshToken,
  getAdmin,
};
