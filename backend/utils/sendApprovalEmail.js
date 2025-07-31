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

  // ✅ Fixed: Use process.env instead of import.meta.env for backend
  const frontendBaseUrl = process.env.FRONTEND_BASE_URL || process.env.VITE_API_BASE_URL || 'http://localhost:5173';
  const bookingLink = `${frontendBaseUrl}/room-booking?bookingId=${booking._id}`;

  const mailOptions = {
    from: `"Hotel Admin" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: 'Booking Approved - Complete Your Payment',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f6f8fa; padding: 32px;">
        <div style="max-width: 520px; margin: 0 auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); overflow: hidden;">
          <div style="background: linear-gradient(90deg, #10b981 0%, #2563eb 100%); padding: 24px 32px; text-align: center;">
            <img src='https://i.imgur.com/8Km9tLL.png' alt='Gouri Inn Logo' style='width: 56px; height: 56px; border-radius: 12px; margin-bottom: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);' />
            <h1 style="color: #fff; margin: 0; font-size: 2rem; letter-spacing: 1px;">🏨 Gouri Inn</h1>
            <p style="color: #e0f2fe; margin: 8px 0 0; font-size: 1.1rem;">Booking Approved</p>
          </div>
          <div style="padding: 32px;">
            <h2 style="color: #2563eb; margin-bottom: 16px; font-size: 1.3rem;">Booking Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tbody>
                <tr><td style="padding: 8px 0; color: #555;">Booking Type:</td><td style="padding: 8px 0; color: #222; font-weight: 500;">${booking.type}</td></tr>
                <tr><td style="padding: 8px 0; color: #555;">Room Option:</td><td style="padding: 8px 0; color: #222;">${booking.optionName || booking.roomOption || booking.roomName || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; color: #555;">Check-in:</td><td style="padding: 8px 0; color: #222;">${booking.checkIn}</td></tr>
                <tr><td style="padding: 8px 0; color: #555;">Check-out:</td><td style="padding: 8px 0; color: #222;">${booking.checkOut}</td></tr>
                <tr><td style="padding: 8px 0; color: #555;">Guests:</td><td style="padding: 8px 0; color: #222;">${booking.adults || 0} Adult(s), ${booking.children || 0} Child(ren)</td></tr>
                <tr><td style="padding: 8px 0; color: #555;">Phone:</td><td style="padding: 8px 0; color: #222;">${booking.phone}</td></tr>
                <tr><td style="padding: 8px 0; color: #555;">Email:</td><td style="padding: 8px 0; color: #222;">${booking.email}</td></tr>
              </tbody>
            </table>
            <div style="margin-bottom: 24px; text-align: center;">
              <a href="${bookingLink}" style="display:inline-block;padding:12px 32px;background:linear-gradient(90deg,#10b981 0%,#2563eb 100%);color:#fff;border-radius:8px;font-weight:600;font-size:1.1rem;text-decoration:none;box-shadow:0 2px 8px rgba(16,185,129,0.12);">Proceed to Payment</a>
            </div>
            <div style="color: #888; font-size: 0.95rem; text-align: center;">
              <p style="margin: 0;">Gouri Inn, Your Comfort is Our Priority</p>
              <p style="margin: 0;">Contact: +91 8799866811 | Email: gouriinn@example.com</p>
            </div>
          </div>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Approval email sent:', info.response);
  } catch (err) {
    console.error('❌ Failed to send approval email:', err);
  }
};
