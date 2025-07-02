// 📁 server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// 📦 Route Imports
import bookingRoutes from './routes/bookingRoutes.js';
import blockedDateRoutes from './routes/blockedDateRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import optionRoutes from './routes/optionRoutes.js';
import razorpayRoutes from './routes/razorpayRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';

// 🌍 Setup
dotenv.config();
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// 🔐 Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Health check root route for Render
app.get('/', (req, res) => {
  res.send('✅ Backend server is running!');
});

// 🔗 Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/blocked-dates', blockedDateRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/options', optionRoutes);
app.use('/api/razorpay', razorpayRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/gallery-images', galleryRoutes);

// 🛠 Static Files for Production (if frontend is deployed together)
const frontendPath = path.resolve(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontendPath, 'index.html'));
});

// 🛢 MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hotel';
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
