import express from 'express';
import {
  saveBooking,
  getAllBookings,
  getDashboardStats,
  exportAllBookings,
  deleteBooking,
} from '../controllers/bookingController.js';

const router = express.Router();

// Register the routes directly on the router
router.post('/', saveBooking);
router.get('/', getAllBookings);
router.get('/export-all', exportAllBookings);
router.get('/stats', getDashboardStats);
router.delete('/:id', deleteBooking);

// ✅ Properly export the router
export default router;
