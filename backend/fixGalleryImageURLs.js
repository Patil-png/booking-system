import mongoose from "mongoose";
import dotenv from "dotenv";
import GalleryImage from "./models/GalleryImage.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const RENDER_URL = "https://booking-system-cn1y.onrender.com";

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env");
  process.exit(1);
}

const fixImageUrls = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Find images with localhost or incorrect URLs
    const images = await GalleryImage.find({
      $or: [
        { image: { $regex: /^http:\/\// } },
        { image: { $regex: /localhost/ } },
        { image: { $regex: /127\.0\.0\.1/ } },
        { image: { $regex: /booking-system-cn1y\.onrender\.com/ } }
      ]
    });

    if (images.length === 0) {
      console.log("🎉 No problematic image URLs found. Everything looks good.");
      process.exit(0);
    }

    console.log(`🔍 Found ${images.length} images to update...`);

    for (const img of images) {
      const oldUrl = img.image;
      
      // Extract the filename from the URL
      const filename = oldUrl.split('/').pop();
      
      // Create new URL with Render domain
      img.image = `${RENDER_URL}/uploads/gallery/${filename}`;
      
      await img.save();
      console.log(`🔁 Updated: ${oldUrl} → ${img.image}`);
    }

    console.log("✅ All image URLs updated to use Render server.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating image URLs:", error);
    process.exit(1);
  }
};

fixImageUrls();
