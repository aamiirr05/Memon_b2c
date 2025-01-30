import prisma from "../db/db.config.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { holidayPackageValidation } from "../validator/holiday.package.validator.js";
import {
  safeParseJSON,
  safeConvertToNumber,
  isValidImage,
  deleteTempFiles,
  uploadImages,
} from "../utils/utilityfunction.js";
import { deleteImageFromCloudinary } from "../utils/cloudinary.js";

// ********** Create Holiday Package **********

const createHolidayPackage = asyncHandler(async (req, res) => {
  const admin = req.admin;

  const adminId = admin.admin_id;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Access");
  }

  const {
    packagename,
    packagetype,
    category,
    description,
    country,
    city,
    hotelname,
    hotelstar,
    itinerary,
    groupdates,
    totaldays,
    totalnights,
    baseprice,
    discount,
    inclusion,
    exclusion,
    bookingdeadline,
    cancellationpolicy,
    termcondition,
    bookingterms,
    departurecity,
    arrivalcity,
    transportmode,
    isactive,
    featured,
  } = req.body;

  if (
    [
      packagename,
      packagetype,
      category,
      description,
      country,
      city,
      hotelname,
      hotelstar,
      itinerary,
      groupdates,
      totaldays,
      totalnights,
      baseprice,
      discount,
      inclusion,
      exclusion,
      bookingdeadline,
      cancellationpolicy,
      termcondition,
      bookingterms,
      departurecity,
      arrivalcity,
      transportmode,
      isactive,
      featured,
    ].some((fields) => typeof fields === "string" && fields?.trim() === "")
  ) {
    throw new ApiError(401, "All Fields Must Be Filled");
  }

  const categoryArray = safeParseJSON(category);
  const itineraryArray = safeParseJSON(itinerary);
  const groupDatesArray = safeParseJSON(groupdates);
  const inclusionArray = safeParseJSON(inclusion);
  const exclusionArray = safeParseJSON(exclusion);
  const cancellationPolicyArray = safeParseJSON(cancellationpolicy);
  const termConditionArray = safeParseJSON(termcondition);
  const bookingTermArray = safeParseJSON(bookingterms);

  const intHotelStar = safeConvertToNumber(hotelstar);
  const intTotalDays = safeConvertToNumber(totaldays);
  const intTotalNights = safeConvertToNumber(totalnights);
  const intBasePrice = safeConvertToNumber(baseprice);
  const intDiscount = safeConvertToNumber(discount);

  const finalPrice = baseprice - (baseprice * discount) / 100;
  const youSaved = baseprice - finalPrice;

  const inputError = holidayPackageValidation({
    packagename,
    packagetype,
    category: categoryArray,
    description,
    country,
    city,
    hotelname,
    hotelstar: intHotelStar,
    itinerary: itineraryArray,
    groupdates: groupDatesArray,
    totaldays: intTotalDays,
    totalnights: intTotalNights,
    baseprice: intBasePrice,
    discount: intDiscount,
    inclusion: inclusionArray,
    exclusion: exclusionArray,
    bookingdeadline,
    cancellationpolicy: cancellationPolicyArray,
    termcondition: termConditionArray,
    bookingterms: bookingTermArray,
    departurecity,
    arrivalcity,
    transportmode,
    isactive,
    featured,
  });

  if (inputError) {
    throw new ApiError(400, `Validation Error: ${inputError[0].message}`);
  }

  let packageImagePath = [],
    hotelImagePath = [];

  if (
    req.files?.packageimage &&
    Array.isArray(req.files?.packageimage) &&
    req.files?.packageimage.length > 0
  ) {
    if (req.files?.packageimage.length !== 3) {
      deleteTempFiles();
      throw new ApiError(400, "All 3 Package Images are required.");
    }
    packageImagePath = req.files?.packageimage?.map((file) => file.path);
  }

  if (
    req.files?.hotelimage &&
    Array.isArray(req.files?.hotelimage) &&
    req.files?.hotelimage.length > 0
  ) {
    if (req.files?.hotelimage.length !== 5) {
      deleteTempFiles();
      throw new ApiError(400, "All 5 Hotel Images are required.");
    }
    hotelImagePath = req.files?.hotelimage?.map((file) => file.path);
  }

  if (packageImagePath.length === 0) {
    deleteTempFiles();
    throw new ApiError(400, "Package Image Is Required");
  }

  if (hotelImagePath.length === 0) {
    deleteTempFiles();
    throw new ApiError(400, " Hotel Image Is Required");
  }

  const allImagePaths = [...packageImagePath, ...hotelImagePath];

  for (const imagePath of allImagePaths) {
    if (!isValidImage(imagePath)) {
      // Delete invalid file from the server

      deleteTempFiles();

      // Throw an error after cleanup
      throw new ApiError(
        400,
        `Invalid file type! .jpg, .jpeg, .png are allowed.`
      );
    }
  }

  const uploadedPackageImage = await uploadImages(
    "PackageImage",
    packageImagePath
  );

  const uploadedHotelImage = await uploadImages("HotelImage", hotelImagePath);

  if (!uploadedPackageImage || uploadedPackageImage.length === 0) {
    throw new ApiError(500, "Error While Uploading Package Images");
  }

  if (!uploadedHotelImage || uploadedHotelImage.length === 0) {
    throw new ApiError(500, "Error While Uploading Hotel Images");
  }

  const packageImageArray = Object.values(uploadedPackageImage)[0];

  const hotelImageArray = Object.values(uploadedHotelImage)[0];

  const allImagesArray = [...packageImageArray, ...hotelImageArray];

  try {
    const createdHolidayPackage = await prisma.holidayPackage.create({
      data: {
        admin_id: adminId,
        package_name: packagename,
        package_type: packagetype,
        category: categoryArray,
        package_images: packageImageArray,
        description,
        country,
        city,
        hotel_name: hotelname,
        hotel_star: intHotelStar,
        hotel_images: hotelImageArray,
        itinerary: itineraryArray,
        group_dates: groupDatesArray,
        total_days: intTotalDays,
        total_nights: intTotalNights,
        base_price: intBasePrice,
        discount: intDiscount,
        final_price: finalPrice,
        you_saved: youSaved,
        inclusion: inclusionArray,
        exclusion: exclusionArray,
        booking_deadline: bookingdeadline,
        cancellation_policy: cancellationPolicyArray,
        term_condition: termConditionArray,
        booking_terms: bookingTermArray,
        departure_city: departurecity,
        arrival_city: arrivalcity,
        transport_mode: transportmode,
        is_active: isactive,
        featured,
      },
    });

    res
      .status(200)
      .json(
        new ApiResponse(
          201,
          createdHolidayPackage,
          "Package Created Sucessfully"
        )
      );
  } catch (error) {
    if (allImagesArray && allImagesArray.length > 0) {
      for (const image of allImagesArray) {
        deleteImageFromCloudinary(image.public_id);
      }
    }
    throw new ApiError(500, "Error While Creating Package");
  }
});

