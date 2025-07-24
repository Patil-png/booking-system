import RoomType from '../models/RoomType.js';

export const getAllRoomTypes = async (req, res) => {
  try {
    const allRoomTypes = await RoomType.find();
    res.json(allRoomTypes);
  } catch (err) {
    console.error('❌ Failed to fetch room types:', err);
    res.status(500).json({ error: 'Server error' });
  }
};