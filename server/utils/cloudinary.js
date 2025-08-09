import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({});

cloudinary.config({
  api_key: process.env.API_KEY, // Ensure this matches your Cloudinary API key
  api_secret: process.env.API_SECRET, // Ensure this matches your Cloudinary API secret
  cloud_name: process.env.CLOUD_NAME, // Ensure this matches your Cloudinary cloud name
});

export const uploadMedia = async (file) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      resource_type: "video", // Ensure resource type is set to video
    });
    return uploadResponse;
  } catch (error) {
    console.log("Cloudinary Upload Error:", error); // Log the error for debugging
    throw new Error("Failed to upload media to Cloudinary");
  }
};

export const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteVideoFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId,{resource_type:"video"});
    } catch (error) {
        console.log(error);
        
    }
}

