// 📁 routes/adminRoutes.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { getAllContacts } from '../controllers/contactController.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();

// ✅ ADMIN LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: '2d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (err) {
    console.error('Login failed:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// ✅ ADMIN REGISTRATION
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
      isAdmin: true,
    });

    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error('Admin registration failed:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// ✅ PROTECTED: GET ALL CONTACTS
router.get('/contacts', verifyAdmin, getAllContacts);

// 🔍 DEBUG ROUTE TO VERIFY TOKEN (DEV ONLY)
router.get('/debug-token', (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json(decoded);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;
