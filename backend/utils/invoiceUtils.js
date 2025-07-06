import PDFDocument from 'pdfkit';
import getStream from 'get-stream';

export const generateInvoiceBuffer = async (booking) => {
  const doc = new PDFDocument();
  let buffers = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  doc.fontSize(20).text('Booking Invoice', { align: 'center' }).moveDown();
  doc.fontSize(12);
  doc.text(`Booking ID: ${booking._id}`);
  doc.text(`Type: ${booking.type}`);
  doc.text(`Email: ${booking.email}`);
  doc.text(`Phone: ${booking.phone}`);
  doc.text(`Check-In: ${booking.checkIn}`);
  doc.text(`Check-Out: ${booking.checkOut}`);
  doc.text(`Guests: ${booking.adults} Adults, ${booking.children} Children`);
  doc.text(`Amount Paid: ₹${booking.amount}`);
  doc.text(`Payment ID: ${booking.paymentId || 'N/A'}`);

  doc.end();

  return await getStream.buffer(doc);
};
