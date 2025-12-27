
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const connectDB = require('./config/db');

// Initialize Express
const app = express();

// 1. Parse JSON payloads first (Limit: 50mb for Base64 Images)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 2. Security & Cross-Origin
app.use(helmet());
app.use(cors());

// Connect to MongoDB Cluster0
connectDB();

// 3. Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/images', require('./routes/images'));

// Health Check for Render
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', project: 'Bhamini-P1198' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
