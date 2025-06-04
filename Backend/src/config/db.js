const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    console.log('MONGODB_URI in db.js:', uri);
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in db.js');
    }
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;