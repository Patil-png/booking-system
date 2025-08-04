import PDFDocument from 'pdfkit';
import getStream from 'get-stream';

export const generateInvoiceBuffer = async (booking) => {
  const doc = new PDFDocument({ margin: 50 });
  let buffers = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  // ====== Header Section ======
  doc
    .fontSize(24)
    .fillColor('#1F2937')
    .text('🏨 Gouri Inn', { align: 'left' });

  doc
    .fontSize(10)
    .fillColor('#6B7280')
    .text('Gouri Inn, Amravati, Maharashtra', { align: 'left' })
    .text('Phone: +91-XXXXXXXXXX | Email: contact@gouriinn.com', { align: 'left' });

  doc
    .moveDown()
    .fillColor('#111827')
    .fontSize(20)
    .text('Booking Invoice', { align: 'center' })
    .moveDown(0.5);

  doc
    .strokeColor('#E5E7EB')
    .lineWidth(1)
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .stroke()
    .moveDown();

  // ====== Booking Details ======
  doc
    .fontSize(12)
    .fillColor('#111827')
    .text(`Booking ID:`, 50, doc.y)
    .fillColor('#374151')
    .text(`${booking._id}`, { continued: false });

  doc
    .fillColor('#111827')
    .text(`Booking Type:`, 50, doc.y)
    .fillColor('#374151')
    .text(`${booking.type || 'N/A'}`);

  doc
    .fillColor('#111827')
    .text(`Email:`, 50, doc.y)
    .fillColor('#374151')
    .text(`${booking.email}`);

  doc
    .fillColor('#111827')
    .text(`Phone:`, 50, doc.y)
    .fillColor('#374151')
    .text(`${booking.phone || 'N/A'}`);

  doc
    .fillColor('#111827')
    .text(`Check-In Date:`, 50, doc.y)
    .fillColor('#374151')
    .text(`${booking.checkIn || 'N/A'}`);

  doc
    .fillColor('#111827')
    .text(`Check-Out Date:`, 50, doc.y)
    .fillColor('#374151')
    .text(`${booking.checkOut || 'N/A'}`);

  doc
    .fillColor('#111827')
    .text(`Guests:`, 50, doc.y)
    .fillColor('#374151')
    .text(`${booking.adults || 0} Adults, ${booking.children || 0} Children`);

  doc
    .fillColor('#111827')
    .text(`Total Amount Paid:`, 50, doc.y)
    .fillColor('#059669')
    .font('Helvetica-Bold')
    .text(`₹${booking.amount}`, { continued: false });

  doc
    .font('Helvetica')
    .fillColor('#111827')
    .text(`Payment ID:`, 50, doc.y)
    .fillColor('#374151')
    .text(`${booking.paymentId || 'N/A'}`);

  // ====== Footer ======
  doc
    .moveDown(1.5)
    .strokeColor('#E5E7EB')
    .lineWidth(1)
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .stroke();

  doc
    .moveDown(0.5)
    .fontSize(10)
    .fillColor('#6B7280')
    .text('This is a system-generated invoice.', { align: 'left' })
    .text('For any queries, please contact us.', { align: 'left' });

  doc.end();

  return await getStream.buffer(doc);
};


// import PDFDocument from 'pdfkit';
// import getStream from 'get-stream';

// export const generateInvoiceBuffer = async (booking) => {
//   const doc = new PDFDocument();
//   let buffers = [];

//   doc.on('data', buffers.push.bind(buffers));
//   doc.on('end', () => {});

//   doc.fontSize(20).text('Booking Invoice', { align: 'center' }).moveDown();
//   doc.fontSize(12);
//   doc.text(`Booking ID: ${booking._id}`);
//   doc.text(`Type: ${booking.type}`);
//   doc.text(`Email: ${booking.email}`);
//   doc.text(`Phone: ${booking.phone}`);
//   doc.text(`Check-In: ${booking.checkIn}`);
//   doc.text(`Check-Out: ${booking.checkOut}`);
//   doc.text(`Guests: ${booking.adults} Adults, ${booking.children} Children`);
//   doc.text(`Amount Paid: ₹${booking.amount}`);
//   doc.text(`Payment ID: ${booking.paymentId || 'N/A'}`);

//   doc.end();

//   return await getStream.buffer(doc);
// };
