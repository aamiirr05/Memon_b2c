import prisma from "../db/db.config.js";
import { asyncHandler } from "./../utils/AsyncHandler.js";
import { ApiError } from "./../utils/ApiErrors.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import {
  userLoginInputValidation,
  userSignupInputValidation,
} from "../validator/user.validator.js";
import {
  transporter,
  generateOTP,
  storeOTP,
  otpStorage,
  sendOtp,
  safeConvertToNumber,
  generateAccessTokenForUser,
  generateRefreshTokenForUser,
  sendMailOnEnquiry,
} from "../utils/utilityfunction.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import path, { dirname } from "path";
import {
  customizedPackageValidation,
  userContactEnquiryValidation,
  userForexEnquiryValidation,
  userHolidayEnquiryValidation,
  userHotelEnquiryValidation,
  userUmrahEnquiryValidation,
  userVisaEnquiryValidation,
} from "../validator/enquiry.validator.js";

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
    ].some((field) => !field || field?.trim() === "")
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

  const normalizedEmail = email?.toLowerCase();

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
      is_verified: false,
    },
    select: {
      registration_id: true,
      salutation: true,
      first_name: true,
      last_name: true,
      email: true,
      contact: true,
      is_verified: true,
      created_at: true,
    },
  });

  const username = newUser.first_name + " " + newUser.last_name;

  await sendOtp(newUser.email, username);

  const accessToken = await generateAccessTokenForUser(
    newUser.registration_id,
    newUser.email
  );

  const refreshToken = await generateRefreshTokenForUser(
    newUser.registration_id
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(201, newUser, "OTP has been sent to your email"));
});

// *************** Login ***************

const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and Password is required");
  }

  let normalizedEmail = email?.toLowerCase();

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
      is_verified: true,
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
        },
        "Logged in Successfully"
      )
    );
});

// *************** Check Auth ***************

