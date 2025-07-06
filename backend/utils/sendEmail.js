import nodemailer from 'nodemailer';
import { generateInvoiceBuffer } from './generateInvoiceBuffer.js'; // 🔁 Import PDF generator

export const sendInvoiceEmail = async (booking) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = `
    <h2>Booking Invoice</h2>
    <p><strong>Booking Type:</strong> ${booking.type}</p>
    <p><strong>Check-in:</strong> ${booking.checkIn}</p>
    <p><strong>Check-out:</strong> ${booking.checkOut}</p>
    <p><strong>Guests:</strong> ${booking.adults || 0} Adult(s), ${booking.children || 0} Child(ren)</p>
    <p><strong>Phone:</strong> ${booking.phone}</p>
    <p><strong>Email:</strong> ${booking.email}</p>
    <p><strong>Amount:</strong> ₹${booking.amount}</p>
    <p><strong>Payment ID:</strong> ${booking.paymentId || 'N/A'}</p>
    <p>Thank you for booking with us!</p>
  `;

  // ✅ Generate the PDF invoice
  const invoicePdfBuffer = generateInvoiceBuffer(booking); // or `await` if needed

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: booking.email,
    subject: 'Your Booking Invoice',
    html: htmlContent,
    attachments: [
      {
        filename: `Invoice_${booking.paymentId || 'booking'}.pdf`,
        content: invoicePdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  });

  console.log(`📩 Invoice email sent to ${booking.email}`);
};

