
import express from 'express';
import {
  saveBooking,
  getAllBookings,
  getDashboardStats,
  exportAllBookings,
  deleteBooking,
  approveBooking,
  getBookingById,
  sendConfirmationEmail,
  markBookingPaid,
  generateInvoicePDF,
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', saveBooking);
router.get('/', getAllBookings);
router.get('/export-all', exportAllBookings);
router.get('/stats', getDashboardStats);
router.delete('/:id', deleteBooking);
router.put('/approve/:id', approveBooking);
router.put('/payment-success', markBookingPaid); // ✅ this is correct
router.post('/send-confirmation-email', sendConfirmationEmail);
router.get('/invoice/:id', generateInvoicePDF); // 👈 Add this
router.get('/:id', getBookingById);


export default router;
