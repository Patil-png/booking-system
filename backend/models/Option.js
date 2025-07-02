// models/Option.js
import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  type: { type: String, enum: ['Room', 'Lawn'], required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model('Option', optionSchema);
