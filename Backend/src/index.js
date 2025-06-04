require('dotenv').config();
console.log('MONGODB_URI from env:', process.env.MONGODB_URI);
console.log('JWT_SECRET from env:', process.env.JWT_SECRET);
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path'); // Add this
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const deviceRoutes = require('./routes/devices');
const videoRoutes = require('./routes/videos'); // Add this

const app = express();

connectDB(process.env.MONGODB_URI);

// Proxy for video streams
app.use('/api/stream', createProxyMiddleware({
  target: 'http://192.168.x.x:8080', // Replace with your actual IP Webcam URL
  changeOrigin: true,
  pathRewrite: {
    '^/api/stream': '/video',
  },
  onError: (err, req, res) => {
    console.error('Stream proxy error:', err);
    res.status(500).json({ message: 'Stream unavailable' });
  },
}));

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());


app.use('/recordings', express.static(path.join(__dirname, '../recordings')));

app.use('/api/auth', authRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/videos', videoRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));