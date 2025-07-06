// 📁 utils/sendApprovalEmail.js
import nodemailer from 'nodemailer';

export const sendApprovalEmail = async (booking) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,   // ✅ sender email
      pass: process.env.EMAIL_PASS,   // ✅ sender password
    },
  });

  // ✅ Better to use VITE_BASE_URL or FRONTEND_URL if set, fallback to localhost
  const frontendBaseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const bookingLink = `${frontendBaseUrl}/room-booking?bookingId=${booking._id}`;

  const mailOptions = {
    from: `"Hotel Admin" <${process.env.EMAIL_USER}>`,  // ✅ match your transporter auth
    to: booking.email,
    subject: 'Booking Approved - Complete Your Payment',
    html: `
      <h2>Hello,</h2>
      <p>Your booking request for <strong>${booking.type}</strong> from <strong>${booking.checkIn}</strong> to <strong>${booking.checkOut}</strong> has been <span style="color:green;">approved</span> by our admin.</p>
      <p>Please complete your booking by clicking the link below and proceeding with payment:</p>
      <a href="${bookingLink}" style="display:inline-block;padding:10px 20px;background-color:#4CAF50;color:white;border-radius:5px;text-decoration:none;">Proceed to Payment</a>
      <p>If you have any questions, feel free to contact us.</p>
      <br />
      <p>Thank you!</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Approval email sent:', info.response);
  } catch (err) {
    console.error('❌ Failed to send approval email:', err);
  }
};
