// routes/otpRoutes.js
import express from 'express';
import { sendOtp, verifyOtp } from '../utils/otpService.js';

const router = express.Router();

router.post('/send', async (req, res) => {
  const { email, phone } = req.body;
  try {
    await sendOtp(email, phone);
    res.status(200).json({ message: 'OTP sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

router.post('/verify', async (req, res) => {
  const { email, otp } = req.body;
  const valid = await verifyOtp(email, otp);
  res.status(200).json({ success: valid });
});

export default router;
