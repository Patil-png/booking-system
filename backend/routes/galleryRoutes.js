import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import GalleryImage from "../models/GalleryImage.js";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

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

const serverBaseUrl = process.env.SERVER_BASE_URL || `${req.protocol}://${req.get("host")}`;


    const updatedImages = images.map(img => ({
  ...img.toObject(),
  image: img.image.startsWith("http")
    ? img.image
    : `${serverBaseUrl}/uploads/gallery/${path.basename(img.image)}`,
}));


    res.json(updatedImages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching images", error: err.message });
  }
});


// ✅ Upload a new image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { category, alt } = req.body;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

const serverBaseUrl = process.env.SERVER_BASE_URL || `${req.protocol}://${req.get("host")}`;
const imageUrl = `${serverBaseUrl}/uploads/gallery/${req.file.filename}`;


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
      await fs.access(imagePath); // check if file exists
      await fs.unlink(imagePath); // delete the file
    } catch {
      console.warn("⚠️ File already deleted or missing:", imagePath);
    }

    await GalleryImage.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete image", error: err.message });
  }
});

export default router;


// import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs/promises";
// import GalleryImage from "../models/GalleryImage.js";
// import { fileURLToPath } from "url";
// import dotenv from "dotenv";
// dotenv.config(); // Load environment variables

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const router = express.Router();

// // --------------------- STORAGE SETUP ---------------------
// const storage = multer.diskStorage({
//   destination: async (req, file, cb) => {
//     const uploadPath = path.join("uploads", "gallery");
//     try {
//       await fs.mkdir(uploadPath, { recursive: true });
//       cb(null, uploadPath);
//     } catch (err) {
//       cb(err);
//     }
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}-${file.fieldname}${ext}`);
//   },
// });

// const upload = multer({ storage });

// // --------------------- ROUTES ---------------------

// // ✅ Get all gallery images
// router.get("/", async (req, res) => {
//   try {
//     const images = await GalleryImage.find().sort({ createdAt: -1 });
//     res.json(images);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching images", error: err.message });
//   }
// });

// // ✅ Upload a new image
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     const { category, alt } = req.body;
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });

// //     // ✅ Use SERVER_BASE_URL or fallback to dynamic URL
//     const baseUrl = process.env.SERVER_BASE_URL || `${req.protocol}://${req.get("host")}`;
//     const imageUrl = `${baseUrl}/uploads/gallery/${req.file.filename}`;

//     const newImage = new GalleryImage({ image: imageUrl, category, alt });
//     await newImage.save();
//     res.status(201).json(newImage);
//   } catch (error) {
//     res.status(500).json({ message: "Error uploading image", error: error.message });
//   }
// });

// // ✅ Delete image by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const image = await GalleryImage.findById(req.params.id);
//     if (!image) return res.status(404).json({ message: "Image not found in the database" });

//     const imagePath = path.join(__dirname, "..", "uploads", "gallery", path.basename(image.image));
//     try {
//       await fs.access(imagePath); // ensure file exists
//       await fs.unlink(imagePath); // delete file
//     } catch (fileErr) {
//       console.warn("Image file not found or already deleted:", imagePath);
//     }

//     await GalleryImage.findByIdAndDelete(req.params.id); // delete from DB
//     res.status(200).json({ message: "Image deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to delete image", error: err.message });
//   }
// });

// export default router;


// import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs/promises";  // Using promises API for fs operations
// import GalleryImage from "../models/GalleryImage.js";

// // To get the directory name in ES modules
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const router = express.Router();

// // Set up multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = "uploads/gallery";
//     // Create upload folder if it doesn't exist
//     fs.mkdir(uploadPath, { recursive: true })
//       .then(() => cb(null, uploadPath))
//       .catch((err) => cb(err));
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}-${file.fieldname}${ext}`);
//   },
// });

// const upload = multer({ storage });

// // GET all gallery images
// router.get('/', async (req, res) => {
//   try {
//     const images = await GalleryImage.find();
//     res.json(images);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching images", error: err.message });
//   }
// });

// // POST new image
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     const { category, alt } = req.body;
//     const imagePath = `${req.protocol}://${req.get("host")}/uploads/gallery/${req.file.filename}`;
//     const newImage = new GalleryImage({ image: imagePath, category, alt });
//     await newImage.save();
//     res.status(201).json(newImage);
//   } catch (error) {
//     res.status(500).json({ message: "Error uploading image" });
//   }
// });

// // DELETE image by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const image = await GalleryImage.findById(req.params.id);
//     if (!image) {
//       return res.status(404).json({ message: "Image not found in the database" });
//     }

//     const imagePath = path.join(__dirname, '..', 'uploads', 'gallery', path.basename(image.image));
//     console.log("Attempting to delete image at path:", imagePath);

//     // Check if the file exists
//     try {
//       await fs.access(imagePath);
//     } catch (err) {
//       console.error("File does not exist at the path:", imagePath);
//       return res.status(404).json({ message: "Image file not found" });
//     }

//     // Attempt to delete the file
//     try {
//       await fs.unlink(imagePath);
//       console.log("File deleted successfully");
//     } catch (unlinkErr) {
//       console.error("Error deleting file:", unlinkErr);
//       return res.status(500).json({ message: "Failed to delete image file", error: unlinkErr.message });
//     }

//     // Attempt to delete the image record from the database
//     try {
//       await GalleryImage.findByIdAndDelete(req.params.id);
//       console.log("Image deleted from database");
//       res.status(200).json({ message: "Image deleted successfully" });
//     } catch (dbErr) {
//       console.error("Error deleting image from database:", dbErr);
//       return res.status(500).json({ message: "Failed to delete image from database", error: dbErr.message });
//     }
//   } catch (err) {
//     console.error("General error:", err);
//     res.status(500).json({ message: "Failed to delete image. Please try again later.", error: err.message });
//   }
// });

// export default router;