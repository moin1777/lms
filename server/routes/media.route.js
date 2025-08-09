import express from "express";
import upload from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";

const router = express.Router();

router.post("/upload-video", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file provided for upload.",
      });
    }

    const result = await uploadMedia(req.file.path);
    res.status(200).json({
      success: true,
      message: "Video uploaded successfully.",
      data: result,
    });
  } catch (error) {
    console.log("Video Upload Route Error:", error); // Log the error for debugging
    res.status(500).json({ success: false, message: "Error uploading video" });
  }
});

export default router;