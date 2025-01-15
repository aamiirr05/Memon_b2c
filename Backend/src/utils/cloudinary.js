import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload file on cloudinary

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.log("Image uploaded on Cloudinary", response.url);

    return response;
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return { error: "Error uploading file to Cloudinary", details: error };
  }
};

const deleteImageFromCloudinary = async (publicId) => {
  try {
    const response = await cloudinary.uploader.destroy(publicId);

    return response;
  } catch (error) {
    return { error: "Error deleting image from Cloudinary", details: error };
  }
};

export { uploadOnCloudinary, deleteImageFromCloudinary };
