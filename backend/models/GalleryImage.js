import mongoose from "mongoose";

const GalleryImageSchema = new mongoose.Schema({
  image: { type: String, required: true },
  category: { type: String, enum: ["room", "lawn"], required: true },
  alt: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("GalleryImage", GalleryImageSchema);