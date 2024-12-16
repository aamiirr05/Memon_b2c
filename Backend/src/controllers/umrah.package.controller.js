import prisma from "../db/db.config.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { umrahPackageValidation } from "../validator/package.validator.js";
import {
  deleteImageFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import {
  safeParseJSON,
  safeConvertToNumber,
} from "../utils/utilityfunction.js";
import fs from "fs";
import path from "path";

const isValidImage = (fileName) => {
  const validExtensions = [".jpg", ".jpeg", ".png"];
  const fileExtension = path.extname(fileName).toLowerCase();
  return validExtensions.includes(fileExtension);
};

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

const createUmrahPackage = asyncHandler(async (req, res) => {
  const admin = req.admin;

  const adminId = admin.admin_id;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const {
    packagename,
    packagetype,
    description,
    makkahitinerary,
    medinaitinerary,
    inclusion,
    exclusion,
    groupdates,
    bookingdeadline,
    totaldays,
    totalnights,
    makhotelname,
    medhotelname,
    cancellationpolicy,
    termcondition,
    bookingterms,
    departurecity,
    arrivalcity,
    isactive,
    featured,
    baseprice,
    discount,
    quintprice,
    quadprice,
    tripleprice,
    doubleprice,
    childwithoutbedprice,
    infantprice,
  } = req.body;

  if (
    [
      packagename,
      packagetype,
      description,
      makkahitinerary,
      medinaitinerary,
      inclusion,
      exclusion,
      groupdates,
      bookingdeadline,
      totaldays,
      totalnights,
      makhotelname,
      medhotelname,
      cancellationpolicy,
      termcondition,
      bookingterms,
      departurecity,
      arrivalcity,
      isactive,
      featured,
      baseprice,
      discount,
      quintprice,
      quadprice,
      tripleprice,
      doubleprice,
      childwithoutbedprice,
      infantprice,
    ].some((fields) => fields?.trim() == "")
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

  console.log(makkahitinerary);

  const makItineraryArray = safeParseJSON(makkahitinerary);
  const medItineraryArray = safeParseJSON(medinaitinerary);
  const inclusionArray = safeParseJSON(inclusion);
  const exclusionArray = safeParseJSON(exclusion);
  const groupsDatesArray = safeParseJSON(groupdates);
  const cancellationPolicyArray = safeParseJSON(cancellationpolicy);
  const termCondArray = safeParseJSON(termcondition);
  const bookingTermArray = safeParseJSON(bookingterms);

  const intBasePrice = safeConvertToNumber(baseprice);
  const intDiscount = safeConvertToNumber(discount);
  const intTotalDays = safeConvertToNumber(totaldays);
  const intTotalNights = safeConvertToNumber(totalnights);
  const intQuintPrice = safeConvertToNumber(quintprice);
  const intQuadPrice = safeConvertToNumber(quadprice);
  const intTriplePrice = safeConvertToNumber(tripleprice);
  const intDoublePrice = safeConvertToNumber(doubleprice);
  const intChildWithoutBedPrice = safeConvertToNumber(childwithoutbedprice);
  const intInfantPrice = safeConvertToNumber(infantprice);

  const finalPrice = baseprice - (baseprice * discount) / 100;
  const youSaved = baseprice - finalPrice;

  const inputError = umrahPackageValidation({
    packagename,
    packagetype,
    description,
    makkahitinerary: makItineraryArray,
    medinaitinerary: medItineraryArray,
    inclusion: inclusionArray,
    exclusion: exclusionArray,
    groupdates: groupsDatesArray,
    bookingdeadline,
    totaldays,
    totalnights,
    makhotelname,
    medhotelname,
    cancellationpolicy: cancellationPolicyArray,
    termcondition: termCondArray,
    bookingterms: bookingTermArray,
    departurecity,
    arrivalcity,
    isactive,
    featured,
    baseprice,
    discount,
    quintprice,
    quadprice,
    tripleprice,
    doubleprice,
    childwithoutbedprice,
    infantprice,
  });

  if (inputError) {
    throw new ApiError(400, `Validation Error: ${inputError[0].message}`);
  }

  let packageImagePath = [],
    makkahHotelImagePath = [],
    medinaHotelImagePath = [];

  if (
    req.files?.packageimage &&
    Array.isArray(req.files.packageimage) &&
    req.files.packageimage.length > 0
  ) {
    if (req.files.packageimage.length !== 3) {
      deleteTempFiles();
      throw new ApiError(400, "All 3 Package Images are required.");
    }
    packageImagePath = req.files.packageimage.map((file) => file.path);
  }

  if (
    req.files?.makkahhotelimage &&
    Array.isArray(req.files.makkahhotelimage) &&
    req.files.makkahhotelimage.length > 0
  ) {
    if (req.files.makkahhotelimage.length !== 8) {
      deleteTempFiles();
      throw new ApiError(400, "All 8 Makkah Hotel Images are required.");
    }
    makkahHotelImagePath = req.files.makkahhotelimage.map((file) => file.path);
  }

  if (
    req.files?.medinahotelimage &&
    Array.isArray(req.files.medinahotelimage) &&
    req.files.medinahotelimage.length > 0
  ) {
    if (req.files.medinahotelimage.length !== 8) {
      deleteTempFiles();
      throw new ApiError(400, "All 8 Medina Hotel Images are required.");
    }
    medinaHotelImagePath = req.files.medinahotelimage.map((file) => file.path);
  }

  if (packageImagePath.length === 0) {
    deleteTempFiles();
    throw new ApiError(400, "Package Image Is Required");
  }

  if (makkahHotelImagePath.length === 0) {
    deleteTempFiles();
    throw new ApiError(400, "Medina Hotel Image Is Required");
  }

  if (medinaHotelImagePath.length === 0) {
    deleteTempFiles();
    throw new ApiError(400, "Medina Hotel Image Is Required");
  }

  const allImagePaths = [
    ...packageImagePath,
    ...medinaHotelImagePath,
    ...makkahHotelImagePath,
  ];

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

  const uploadedMakkahHotelImage = await uploadImages(
    "MakkahHotelImage",
    makkahHotelImagePath
  );

  const uploadedMedinaHotelImage = await uploadImages(
    "MedinaHotelImage",
    medinaHotelImagePath
  );

  if (!uploadedPackageImage || uploadedPackageImage.length === 0) {
    throw new ApiError(500, "Error While Uploading Files");
  }

  if (!uploadedMakkahHotelImage || uploadedMakkahHotelImage.length === 0) {
    throw new ApiError(500, "Error While Uploading Files");
  }

  if (!uploadedMedinaHotelImage || uploadedMedinaHotelImage.length === 0) {
    throw new ApiError(500, "Error While Uploading Files");
  }

  const packageImageArray = Object.values(uploadedPackageImage)[0];

  const medinaHotelImageArray = Object.values(uploadedMedinaHotelImage)[0];

  const makkahHotelImageArray = Object.values(uploadedMakkahHotelImage)[0];

  const createdPackage = await prisma.umrahPackage.create({
    data: {
      admin_id: adminId,
      package_name: packagename,
      package_image: packageImageArray,
      package_type: packagetype,
      description: description,
      makkah_itinerary: makItineraryArray,
      medina_itinerary: medItineraryArray,
      inclusion: inclusionArray,
      exclusion: exclusionArray,
      booking_deadline: bookingdeadline,
      cancellation_policy: cancellationPolicyArray,
      term_condition: termCondArray,
      booking_terms: bookingTermArray,
      departure_city: departurecity,
      arrival_city: arrivalcity,
      is_active: isactive,
      featured: featured,
      base_price: intBasePrice,
      discount: intDiscount,
      final_price: finalPrice,
      you_saved: youSaved,
      group_dates: groupsDatesArray,
      total_days: intTotalDays,
      total_nights: intTotalNights,
      mak_hotel_name: makhotelname,
      mak_hotel_images: makkahHotelImageArray,
      med_hotel_name: medhotelname,
      med_hotel_images: medinaHotelImageArray,
    },
  });

  const createdPackagePrice = await prisma.umrahPackagePrice.create({
    data: {
      package_id: createdPackage.package_id,
      quint_price: intQuintPrice,
      quad_price: intQuadPrice,
      triple_price: intTriplePrice,
      double_price: intDoublePrice,
      child_without_bed_price: intChildWithoutBedPrice,
      infant_price: intInfantPrice,
    },
  });

  const fullCreatedPackage = [createdPackage, createdPackagePrice];

  res
    .status(200)
    .json(
      new ApiResponse(200, fullCreatedPackage, "Package Created Sucessfully")
    );
});

const getAllUmrahPackages = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const allUmrahPackages = await prisma.umrahPackage.findMany({
    include: { prices: true },
  });

  if (allUmrahPackages.length === 0) {
    throw new ApiError(404, "No Umrah Packages Found");
  }

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

const updateUmrahPackageDetails = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const packageId = req.params.id;

  const existingPackage = await prisma.umrahPackage.findUnique({
    where: { package_id: packageId },
    include: { prices: { select: { price_id: true } } },
  });

  if (!existingPackage) {
    throw new ApiError(404, "No Package Found");
  }

  const priceID = existingPackage.prices[0].price_id;

  if (!priceID) {
    throw new ApiError(404, "No Price Found For This Package");
  }

  const {
    packagename,
    packagetype,
    description,
    makkahitinerary,
    medinaitinerary,
    inclusion,
    exclusion,
    groupdates,
    bookingdeadline,
    totaldays,
    totalnights,
    makhotelname,
    medhotelname,
    cancellationpolicy,
    termcondition,
    bookingterms,
    departurecity,
    arrivalcity,
    isactive,
    featured,
    baseprice,
    discount,
    quintprice,
    quadprice,
    tripleprice,
    doubleprice,
    childwithoutbedprice,
    infantprice,
  } = req.body;

  if (
    [
      packagename,
      packagetype,
      description,
      makkahitinerary,
      medinaitinerary,
      inclusion,
      exclusion,
      groupdates,
      bookingdeadline,
      totaldays,
      totalnights,
      makhotelname,
      medhotelname,
      cancellationpolicy,
      termcondition,
      bookingterms,
      departurecity,
      arrivalcity,
      isactive,
      featured,
      baseprice,
      discount,
      quintprice,
      quadprice,
      tripleprice,
      doubleprice,
      childwithoutbedprice,
      infantprice,
    ].some((fields) => typeof fields === "string" && fields?.trim() === "")
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

  console.log(req.body);

  const intBasePrice = safeConvertToNumber(baseprice);
  const intDiscount = safeConvertToNumber(discount);
  const intTotalDays = safeConvertToNumber(totaldays);
  const intTotalNights = safeConvertToNumber(totalnights);
  const intQuintPrice = safeConvertToNumber(quintprice);
  const intQuadPrice = safeConvertToNumber(quadprice);
  const intTriplePrice = safeConvertToNumber(tripleprice);
  const intDoublePrice = safeConvertToNumber(doubleprice);
  const intChildWithoutBedPrice = safeConvertToNumber(childwithoutbedprice);
  const intInfantPrice = safeConvertToNumber(infantprice);

  const makItineraryArray = safeParseJSON(makkahitinerary);
  const medItineraryArray = safeParseJSON(medinaitinerary);
  const inclusionArray = safeParseJSON(inclusion);
  const exclusionArray = safeParseJSON(exclusion);
  const groupsDatesArray = safeParseJSON(groupdates);
  const cancellationPolicyArray = safeParseJSON(cancellationpolicy);
  const termCondArray = safeParseJSON(termcondition);
  const bookingTermArray = safeParseJSON(bookingterms);

  const finalPrice = baseprice - (baseprice * discount) / 100;
  const youSaved = baseprice - finalPrice;

  const inputError = umrahPackageValidation({
    packagename,
    packagetype,
    description,
    bookingdeadline,
    totaldays,
    totalnights,
    makhotelname,
    medhotelname,
    departurecity,
    arrivalcity,
    isactive,
    featured,
    baseprice,
    discount,
    quintprice,
    quadprice,
    tripleprice,
    doubleprice,
    childwithoutbedprice,
    infantprice,
    makkahitinerary: makItineraryArray,
    medinaitinerary: medItineraryArray,
    inclusion: inclusionArray,
    exclusion: exclusionArray,
    groupdates: groupsDatesArray,
    cancellationpolicy: cancellationPolicyArray,
    termcondition: termCondArray,
    bookingterms: bookingTermArray,
  });

  if (inputError) {
    throw new ApiError(400, `Validation Error: ${inputError[0].message}`);
  }

  const updatedPackage = await prisma.umrahPackage.update({
    where: { package_id: packageId },
    data: {
      package_name: packagename,
      package_type: packagetype,
      description: description,
      makkah_itinerary: makItineraryArray,
      medina_itinerary: medItineraryArray,
      inclusion: inclusionArray,
      exclusion: exclusionArray,
      booking_deadline: bookingdeadline,
      cancellation_policy: cancellationPolicyArray,
      term_condition: termCondArray,
      booking_terms: bookingTermArray,
      departure_city: departurecity,
      arrival_city: arrivalcity,
      is_active: isactive,
      featured: featured,
      base_price: intBasePrice,
      discount: intDiscount,
      final_price: finalPrice,
      you_saved: youSaved,
      group_dates: groupsDatesArray,
      total_days: intTotalDays,
      total_nights: intTotalNights,
      mak_hotel_name: makhotelname,
      med_hotel_images: medhotelname,
      prices: {
        update: {
          where: { price_id: priceID },
          data: {
            quint_price: intQuintPrice,
            quad_price: intQuadPrice,
            triple_price: intTriplePrice,
            double_price: intDoublePrice,
            child_without_bed_price: intChildWithoutBedPrice,
            infant_price: intInfantPrice,
          },
        },
      },
    },
    select: {
      admin_id: true,
      package_name: true,
      package_type: true,
      description: true,
      makkah_itinerary: true,
      medina_itinerary: true,
      inclusion: true,
      exclusion: true,
      booking_deadline: true,
      cancellation_policy: true,
      term_condition: true,
      booking_terms: true,
      departure_city: true,
      arrival_city: true,
      is_active: true,
      featured: true,
      base_price: true,
      discount: true,
      final_price: true,
      you_saved: true,
      group_dates: true,
      total_days: true,
      total_nights: true,
      mak_hotel_name: true,
      med_hotel_name: true,
      prices: {
        select: {
          quint_price: true,
          quad_price: true,
          triple_price: true,
          double_price: true,
          child_without_bed_price: true,
          infant_price: true,
        },
      },
    },
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedPackage,
        "Package Details Updated Sucessfully"
      )
    );
});

const updateUmrahPackageImages = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const packageId = req.params.id;

  const existingPackage = await prisma.umrahPackage.findUnique({
    where: { package_id: packageId },
    select: {
      package_image: true,
      med_hotel_images: true,
      mak_hotel_images: true,
    },
  });

  if (!existingPackage) {
    deleteTempFiles();
    throw new ApiError(404, "No Package Found");
  }

  let packageImagePath = [];

  if (
    req.files?.packageimage &&
    Array.isArray(req.files.packageimage) &&
    req.files.packageimage.length < 3
  ) {
    deleteTempFiles();
    throw new ApiError(401, "All Package Images is Required");
  } else {
    packageImagePath = req.files?.packageimage.map((file) => file.path);
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
    existingPackage.package_image.map((image) => image.public_id)
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

  const updatedPackageImage = await prisma.umrahPackage.update({
    where: { package_id: packageId },
    data: { package_image: packageImageArray },
    select: { package_image: true },
  });

  console.log(newUploadedImages);
  console.log(packageImagePath);
  console.log(oldPackageImagePublicIds);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedPackageImage,
        "Umrah Package Images Updated Sucessfully"
      )
    );
});

