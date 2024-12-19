import prisma from "../db/db.config.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  safeParseJSON,
  safeConvertToNumber,
  isValidImage,
  deleteTempFiles,
  uploadImages,
} from "../utils/utilityfunction.js";
import { deleteImageFromCloudinary } from "../utils/cloudinary.js";
import { hotelInputValidation } from "../validator/hotel.validator.js";

// ********** Create Hotel **********

const createHotel = asyncHandler(async (req, res) => {
  const admin = req.admin;
  const adminId = admin.admin_id;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const {
    hotelname,
    hotelcountry,
    hotelcity,
    hoteldescription,
    hoteldistance,
    amenities,
    star,
    isactive,
    featured,
    cancellationpolicy,
    termcondition,
    bookingterms,
    quintprice,
    quadprice,
    tripleprice,
    doubleprice,
  } = req.body;

  console.log(req.body);

  if (
    [
      hotelname,
      hotelcountry,
      hotelcity,
      hoteldescription,
      hoteldistance,
      amenities,
      star,
      isactive,
      featured,
      cancellationpolicy,
      termcondition,
      bookingterms,
      quintprice,
      quadprice,
      tripleprice,
      doubleprice,
    ].some((fields) => fields?.trim == "")
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

  const amenitiesArray = safeParseJSON(amenities);
  const termConditionArray = safeParseJSON(termcondition);
  const bookingTermsArray = safeParseJSON(bookingterms);
  const cancellationPolicyArray = safeParseJSON(cancellationpolicy);

  const intQuintPrice = safeConvertToNumber(quintprice);
  const intQuadPrice = safeConvertToNumber(quadprice);
  const intTriplePrice = safeConvertToNumber(tripleprice);
  const intDoublePrice = safeConvertToNumber(doubleprice);

  const inputError = hotelInputValidation({
    hotelname,
    hotelcountry,
    hotelcity,
    hoteldescription,
    hoteldistance,
    amenities: amenitiesArray,
    star,
    isactive,
    featured,
    cancellationpolicy: cancellationPolicyArray,
    termcondition: termConditionArray,
    bookingterms: bookingTermsArray,
    quintprice: intQuintPrice,
    quadprice: intQuadPrice,
    tripleprice: intTriplePrice,
    doubleprice: intDoublePrice,
  });

  if (inputError) {
    throw new ApiError(400, `Validation Error: ${inputError[0].message}`);
  }

  let hotelImagesPath = [];

  if (
    !req.files?.hotelimage ||
    !Array.isArray(req.files.hotelimage) ||
    req.files.hotelimage.length === 0
  ) {
    deleteTempFiles();
    throw new ApiError(400, "All 20 Hotel Images are required");
  }

  if (req.files.hotelimage.length !== 20) {
    deleteTempFiles();
    throw new ApiError(400, "All 20 Hotel Images are required");
  }

  hotelImagesPath.push(...req.files.hotelimage.map((file) => file.path));

  if (hotelImagesPath.length === 0) {
    deleteTempFiles();
    throw new ApiError(400, "Hotel Images Is Required");
  }

  for (let imagePath of hotelImagesPath) {
    if (!isValidImage(imagePath)) {
      deleteTempFiles();
      throw new ApiError(
        400,
        `Invalid file type! .jpg, .jpeg, .png are allowed.`
      );
    }
  }

  const uploadedHotelImage = await uploadImages("Hotel Image", hotelImagesPath);

  if (!updateHotelImages || updateHotelImages.length === 0) {
    throw new ApiError(500, "Error While Uploading Images");
  }

  const hotelImageArray = Object.values(uploadedHotelImage)[0];

  console.log(hotelImageArray);

  const createdHotel = await prisma.hotel.create({
    data: {
      admin_id: adminId,
      hotel_name: hotelname,
      hotel_images: hotelImageArray,
      hotel_country: hotelcountry,
      hotel_city: hotelcity,
      hotel_description: hoteldescription,
      hotel_distance: hoteldistance,
      amenities: amenitiesArray,
      star,
      is_active: isactive,
      featured: featured,
      cancellation_policy: cancellationPolicyArray,
      term_condition: termConditionArray,
      booking_terms: bookingTermsArray,
    },
  });

  const createdRoomPrice = await prisma.room.create({
    data: {
      hotel_id: createdHotel.hotel_id,
      quint_price: intQuintPrice,
      quad_price: intQuadPrice,
      triple_price: intTriplePrice,
      double_price: intDoublePrice,
    },
  });

  const fullCreatedHotel = [createdHotel, createdRoomPrice];

  return res
    .status(200)
    .json(new ApiResponse(200, fullCreatedHotel, "Hotel Created Sucessfully"));
});

// ********** Get All Hotels  **********

const getAllHotels = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const allHotels = await prisma.hotel.findMany({ include: { rooms: true } });

  if (allHotels.length === 0) {
    throw new ApiError(404, "No Hotels Found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allHotels,
        `${allHotels.length} Hotels Fetched Sucessfully`
      )
    );
});

