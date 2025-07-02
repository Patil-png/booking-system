// utils/sendEmail.js
import nodemailer from 'nodemailer';

export const sendInvoiceEmail = async (booking) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const htmlContent = `
    <h2>Booking Invoice</h2>
    <p><strong>Booking Type:</strong> ${booking.type}</p>
    <p><strong>Check-in:</strong> ${booking.checkIn}</p>
    <p><strong>Check-out:</strong> ${booking.checkOut}</p>
    <p><strong>Phone:</strong> ${booking.phone}</p>
    <p><strong>Email:</strong> ${booking.email}</p>
    <p><strong>Amount:</strong> ₹${booking.amount}</p>
    <p><strong>Payment ID:</strong> ${booking.paymentId || 'N/A'}</p>
    <p>Thank you for booking with us!</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: booking.email,
    subject: 'Booking Invoice',
    html: htmlContent
  });

  console.log(`📩 Invoice email sent to ${booking.email}`);
};