const updateUmrahMakHotelImages = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const packageId = req.params.id;

  const existingPackage = await prisma.umrahPackage.findUnique({
    where: { package_id: packageId },
  });

  if (!existingPackage) {
    deleteTempFiles();
    throw new ApiError(404, " No Package Found");
  }

  let makHotelImagePaths = [];

  if (
    req.files?.makhotelimage &&
    Array.isArray(req.files.makhotelimage) &&
    req.files.makhotelimage.length < 8
  ) {
    deleteTempFiles();
    throw new ApiError(401, "All Makkah Hotel Images is Required");
  } else {
    makHotelImagePaths = req.files?.makhotelimage.map((file) => file.path);
  }

  if (
    !makHotelImagePaths ||
    makHotelImagePaths.length === 0 ||
    makHotelImagePaths.length < 8
  ) {
    deleteTempFiles();
    throw new ApiError(400, "At least 8 Makkah Hotel Images are required.");
  }

  for (const imagePath of makHotelImagePaths) {
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

  const oldMakHotelImagePublicIds = await Promise.all(
    existingPackage.mak_hotel_images.map((image) => image.public_id)
  );

  const newMakHotelImages = await uploadImages(
    "Makkah Hotel Image",
    makHotelImagePaths
  );

  if (!newMakHotelImages || newMakHotelImages.length === 0) {
    throw new ApiError(500, "Error While Uploading Images");
  }

  for (const oldImgId of oldMakHotelImagePublicIds) {
    await deleteImageFromCloudinary(oldImgId);
    console.log("Image Deleted From Cloudinary");
  }

  const makHotelImageArray = Object.values(newMakHotelImages)[0];

  const updatedMakHotelImage = await prisma.umrahPackage.update({
    where: { package_id: packageId },
    data: { mak_hotel_images: makHotelImageArray },
    select: { mak_hotel_images: true },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedMakHotelImage,
        "Makkah Hotel Images Updated Sucessfully"
      )
    );
});

