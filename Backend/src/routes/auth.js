const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({ email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ token });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const payload = { user: { id: user.id } };
    console.log('Current server time (UTC):', new Date().toISOString()); // Add this log
    console.log('Current server time (IST):', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile
router.get('/profile', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    User.findById(decoded.user.id).select('-password').then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    });
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
});

// Update subscription
router.post('/subscribe', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Received token:', token); // Add this log
  const { plan } = req.body;
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  if (!plan || !['Free', 'Premium'].includes(plan)) {
    return res.status(400).json({ message: 'Invalid plan' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); 
    const startDate = new Date();
    const expiryDate = new Date(startDate);
    expiryDate.setMonth(startDate.getMonth() + 1);
    User.findByIdAndUpdate(
      decoded.user.id,
      {
        subscription: {
          plan,
          startDate,
          expiryDate,
        },
      },
      { new: true }
    )
      .select('-password')
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      });
  } catch (err) {
    console.error('Token verification error:', err); // Add this log
    res.status(401).json({ message: 'Token is not valid' });
  }
});

module.exports = router;