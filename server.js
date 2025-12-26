
const express = require('express');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet({ contentSecurityPolicy: false })); // Disable CSP for easier frontend integration
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dbohmpxko',
  api_key: process.env.CLOUDINARY_API_KEY || '829126349486959',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'WX3TeoeR9rnpHmxPt3qADRAglwo'
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Jagadeesh:P1198@cluster0.zfagv3c.mongodb.net/?appName=Cluster0';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Bhamini-P1198: MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- API Endpoints ---

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'active', system: 'Bhamini-P1198', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// User Registration (Example)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // In a real app, you'd save to a User model here
    res.status(201).json({ message: 'User created successfully', user: { username, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Image Upload to Cloudinary and URL to MongoDB
app.post('/api/images/upload', async (req, res) => {
  try {
    const { image, fileName } = req.body;
    
    // 1. Upload to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(image, {
      folder: 'bhamini_p1198_assets',
      public_id: fileName
    });

    // 2. Return URL to save in MongoDB
    res.json({
      success: true,
      url: uploadRes.secure_url,
      publicId: uploadRes.public_id,
      format: uploadRes.format
    });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Serve the dashboard (Frontend)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static assets
app.use(express.static(path.join(__dirname, '.')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Bhamini-P1198 Server running on http://localhost:${PORT}`);
});
