import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  type: String,
  email: String,
  phone: String,
  checkIn: String,
  checkOut: String,
  slot: String,
roomId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Option',
},
  amount: Number,
  paymentId: String,
  adults: Number,
  children: Number,
  isApproved: {
    type: Boolean,
    default: false,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Booking', bookingSchema);