// ********** Update Hotel Details **********

const updateHotelDetails = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const hotelId = req.params.id;

  const existingHotel = await prisma.hotel.findUnique({
    where: { hotel_id: hotelId },
    include: { rooms: { select: { room_id: true } } },
  });

  if (!existingHotel) {
    throw new ApiError(404, "No Hotels Found");
  }

  const roomId = existingHotel.rooms[0].room_id;

  if (!roomId) {
    throw new ApiError(404, "No Rooms Found For This Hotel");
  }

  const {
    hotelname,
    hotelcountry,
    hotelcity,
    hoteldescription,
    hoteldistance,
    amenities,
    star,
    isactive,
    featured,
    cancellationpolicy,
    termcondition,
    bookingterms,
    quintprice,
    quadprice,
    tripleprice,
    doubleprice,
  } = req.body;

  if (
    [
      hotelname,
      hotelcountry,
      hotelcity,
      hoteldescription,
      hoteldistance,
      amenities,
      star,
      isactive,
      featured,
      cancellationpolicy,
      termcondition,
      bookingterms,
      quintprice,
      quadprice,
      tripleprice,
      doubleprice,
    ].some((fields) => fields?.trim == "")
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

  const amenitiesArray = safeParseJSON(amenities);
  const termConditionArray = safeParseJSON(termcondition);
  const bookingTermsArray = safeParseJSON(bookingterms);
  const cancellationPolicyArray = safeParseJSON(cancellationpolicy);

  const intQuintPrice = safeConvertToNumber(quintprice);
  const intQuadPrice = safeConvertToNumber(quadprice);
  const intTriplePrice = safeConvertToNumber(tripleprice);
  const intDoublePrice = safeConvertToNumber(doubleprice);

  const inputError = hotelInputValidation({
    hotelname,
    hotelcountry,
    hotelcity,
    hoteldescription,
    hoteldistance,
    amenities: amenitiesArray,
    star,
    isactive,
    featured,
    cancellationpolicy: cancellationPolicyArray,
    termcondition: termConditionArray,
    bookingterms: bookingTermsArray,
    quintprice: intQuintPrice,
    quadprice: intQuadPrice,
    tripleprice: intTriplePrice,
    doubleprice: intDoublePrice,
  });

  if (inputError) {
    throw new ApiError(400, `Validation Error: ${inputError[0].message}`);
  }

  const updatedHotel = await prisma.hotel.update({
    where: { hotel_id: hotelId },
    data: {
      hotel_name: hotelname,
      hotel_country: hotelcountry,
      hotel_city: hotelcity,
      hotel_description: hoteldescription,
      hotel_distance: hoteldistance,
      amenities: amenitiesArray,
      star,
      is_active: isactive,
      featured: featured,
      cancellation_policy: cancellationPolicyArray,
      term_condition: termConditionArray,
      booking_terms: bookingTermsArray,
      rooms: {
        update: {
          where: { room_id: roomId },
          data: {
            quint_price: intQuintPrice,
            quad_price: intQuadPrice,
            triple_price: intTriplePrice,
            double_price: intDoublePrice,
          },
        },
      },
    },
    select: {
      admin_id: true,
      hotel_id: true,
      hotel_name: true,
      hotel_country: true,
      hotel_city: true,
      hotel_description: true,
      hotel_distance: true,
      amenities: true,
      star: true,
      is_active: true,
      featured: true,
      cancellation_policy: true,
      term_condition: true,
      booking_terms: true,
      rooms: {
        select: {
          quint_price: true,
          quad_price: true,
          triple_price: true,
          double_price: true,
        },
      },
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedHotel, "Hotel Details Updated Sucessfully")
    );
});