// ********** Get All Holiday Package **********

const getAllHolidayPackage = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const allHolidayPackage = await prisma.holidayPackage.findMany();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allHolidayPackage,
        `${allHolidayPackage.length} Holiday Packages Fetched Successfully`
      )
    );
});

// ********** Update Holiday Package Details **********

const updateHolidayPackageDetails = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const packageId = req.params.id;

  const existingPackage = await prisma.holidayPackage.findUnique({
    where: { package_id: packageId },
  });

  if (!existingPackage) {
    throw new ApiError(404, "No Package Found");
  }

  const {
    packagename,
    packagetype,
    category,
    description,
    country,
    city,
    hotelname,
    hotelstar,
    itinerary,
    groupdates,
    totaldays,
    totalnights,
    baseprice,
    discount,
    inclusion,
    exclusion,
    bookingdeadline,
    cancellationpolicy,
    termcondition,
    bookingterms,
    departurecity,
    arrivalcity,
    transportmode,
    isactive,
    featured,
  } = req.body;

  console.log(req.body);

  if (
    [
      packagename,
      packagetype,
      category,
      description,
      country,
      city,
      hotelname,
      hotelstar,
      itinerary,
      groupdates,
      totaldays,
      totalnights,
      baseprice,
      discount,
      inclusion,
      exclusion,
      bookingdeadline,
      cancellationpolicy,
      termcondition,
      bookingterms,
      departurecity,
      arrivalcity,
      transportmode,
      isactive,
      featured,
    ].some((fields) => typeof fields === "string" && fields?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields Must Be Filled");
  }

  const categoryArray = safeParseJSON(category);
  const itineraryArray = safeParseJSON(itinerary);
  const groupDatesArray = safeParseJSON(groupdates);
  const inclusionArray = safeParseJSON(inclusion);
  const exclusionArray = safeParseJSON(exclusion);
  const cancellationPolicyArray = safeParseJSON(cancellationpolicy);
  const termConditionArray = safeParseJSON(termcondition);
  const bookingTermArray = safeParseJSON(bookingterms);
  const isActiveBoolean = isactive;
  const featuredBoolean = featured;

  const intHotelStar = safeConvertToNumber(hotelstar);
  const intTotalDays = safeConvertToNumber(totaldays);
  const intTotalNights = safeConvertToNumber(totalnights);
  const intBasePrice = safeConvertToNumber(baseprice);
  const intDiscount = safeConvertToNumber(discount);

  const finalPrice = baseprice - (baseprice * discount) / 100;
  const youSaved = baseprice - finalPrice;

  const inputError = holidayPackageValidation({
    packagename,
    packagetype,
    category: categoryArray,
    description,
    country,
    city,
    hotelname,
    hotelstar: intHotelStar,
    itinerary: itineraryArray,
    groupdates: groupDatesArray,
    totaldays: intTotalDays,
    totalnights: intTotalNights,
    baseprice: intBasePrice,
    discount: intDiscount,
    inclusion: inclusionArray,
    exclusion: exclusionArray,
    bookingdeadline,
    cancellationpolicy: cancellationPolicyArray,
    termcondition: termConditionArray,
    bookingterms: bookingTermArray,
    departurecity,
    arrivalcity,
    transportmode,
    isactive: isActiveBoolean,
    featured: featuredBoolean,
  });

  if (inputError) {
    throw new ApiError(400, `Validation Error: ${inputError[0].message}`);
  }

  const updatedPackage = await prisma.holidayPackage.update({
    where: { package_id: existingPackage.package_id },
    data: {
      package_name: packagename,
      package_type: packagetype,
      category: categoryArray,
      description,
      country,
      city,
      hotel_name: hotelname,
      hotel_star: intHotelStar,
      itinerary: itineraryArray,
      group_dates: groupDatesArray,
      total_days: intTotalDays,
      total_nights: intTotalNights,
      base_price: intBasePrice,
      discount: intDiscount,
      you_saved: youSaved,
      final_price: finalPrice,
      inclusion: inclusionArray,
      exclusion: exclusionArray,
      booking_deadline: bookingdeadline,
      cancellation_policy: cancellationPolicyArray,
      term_condition: termConditionArray,
      booking_terms: bookingTermArray,
      departure_city: departurecity,
      arrival_city: arrivalcity,
      transport_mode: transportmode,
      is_active: isActiveBoolean,
      featured: featuredBoolean,
    },
    select: {
      package_name: true,
      package_type: true,
      category: true,
      description: true,
      country: true,
      city: true,
      hotel_name: true,
      itinerary: true,
      group_dates: true,
      total_days: true,
      total_nights: true,
      base_price: true,
      discount: true,
      you_saved: true,
      final_price: true,
      inclusion: true,
      exclusion: true,
      booking_deadline: true,
      cancellation_policy: true,
      term_condition: true,
      booking_terms: true,
      departure_city: true,
      arrival_city: true,
      transport_mode: true,
      is_active: true,
      featured: true,
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedPackage,
        "Package Details Updated Sucessfully"
      )
    );
});

