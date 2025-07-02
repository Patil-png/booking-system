// 📁 server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// 🔗 Route Imports
import bookingRoutes from './routes/bookingRoutes.js';
import blockedDateRoutes from './routes/blockedDateRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import optionRoutes from './routes/optionRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import downloadRoutes from './routes/downloadRoutes.js';


// 🌍 Setup
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 🛡 Helmet for security + Razorpay support
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

// 🔐 CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// 🧠 Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🖼 Static upload serving
app.use(
  '/uploads',
  (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL || 'http://localhost:5173');
    next();
  },
  express.static(path.join(__dirname, 'uploads'))
);

// ✅ Health check root route for Render
app.get('/', (req, res) => {
  res.send('✅ Backend server is running!');
});

// 🌐 Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/blocked-dates', blockedDateRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/options', optionRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/gallery-images', galleryRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/razorpay', paymentRoutes);
app.use('/api/download', downloadRoutes);

// 🛠 Serve frontend in production (optional)
const frontendPath = path.resolve(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontendPath, 'index.html'));
});

// 🛢 MongoDB Connection and Start Server
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


// // 📁 server.js
// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import helmet from 'helmet';
// import path, { dirname } from 'path';
// import { fileURLToPath } from 'url';

// import bookingRoutes from './routes/bookingRoutes.js';
// import blockedDateRoutes from './routes/blockedDateRoutes.js';
// import notificationRoutes from './routes/notificationRoutes.js';
// import optionRoutes from './routes/optionRoutes.js';
// import otpRoutes from './routes/otpRoutes.js';
// import adminAuthRoutes from './routes/adminAuthRoutes.js';
// import contactRoutes from './routes/contactRoutes.js';
// import galleryRoutes from './routes/galleryRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js';

// // Load environment variables
// dotenv.config();

// // ESM path setup
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Init app
// const app = express();

// // ------------------ MIDDLEWARE ------------------

// // ✅ Helmet security headers (allows Razorpay, Google recaptcha, etc.)
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: [
//           "'self'",
//           "https://checkout.razorpay.com",
//           "https://www.google.com",
//           "https://www.gstatic.com",
//         ],
//         frameSrc: [
//           "'self'",
//           "https://checkout.razorpay.com",
//           "https://www.google.com",
//           "https://www.gstatic.com",
//         ],
//         connectSrc: ["'self'", "https://api.razorpay.com"],
//         imgSrc: ["'self'", "data:", "https://www.google.com", "https://www.gstatic.com"],
//       },
//     },
//   })
// );

// // ✅ CORS config for frontend (allow all needed methods + credentials)
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//   })
// );


// // ✅ Body parsers
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ Static image serving from `/uploads`
// app.use(
//   '/uploads',
//   (req, res, next) => {
//     res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//     next();
//   },
//   express.static(path.join(__dirname, 'uploads'))
// );

// // ------------------ ROUTES ------------------


// app.use('/api/bookings', bookingRoutes);
// app.use('/api/blocked-dates', blockedDateRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/options', optionRoutes);
// app.use('/api/otp', otpRoutes);
// app.use('/api', contactRoutes);
// app.use('/api/gallery-images', galleryRoutes);
// app.use('/api/admin', adminAuthRoutes);
// app.use('/api/razorpay', paymentRoutes);

// // ------------------ DATABASE & SERVER ------------------

// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotel')

//   .then(() => {
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running at http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('❌ MongoDB connection failed:', err);
//   });