const checkAuth = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new ApiError(401, "Token not found");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        registration_id: decodedToken?.registrationId,
      },
      select: {
        registration_id: true,
        salutation: true,
        first_name: true,
        last_name: true,
        email: true,
        contact: true,
        is_verified: true,
      },
    });

    if (!user) {
      throw new ApiError(404, "Invalid Token");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User Authenticated"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

// *************** SendOtp ***************

const resendOtp = asyncHandler(async (req, res) => {
  let { email, username } = req.body;

  const __dirname = path.dirname(new URL(import.meta.url).pathname);

  if (!email || !username) {
    throw new ApiError(400, "Email is required");
  }

  const otp = generateOTP();

  const normalizedDirname = __dirname.startsWith("/")
    ? __dirname?.slice(1)
    : __dirname;

  const parentDir = path.resolve(normalizedDirname, "..");

  const templatePath = path.join(parentDir, "email/otpEmailTemplate.html");

  let htmlContent = fs.readFileSync(templatePath, "utf8");

  const currentYear = new Date().getFullYear();

  htmlContent = htmlContent
    .replace("{{userName}}", username)
    .replace("{{otp}}", otp)
    .replace("{{year}}", currentYear);

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

  const { otp: storedOtp, expiresAt } = record;

  if (Date.now() > expiresAt) {
    otpStorage.delete(email);
    throw new ApiError(400, "OTP expired");
  }

  if (storedOtp !== parseInt(inputOtp, 10)) {
    throw new ApiError(400, "Invalid OTP");
  }
  otpStorage.delete(email);

  const updatedUser = await prisma.user.update({
    where: { email },
    data: { is_verified: true },
    select: {
      salutation: true,
      registration_id: true,
      first_name: true,
      last_name: true,
      email: true,
      contact: true,
      is_verified: true,
      created_at: true,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Email Verified!"));
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
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, "", "User logged out sucessfully"));
  })
);

// *************** RefreshToken ***************

const refreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken;

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

  const accessToken = await generateAccessTokenForUser(
    user.registration_id,
    user.email
  );

  const newRefreshToken = await generateRefreshTokenForUser(
    user.registration_id
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
      customized_package: true,
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

  if (
    [salutation, firstname, lastname, email, contact, message].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

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

  const userName = firstname + " " + lastname;

  await sendMailOnEnquiry(userName, email);

  return res
    .status(200)
    .json(
      new ApiResponse(201, createdEnquiry, "Your Enquiry Sent Sucessfully")
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

  console.log(req.body);

  if (
    [
      salutation,
      firstname,
      lastname,
      email,
      contact,
      amountrequired,
      country,
      address,
    ].some((field) => !field || field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

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

  const userName = firstname + " " + lastname;

  await sendMailOnEnquiry(userName, email);

  return res
    .status(200)
    .json(
      new ApiResponse(
        201,
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

  if (
    [
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
    ].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

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

  const userName = firstname + " " + lastname;

  await sendMailOnEnquiry(userName, email);

  return res
    .status(200)
    .json(
      new ApiResponse(
        201,
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

  if (
    [
      salutation,
      firstname,
      lastname,
      email,
      contact,
      visacountry,
      visatype,
    ].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

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

  const userName = firstname + " " + lastname;

  await sendMailOnEnquiry(userName, email);

  return res
    .status(200)
    .json(
      new ApiResponse(
        201,
        createdVisaEnquiry,
        "Your Visa Enquiry Sent Sucessfully"
      )
    );
});

// *************** Enquiry Hotel ***************

const enquiryHotel = asyncHandler(async (req, res) => {
  const {
    fullname,
    contact,
    email,
    checkindate,
    checkoutdate,
    numberofnights,
    numberofrooms,
    roomtype,
    mealplan,
    numberofadults,
    numberofchildren,
    specialrequest,
  } = req.body;

  if (
    [
      fullname,
      contact,
      email,
      checkindate,
      checkoutdate,
      numberofnights,
      numberofrooms,
      roomtype,
      mealplan,
      numberofadults,
      numberofchildren,
    ].some((field) => !field || field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

  const user = req.user;

  const intNights = safeConvertToNumber(numberofnights);
  const intRooms = safeConvertToNumber(numberofrooms);
  const intAdults = safeConvertToNumber(numberofadults);
  const intChildren = safeConvertToNumber(numberofchildren);

  const enquiryInputError = userHotelEnquiryValidation({
    fullname,
    contact,
    email,
    checkindate,
    checkoutdate,
    numberofnights: intNights,
    numberofrooms: intRooms,
    roomtype,
    mealplan,
    numberofadults: intAdults,
    numberofchildren: intChildren,
    specialrequest,
  });

  if (enquiryInputError) {
    throw new ApiError(
      400,
      `Validation Error: ${enquiryInputError[0].message}`
    );
  }

  const currentUser = user?.registration_id;

  const createdHotelEnquiry = await prisma.enquiryHotel.create({
    data: {
      user_id: currentUser,
      full_name: fullname,
      contact,
      email,
      check_in_date: checkindate,
      check_out_date: checkoutdate,
      number_of_nights: intNights,
      number_of_rooms: intRooms,
      room_type: roomtype,
      meal_plan: mealplan,
      number_of_adults: intAdults,
      number_of_children: intChildren,
      special_request: specialrequest,
    },
  });

  await sendMailOnEnquiry(fullname, email);

  return res
    .status(200)
    .json(
      new ApiResponse(
        201,
        createdHotelEnquiry,
        "Your Hotel Enquiry Sent Sucessfully"
      )
    );
});

// *************** Enquiry Holiday ***************

const enquiryHoliday = asyncHandler(async (req, res) => {
  const {
    fullname,
    contact,
    email,
    nationality,
    preferreddate,
    numberofnights,
    numberofadults,
    numberofchildren,
    preferreddeparturecity,
  } = req.body;

  if (
    [
      fullname,
      contact,
      email,
      nationality,
      preferreddate,
      numberofnights,
      numberofadults,
      numberofchildren,
      preferreddeparturecity,
    ].some((field) => !field || field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

  const user = req.user;

  const intNights = safeConvertToNumber(numberofnights);
  const intAdults = safeConvertToNumber(numberofadults);
  const intChildren = safeConvertToNumber(numberofchildren);

  const enquiryInputError = userHolidayEnquiryValidation({
    fullname,
    contact,
    email,
    nationality,
    preferreddate,
    numberofnights: intNights,
    numberofadults: intAdults,
    numberofchildren: intChildren,
    preferreddeparturecity,
  });

  if (enquiryInputError) {
    throw new ApiError(
      400,
      `Validation Error: ${enquiryInputError[0].message}`
    );
  }

  const currentUser = user?.registration_id;

  const createdHolidayEnquiry = await prisma.enquiryHoliday.create({
    data: {
      user_id: currentUser,
      full_name: fullname,
      contact,
      email,
      nationality,
      preferred_date: preferreddate,
      number_of_nights: intNights,
      number_of_adults: intAdults,
      number_of_children: intChildren,
      preferred_departure_city: preferreddeparturecity,
    },
  });

  await sendMailOnEnquiry(fullname, email);

  return res
    .status(200)
    .json(
      new ApiResponse(
        201,
        createdHolidayEnquiry,
        "Your Holiday Enquiry Sent Sucessfully"
      )
    );
});

// ****************** Enquiry Customized Package **********************

const enquiryCustomizedPackage = asyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    contact,
    bookingtype,
    travelclass,
    makkahhotelname,
    medinahotelname,
    roomtype,
    adults,
    kids,
    additionalinfo,
  } = req.body;

  if (
    [
      firstname,
      lastname,
      email,
      contact,
      bookingtype,
      travelclass,
      adults,
    ].some((field) => {
      return typeof field === "string"
        ? !field.trim()
        : field === undefined || field === null;
    })
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

  const user = req.user;

  const intAdults = safeConvertToNumber(adults);
  const intKids = safeConvertToNumber(kids);

  const enquiryInputError = customizedPackageValidation({
    firstname,
    lastname,
    email,
    contact,
    bookingtype,
    travelclass,
    makkahhotelname,
    medinahotelname,
    roomtype,
    adults: intAdults,
    kids: intKids,
    additionalinfo,
  });

  if (enquiryInputError) {
    throw new ApiError(
      400,
      `Validation Error: ${enquiryInputError[0].message}`
    );
  }

  const currentUser = user?.registration_id;

  const createdCustomizedPackage = await prisma.customizedPackage.create({
    data: {
      user_id: currentUser,
      first_name: firstname,
      last_name: lastname,
      email,
      contact,
      booking_type: bookingtype,
      travel_class: travelclass,
      makkah_hotel_name: makkahhotelname,
      medina_hotel_name: medinahotelname,
      room_type: roomtype,
      adults: intAdults,
      kids: intKids,
      additional_info: additionalinfo,
    },
  });

  const userName = firstname + " " + lastname;

  await sendMailOnEnquiry(userName, email);

  return res
    .status(200)
    .json(
      new ApiResponse(
        201,
        createdCustomizedPackage,
        "Your Customized Package Enqiry Sent Sucessfully"
      )
    );
});

// ****************** Testimonial **********************

const testimonial = asyncHandler(async (req, res) => {
  const { fullname, city, country, stars, review } = req.body;

  if (
    [fullname, city, country, stars, review].some((field) => {
      return typeof field === "string"
        ? !field.trim()
        : field === undefined || field === null;
    })
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

  const user = req.user;

  const intStar = safeConvertToNumber(stars);

  const currentUser = user?.registration_id;

  const createdTestimonial = await prisma.testimonial.create({
    data: {
      user_id: currentUser,
      full_name: fullname,
      city,
      country,
      stars: intStar,
      review,
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        201,
        createdTestimonial,
        "Your testimonial has been submitted successfully"
      )
    );
});

// *********************************** GET ROUTE TO FETCH ALL UMRAH PACKAGE **************************************

const getAllUmrahPackages = asyncHandler(async (req, res) => {
  const allUmrahPackages = await prisma.umrahPackage.findMany({
    include: { prices: true },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allUmrahPackages,
        `${allUmrahPackages.length} Umrah Packages Fetched Successfully`
      )
    );
});

// *********************************** GET ROUTE TO FETCH UMRAH PACKAGE BY ID *************************************

const getUmrahPackageById = asyncHandler(async (req, res) => {
  const packageId = req.params.id;

  if (!packageId) {
    throw new ApiError(400, "Package ID is Required");
  }

  const existingPackage = await prisma.umrahPackage.findUnique({
    where: { package_id: packageId },
    include: { prices: true },
  });

  if (!existingPackage) {
    throw new ApiError(404, "Package not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, existingPackage, "Package Fetched Sucessfully"));
});

// *********************************** GET ROUTE TO FETCH ALL HOLIDAY PACKAGE **************************************

const getAllHolidayPackages = asyncHandler(async (req, res) => {
  const allHolidayPackages = await prisma.holidayPackage.findMany();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allHolidayPackages,
        `${allHolidayPackages.length} Holiday Packages Fetched Successfully`
      )
    );
});

// *********************************** GET ROUTE TO FETCH HOLIDAY PACKAGE BY ID *************************************

const getHolidayPackageById = asyncHandler(async (req, res) => {
  const packageId = req.params.id;

  if (!packageId) {
    throw new ApiError(400, "Package ID is Required");
  }

  const existingPackage = await prisma.holidayPackage.findUnique({
    where: { package_id: packageId },
  });

  if (!existingPackage) {
    throw new ApiError(404, "Package not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, existingPackage, "Package Fetched Sucessfully"));
});

// *********************************** GET ROUTE TO FETCH ALL HOTEL **************************************

const getAllHotel = asyncHandler(async (req, res) => {
  const allHotels = await prisma.hotel.findMany({ include: { rooms: true } });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allHotels,
        `${allHotels.length} Hotels Fetched Successfully`
      )
    );
});

// *********************************** GET ROUTE TO FETCH HOTEL BY ID *************************************

const getHotelById = asyncHandler(async (req, res) => {
  const hotelId = req.params.id;

  if (!hotelId) {
    throw new ApiError(400, "Hotel ID is Required");
  }

  const existingHotel = await prisma.hotel.findUnique({
    where: { hotel_id: hotelId },
    include: { rooms: true },
  });

  if (!existingHotel) {
    throw new ApiError(404, "Hotel not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, existingHotel, "Hotel Fetched Sucessfully"));
});

// *********************************** GET ROUTE TO FETCH ALL VISA **************************************

const getAllVisa = asyncHandler(async (req, res) => {
  const allVisas = await prisma.visa.findMany();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allVisas,
        `${allVisas.length} Visas Fetched Successfully`
      )
    );
});

// *********************************** GET ROUTE TO FETCH VISA BY ID *************************************

const getVisaById = asyncHandler(async (req, res) => {
  const visaId = req.params.id;

  if (!visaId) {
    throw new ApiError(400, "Visa ID is Required");
  }

  const existingVisa = await prisma.visa.findUnique({
    where: { visa_id: visaId },
  });

  if (!existingVisa) {
    throw new ApiError(404, "Visa not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, existingVisa, "Visa Fetched Sucessfully"));
});

// *************** Export Controller ***************

export {
  registerUser,
  loginUser,
  checkAuth,
  resendOtp,
  verifyOtp,
  logoutUser,
  refreshToken,
  getCurrentUser,
  enquiryContact,
  enquiryForex,
  enquiryUmrah,
  enquiryVisa,
  enquiryHotel,
  enquiryHoliday,
  enquiryCustomizedPackage,
  testimonial,
  getAllUmrahPackages,
  getUmrahPackageById,
  getAllHolidayPackages,
  getHolidayPackageById,
  getAllHotel,
  getHotelById,
  getAllVisa,
  getVisaById,
};