// ********** Update Holiday Package Image **********

const updateHolidayPackageImage = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Access");
  }

  const packageId = req.params.id;

  if (!packageId || packageId?.trim() === "") {
    throw new ApiError(400, "Package ID is required and cannot be empty");
  }

  const existingPackage = await prisma.holidayPackage.findUnique({
    where: { package_id: packageId },
    select: { package_images: true },
  });

  if (!existingPackage || existingPackage == null) {
    deleteTempFiles();
    throw new ApiError(404, "No Package Found");
  }

  let packageImagePath = [];

  if (
    req.files?.packageimage &&
    Array.isArray(req.files?.packageimage) &&
    req.files?.packageimage.length < 3
  ) {
    deleteTempFiles();
    throw new ApiError(400, "All Package Images is Required");
  } else {
    packageImagePath = req.files?.packageimage?.map((file) => file.path);
  }

  if (
    !packageImagePath ||
    packageImagePath.length === 0 ||
    packageImagePath.length < 3
  ) {
    deleteTempFiles();
    throw new ApiError(400, "At least 3 Package Images are required.");
  }

  for (const imagePath of packageImagePath) {
    if (!isValidImage(imagePath)) {
      // Delete invalid file from the server

      deleteTempFiles();

      // Throw an error after cleanup
      throw new ApiError(
        400,
        `Invalid file type! .jpg, .jpeg, .png are allowed.`
      );
    }
  }

  const oldPackageImagePublicIds = await Promise.all(
    existingPackage.package_images?.map((image) => image.public_id)
  );

  const newUploadedImages = await uploadImages(
    "Package Image",
    packageImagePath
  );

  if (!newUploadedImages || newUploadedImages.length === 0) {
    throw new ApiError(500, "Error While Uploading Images");
  }

  for (const oldImgId of oldPackageImagePublicIds) {
    await deleteImageFromCloudinary(oldImgId);
    console.log("Image Deleted From Cloudinary");
  }

  const packageImageArray = Object.values(newUploadedImages)[0];

  try {
    const updatedHolidayPackageImage = await prisma.holidayPackage.update({
      where: { package_id: packageId },
      data: { package_images: packageImageArray },
      select: { package_images: true },
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedHolidayPackageImage,
          "Holiday Package Images Updated Sucessfully"
        )
      );
  } catch (error) {
    if (packageImageArray && packageImageArray.length > 0) {
      for (const image of packageImageArray) {
        deleteImageFromCloudinary(image.public_id);
      }
    }
    throw new ApiError(500, "Error While Updating Package Images");
  }
});

