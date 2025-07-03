import mongoose from "mongoose";
import dotenv from "dotenv";
import GalleryImage from "../models/GalleryImage.js";

dotenv.config();

const OLD_URL = "http://localhost:5000";
const NEW_URL = "https://booking-system-cn1y.onrender.com"; // Replace with your backend URL

async function updateGalleryImageURLs() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const imagesToUpdate = await GalleryImage.find({
      image: { $regex: OLD_URL },
    });

    for (const image of imagesToUpdate) {
      image.image = image.image.replace(OLD_URL, NEW_URL);
      await image.save();
    }

    console.log(`✅ Updated ${imagesToUpdate.length} image URLs.`);
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error updating image URLs:", err);
    process.exit(1);
  }
}

updateGalleryImageURLs();
