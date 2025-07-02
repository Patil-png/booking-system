import express from 'express';
import Notification from '../models/Notification.js';

const router = express.Router();

// ✅ Get all notifications (limit to latest 50)
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(50);
    res.json(notifications);
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

// ✅ Mark notification as seen
router.put('/:id/seen', async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { seen: true });
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to update notification:', error);
    res.status(500).json({ success: false, message: 'Failed to mark as seen' });
  }
});

// ✅ Delete a notification
router.delete('/:id', async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to delete notification:', error);
    res.status(500).json({ success: false, message: 'Failed to delete notification' });
  }
});

export default router;
