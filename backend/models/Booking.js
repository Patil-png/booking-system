import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  type: String, // 'Room' or 'Lawn'
  email: String,
  phone: String,
  checkIn: String,
  checkOut: String,
  slot: String,
  roomId: String,
  amount: Number,
  paymentId: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', bookingSchema);
