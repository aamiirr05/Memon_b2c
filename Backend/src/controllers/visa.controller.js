import prisma from "../db/db.config.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { visaInputValidation } from "../validator/visa.validator.js";
import {
  safeParseJSON,
  safeConvertToNumber,
  isValidImage,
  deleteTempFiles,
  uploadImages,
} from "../utils/utilityfunction.js";
import { deleteImageFromCloudinary } from "../utils/cloudinary.js";

// ********** Create Visa **********

const createVisa = asyncHandler(async (req, res) => {
  const admin = req.admin;
  const adminId = admin.admin_id;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const {
    visacountry,
    visatype,
    price,
    description,
    processingtime,
    validity,
    stayperiod,
    entry,
    documentrequirement,
    basicrequirement,
    termcondition,
    bookingterms,
    cancellationpolicy,
  } = req.body;

  if (
    [
      visacountry,
      visatype,
      price,
      description,
      processingtime,
      validity,
      stayperiod,
      entry,
      documentrequirement,
      basicrequirement,
      termcondition,
      bookingterms,
      cancellationpolicy,
    ].some((fields) => fields?.trim === "")
  ) {
    throw new ApiError(400, "All fields must be filled ");
  }

  const documentRequirementArray = safeParseJSON(documentrequirement);
  const basicRequirementArray = safeParseJSON(basicrequirement);
  const termConditionArray = safeParseJSON(termcondition);
  const bookinTermArray = safeParseJSON(bookingterms);
  const cancellationPolicyArray = safeParseJSON(cancellationpolicy);

  const intPrice = safeConvertToNumber(price);
  const intStayPeriod = safeConvertToNumber(stayperiod);

  const inputError = visaInputValidation({
    visacountry,
    visatype,
    price: intPrice,
    description,
    processingtime,
    validity,
    stayperiod: intStayPeriod,
    entry,
    documentrequirement: documentRequirementArray,
    basicrequirement: basicRequirementArray,
    termcondition: termConditionArray,
    bookingterms: bookinTermArray,
    cancellationpolicy: cancellationPolicyArray,
  });

  if (inputError) {
    throw new ApiError(400, `Validation Error: ${inputError[0].message}`);
  }

  let visaImagePath = [];

  if (
    !req.files?.visaimage ||
    !Array.isArray(req.files?.visaimage) ||
    req.files?.visaimage.length === 0
  ) {
    deleteTempFiles();
    throw new ApiError(400, "Visa Image is Required");
  }

  if (req.files?.visaimage.length !== 1) {
    deleteTempFiles();
    throw new ApiError(400, "Visa Image is Required");
  }

  visaImagePath.push(...req.files?.visaimage?.map((file) => file.path));

  if (visaImagePath.length === 0) {
    deleteTempFiles();
    throw new ApiError(400, "Visa Image is Required");
  }

  for (const imagePath of visaImagePath) {
    if (!isValidImage(imagePath)) {
      deleteTempFiles();
      throw new ApiError(
        400,
        `Invalid file type! .jpg, .jpeg, .png are allowed.`
      );
    }
  }

  const uploadedVisaImage = await uploadImages("Visa Image", visaImagePath);

  const visaImageArray = Object.values(uploadedVisaImage)[0];

  try {
    const createdVisa = await prisma.visa.create({
      data: {
        admin_id: adminId,
        visa_country: visacountry,
        visa_type: visatype,
        visa_image: visaImageArray,
        price: intPrice,
        description,
        processing_time: processingtime,
        validity,
        stay_period: intStayPeriod,
        entry,
        document_requirement: documentRequirementArray,
        basic_requirement: basicRequirementArray,
        term_condition: termConditionArray,
        booking_terms: bookinTermArray,
        cancellation_policy: cancellationPolicyArray,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(201, createdVisa, "Visa Created Sucessfully"));
  } catch (error) {
    if (visaImageArray && visaImageArray.length > 0) {
      for (const image of visaImageArray) {
        deleteImageFromCloudinary(image.public_id);
      }
    }
    throw new ApiError(500, "Error While Creating Visa");
  }
});

// ********** Get All Visas  **********

const getAllVisa = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const allVisas = await prisma.visa.findMany({});

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allVisas,
        `${allVisas.length} Visa Fetched Sucessfully`
      )
    );
});

// ********** Update Visa Details **********

