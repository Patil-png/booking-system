import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import { sendOtpEmail } from '../utils/otpService.js';

// Store temporary tokens (in production, use Redis)
const tempTokens = new Map();

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Generate temporary token for OTP verification
    const tempToken = jwt.sign(
      { id: admin._id, email: admin.email, otp },
      process.env.JWT_SECRET,
      { expiresIn: "5m" } // 5 minutes expiry
    );

    // Store OTP temporarily
    tempTokens.set(tempToken, {
      otp,
      adminId: admin._id,
      email: admin.email,
      createdAt: Date.now()
    });

    // Send OTP via email
    try {
      await sendOtpEmail(admin.email, otp);
      res.status(200).json({ 
        message: "OTP sent to your email",
        tempToken 
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      res.status(500).json({ message: "Failed to send OTP email" });
    }

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { tempToken, otp } = req.body;

  try {
    // Verify temp token
    const decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
    const storedData = tempTokens.get(tempToken);

    if (!storedData) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Check if OTP matches
    if (storedData.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if token is expired (5 minutes)
    if (Date.now() - storedData.createdAt > 5 * 60 * 1000) {
      tempTokens.delete(tempToken);
      return res.status(400).json({ message: "OTP expired" });
    }

    // Get admin details
    const admin = await Admin.findById(storedData.adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Generate final JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Clean up temp token
    tempTokens.delete(tempToken);

    res.status(200).json({ 
      message: "Two-factor authentication successful",
      token 
    });

  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: "Invalid token" });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(400).json({ message: "Token expired" });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const resendOtp = async (req, res) => {
  const { tempToken } = req.body;

  try {
    // Verify temp token
    const decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
    const storedData = tempTokens.get(tempToken);

    if (!storedData) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Check if token is expired
    if (Date.now() - storedData.createdAt > 5 * 60 * 1000) {
      tempTokens.delete(tempToken);
      return res.status(400).json({ message: "Token expired" });
    }

    // Generate new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Update stored data
    storedData.otp = newOtp;
    storedData.createdAt = Date.now();
    tempTokens.set(tempToken, storedData);

    // Send new OTP via email
    try {
      await sendOtpEmail(storedData.email, newOtp);
      res.status(200).json({ message: "New OTP sent to your email" });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      res.status(500).json({ message: "Failed to send OTP email" });
    }

  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: "Invalid token" });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(400).json({ message: "Token expired" });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Clean up expired tokens periodically (every 10 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [token, data] of tempTokens.entries()) {
    if (now - data.createdAt > 5 * 60 * 1000) {
      tempTokens.delete(token);
    }
  }
}, 10 * 60 * 1000);