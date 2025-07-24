import mongoose from "mongoose";
import dotenv from "dotenv";
import GalleryImage from "./models/GalleryImage.js";

dotenv.config();

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env");
  process.exit(1);
}

const fixImageUrls = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const images = await GalleryImage.find({ image: { $regex: /^http:\/\// } });

    if (images.length === 0) {
      console.log("🎉 No HTTP image URLs found. Everything looks good.");
      process.exit(0);
    }

    for (const img of images) {
      const oldUrl = img.image;
      img.image = img.image.replace("http://", "https://");
      await img.save();
      console.log(`🔁 Updated: ${oldUrl} → ${img.image}`);
    }

    console.log("✅ All image URLs updated to HTTPS.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating image URLs:", error);
    process.exit(1);
  }
};

fixImageUrls();
