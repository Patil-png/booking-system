import Booking from '../models/Booking.js';
import BlockedDate from '../models/BlockedDate.js';
import { sendInvoiceEmail } from '../utils/sendEmail.js';
import { sendWhatsAppMessage } from '../utils/sendWhatsApp.js';
import { Parser } from 'json2csv';
import Notification from '../models/Notification.js';

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const yearStart = new Date(today.getFullYear(), 0, 1);

    const todayTotal = await Booking.aggregate([
      { $match: { createdAt: { $gte: today } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const monthTotal = await Booking.aggregate([
      { $match: { createdAt: { $gte: monthStart } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const yearTotal = await Booking.aggregate([
      { $match: { createdAt: { $gte: yearStart } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const roomCount = await Booking.countDocuments({ type: 'Room' });
    const lawnCount = await Booking.countDocuments({ type: 'Lawn' });

    res.json({
      todayTotal: todayTotal[0]?.total || 0,
      monthTotal: monthTotal[0]?.total || 0,
      yearTotal: yearTotal[0]?.total || 0,
      roomCount,
      lawnCount
    });
  } catch (error) {
    console.error('❌ Failed to get stats:', error);
    res.status(500).json({ error: 'Stats fetch failed' });
  }
};

export const exportAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    const fields = ['type', 'email', 'phone', 'checkIn', 'checkOut', 'amount'];
    const csv = new Parser({ fields }).parse(bookings);

    res.setHeader('Content-disposition', 'attachment; filename=all-bookings.csv');
    res.set('Content-Type', 'text/csv');
    res.send(csv);
  } catch (err) {
    console.error('Error exporting CSV:', err);
    res.status(500).json({ error: 'Failed to export bookings' });
  }
};


export const saveBooking = async (req, res) => {
  try {
    const { checkIn, checkOut, type, email, phone, amount } = req.body;

    // Validate input fields
    if (!checkIn || !checkOut || !type || !email || !phone || !amount) {
      return res.status(400).json({ error: 'Missing required fields in booking data.' });
    }

    // Normalize dates to YYYY-MM-DD format
    const normalizeDate = (date) => new Date(date).toISOString().split('T')[0];
    const checkInDate = new Date(normalizeDate(checkIn));
    const checkOutDate = new Date(normalizeDate(checkOut));

    // Generate all dates between check-in and check-out
    const generateDateRange = (start, end) => {
      const dates = [];
      let current = new Date(start);
      while (current <= end) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      return dates;
    };

    const bookingDates = generateDateRange(checkInDate, checkOutDate);

    // Check for blocked dates
    const blocked = await BlockedDate.find({
      type,
      date: { $in: bookingDates }
    });

    if (blocked.length > 0) {
      return res.status(400).json({ error: 'Selected dates include blocked dates.' });
    }

    // Save the booking to the database
    const booking = new Booking(req.body);
    await booking.save();

    // Create a notification about the new booking
    const notification = new Notification({
      message: `New ${booking.type} booking from ${booking.email}`,
      type: 'Booking',
    });
    await notification.save();

    // Try to send invoice and WhatsApp message (optional)
    try {
      await sendInvoiceEmail(booking);
      await sendWhatsAppMessage(booking);
    } catch (err) {
      console.warn('⚠️ Failed to send invoice or WhatsApp:', err.message);
    }

    // Respond with the saved booking
    res.status(201).json({ success: true, booking });

  } catch (err) {
    console.error('❌ Booking save error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
};

// Delete a booking by ID
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Booking.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error('Delete booking error:', err);
    res.status(500).json({ message: 'Server error while deleting booking' });
  }
};