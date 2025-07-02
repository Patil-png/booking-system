// 📁 server.js
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

// ESM path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Init app
const app = express();

// ------------------ MIDDLEWARE ------------------

// ✅ Helmet for security
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://checkout.razorpay.com",
          "https://www.google.com",
          "https://www.gstatic.com",
        ],
        frameSrc: [
          "'self'",
          "https://checkout.razorpay.com",
          "https://www.google.com",
          "https://www.gstatic.com",
        ],
        connectSrc: ["'self'", "https://api.razorpay.com"],
        imgSrc: ["'self'", "data:", "https://www.google.com", "https://www.gstatic.com"],
      },
    },
  })
);

// ✅ CORS config for all Vercel preview and production frontend URLs
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.includes('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for origin: ' + origin));
    }
  },
  credentials: true,
}));

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files (e.g., images) from `/uploads`
app.use('/uploads', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  next();
}, express.static(path.join(__dirname, 'uploads')));

// ✅ Root route - health check
app.get('/', (req, res) => {
  res.send('✅ Backend server is running!');
});

// ------------------ ROUTES ------------------

app.use('/api/bookings', bookingRoutes);
app.use('/api/blocked-dates', blockedDateRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/options', optionRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api', contactRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/razorpay', paymentRoutes);

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
