const express = require('express');
const router = express.Router();
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const Video = require('../models/video');
const authenticateToken = require('../middleware/authenticateToken');

// Ensure the recordings directory exists
const recordingsDir = path.join(__dirname, '../../recordings');
if (!fs.existsSync(recordingsDir)) {
  fs.mkdirSync(recordingsDir, { recursive: true });
}

// Record a video from a device stream
router.post('/record/:deviceId', authenticateToken, async (req, res) => {
  try {
    const { duration = 10 } = req.body; // Default to 10 seconds
    const device = await Device.findOne({ _id: req.params.deviceId, userId: req.user.id });
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    const fileName = `recording-${req.user.id}-${req.params.deviceId}-${Date.now()}.mp4`;
    const filePath = path.join(recordingsDir, fileName);

    // Use the proxy URL to access the stream
    const streamUrl = `http://localhost:5000/api/stream`; // Assuming proxy is set up

    ffmpeg(streamUrl)
      .inputOptions('-re') // Read input at native frame rate
      .outputOptions([
        '-t', duration, // Duration of the recording
        '-c:v', 'libx264', // Video codec
        '-c:a', 'aac', // Audio codec
        '-f', 'mp4', // Output format
      ])
      .save(filePath)
      .on('start', () => {
        console.log(`Started recording for device ${req.params.deviceId} to ${filePath}`);
      })
      .on('end', async () => {
        console.log(`Finished recording for device ${req.params.deviceId}`);
        const video = new Video({
          userId: req.user.id,
          deviceId: req.params.deviceId,
          filePath: `/recordings/${fileName}`, // Relative path for serving
        });
        await video.save();
        res.status(200).json({ message: 'Recording saved', video });
      })
      .on('error', (err) => {
        console.error('Recording error:', err);
        res.status(500).json({ message: 'Failed to record video' });
      });
  } catch (err) {
    console.error('Error recording video:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all videos for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const videos = await Video.find({ userId: req.user.id }).populate('deviceId', 'name');
    res.status(200).json(videos);
  } catch (err) {
    console.error('Error fetching videos:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;