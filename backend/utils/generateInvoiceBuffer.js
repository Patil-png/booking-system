// utils/generateInvoiceBuffer.js
import { jsPDF } from 'jspdf'; // ✅ fixed import
import autoTable from 'jspdf-autotable';

export const generateInvoiceBuffer = (booking) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('🏨 Booking Invoice', 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [['Field', 'Details']],
    body: [
      ['Booking Type', booking.type],
      ['Email', booking.email],
      ['Phone', booking.phone],
      ['Check-in', booking.checkIn],
      ['Check-out', booking.checkOut],
      ['Guests', `${booking.adults || 0} Adult(s), ${booking.children || 0} Child(ren)`],
      ['Amount Paid', `₹${booking.amount}`],
      ['Payment ID', booking.paymentId || 'N/A'],
    ],
  });

  doc.setFontSize(12);
  doc.text('✅ Thank you for booking with us.', 14, doc.lastAutoTable.finalY + 15);

  return Buffer.from(doc.output('arraybuffer')); // still correct for backend Node.js
};
