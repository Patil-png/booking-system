import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateInvoicePDF = (booking) => {
  return new Promise((resolve, reject) => {
    const fileName = `invoice-${booking.paymentId || booking._id}.pdf`;
    const filePath = path.join('invoices', fileName);

    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // ======= Header / Branding =======
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
      .fontSize(20)
      .fillColor('#111827')
      .text('Booking Invoice', { align: 'center' });

    doc
      .moveDown(0.5)
      .strokeColor('#E5E7EB')
      .lineWidth(1)
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .stroke()
      .moveDown();

    // ======= Booking Details =======
    doc
      .fontSize(12)
      .fillColor('#111827')
      .text(`Booking Type:`, { continued: true })
      .fillColor('#374151')
      .text(` ${booking.type || 'N/A'}`);

    doc
      .fillColor('#111827')
      .text(`Amount Paid:`, { continued: true })
      .fillColor('#059669')
      .font('Helvetica-Bold')
      .text(` ₹${booking.amount}`, { continued: false });

    doc
      .font('Helvetica')
      .fillColor('#111827')
      .text(`Booking ID:`, { continued: true })
      .fillColor('#374151')
      .text(` ${booking.paymentId || booking._id}`);

    doc
      .fillColor('#111827')
      .text(`Check-In Date:`, { continued: true })
      .fillColor('#374151')
      .text(` ${booking.checkIn || 'N/A'}`);

    doc
      .fillColor('#111827')
      .text(`Check-Out Date:`, { continued: true })
      .fillColor('#374151')
      .text(` ${booking.checkOut || booking.checkIn || 'N/A'}`);

    doc
      .fillColor('#111827')
      .text(`Email:`, { continued: true })
      .fillColor('#374151')
      .text(` ${booking.email || 'N/A'}`);

    doc
      .fillColor('#111827')
      .text(`Phone:`, { continued: true })
      .fillColor('#374151')
      .text(` ${booking.phone || 'N/A'}`);

    // ======= Footer / Note =======
    doc
      .moveDown(1)
      .strokeColor('#E5E7EB')
      .lineWidth(1)
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .stroke();

    doc
      .moveDown(0.5)
      .fontSize(10)
      .fillColor('#6B7280')
      .text('This is a system-generated invoice. For any queries, please contact our front desk or email support.', {
        align: 'left',
      });

    doc.end();

    stream.on('finish', () => resolve({ filePath, fileName }));
    stream.on('error', reject);
  });
};


// import PDFDocument from 'pdfkit';
// import fs from 'fs';
// import path from 'path';

// export const generateInvoicePDF = (booking) => {
//   return new Promise((resolve, reject) => {
//     const fileName = `invoice-${booking.paymentId}.pdf`;
//     const filePath = path.join('invoices', fileName);

//     const doc = new PDFDocument();
//     const stream = fs.createWriteStream(filePath);
//     doc.pipe(stream);

//     doc.fontSize(20).text('Booking Invoice', { align: 'center' });
//     doc.moveDown();

//     doc.fontSize(12).text(`Booking Type: ${booking.type}`);
//     doc.text(`Amount Paid: ₹${booking.amount}`);
//     doc.text(`Booking ID: ${booking.paymentId}`);
//     doc.text(`Check-In: ${booking.checkIn}`);
//     doc.text(`Check-Out: ${booking.checkOut || booking.checkIn}`);
//     doc.text(`Email: ${booking.email}`);
//     doc.text(`Phone: ${booking.phone}`);

//     doc.end();

//     stream.on('finish', () => resolve({ filePath, fileName }));
//     stream.on('error', reject);
//   });
// };