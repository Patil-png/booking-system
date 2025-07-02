import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  message: String,
  seen: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Notification', notificationSchema);
