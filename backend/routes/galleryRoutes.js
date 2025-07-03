import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import GalleryImage from "../models/GalleryImage.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router({ mergeParams: true });

// --------------------- STORAGE SETUP ---------------------
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join("uploads", "gallery");
    try {
      await fs.mkdir(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });

// --------------------- ROUTES ---------------------

// ✅ Get all gallery images
router.get("/", async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Error fetching images", error: err.message });
  }
});

// ✅ Upload a new image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { category, alt } = req.body;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/gallery/${req.file.filename}`;
    const newImage = new GalleryImage({ image: imageUrl, category, alt });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error: error.message });
  }
});

// ✅ Delete image by ID
router.delete("/:id", async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found in the database" });

    const imagePath = path.join(__dirname, "..", "uploads", "gallery", path.basename(image.image));
    try {
      await fs.access(imagePath); // ensure file exists
      await fs.unlink(imagePath); // delete file
    } catch (fileErr) {
      console.warn("Image file not found or already deleted:", imagePath);
    }

    await GalleryImage.findByIdAndDelete(req.params.id); // delete from DB
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete image", error: err.message });
  }
});

export default router;
