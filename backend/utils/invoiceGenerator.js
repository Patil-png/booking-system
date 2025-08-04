import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateInvoice = ({ bookingType, formData, price, paymentId }) => {
  const doc = new jsPDF();
  const today = new Date();

  const stayDays =
    formData.checkIn && formData.checkOut
      ? Math.max(
          1,
          Math.ceil(
            (new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24)
          )
        )
      : 1;

  const unitPrice = price / stayDays;

  // Header Section
  doc.setFontSize(16);
  doc.setTextColor(0);
  doc.text('Booking Invoice', 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text(`Date: ${today.toLocaleDateString()} ${today.toLocaleTimeString()}`, 14, 27);
  doc.line(14, 29, 200, 29); // horizontal line

  // Booking Summary Table
  autoTable(doc, {
    startY: 35,
    theme: 'grid',
    head: [['Description', 'Details']],
    headStyles: {
      fillColor: [220, 220, 220],
      textColor: 0,
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 11,
      textColor: [33, 33, 33],
      cellPadding: 4,
    },
    columnStyles: {
      0: { cellWidth: 60, fontStyle: 'bold' },
      1: { cellWidth: 120 },
    },
    body: [
      ['Booking Type', bookingType || 'N/A'],
      ['Customer Name', formData.name || formData.email || 'N/A'],
      ['Email', formData.email || 'N/A'],
      ['Phone', formData.phone || 'N/A'],
      ['Check-in', formData.checkIn || 'N/A'],
      ['Check-out', formData.checkOut || 'N/A'],
      ['Total Stay (Days)', stayDays],
      ['Room / Slot', formData.roomId || formData.slot || 'N/A'],
      ['Adults', formData.adults || '0'],
      ['Children', formData.children || '0'],
      ['Rate per Day', `₹${unitPrice.toFixed(2)}`],
      ['Total Paid', `₹${price}`],
      ['Payment ID', paymentId || 'N/A'],
    ],
  });

  // Footer Note
  const footerY = doc.lastAutoTable.finalY + 15;
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text('Thank you for choosing our service.', 14, footerY);
  doc.text('For queries, please contact our support team.', 14, footerY + 6);

  return doc.output('blob');
};


// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// export const generateInvoice = ({ bookingType, formData, price, paymentId }) => {
//   const doc = new jsPDF();

//   const today = new Date();
//   const stayDays =
//     formData.checkIn && formData.checkOut
//       ? Math.max(
//           1,
//           Math.ceil(
//             (new Date(formData.checkOut) - new Date(formData.checkIn)) /
//               (1000 * 60 * 60 * 24)
//           )
//         )
//       : 1;

//   const unitPrice = price / stayDays;

//   // Header
//   doc.setFontSize(20);
//   doc.setTextColor(0, 51, 102);
//   doc.text('📄 Booking Invoice', 14, 20);

//   doc.setFontSize(10);
//   doc.setTextColor(100);
//   doc.text(`Generated on: ${today.toLocaleString()}`, 14, 26);

//   // Booking Summary Title
//   doc.setFontSize(14);
//   doc.setTextColor(33, 33, 33);
//   doc.text('🛏️ Booking Summary', 14, 36);

//   // Booking Table
//   autoTable(doc, {
//     startY: 40,
//     head: [['Field', 'Details']],
//     theme: 'striped',
//     headStyles: {
//       fillColor: [30, 58, 138],
//       textColor: 255,
//       fontStyle: 'bold',
//     },
//     styles: {
//       fontSize: 11,
//       textColor: [40, 40, 40],
//       cellPadding: 4,
//     },
//     columnStyles: {
//       0: { fontStyle: 'bold', cellWidth: 50 },
//       1: { cellWidth: 130 },
//     },
//     body: [
//       ['Booking Type', bookingType],
//       ['Name', formData.name || formData.email],
//       ['Email', formData.email],
//       ['Phone', formData.phone || 'N/A'],
//       ['Check-in', formData.checkIn],
//       ['Check-out', formData.checkOut],
//       ['Total Days', stayDays],
//       ['Room / Slot', formData.roomId || formData.slot || 'N/A'],
//       ['Adults', formData.adults || '0'],
//       ['Children', formData.children || '0'],
//       ['Rate per Day', `₹${unitPrice.toFixed(2)}`],
//       ['Total Amount Paid', `₹${price}`],
//       ['Payment ID', paymentId],
//     ],
//   });

//   // Footer Note
//   const footerY = doc.lastAutoTable.finalY + 15;
//   doc.setFontSize(11);
//   doc.setTextColor(60);
//   doc.text('✅ Thank you for booking with us!', 14, footerY);
//   doc.setFontSize(10);
//   doc.setTextColor(100);
//   doc.text(
//     'This is a system-generated invoice. For queries, contact our team.',
//     14,
//     footerY + 6
//   );

//   return doc.output('blob');
// };

