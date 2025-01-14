import prisma from "../db/db.config.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  adminLoginInputValidation,
  adminSignupInputValidation,
} from "../validator/admin.validator.js";
import {
  generateAccessTokenForAdmin,
  generateRefreshTokenForAdmin,
} from "../utils/utilityfunction.js";

// ****************** All Admin Auth Routes ******************

// ********** Register **********

const registerAdmin = asyncHandler(async (req, res) => {
  const { username, password, email, contact } = req.body;

  if (
    [username, password, email, contact].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

  console.log(username, password, email, contact);

  const inputError = adminSignupInputValidation({
    username,
    password,
    email,
    contact,
  });

  if (inputError) {
    throw new ApiError(400, `Validation Error: ${inputError[0].message}`);
  }

  const normalizedEmail = email?.toLowerCase();

  const adminExists = await prisma.admin.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (adminExists) {
    throw new ApiError(400, "Admin with this email exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = await prisma.admin.create({
    data: {
      admin_username: username,
      password: hashedPassword,
      email: normalizedEmail,
      contact,
    },
    select: {
      admin_username: true,
      email: true,
      contact: true,
      created_at: true,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(201, newAdmin, "Account Created Sucessfully"));
});

// *************** Check Auth ***************

const checkAuthAdmin = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies?.accessToken;

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

// ********** Login **********

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
      email: true,
      created_at: true,
    },
  });

  const options = {
    secure: true,
    httpOnly: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInAdmin, "Logged In Sucessfully"));
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

  const newRefreshToken = await generateRefreshTokenForAdmin(
    admin.admin_id,
    true
  );

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
  registerAdmin,
  checkAuthAdmin,
  loginAdmin,
  logoutAdmin,
  refreshToken,
  getAdmin,
};
