import mongoose from 'mongoose';

const blockedDateSchema = new mongoose.Schema({
  type: {
    type: String, // 'Room' or 'Lawn'
    required: true,
  },
  date: {
    type: Date,
    required: true,
  }
});

export default mongoose.model('BlockedDate', blockedDateSchema);