const updateVisaDetails = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const visaId = req.params.id;

  const existingVisa = await prisma.visa.findUnique({
    where: {
      visa_id: visaId,
    },
  });

  if (!existingVisa) {
    throw new ApiError(404, "Visa Not Found");
  }

  const {
    visacountry,
    visatype,
    price,
    description,
    processingtime,
    validity,
    stayperiod,
    entry,
    documentrequirement,
    basicrequirement,
    termcondition,
    bookingterms,
    cancellationpolicy,
  } = req.body;

  if (
    [
      visacountry,
      visatype,
      price,
      description,
      processingtime,
      validity,
      stayperiod,
      entry,
      documentrequirement,
      basicrequirement,
      termcondition,
      bookingterms,
      cancellationpolicy,
    ].some((fields) => fields?.trim === "")
  ) {
    throw new ApiError(400, "All fields must be filled ");
  }

  const documentRequirementArray = safeParseJSON(documentrequirement);
  const basicRequirementArray = safeParseJSON(basicrequirement);
  const termConditionArray = safeParseJSON(termcondition);
  const bookinTermArray = safeParseJSON(bookingterms);
  const cancellationPolicyArray = safeParseJSON(cancellationpolicy);

  const intPrice = safeConvertToNumber(price);
  const intStayPeriod = safeConvertToNumber(stayperiod);

  const inputError = visaInputValidation({
    visacountry,
    visatype,
    price: intPrice,
    description,
    processingtime,
    validity,
    stayperiod: intStayPeriod,
    entry,
    documentrequirement: documentRequirementArray,
    basicrequirement: basicRequirementArray,
    termcondition: termConditionArray,
    bookingterms: bookinTermArray,
    cancellationpolicy: cancellationPolicyArray,
  });

  if (inputError) {
    throw new ApiError(400, `Validation Error: ${inputError[0].message}`);
  }

  const updatedVisa = await prisma.visa.update({
    where: { visa_id: visaId },
    data: {
      visa_country: visacountry,
      visa_type: visatype,
      price: intPrice,
      description,
      processing_time: processingtime,
      validity,
      stay_period: intStayPeriod,
      entry,
      document_requirement: documentRequirementArray,
      basic_requirement: basicRequirementArray,
      term_condition: termConditionArray,
      booking_terms: bookinTermArray,
      cancellation_policy: cancellationPolicyArray,
    },
    select: {
      visa_country: true,
      visa_type: true,
      price: true,
      description: true,
      processing_time: true,
      validity: true,
      stay_period: true,
      entry: true,
      document_requirement: true,
      basic_requirement: true,
      term_condition: true,
      booking_terms: true,
      cancellation_policy: true,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedVisa, "Visa Updated Sucessfully"));
});

// ********** Update Visa Images **********

const updateVisaImage = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const visaId = req.params.id;

  const existingVisa = await prisma.visa.findUnique({
    where: { visa_id: visaId },
    select: { visa_image: true },
  });

  if (!existingVisa) {
    deleteTempFiles();
    throw new ApiError(404, "No Visas Found");
  }

  let visaImagePath = [];

  if (
    !req.files?.visaimage &&
    !Array.isArray(req.files?.visaimage) &&
    req.files?.visaimage.length === 0
  ) {
    deleteTempFiles();
    throw new ApiError(401, "Visa Image is Required");
  }

  visaImagePath.push(...req.files?.visaimage?.map((file) => file.path));

  if (
    !visaImagePath ||
    visaImagePath.length === 0 ||
    visaImagePath.length < 1
  ) {
    deleteTempFiles();
    throw new ApiError(400, "At least 1 Visa Image is required");
  }

  for (const imagePath of visaImagePath) {
    if (!isValidImage(imagePath)) {
      deleteTempFiles();

      throw new ApiError(
        400,
        `Invalid file type! .jpg, .jpeg, .png are allowed.`
      );
    }
  }

  const oldvisaimagePublicIds = await Promise.all(
    existingVisa.visa_image?.map((image) => image.public_id)
  );

  const newUploadedImages = await uploadImages("Visa Image", visaImagePath);

  if (!newUploadedImages || newUploadedImages.length === 0) {
    throw new ApiError(500, "Error While Uploading Images");
  }

  for (const oldImgId of oldvisaimagePublicIds) {
    await deleteImageFromCloudinary(oldImgId);
  }

  const visaimageArray = Object.values(newUploadedImages)[0];

  try {
    const updatedvisaimage = await prisma.visa.update({
      where: { visa_id: visaId },
      data: { visa_image: visaimageArray },
      select: { visa_image: true },
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedvisaimage, "Visa Image Updated Sucessfully")
      );
  } catch (error) {
    if (visaimageArray && visaimageArray.length > 0) {
      for (const image of visaimageArray) {
        deleteImageFromCloudinary(image.public_id);
      }
    }
    throw new ApiError(500, "Error While Updating Visa Image");
  }
});

// ********** Delete Visa **********

const deleteVisa = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const visaId = req.params.id;

  // Find the existing visa by ID
  const existingVisa = await prisma.visa.findUnique({
    where: { visa_id: visaId },
  });

  if (!existingVisa) {
    throw new ApiError(404, "No Visa Found");
  }

  let allImagesId = [];

  // Collect all public IDs of images
  if (existingVisa.visa_image && Array.isArray(existingVisa.visa_image)) {
    allImagesId?.push(
      ...existingVisa.visa_image?.map((image) => image.public_id)
    );
  }

  // Check if there are images to delete
  if (!allImagesId || allImagesId.length === 0) {
    throw new ApiError(500, "Error While Deleting Visa Images");
  }

  // Delete all images from Cloudinary
  for (const imageId of allImagesId) {
    try {
      await deleteImageFromCloudinary(imageId);
    } catch (err) {
      console.error(`Failed to delete image with ID ${imageId}:`, err);
    }
  }

  // Delete the visa record from the database
  await prisma.visa.delete({
    where: { visa_id: visaId },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Visa Deleted Successfully"));
});

// ********** Export Controller **********

export {
  createVisa,
  getAllVisa,
  updateVisaDetails,
  updateVisaImage,
  deleteVisa,
};
