// 📁 backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import bookingRoutes from './routes/bookingRoutes.js';
import blockedDateRoutes from './routes/blockedDateRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import optionRoutes from './routes/optionRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

// Load environment variables
dotenv.config();

// ESM __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app
const app = express();

// ------------------ MIDDLEWARE ------------------

// ✅ Security: Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP to avoid blocking Razorpay or Google Maps etc.
  })
);

// ✅ CORS setup for specific frontend domains
const allowedOrigins = [
  'https://booking-system-frontend.vercel.app',
  'https://booking-system-frontend-2t220sbxe-thansens-projects-3a3bb88f.vercel.app',
  'https://booking-system-frontend-9lmkjrpsp-thansens-projects-3a3bb88f.vercel.app',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('❌ CORS not allowed from origin: ' + origin));
      }
    },
    credentials: true,
  })
);

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files from /uploads (used by Gallery, Lawn images etc.)
app.use(
  '/uploads',
  (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    next();
  },
  express.static(path.join(__dirname, 'uploads'))
);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('✅ Backend server is running!');
});

// ------------------ ROUTES ------------------
app.use('/api/bookings', bookingRoutes);
app.use('/api/blocked-dates', blockedDateRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/options', optionRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api', contactRoutes); // Contact form submission
app.use('/api/gallery', galleryRoutes); // Image uploads/view
app.use('/api/admin', adminAuthRoutes); // Admin login, etc.
app.use('/api/razorpay', paymentRoutes); // Payments

// ------------------ DATABASE & SERVER ------------------
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotel', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
