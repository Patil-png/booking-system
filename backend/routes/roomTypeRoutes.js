import express from 'express';
import RoomType from '../models/RoomType.js';
import multer from 'multer';
import { getAllRoomTypes } from '../controllers/roomTypeController.js';

const router = express.Router();

// ✅ Multer setup for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/rooms',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

/**
 * ✅ Create Room Type with Admin-defined Room Numbers
 */
router.post('/', upload.array('photos'), async (req, res) => {
  try {
    const { name, basePrice, seasonalPrice, amenities, roomNumbers } = req.body;

    const parsedRoomNumbers = Array.isArray(roomNumbers)
      ? roomNumbers
      : JSON.parse(roomNumbers);

    const rooms = parsedRoomNumbers.map((num) => ({
      number: num.trim(),
      isBooked: false,
      maintenanceStatus: 'None',
    }));

    const roomType = new RoomType({
      name,
      totalRooms: parsedRoomNumbers.length,
      basePrice,
      seasonalPrice,
      amenities: amenities.split(','),
      photos: req.files.map(file => file.path),
      rooms,
    });

    await roomType.save();
    res.status(201).json(roomType);
  } catch (err) {
    console.error('❌ Failed to create room type:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * ✅ Update a Room's Status by Room Number
 */
router.put('/:roomTypeId/room-status/:roomNumber', async (req, res) => {
  try {
    const { roomTypeId, roomNumber } = req.params;
    const { isBooked, bookedFrom, bookedTo, bookedToTime, maintenanceStatus } = req.body;

    const roomType = await RoomType.findById(roomTypeId);
    if (!roomType) return res.status(404).json({ error: 'Room type not found' });

    const room = roomType.rooms.find(
      (r) => r.number.toLowerCase() === decodeURIComponent(roomNumber).toLowerCase()
    );
    if (!room) return res.status(404).json({ error: 'Room not found' });

    if (typeof isBooked !== 'undefined') room.isBooked = isBooked === 'true' || isBooked === true;
    if (bookedFrom) room.bookedFrom = new Date(bookedFrom);
    if (bookedTo) room.bookedTo = new Date(bookedTo);
    if (bookedToTime) room.bookedToTime = bookedToTime;
    room.maintenanceStatus = maintenanceStatus || undefined;

    if (!room.isBooked) {
      room.bookedFrom = null;
      room.bookedTo = null;
      room.bookedToTime = null;
    }

    await roomType.save();
    res.json({ success: true, room });
  } catch (err) {
    console.error('❌ Error updating room:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * ✅ Get All Room Types
 */
router.get('/', getAllRoomTypes);

/**
 * ✅ Delete a Room Type
 */
router.delete('/:id', async (req, res) => {
  try {
    await RoomType.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Failed to delete room type:', err.message);
    res.status(500).json({ error: 'Failed to delete' });
  }
});

/**
 * ✅ Add a New Room to an Existing Room Type
 */
router.put('/:id/add-room', async (req, res) => {
  try {
    const { id } = req.params;
    const { number } = req.body;

    if (!number || typeof number !== 'string' || !number.trim()) {
      return res.status(400).json({ error: 'Room number is required' });
    }

    const roomType = await RoomType.findById(id);
    if (!roomType) return res.status(404).json({ error: 'Room type not found' });

    const roomExists = roomType.rooms.some(
      (room) => room.number.toLowerCase() === number.trim().toLowerCase()
    );
    if (roomExists) {
      return res.status(400).json({ error: 'Room number already exists in this type' });
    }

    // Add new room
    roomType.rooms.push({
      number: number.trim(),
      isBooked: false,
      bookedFrom: null,
      bookedTo: null,
      bookedToTime: null,
      maintenanceStatus: 'None',
    });

    // Update totalRooms count
    roomType.totalRooms = roomType.rooms.length;

    await roomType.save();
    res.status(200).json({ success: true, message: 'Room added successfully', roomType });
  } catch (err) {
    console.error('❌ Failed to add room:', err);
    res.status(500).json({ error: 'Failed to add room' });
  }
});


export default router;