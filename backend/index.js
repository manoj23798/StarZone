require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// API Routes
const authRoutes = require('./src/routes/authRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');
const galleryRoutes = require('./src/routes/galleryRoutes');
const slotRoutes = require('./src/routes/slotRoutes');
const analyticsRoutes = require('./src/routes/analyticsRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/api/health-check', (req, res) => {
    res.json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        version: '1.0.1',
        endpoints: ['auth', 'services', 'gallery', 'slots', 'analytics']
    });
});


// Global Error Handler
app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err.stack);
    res.status(500).json({ message: err.message || 'Internal Server Error' });
});

// DB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/starzone';
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Basic Route
app.get('/', (req, res) => {
    res.send('Star Zone Salon API is Running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
