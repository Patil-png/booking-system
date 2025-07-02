import express from 'express';
import PDFDocument from 'pdfkit';
import Booking from '../models/Booking.js';

const router = express.Router();

router.get('/download/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId).populate('roomId'); // optional populate

    if (!booking) return res.status(404).send('Booking not found');

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${booking._id}.pdf`);

    doc.fontSize(24).text('Hotel Booking Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Booking ID: ${booking._id}`);
    doc.text(`Name: ${booking.email}`);
    doc.text(`Phone: ${booking.phone}`);
    doc.text(`Room: ${booking.roomId?.name || 'N/A'}`);
    doc.text(`Check-In: ${booking.checkIn}`);
    doc.text(`Check-Out: ${booking.checkOut}`);
    doc.text(`Amount Paid: ₹${booking.amount}`);
    doc.text(`Payment ID: ${booking.paymentId}`);
    doc.end();

    doc.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating invoice');
  }
});

export default router;
