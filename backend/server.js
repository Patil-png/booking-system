// 📁 server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import roomTypeRoutes from './routes/roomTypeRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import blockedDateRoutes from './routes/blockedDateRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import optionRoutes from './routes/optionRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

// Load env variables
dotenv.config();

// ESM path fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Init app
const app = express();

// ✅ Helmet for security
app.use(
  helmet({
    contentSecurityPolicy: false, // Needed for Razorpay, Google Maps etc.
  })
);

// ✅ CORS setup for Vercel frontend
const allowedOrigins = [
  'https://www.gouriinn.com',
  'https://gouriinn.com',
  'https://booking-system-cn1y.onrender.com',
  /^https:\/\/booking-system-frontend(-[a-zA-Z0-9]+)?\.vercel\.app$/
];

app.use(cors({
  origin: (origin, callback) => {
    console.log('Incoming origin:', origin); // Log the incoming origin
    const isAllowed = !origin || allowedOrigins.some(o => {
      if (typeof o === 'string') {
        return o === origin;
      } else if (o instanceof RegExp) {
        return o.test(origin);
      }
      return false;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from origin: ' + origin));
    }
  },
  credentials: true,
}));

// ✅ Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static uploads
app.use(
  '/uploads',
  (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Explicitly allow all origins for static files
    next();
  },
  express.static(path.join(__dirname, 'uploads'))
);

// ✅ Health check (homepage)
app.get('/', (req, res) => {
  res.send('✅ Backend server is running!');
});

// ✅ Ping route for UptimeRobot
app.get('/api/ping', (req, res) => {
  res.status(200).json({ message: 'Backend is alive!' });
});

// ✅ Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/blocked-dates', blockedDateRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/options', optionRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api', contactRoutes);
app.use('/api/gallery-images', galleryRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/razorpay', paymentRoutes);
app.use('/api/room-types', roomTypeRoutes);

// ✅ MongoDB connection + Start server
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotel')
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
