import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateInvoicePDF = (booking) => {
  return new Promise((resolve, reject) => {
    const fileName = `invoice-${booking.paymentId}.pdf`;
    const filePath = path.join('invoices', fileName);

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(20).text('Booking Invoice', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Booking Type: ${booking.type}`);
    doc.text(`Amount Paid: ₹${booking.amount}`);
    doc.text(`Booking ID: ${booking.paymentId}`);
    doc.text(`Check-In: ${booking.checkIn}`);
    doc.text(`Check-Out: ${booking.checkOut || booking.checkIn}`);
    doc.text(`Email: ${booking.email}`);
    doc.text(`Phone: ${booking.phone}`);

    doc.end();

    stream.on('finish', () => resolve({ filePath, fileName }));
    stream.on('error', reject);
  });
};
