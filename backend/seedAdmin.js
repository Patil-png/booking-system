// 📁 backend/seedAdmin.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await Admin.findOne({ email: 'admin@stayluxe.com' });
    if (existing) {
      console.log('⚠️ Admin already exists');
      return process.exit();
    }

    const newAdmin = new Admin({
      email: 'admin@stayluxe.com',
      password: 'Admin@123', // Will be hashed automatically
      isAdmin: true,
    });

    await newAdmin.save();
    console.log('✅ Admin user created successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

seedAdmin();
