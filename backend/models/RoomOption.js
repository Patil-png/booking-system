import mongoose from 'mongoose';

const roomOptionSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

export default mongoose.model('RoomOption', roomOptionSchema);