// ********** Update Hotel Images **********

const updateHotelImages = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const hotelId = req.params.id;

  const existingHotel = await prisma.hotel.findUnique({
    where: { hotel_id: hotelId },
    include: { rooms: { select: { room_id: true } } },
  });

  if (!existingHotel) {
    deleteTempFiles();
    throw new ApiError(404, "No Hotels Found");
  }

  let hotelImagesPath = [];

  if (
    !req.files?.hotelimage &&
    !Array.isArray(req.files.hotelimage) &&
    req.files.hotelimage.length !== 20
  ) {
    deleteTempFiles();
    throw new ApiError(401, "All Hotel Images is Required");
  }

  hotelImagesPath.push(...req.files?.hotelimage.map((file) => file.path));

  if (
    !hotelImagesPath ||
    hotelImagesPath.length === 0 ||
    hotelImagesPath.length < 20
  ) {
    deleteTempFiles();
    throw new ApiError(400, "At least 20 Hotel Images are required");
  }

  for (const imagePath of hotelImagesPath) {
    if (!isValidImage(imagePath)) {
      deleteTempFiles();

      throw new ApiError(
        400,
        `Invalid file type! .jpg, .jpeg, .png are allowed.`
      );
    }
  }

  const oldHotelImagePublicIds = await Promise.all(
    existingHotel.hotel_images.map((image) => image.public_id)
  );

  const newUploadedImages = await uploadImages("Hotel Image", hotelImagesPath);

  if (!newUploadedImages || newUploadedImages.length === 0) {
    throw new ApiError(500, "Error While Uploading Images");
  }

  for (const oldImgId of oldHotelImagePublicIds) {
    await deleteImageFromCloudinary(oldImgId);
  }
  console.log("Images Deleted From Cloudinary");

  const hotelImageArray = Object.values(newUploadedImages)[0];

  const updatedHotelImage = await prisma.hotel.update({
    where: { hotel_id: hotelId },
    data: { hotel_images: hotelImageArray },
    select: { hotel_images: true },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedHotelImage,
        "Hotel Images Updated Sucessfully"
      )
    );
});

// ********** Delete Hotel **********

const deleteHotel = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const hotelId = req.params.id;

  const existingHotel = await prisma.hotel.findUnique({
    where: { hotel_id: hotelId },
  });

  if (!existingHotel) {
    deleteTempFiles();
    throw new ApiError(404, "No Hotels Found");
  }

  let allImagesId = [];

  allImagesId.push(
    ...existingHotel.hotel_images.map((image) => image.public_id)
  );

  if (!allImagesId || allImagesId.length === 0) {
    throw new ApiError(500, "Error While Deleting Hotel");
  }

  for (const imageId of allImagesId) {
    await deleteImageFromCloudinary(imageId);
  }
  console.log("Deleted");

  await prisma.hotel.delete({
    where: { hotel_id: hotelId },
  });

  return res.status(200).json(new ApiResponse(200, "Hotel Deletd Sucessfully"));
});

// ********** Export Controller **********

export {
  createHotel,
  getAllHotels,
  updateHotelDetails,
  updateHotelImages,
  deleteHotel,
};
