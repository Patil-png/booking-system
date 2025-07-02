import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error('MONGO_URI is not defined. Please ensure your .env file is correctly set up and loaded in your main server file.');
    }

    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
    });
    console.log('✅ MongoDB connected successfully!');
  } catch (error) {
    // Log the detailed error message if connection fails
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Exit the Node.js process with a failure code
  }
};

export default connectDB;