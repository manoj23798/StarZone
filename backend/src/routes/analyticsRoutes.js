const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Analytics = require('../models/Analytics');
const authMiddleware = require('../middleware/authMiddleware');

// Get all stats (Visits, Bookings, DB Stats)
router.get('/stats', async (req, res) => {
    try {
        // 1. Fetch our custom counts
        const visits = await Analytics.findOne({ type: 'visit' });
        const bookings = await Analytics.findOne({ type: 'booking' });

        // 2. Fetch DB Storage Stats
        const stats = await mongoose.connection.db.stats();

        // Convert bytes to MB for display
        const dataSizeMB = (stats.dataSize / (1024 * 1024)).toFixed(2);
        const indexSizeMB = (stats.indexSize / (1024 * 1024)).toFixed(2);
        const storageSizeMB = (stats.storageSize / (1024 * 1024)).toFixed(2);

        res.json({
            visits: visits ? visits.count : 0,
            bookings: bookings ? bookings.count : 0,
            db: {
                dataSize: `${dataSizeMB} MB`,
                indexSize: `${indexSizeMB} MB`,
                storageSize: `${storageSizeMB} MB`,
                objects: stats.objects,
                collections: stats.collections
            },
            performance: {
                status: 'Healthy',
                apiLatency: 'Minimal',
                lastChecked: new Date()
            }
        });
    } catch (error) {
        console.error('Error fetching analytics stats:', error);
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
});

// Track a visit or booking
router.post('/track/:type', async (req, res) => {
    try {
        const { type } = req.params;
        if (!['visit', 'booking'].includes(type)) {
            return res.status(400).json({ message: 'Invalid track type' });
        }

        let stat = await Analytics.findOne({ type });
        if (!stat) {
            stat = new Analytics({ type, count: 1 });
        } else {
            stat.count += 1;
            stat.lastUpdated = new Date();
        }

        await stat.save();
        res.json({ success: true, type, count: stat.count });
    } catch (error) {
        console.error('Error tracking analytics:', error);
        res.status(500).json({ message: 'Error tracking', error: error.message });
    }
});

module.exports = router;
