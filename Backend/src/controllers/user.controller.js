import prisma from ".././db/db.config.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  userLoginInputValidation,
  userSignupInputValidation,
} from "../validator/user.validator.js";
import {
  transporter,
  generateOTP,
  safeConvertToNumber,
  generateAccessTokenForUser,
  generateRefreshTokenForUser,
} from "../utils/utilityfunction.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import {
  userContactEnquiryValidation,
  userForexEnquiryValidation,
  userUmrahEnquiryValidation,
  userVisaEnquiryValidation,
} from "../validator/enquiry.validator.js";

// Store Otp

const otpStorage = new Map();

const storeOTP = (email, otp) => {
  const expiresAt = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
  otpStorage.set(email, { otp, expiresAt });
};

// ****************** All user auth routes ******************

// *************** Signup ***************

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
    .json(new ApiResponse(200, newUser, "Account Created Successfully"));
});

// *************** Login ***************

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

  const accessToken = await generateAccessTokenForUser(
    userExist.registration_id,
    userExist.email
  );

  const refreshToken = await generateRefreshTokenForUser(
    userExist.registration_id
  );

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
    // httpOnly: true,
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
        "Logged in Successfully"
      )
    );
});

// *************** SendOtp ***************

const sendOtp = asyncHandler(async (req, res) => {
  let { email, username } = req.body;

  const __dirname = path.dirname(new URL(import.meta.url).pathname);

  if (!email || !username) {
    throw new ApiError(400, "Email is required");
  }

  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExist) {
    throw new ApiError(400, "User with this email already exists!");
  }

  const otp = generateOTP();

  const normalizedDirname = __dirname.startsWith("/")
    ? __dirname.slice(1)
    : __dirname;

  const parentDir = path.resolve(normalizedDirname, "..");

  const templatePath = path.join(parentDir, "email/emailTemplate.html");

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
    console.log("gsetkgtihnjset");

    storeOTP(email, otp);

    return res.status(200).json(new ApiResponse(200, "OTP sent successfully"));
  } catch (error) {
    throw new ApiError(500, "Failed to send OTP");
  }
});

// *************** VerifyOtp ***************

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

// *************** Logout ***************

const logoutUser = asyncHandler(
  asyncHandler(async (req, res) => {
    const user = req.user;

    await prisma.user.update({
      where: { registration_id: user.registration_id },
      data: { refresh_token: null },
    });

    const options = {
      // httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, "User logged out sucessfully"));
  })
);

// *************** RefreshToken ***************

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

  const user = await prisma.user.findUnique({
    where: {
      registration_id: decodedToken?.registrationId,
    },
  });

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
    // httpOnly: true,
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

// *************** CurrentUser ***************

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const registration_id = user.registration_id;
  if (!registration_id) {
    throw new ApiError(400, "Invalid registration ID.");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      registration_id: registration_id,
    },
    select: {
      registration_id: true,
      salutation: true,
      first_name: true,
      last_name: true,
      email: true,
      contact: true,
      enquiry_contact: {
        select: {
          enquiry_id: true,
          salutation: true,
          first_name: true,
          last_name: true,
          message: true,
          status: true,
        },
      },
      enquiry_forex: true,
      enquiry_umrah: {
        select: {
          enquiry_id: true,
          salutation: true,
          first_name: true,
          last_name: true,
          package_type: true,
          package_name: true,
          status: true,
          created_at: true,
        },
      },
      enquiry_visa: true,
    },
  });

  if (!currentUser) {
    throw new ApiError(404, "User not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, currentUser, "User fetched sucessfully"));
});

