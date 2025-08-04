import nodemailer from 'nodemailer';
import { generateInvoiceBuffer } from './generateInvoiceBuffer.js'; // PDF generator

export const sendInvoiceEmail = async (booking) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f6f8fa; padding: 32px;">
        <div style="max-width: 520px; margin: 0 auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); overflow: hidden;">
          <div style="background: linear-gradient(90deg, #10b981 0%, #2563eb 100%); padding: 24px 32px; text-align: center;">
            <img src='https://i.imgur.com/8Km9tLL.png' alt='Gouri Inn Logo' style='width: 56px; height: 56px; border-radius: 12px; margin-bottom: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);' />
            <h1 style="color: #fff; margin: 0; font-size: 2rem; letter-spacing: 1px;">🏨 Gouri Inn</h1>
            <p style="color: #e0f2fe; margin: 8px 0 0; font-size: 1.1rem;">Booking Invoice</p>
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
                <tr><td style="padding: 8px 0; color: #555;">Amount:</td><td style="padding: 8px 0; color: #059669; font-weight: 600;">₹${booking.amount}</td></tr>
                <tr><td style="padding: 8px 0; color: #555;">Payment ID:</td><td style="padding: 8px 0; color: #222;">${booking.paymentId || 'N/A'}</td></tr>
              </tbody>
            </table>
            <div style="margin-bottom: 24px;">
              <span style="display: inline-block; background: #10b981; color: #fff; padding: 8px 20px; border-radius: 8px; font-weight: 600; font-size: 1rem;">Thank you for booking with us!</span>
            </div>
            <div style="color: #888; font-size: 0.95rem; text-align: center;">
              <p style="margin: 0;">Gouri Inn, Your Comfort is Our Priority</p>
              <p style="margin: 0;">Contact: +91 8799866811 | Email: gouriinn@example.com</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Generate the PDF invoice buffer
    const invoicePdfBuffer = await generateInvoiceBuffer(booking);

    // Send the email
    await transporter.sendMail({
      from: `"Gouri Inn Amravati" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: 'Your Booking Invoice - Gouri Inn',
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
  } catch (error) {
    console.error('❌ Failed to send invoice email:', error);
    throw new Error('Could not send invoice email');
  }
};


// import nodemailer from 'nodemailer';
// import { generateInvoiceBuffer } from './generateInvoiceBuffer.js'; // 🔁 Import PDF generator

// export const sendInvoiceEmail = async (booking) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const htmlContent = `
//     <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f6f8fa; padding: 32px;">
//       <div style="max-width: 520px; margin: 0 auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); overflow: hidden;">
//         <div style="background: linear-gradient(90deg, #10b981 0%, #2563eb 100%); padding: 24px 32px; text-align: center;">
//           <img src='https://i.imgur.com/8Km9tLL.png' alt='Gouri Inn Logo' style='width: 56px; height: 56px; border-radius: 12px; margin-bottom: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);' />
//           <h1 style="color: #fff; margin: 0; font-size: 2rem; letter-spacing: 1px;">🏨 Gouri Inn</h1>
//           <p style="color: #e0f2fe; margin: 8px 0 0; font-size: 1.1rem;">Booking Invoice</p>
//         </div>
//         <div style="padding: 32px;">
//           <h2 style="color: #2563eb; margin-bottom: 16px; font-size: 1.3rem;">Booking Details</h2>
//           <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
//             <tbody>
//               <tr><td style="padding: 8px 0; color: #555;">Booking Type:</td><td style="padding: 8px 0; color: #222; font-weight: 500;">${booking.type}</td></tr>
//               <tr><td style="padding: 8px 0; color: #555;">Room Option:</td><td style="padding: 8px 0; color: #222;">${booking.optionName || booking.roomOption || booking.roomName || 'N/A'}</td></tr>
//               <tr><td style="padding: 8px 0; color: #555;">Check-in:</td><td style="padding: 8px 0; color: #222;">${booking.checkIn}</td></tr>
//               <tr><td style="padding: 8px 0; color: #555;">Check-out:</td><td style="padding: 8px 0; color: #222;">${booking.checkOut}</td></tr>
//               <tr><td style="padding: 8px 0; color: #555;">Guests:</td><td style="padding: 8px 0; color: #222;">${booking.adults || 0} Adult(s), ${booking.children || 0} Child(ren)</td></tr>
//               <tr><td style="padding: 8px 0; color: #555;">Phone:</td><td style="padding: 8px 0; color: #222;">${booking.phone}</td></tr>
//               <tr><td style="padding: 8px 0; color: #555;">Email:</td><td style="padding: 8px 0; color: #222;">${booking.email}</td></tr>
//               <tr><td style="padding: 8px 0; color: #555;">Amount:</td><td style="padding: 8px 0; color: #059669; font-weight: 600;">₹${booking.amount}</td></tr>
//               <tr><td style="padding: 8px 0; color: #555;">Payment ID:</td><td style="padding: 8px 0; color: #222;">${booking.paymentId || 'N/A'}</td></tr>
//             </tbody>
//           </table>
//           <div style="margin-bottom: 24px;">
//             <span style="display: inline-block; background: #10b981; color: #fff; padding: 8px 20px; border-radius: 8px; font-weight: 600; font-size: 1rem;">Thank you for booking with us!</span>
//           </div>
//           <div style="color: #888; font-size: 0.95rem; text-align: center;">
//             <p style="margin: 0;">Gouri Inn, Your Comfort is Our Priority</p>
//             <p style="margin: 0;">Contact: +91 8799866811 | Email: gouriinn@example.com</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   `;

//   // ✅ Generate the PDF invoice
//   const invoicePdfBuffer = generateInvoiceBuffer(booking); // or `await` if needed

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: booking.email,
//     subject: 'Your Booking Invoice',
//     html: htmlContent,
//     attachments: [
//       {
//         filename: `Invoice_${booking.paymentId || 'booking'}.pdf`,
//         content: invoicePdfBuffer,
//         contentType: 'application/pdf',
//       },
//     ],
//   });

//   console.log(`📩 Invoice email sent to ${booking.email}`);
// };
