const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
const authenticateToken = require('../middleware/authenticateToken');

// Add a new device
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, url, type, location } = req.body;
    if (!name || !url || !type || !location) {
      return res.status(400).json({ message: 'Name, URL, type, and location are required' });
    }

    const device = new Device({
      userId: req.user.id, // Set from JWT token
      name,
      url,
      type,
      location,
      status: req.body.status || 'Online', // Use provided status or default
    });

    await device.save();
    res.status(201).json(device);
  } catch (err) {
    console.error('Error adding device:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all devices for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const devices = await Device.find({ userId: req.user.id });
    res.status(200).json(devices);
  } catch (err) {
    console.error('Error fetching devices:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a device
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, url, type, location } = req.body;
    if (!name || !url || !type || !location) {
      return res.status(400).json({ message: 'Name, URL, type, and location are required' });
    }

    const device = await Device.findOne({ _id: req.params.id, userId: req.user.id });
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    device.name = name;
    device.url = url;
    device.type = type;
    device.location = location;
    await device.save();
    res.status(200).json(device);
  } catch (err) {
    console.error('Error updating device:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a device
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const device = await Device.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.status(200).json({ message: 'Device deleted successfully' });
  } catch (err) {
    console.error('Error deleting device:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;