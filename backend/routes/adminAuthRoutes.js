// 📁 routes/adminAuthRoutes.js
import express from 'express';
import { loginAdmin, verifyOtp, resendOtp } from '../controllers/adminController.js';
import { getAllContacts } from '../controllers/contactController.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();

// ✅ ADMIN LOGIN WITH 2FA
router.post('/login', loginAdmin);

// ✅ VERIFY OTP FOR 2FA
router.post('/verify-otp', verifyOtp);

// ✅ RESEND OTP
router.post('/resend-otp', resendOtp);

// ✅ PROTECTED: GET ALL CONTACTS
router.get('/contacts', verifyAdmin, getAllContacts);

export default router;
