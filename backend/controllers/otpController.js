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
      html: `<div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f6f8fa; padding: 32px;">
        <div style="max-width: 420px; margin: 0 auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); overflow: hidden;">
          <div style="background: linear-gradient(90deg, #10b981 0%, #2563eb 100%); padding: 20px 28px; text-align: center;">
            <img src='https://i.imgur.com/8Km9tLL.png' alt='Gouri Inn Logo' style='width: 44px; height: 44px; border-radius: 10px; margin-bottom: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);' />
            <h2 style="color: #fff; margin: 0; font-size: 1.5rem; letter-spacing: 1px;">Gouri Inn OTP</h2>
          </div>
          <div style="padding: 24px; text-align: center;">
            <p style="font-size: 1.1rem; color: #222; margin-bottom: 16px;">Your OTP for booking verification is:</p>
            <div style="font-size: 2.2rem; font-weight: bold; color: #10b981; letter-spacing: 4px; margin-bottom: 16px;">${otp}</div>
            <p style="color: #666; font-size: 1rem;">Do not share this code with anyone.<br/>It is valid for 5 minutes.</p>
          </div>
        </div>
      </div>`
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
