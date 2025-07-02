const otpStore = new Map();
const nodemailer = require('nodemailer');

exports.sendOtp = async (req, res) => {
  const { email, phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, otp);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Hotel Booking" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP for Booking Verification',
      html: `<p>Your OTP is <b>${otp}</b>. Do not share this with anyone.</p>`
    });

    console.log(`✅ OTP ${otp} sent to ${email}`);
    res.json({ success: true });

  } catch (err) {
    console.error('❌ Nodemailer send error:', err);  // <-- this line is important
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const stored = otpStore.get(email);
  if (stored === otp) {
    otpStore.delete(email);
    return res.json({ success: true });
  }
  return res.status(400).json({ success: false });
};
