import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  number: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
  bookedFrom: { type: Date, default: null },
  bookedTo: { type: Date, default: null },
  bookedToTime: { type: String, default: null }, // ✅ Added for time-based checkout
  maintenanceStatus: {
    type: String,
    enum: ['None', 'Cleaning', 'Repair', 'Blocked'],
    default: 'None',
  },
});


const roomTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    basePrice: { type: Number, required: true },
    seasonalPrice: { type: Number, required: true },
    totalRooms: { type: Number, required: true },
    amenities: [String],
    photos: [String],
    rooms: [roomSchema],
  },
  {
    timestamps: true,
  }
);

const RoomType = mongoose.model('RoomType', roomTypeSchema);

export default RoomType;
