import Booking from '../models/Booking.js';
import BlockedDate from '../models/BlockedDate.js';
import Option from '../models/Option.js';
import { Parser } from 'json2csv';
import Notification from '../models/Notification.js';
import { sendApprovalEmail } from '../utils/sendApprovalEmail.js';
import { sendInvoiceEmail } from '../utils/sendEmail.js';
import { generateInvoiceBuffer } from '../utils/generateInvoiceBuffer.js';

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('roomId', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching booking' });
  }
};

export const generateInvoicePDF = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('roomId');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const buffer = await generateInvoiceBuffer(booking);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Invoice_${booking._id}.pdf`);
    res.send(buffer);
  } catch (err) {
    console.error('Invoice generation error:', err);
    res.status(500).json({ message: 'Failed to generate invoice' });
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
    const bookings = await Booking.find().populate('roomId').sort({ createdAt: -1 });

    const formatted = bookings.map((b) => ({
      Type: b.type,
      RoomOrSlot: b.roomId?.name || b.slot || '',
      Email: b.email,
      Phone: b.phone,
      Adults: b.adults || 0,
      Children: b.children || 0,
      Amount: b.amount,
      CheckIn: b.checkIn,
      CheckOut: b.checkOut,
      PaymentId: b.paymentId || '-',
      CreatedAt: new Date(b.createdAt).toLocaleString(),
      Approved: b.isApproved ? 'Yes' : 'No',
      Paid: b.isPaid ? 'Yes' : 'No',
    }));

    const fields = Object.keys(formatted[0]);
    const parser = new Parser({ fields });
    const csv = parser.parse(formatted);

    res.setHeader('Content-disposition', 'attachment; filename=all-bookings.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
  } catch (err) {
    console.error('Error exporting CSV:', err);
    res.status(500).json({ error: 'Failed to export bookings' });
  }
};


export const saveBooking = async (req, res) => {
  try {
    const {
      checkIn,
      checkOut,
      type,
      email,
      phone,
      amount,
      roomId,
      adults = 0,
      children = 0,
      paymentId,
      createdByAdmin = false,
    } = req.body;

    if (!checkIn || !checkOut || !type || !email || !phone || !amount) {
      return res.status(400).json({ error: 'Missing required fields in booking data.' });
    }

    if (type === 'Room' && !roomId) {
      return res.status(400).json({ error: 'Room ID is required for Room bookings.' });
    }

    if (type === 'Room') {
      const room = await Option.findById(roomId);
      if (!room) return res.status(404).json({ error: 'Selected room not found.' });

      const totalGuests = parseInt(adults) + parseInt(children);
      if (totalGuests > room.members) {
        return res.status(400).json({ error: `Max ${room.members} guests allowed for this room.` });
      }
    }

    const normalizeDate = (date) => new Date(date).toISOString().split('T')[0];
    const checkInDate = new Date(normalizeDate(checkIn));
    const checkOutDate = new Date(normalizeDate(checkOut));

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
    const blocked = await BlockedDate.find({
      type,
      date: { $in: bookingDates },
    });

    if (blocked.length > 0) {
      return res.status(400).json({ error: 'Selected dates include blocked dates.' });
    }

    let isPaid = false;
    let isApproved = false;

    if (createdByAdmin || paymentId === 'OFFLINE') {
      isPaid = true;
      isApproved = true;
    } else if (paymentId) {
      isPaid = true;
    }

    const booking = new Booking({
      ...req.body,
      isPaid,
      isApproved,
      createdByAdmin,
    });

    await booking.save();

    const notification = new Notification({
      message: `New ${booking.type} booking from ${booking.email}`,
      type: 'Booking',
    });
    await notification.save();

    res.status(201).json({ success: true, message: 'Booking saved successfully.', booking });
  } catch (err) {
    console.error('❌ Booking save error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
};

export const approveBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.isApproved = true;
    await booking.save();

    await sendApprovalEmail(booking);
    res.status(200).json({ success: true, message: 'Booking approved and email sent.' });
  } catch (err) {
    console.error('❌ Approval error:', err);
    res.status(500).json({ error: err.message || 'Server error while approving booking' });
  }
};

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

export const markBookingPaid = async (req, res) => {
  try {
    const { bookingId, paymentId, amount } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.paymentId = paymentId;
    booking.amount = amount || booking.amount;
    booking.isPaid = true;

    await booking.save();
    await sendInvoiceEmail(booking);

    res.status(200).json({ success: true, message: 'Payment marked, invoice sent.' });
  } catch (err) {
    console.error('❌ Payment update error:', err);
    res.status(500).json({ error: 'Failed to mark booking as paid' });
  }
};

export const sendConfirmationEmail = async (req, res) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ error: 'Missing payment ID.' });
    }

    const booking = await Booking.findOne({ paymentId });
    if (!booking) {
      return res.status(404).json({ error: 'Booking with this payment ID not found' });
    }

    await sendInvoiceEmail(booking);
    res.status(200).json({ success: true, message: 'Invoice email re-sent successfully.' });
  } catch (err) {
    console.error('❌ Email send error:', err);
    res.status(500).json({ error: 'Failed to send confirmation email' });
  }
};