// ********** Update Holiday Package Hotel Image **********

const updateHolidayPackageHotelImage = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Access");
  }

  const packageId = req.params.id;

  if (!packageId || packageId?.trim() === "") {
    throw new ApiError(400, "Package ID is required and cannot be empty");
  }

  const existingPackage = await prisma.holidayPackage.findUnique({
    where: { package_id: packageId },
    select: { hotel_images: true },
  });

  if (!existingPackage || existingPackage == null) {
    deleteTempFiles();
    throw new ApiError(404, "No Package Found");
  }

  let hotelImagePath = [];

  if (
    req.files?.hotelimage &&
    Array.isArray(req.files?.hotelimage) &&
    req.files?.hotelimage.length < 5
  ) {
    deleteTempFiles();
    throw new ApiError(400, "All 5 Hotel Images are Required");
  } else {
    hotelImagePath = req.files?.hotelimage?.map((file) => file.path);
  }

  if (
    !hotelImagePath ||
    hotelImagePath.length === 0 ||
    hotelImagePath.length < 5
  ) {
    deleteTempFiles();
    throw new ApiError(400, "At least 5 Hotel Images are required.");
  }

  for (const imagePath of hotelImagePath) {
    if (!isValidImage(imagePath)) {
      // Delete invalid file from the server
      deleteTempFiles();

      // Throw an error after cleanup
      throw new ApiError(
        400,
        `Invalid file type! .jpg, .jpeg, .png are allowed.`
      );
    }
  }

  const oldHotelImagePublicIds = await Promise.all(
    existingPackage.hotel_images?.map((image) => image.public_id)
  );

  const newUploadedImages = await uploadImages("Hotel Image", hotelImagePath);

  if (!newUploadedImages || newUploadedImages.length === 0) {
    throw new ApiError(500, "Error While Uploading Images");
  }

  for (const oldImgId of oldHotelImagePublicIds) {
    await deleteImageFromCloudinary(oldImgId);
    console.log("Image Deleted From Cloudinary");
  }

  const hotelImageArray = Object.values(newUploadedImages)[0];

  try {
    const updatedHolidayPackageHotelImage = await prisma.holidayPackage.update({
      where: { package_id: packageId },
      data: { hotel_images: hotelImageArray },
      select: { hotel_images: true },
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedHolidayPackageHotelImage,
          "Holiday Package Hotel Images Updated Successfully"
        )
      );
  } catch (error) {
    if (hotelImageArray && hotelImageArray.length > 0) {
      for (const image of hotelImageArray) {
        deleteImageFromCloudinary(image.public_id);
      }
    }
    throw new ApiError(500, "Error Updating Hotel Images");
  }
});

// ********** Delete Holiday Package **********

const deleteHolidayPackage = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Access");
  }

  const packageId = req.params.id;

  if (!packageId || packageId?.trim() === "") {
    throw new ApiError(400, "Package ID is required and cannot be empty");
  }

  const existingPackage = await prisma.holidayPackage.findUnique({
    where: { package_id: packageId },
    select: { package_id: true, package_images: true, hotel_images: true },
  });

  if (!existingPackage || existingPackage == null) {
    throw new ApiError(404, "No Package Found");
  }

  let allImagesId = [];

  await Promise.all(
    existingPackage.package_images?.map((image) =>
      allImagesId.push(image.public_id)
    )
  );

  await Promise.all(
    existingPackage.hotel_images?.map((image) =>
      allImagesId.push(image.public_id)
    )
  );

  if (!allImagesId || allImagesId.length === 0) {
    throw new ApiError(500, "Error While Deleting Package");
  }

  for (const imageId of allImagesId) {
    await deleteImageFromCloudinary(imageId);
    console.log("Deleted");
  }

  await prisma.holidayPackage.delete({ where: { package_id: packageId } });

  return res
    .status(200)
    .json(new ApiResponse(200, "Package Deleted Sucessfully"));
});

// *************** Export Controller ***************

export {
  createHolidayPackage,
  getAllHolidayPackage,
  updateHolidayPackageDetails,
  updateHolidayPackageImage,
  updateHolidayPackageHotelImage,
  deleteHolidayPackage,
};
