// 📁 backend/utils/sendEmail.js

const nodemailer = require('nodemailer');

exports.sendInvoiceEmail = async (booking) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailBody = `
    <h2>Booking Confirmation</h2>
    <p>Your booking for a <strong>${booking.type}</strong> has been confirmed.</p>
    <ul>
        <li><strong>Booking ID:</strong> ${booking._id}</li>
        <li><strong>Booking Type:</strong> ${booking.type}</li>
        <li><strong>Amount Paid:</strong> ₹${booking.amount}</li>
        <li><strong>Check-in:</strong> ${booking.checkIn}</li>
        <li><strong>Check-out:</strong> ${booking.checkOut}</li>
    </ul>
    <p>Thank you for choosing us!</p>
  `;

  await transporter.sendMail({
    from: `"Hotel Booking" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: 'Booking Confirmed ✔',
    html: mailBody,
  });

  console.log(`✅ Invoice sent to ${booking.email}`);
};
