import prisma from "../db/db.config.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { umrahPackageValidation } from "../validator/package.validator.js";
import { deleteImageFromCloudinary } from "../utils/cloudinary.js";
import {
  safeParseJSON,
  safeConvertToNumber,
  isValidImage,
  deleteTempFiles,
  uploadImages,
} from "../utils/utilityfunction.js";

// ********** Create Umrah Package **********

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
    makhotelstar,
    makhotellocation,
    medhotelname,
    medhotelstar,
    medhotellocation,
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
      makhotelstar,
      makhotellocation,
      medhotelname,
      medhotelstar,
      medhotellocation,
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
    ].some((field) => typeof field === "string" && field.trim() === "")
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

  const makItineraryArray = safeParseJSON(makkahitinerary);
  const medItineraryArray = safeParseJSON(medinaitinerary);
  const inclusionArray = safeParseJSON(inclusion);
  const exclusionArray = safeParseJSON(exclusion);
  const groupsDatesArray = safeParseJSON(groupdates);
  const cancellationPolicyArray = safeParseJSON(cancellationpolicy);
  const termCondArray = safeParseJSON(termcondition);
  const bookingTermArray = safeParseJSON(bookingterms);

  const intMakHotelStar = safeConvertToNumber(makhotelstar);
  const intMedHotelStar = safeConvertToNumber(medhotelstar);
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

  const finalPrice = safeConvertToNumber(discount); // discount field now holds actual selling price
  const youSaved = intBasePrice - finalPrice;

  const inputError = umrahPackageValidation({
    packagename,
    packagetype,
    description,
    makhotelstar: intMakHotelStar,
    makhotellocation,
    medhotelstar: intMedHotelStar,
    medhotellocation,
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
    Array.isArray(req.files?.packageimage) &&
    req.files?.packageimage.length > 0
  ) {
    if (req.files?.packageimage.length < 1) {
      deleteTempFiles();
      throw new ApiError(400, "At least 1 Package Image is required.");
    }
    packageImagePath = req.files?.packageimage?.map((file) => file.path);
  }

  if (
    req.files?.makkahhotelimage &&
    Array.isArray(req.files?.makkahhotelimage) &&
    req.files?.makkahhotelimage.length > 0
  ) {
    if (req.files?.makkahhotelimage.length < 1) {
      deleteTempFiles();
      throw new ApiError(400, "At least 1 Makkah Hotel Image is required.");
    }
    makkahHotelImagePath = req.files?.makkahhotelimage?.map(
      (file) => file.path
    );
  }

  if (
    req.files?.medinahotelimage &&
    Array.isArray(req.files?.medinahotelimage) &&
    req.files?.medinahotelimage.length > 0
  ) {
    if (req.files?.medinahotelimage.length < 1) {
      deleteTempFiles();
      throw new ApiError(400, "At least 1 Medina Hotel Image is required.");
    }
    medinaHotelImagePath = req.files?.medinahotelimage?.map(
      (file) => file.path
    );
  }

  if (packageImagePath.length === 0) {
    deleteTempFiles();
    throw new ApiError(400, "Package Image Is Required");
  }

  if (makkahHotelImagePath.length === 0) {
    deleteTempFiles();
    throw new ApiError(400, "Makkah Hotel Image Is Required");
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
    throw new ApiError(500, "Error While Uploading Package Images");
  }

  if (!uploadedMakkahHotelImage || uploadedMakkahHotelImage.length === 0) {
    throw new ApiError(500, "Error While Uploading Makkah Hotel Images");
  }

  if (!uploadedMedinaHotelImage || uploadedMedinaHotelImage.length === 0) {
    throw new ApiError(500, "Error While Uploading Medina Hotel Images");
  }

  const packageImageArray = Object.values(uploadedPackageImage)[0];

  const medinaHotelImageArray = Object.values(uploadedMedinaHotelImage)[0];

  const makkahHotelImageArray = Object.values(uploadedMakkahHotelImage)[0];

  const allImagesArray = [
    ...packageImageArray,
    ...medinaHotelImageArray,
    ...makkahHotelImageArray,
  ];

  try {
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
        mak_hotel_star: intMakHotelStar,
        mak_hotel_location: makhotellocation,
        mak_hotel_images: makkahHotelImageArray,
        med_hotel_name: medhotelname,
        med_hotel_star: intMedHotelStar,
        med_hotel_location: medhotellocation,
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
        new ApiResponse(201, fullCreatedPackage, "Package Created Sucessfully")
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

// ********** Get All Umrah Package **********

const getAllUmrahPackages = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

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

// ********** Update Umrah Package Details **********

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
    makhotelstar,
    makhotellocation,
    medhotelname,
    medhotelstar,
    medhotellocation,
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
      makhotelstar,
      makhotellocation,
      medhotelname,
      medhotelstar,
      medhotellocation,
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

  const intMakHotelStar = safeConvertToNumber(makhotelstar);
  const intMedHotelStar = safeConvertToNumber(medhotelstar);
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

  const finalPrice = safeConvertToNumber(discount); // discount field now holds actual selling price
  const youSaved = intBasePrice - finalPrice;

  const inputError = umrahPackageValidation({
    packagename,
    packagetype,
    description,
    bookingdeadline,
    totaldays,
    totalnights,
    makhotelname,
    makhotelstar: intMakHotelStar,
    makhotellocation,
    medhotelname,
    medhotelstar: intMedHotelStar,
    medhotellocation,
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
      mak_hotel_star: intMakHotelStar,
      mak_hotel_location: makhotellocation,
      med_hotel_name: medhotelname,
      med_hotel_star: intMedHotelStar,
      med_hotel_location: medhotellocation,
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

// ********** Update Umrah Package Image **********

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
    Array.isArray(req.files?.packageimage) &&
    req.files?.packageimage.length < 1
  ) {
    deleteTempFiles();
    throw new ApiError(401, "At least 1 Package Image is required");
  }

  packageImagePath = req.files?.packageimage?.map((file) => file.path);

  if (
    !packageImagePath ||
    packageImagePath.length === 0 ||
    packageImagePath.length < 1
  ) {
    deleteTempFiles();
    throw new ApiError(400, "At least 1 Package Image is required.");
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

  const oldPackageImagePublicIds = existingPackage.package_image?.map(
    (image) => image.public_id
  );

  const newUploadedImages = await uploadImages(
    "Package Image",
    packageImagePath
  );

  if (!newUploadedImages || newUploadedImages.length === 0) {
    throw new ApiError(500, "Error While Uploading Package Images");
  }

  for (const oldImgId of oldPackageImagePublicIds) {
    await deleteImageFromCloudinary(oldImgId);
  }

  const packageImageArray = Object.values(newUploadedImages)[0];

  try {
    const updatedPackageImage = await prisma.umrahPackage.update({
      where: { package_id: packageId },
      data: { package_image: packageImageArray },
      select: { package_image: true },
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedPackageImage,
          "Umrah Package Images Updated Sucessfully"
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

// ********** Update Umrah Package Makkah Hotel Image **********

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
    Array.isArray(req.files?.makhotelimage) &&
    req.files?.makhotelimage.length < 5
  ) {
    deleteTempFiles();
    throw new ApiError(401, "At least 1 Makkah Hotel Image is required");
  } else {
    makHotelImagePaths = req.files?.makhotelimage?.map((file) => file.path);
  }

  if (
    !makHotelImagePaths ||
    makHotelImagePaths.length === 0 ||
    makHotelImagePaths.length < 5
  ) {
    deleteTempFiles();
    throw new ApiError(400, "At least 5 Makkah Hotel Images are required.");
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

  const oldMakHotelImagePublicIds = existingPackage.mak_hotel_images?.map(
    (image) => image.public_id
  );

  const newMakHotelImages = await uploadImages(
    "Makkah Hotel Image",
    makHotelImagePaths
  );

  if (!newMakHotelImages || newMakHotelImages.length === 0) {
    throw new ApiError(500, "Error While Uploading Makkah Hotel Images");
  }

  for (const oldImgId of oldMakHotelImagePublicIds) {
    await deleteImageFromCloudinary(oldImgId);
  }

  const makHotelImageArray = Object.values(newMakHotelImages)[0];

  try {
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
  } catch (error) {
    if (makHotelImageArray && makHotelImageArray.length > 0) {
      for (const image of makHotelImageArray) {
        deleteImageFromCloudinary(image.public_id);
      }
    }
    throw new ApiError(500, "Error Updating Makkah Hotel Images");
  }
});

// ********** Update Umrah Package Medina Hotel Image **********

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
    Array.isArray(req.files?.medhotelimage) &&
    req.files?.medhotelimage.length < 5
  ) {
    deleteTempFiles();
    throw new ApiError(401, "At least 1 Medina Hotel Image is required");
  } else {
    medHotelImagePaths = req.files?.medhotelimage?.map((file) => file.path);
  }

  if (
    !medHotelImagePaths ||
    medHotelImagePaths.length === 0 ||
    medHotelImagePaths.length < 5
  ) {
    deleteTempFiles();
    throw new ApiError(400, "At least 5 Medina Hotel Images are required.");
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

  const oldMedHotelImagePublicIds = existingPackage.med_hotel_images?.map(
    (image) => image.public_id
  );

  const newMedHotelImages = await uploadImages(
    "Medina Hotel Image",
    medHotelImagePaths
  );

  if (!newMedHotelImages || newMedHotelImages.length === 0) {
    throw new ApiError(500, "Error While Uploading Medina Hotel Images");
  }

  for (const oldImgId of oldMedHotelImagePublicIds) {
    await deleteImageFromCloudinary(oldImgId);
  }

  const medHotelImageArray = Object.values(newMedHotelImages)[0];

  try {
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
  } catch (error) {
    if (medHotelImageArray && medHotelImageArray.length > 0) {
      for (const image of medHotelImageArray) {
        deleteImageFromCloudinary(image.public_id);
      }
    }
    throw new ApiError(500, "Error Updating Medina Hotel Images");
  }
});

// ********** Delete Umrah Package **********

const deleteUmrahPackage = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const packageId = req.params.id;

  const existingPackage = await prisma.umrahPackage.findUnique({
    where: { package_id: packageId },
  });

  if (!existingPackage) {
    throw new ApiError(404, "No Package Found");
  }

  let allImagesId = [];

  existingPackage.package_image?.forEach((image) =>
    allImagesId.push(image.public_id)
  );

  existingPackage.mak_hotel_images?.forEach((image) =>
    allImagesId.push(image.public_id)
  );

  existingPackage.med_hotel_images?.forEach((image) => {
    allImagesId.push(image.public_id);
  });

  if (!allImagesId || allImagesId.length === 0) {
    throw new ApiError(500, "Error While Deleting Package");
  }

  for (const imageId of allImagesId) {
    await deleteImageFromCloudinary(imageId);
  }

  await prisma.umrahPackage.delete({
    where: { package_id: packageId },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Package Deleted Sucessfully"));
});

// *************** Export Controller ***************

export {
  createUmrahPackage,
  getAllUmrahPackages,
  updateUmrahPackageDetails,
  updateUmrahPackageImages,
  updateUmrahMakHotelImages,
  updateUmrahMedHotelImages,
  deleteUmrahPackage,
};