const updateUmrahMedHotelImages = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const packageId = req.params.id;

  const existingPackage = await prisma.umrahPackage.findUnique({
    where: { package_id: packageId },
  });

  if (!existingPackage) {
    deleteTempFiles();
    throw new ApiError(404, "No Package Found");
  }

  let medHotelImagePaths = [];

  if (
    req.files?.medhotelimage &&
    Array.isArray(req.files.medhotelimage) &&
    req.files.medhotelimage.length < 8
  ) {
    deleteTempFiles();
    throw new ApiError(401, "All Medina Hotel Images are Required");
  } else {
    medHotelImagePaths = req.files?.medhotelimage.map((file) => file.path);
  }

  if (
    !medHotelImagePaths ||
    medHotelImagePaths.length === 0 ||
    medHotelImagePaths.length < 8
  ) {
    deleteTempFiles();
    throw new ApiError(400, "At least 8 Medina Hotel Images are required.");
  }

  for (const imagePath of medHotelImagePaths) {
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

  const oldMedHotelImagePublicIds = await Promise.all(
    existingPackage.med_hotel_images.map((image) => image.public_id)
  );

  const newMedHotelImages = await uploadImages(
    "Medina Hotel Image",
    medHotelImagePaths
  );

  if (!newMedHotelImages || newMedHotelImages.length === 0) {
    throw new ApiError(500, "Error While Uploading Images");
  }

  for (const oldImgId of oldMedHotelImagePublicIds) {
    await deleteImageFromCloudinary(oldImgId);
    console.log("Image Deleted From Cloudinary");
  }

  const medHotelImageArray = Object.values(newMedHotelImages)[0];

  const updatedMedHotelImage = await prisma.umrahPackage.update({
    where: { package_id: packageId },
    data: { med_hotel_images: medHotelImageArray },
    select: { med_hotel_images: true },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedMedHotelImage,
        "Medina Hotel Images Updated Successfully"
      )
    );
});

const deleteUmrahPackage = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const packageId = req.params.id;
  console.log("Package ID:", packageId);

  const existingPackage = await prisma.umrahPackage.findUnique({
    where: { package_id: packageId },
  });

  if (!existingPackage) {
    throw new ApiError(404, "No Package Found");
  }

  let allImagesId = [];

  await Promise.all(
    existingPackage.package_image.map((image) =>
      allImagesId.push(image.public_id)
    )
  );

  await Promise.all(
    existingPackage.mak_hotel_images.map((image) =>
      allImagesId.push(image.public_id)
    )
  );

  await Promise.all(
    existingPackage.med_hotel_images.map((image) =>
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

  await prisma.umrahPackage.delete({
    where: { package_id: packageId },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Package Deletd Sucessfully"));
});

export {
  createUmrahPackage,
  getAllUmrahPackages,
  updateUmrahPackageDetails,
  updateUmrahPackageImages,
  updateUmrahMakHotelImages,
  updateUmrahMedHotelImages,
  deleteUmrahPackage,
};
