// 📁 models/Contact.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    ip: String,
    inquiryType: String,
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Contact', contactSchema);
