// routes/otpRoutes.js
import express from 'express';
import { sendOTP, verifyOTP } from '../utils/otpService.js';

const router = express.Router();

router.post('/send', async (req, res) => {
  const { email, phone } = req.body;
  try {
    await sendOTP(email, phone);
    res.status(200).json({ message: 'OTP sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

router.post('/verify', (req, res) => {
  const { email, otp } = req.body;
  const valid = verifyOTP(email, otp);
  res.status(200).json({ success: valid });
});

export default router;
