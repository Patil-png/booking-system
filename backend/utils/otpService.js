// utils/otpService.js
import nodemailer from 'nodemailer';

const otpStore = new Map();

export const sendOTP = async (email, phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, otp);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`
  });

  console.log(`✅ OTP ${otp} sent to ${email}`);
};

export const verifyOTP = (email, enteredOtp) => {
  const storedOtp = otpStore.get(email);
  const isMatch = storedOtp === enteredOtp;
  if (isMatch) otpStore.delete(email); // Remove used OTP
  return isMatch;
};
