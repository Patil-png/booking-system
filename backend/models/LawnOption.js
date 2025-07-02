import mongoose from 'mongoose';

const lawnOptionSchema = new mongoose.Schema({
  name: String, // e.g., Full Day, Morning, Evening
  price: Number,
});

export default mongoose.model('LawnOption', lawnOptionSchema);