// *************** Contact Enquiry ***************
const enquiryContact = asyncHandler(async (req, res) => {
  const { salutation, firstname, lastname, email, contact, message } = req.body;

  const user = req.user;

  const enquiryInputError = userContactEnquiryValidation({
    salutation,
    firstname,
    lastname,
    email,
    contact,
    message,
  });

  if (enquiryInputError) {
    throw new ApiError(
      400,
      `Validation Error: ${enquiryInputError[0].message}`
    );
  }

  const currentUser = user?.registration_id;

  const createdEnquiry = await prisma.enquiryContact.create({
    data: {
      user_id: currentUser,
      salutation,
      first_name: firstname,
      last_name: lastname,
      email,
      contact,
      message,
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, createdEnquiry, "Your Enquiry Sent Sucessfully")
    );
});

// *************** Enquiry Forex ***************

const enquiryForex = asyncHandler(async (req, res) => {
  const {
    salutation,
    firstname,
    lastname,
    email,
    contact,
    amountrequired,
    country,
    address,
  } = req.body;

  const amountInNumber = safeConvertToNumber(amountrequired);

  const user = req.user;

  const enquiryInputError = userForexEnquiryValidation({
    salutation,
    firstname,
    lastname,
    email,
    contact,
    amountrequired: amountInNumber,
    country,
    address,
  });

  if (enquiryInputError) {
    throw new ApiError(
      400,
      `Validation Error: ${enquiryInputError[0].message}`
    );
  }

  const currentUser = user?.registration_id;

  const createdForexEnquiry = await prisma.enquiryForex.create({
    data: {
      user_id: currentUser,
      salutation,
      first_name: firstname,
      last_name: lastname,
      email,
      contact,
      amount_required: amountInNumber,
      country,
      address,
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        createdForexEnquiry,
        "Your Forex Enquiry Sent Sucessfully"
      )
    );
});

// *************** Enquiry Umrah ***************

const enquiryUmrah = asyncHandler(async (req, res) => {
  const {
    salutation,
    firstname,
    lastname,
    email,
    packagetype,
    packagename,
    contact,
    travellerdate,
    totaladults,
    totalchildren,
    totalinfants,
  } = req.body;

  const totalAdultCount = safeConvertToNumber(totaladults);

  const totalChildrenCount = safeConvertToNumber(totalchildren);

  const totalInfantCount = safeConvertToNumber(totalinfants);

  const user = req.user;

  const enquiryInputError = userUmrahEnquiryValidation({
    salutation,
    firstname,
    lastname,
    email,
    packagetype,
    packagename,
    contact,
    travellerdate,
    totaladults: totalAdultCount,
    totalchildren: totalInfantCount,
    totalinfants: totalChildrenCount,
  });

  if (enquiryInputError) {
    throw new ApiError(
      400,
      `Validation Error: ${enquiryInputError[0].message}`
    );
  }

  const currentUser = user?.registration_id;

  const createdUmrahEnquiry = await prisma.enquiryUmrah.create({
    data: {
      user_id: currentUser,
      salutation,
      first_name: firstname,
      last_name: lastname,
      email,
      package_type: packagetype,
      package_name: packagename,
      contact,
      traveller_date: travellerdate,
      total_adults: totalAdultCount,
      total_children: totalInfantCount,
      total_infants: totalChildrenCount,
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        createdUmrahEnquiry,
        "Your Umrah Enquiry Sent Sucessfully"
      )
    );
});

// *************** Enquiry Visa ***************

const enquiryVisa = asyncHandler(async (req, res) => {
  const {
    salutation,
    firstname,
    lastname,
    email,
    contact,
    visacountry,
    visatype,
  } = req.body;

  const user = req.user;

  const enquiryInputError = userVisaEnquiryValidation({
    salutation,
    firstname,
    lastname,
    email,
    contact,
    visacountry,
    visatype,
  });

  if (enquiryInputError) {
    throw new ApiError(
      400,
      `Validation Error: ${enquiryInputError[0].message}`
    );
  }

  const currentUser = user?.registration_id;

  const createdVisaEnquiry = await prisma.enquiryVisa.create({
    data: {
      user_id: currentUser,
      salutation,
      first_name: firstname,
      last_name: lastname,
      email,
      contact,
      visa_country: visacountry,
      visa_type: visatype,
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        createdVisaEnquiry,
        "Your Visa Enquiry Sent Sucessfully"
      )
    );
});

// *************** Export Controller ***************

export {
  registerUser,
  loginUser,
  sendOtp,
  verifyOtp,
  logoutUser,
  refreshToken,
  getCurrentUser,
  enquiryContact,
  enquiryForex,
  enquiryUmrah,
  enquiryVisa,
};
