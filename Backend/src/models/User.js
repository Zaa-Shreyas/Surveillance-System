const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  subscription: {
    plan: {
      type: String,
      enum: ['Free', 'Premium'],
      default: 'Free',
    },
    startDate: {
      type: Date,
      default: null,
    },
    expiryDate: {
      type: Date,
      default: null,
    },
  },
});

module.exports = mongoose.model('User', UserSchema);