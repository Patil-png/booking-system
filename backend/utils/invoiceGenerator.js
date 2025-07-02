
export const generateInvoice = async (booking) => {
  const doc = new PDFDocument();
  let buffers = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  // PDF content
  doc.fontSize(20).text('Booking Invoice', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Booking ID: ${booking._id}`);
  doc.text(`Name: ${booking.name || booking.email}`);
  doc.text(`Email: ${booking.email}`);
  doc.text(`Phone: ${booking.phone}`);
  doc.text(`Room Type: ${booking.type}`);
  doc.text(`Check-in: ${booking.checkIn}`);
  doc.text(`Check-out: ${booking.checkOut}`);
  doc.text(`Amount Paid: ₹${booking.amount}`);
  doc.end();

  const pdfBuffer = await getStream.buffer(doc);
  return pdfBuffer;
};
