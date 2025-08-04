// utils/generateInvoiceBuffer.js
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateInvoiceBuffer = (booking) => {
  const doc = new jsPDF();

  // ===== Header: Hotel Branding =====
  doc.setFontSize(22);
  doc.setTextColor(33, 37, 41); // dark gray
  doc.text('🏨 Gouri Inn', 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('Gouri Inn, Amravati, Maharashtra', 14, 26);
  doc.text('Phone: +91-XXXXXXXXXX | Email: contact@gouriinn.com', 14, 30);

  // ===== Title =====
  doc.setFontSize(16);
  doc.setTextColor(33, 37, 41);
  doc.text('Booking Invoice', 105, 40, { align: 'center' });

  // ===== Table: Booking Details =====
  autoTable(doc, {
    startY: 50,
    head: [['Field', 'Details']],
    body: [
      ['Booking Type', booking.type],
      ['Room Option', booking.optionName || booking.roomOption || booking.roomName || 'N/A'],
      ['Email', booking.email],
      ['Phone', booking.phone],
      ['Check-in', booking.checkIn],
      ['Check-out', booking.checkOut || booking.checkIn],
      ['Guests', `${booking.adults || 0} Adult(s), ${booking.children || 0} Child(ren)`],
      ['Amount Paid', `₹${booking.amount}`],
      ['Payment ID', booking.paymentId || booking._id || 'N/A'],
    ],
    theme: 'striped',
    styles: {
      fontSize: 11,
      textColor: [55, 65, 81], // slate-700
    },
    headStyles: {
      fillColor: [31, 41, 55], // slate-800
      textColor: 255,
      halign: 'left',
    },
    alternateRowStyles: {
      fillColor: [243, 244, 246], // gray-100
    },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 120 },
    },
  });

  // ===== Footer Note =====
  const footerY = doc.lastAutoTable.finalY + 15;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('✅ Thank you for booking with Gouri Inn. We look forward to your stay!', 14, footerY);

  return Buffer.from(doc.output('arraybuffer'));
};


// // utils/generateInvoiceBuffer.js
// import { jsPDF } from 'jspdf'; // ✅ fixed import
// import autoTable from 'jspdf-autotable';

// export const generateInvoiceBuffer = (booking) => {
//   const doc = new jsPDF();

//   doc.setFontSize(18);
//   doc.text('🏨 Booking Invoice', 14, 20);

//   autoTable(doc, {
//     startY: 30,
//     head: [['Field', 'Details']],
//     body: [
//       ['Booking Type', booking.type],
//       ['Room Option', booking.optionName || booking.roomOption || booking.roomName || 'N/A'],
//       ['Email', booking.email],
//       ['Phone', booking.phone],
//       ['Check-in', booking.checkIn],
//       ['Check-out', booking.checkOut],
//       ['Guests', `${booking.adults || 0} Adult(s), ${booking.children || 0} Child(ren)`],
//       ['Amount Paid', `₹${booking.amount}`],
//       ['Payment ID', booking.paymentId || 'N/A'],
//     ],
//   });

//   doc.setFontSize(12);
//   doc.text('✅ Thank you for booking with us.', 14, doc.lastAutoTable.finalY + 15);

//   return Buffer.from(doc.output('arraybuffer')); // still correct for backend Node.js
// };
