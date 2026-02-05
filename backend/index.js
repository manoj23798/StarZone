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

// API Routes
const apiRouter = express.Router();

// Health check
apiRouter.get('/health', (req, res) => res.json({ status: 'ok' }));

// Other Routes
apiRouter.use('/services', require('./src/routes/serviceRoutes'));
apiRouter.use('/gallery', require('./src/routes/galleryRoutes'));
apiRouter.use('/auth', require('./src/routes/authRoutes'));

app.use('/api', apiRouter);

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
