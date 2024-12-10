import prisma from "../db/db.config.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { umrahPackageValidation } from "../validator/package.validator.js";
import {
  deleteImageFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import fs from "fs";
import path from "path";
import { convertIntoNumber } from "../utils/utilityfunction.js";

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
    groupdates,
    totaldays,
    totalnights,
    makhotelname,
    medhotelname,
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
      groupdates,
      totaldays,
      totalnights,
      makhotelname,
      medhotelname,
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

  const inputError = umrahPackageValidation({
    packagename,
    packagetype,
    description,
    groupdates,
    totaldays,
    totalnights,
    makhotelname,
    medhotelname,
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
    packageImagePath = req.files.packageimage.map((file) => file.path);
  }

  if (
    req.files?.makkahhotelimage &&
    Array.isArray(req.files.makkahhotelimage) &&
    req.files.makkahhotelimage.length > 0
  ) {
    makkahHotelImagePath = req.files.makkahhotelimage.map((file) => file.path);
  }

  if (
    req.files?.medinahotelimage &&
    Array.isArray(req.files.medinahotelimage) &&
    req.files.medinahotelimage.length > 0
  ) {
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

  const intTotalDays = convertIntoNumber(totaldays);
  const intTotalNights = convertIntoNumber(totalnights);

  const createdPackage = await prisma.umrahPackage.create({
    data: {
      admin_id: adminId,
      package_name: packagename,
      package_image: packageImageArray,
      package_type: packagetype,
      description: description,
      group_dates: groupdates,
      total_days: intTotalDays,
      total_nights: intTotalNights,
      mak_hotel_name: makhotelname,
      mak_hotel_images: makkahHotelImageArray,
      med_hotel_name: medhotelname,
      med_hotel_images: medinaHotelImageArray,
    },
  });

  const intQuintPrice = convertIntoNumber(quintprice);
  const intQuadPrice = convertIntoNumber(quadprice);
  const intTriplePrice = convertIntoNumber(tripleprice);
  const intDoublePrice = convertIntoNumber(doubleprice);
  const intChildWithoutBedPrice = convertIntoNumber(childwithoutbedprice);
  const intInfantPrice = convertIntoNumber(infantprice);

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

  res
    .status(200)
    .json(new ApiResponse(200, createdPackage, createdPackagePrice));
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
    groupdates,
    totaldays,
    totalnights,
    makhotelname,
    medhotelname,
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
      groupdates,
      totaldays,
      totalnights,
      makhotelname,
      medhotelname,
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

  const inputError = umrahPackageValidation({
    packagename,
    packagetype,
    description,
    groupdates,
    totaldays,
    totalnights,
    makhotelname,
    medhotelname,
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

  const intTotalDays = convertIntoNumber(totaldays);
  const intTotalNights = convertIntoNumber(totalnights);

  const intQuintPrice = convertIntoNumber(quintprice);
  const intQuadPrice = convertIntoNumber(quadprice);
  const intTriplePrice = convertIntoNumber(tripleprice);
  const intDoublePrice = convertIntoNumber(doubleprice);
  const intChildWithoutBedPrice = convertIntoNumber(childwithoutbedprice);
  const intInfantPrice = convertIntoNumber(infantprice);

  const updatedPackage = await prisma.umrahPackage.update({
    where: { package_id: packageId },
    data: {
      package_name: packagename,
      package_type: packagetype,
      description: description,
      group_dates: groupdates,
      total_days: intTotalDays,
      total_nights: intTotalNights,
      mak_hotel_name: makhotelname,
      med_hotel_name: medhotelname,
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
    include: { prices: true },
  });

  res.status(200).json(new ApiResponse(200, updatedPackage, "Done"));
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
    req.files.packageimage.length < 5
  ) {
    deleteTempFiles();
    throw new ApiError(401, "All Package Images is Required");
  } else {
    packageImagePath = req.files?.packageimage.map((file) => file.path);
  }

  if (
    !packageImagePath ||
    packageImagePath.length === 0 ||
    packageImagePath.length < 5
  ) {
    deleteTempFiles();
    throw new ApiError(400, "At least 5 Package Images are required.");
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
    deleteImageFromCloudinary(oldImgId);
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
    .json(new ApiResponse(200, updatedPackageImage, "Done"));
});

export {
  createUmrahPackage,
  getAllUmrahPackages,
  updateUmrahPackageDetails,
  updateUmrahPackageImages,
};
