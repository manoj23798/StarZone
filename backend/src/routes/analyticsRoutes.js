const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Analytics = require('../models/Analytics');
const authMiddleware = require('../middleware/authMiddleware');

// Get all stats (Visits, Bookings, DB Stats, Demographics)
router.get('/stats', async (req, res) => {
    try {
        // 1. Fetch all custom counts
        const allAnalytics = await Analytics.find({});

        const stats = {
            visits: 0,
            bookings: 0,
            menVisits: 0,
            womenVisits: 0,
            locations: {},
            genders: { male: 0, female: 0 },
            ages: {}
        };

        allAnalytics.forEach(item => {
            if (item.type === 'visit') stats.visits = item.count;
            else if (item.type === 'booking') stats.bookings = item.count;
            else if (item.type === 'men_visit') stats.menVisits = item.count;
            else if (item.type === 'women_visit') stats.womenVisits = item.count;
            else if (item.type.startsWith('city_')) {
                const city = item.type.replace('city_', '');
                stats.locations[city] = item.count;
            }
            else if (item.type.startsWith('gender_')) {
                const gender = item.type.replace('gender_', '').toLowerCase();
                stats.genders[gender] = item.count;
            }
            else if (item.type.startsWith('age_')) {
                const age = item.type.replace('age_', '');
                stats.ages[age] = item.count;
            }
        });

        // 2. Fetch DB Storage Stats
        const dbStats = await mongoose.connection.db.stats();

        // Convert bytes to MB for display
        const dataSizeMB = (dbStats.dataSize / (1024 * 1024)).toFixed(2);
        const indexSizeMB = (dbStats.indexSize / (1024 * 1024)).toFixed(2);
        const storageSizeMB = (dbStats.storageSize / (1024 * 1024)).toFixed(2);

        res.json({
            ...stats,
            db: {
                dataSize: `${dataSizeMB} MB`,
                indexSize: `${indexSizeMB} MB`,
                storageSize: `${storageSizeMB} MB`,
                objects: dbStats.objects,
                collections: dbStats.collections
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

// Track any type (dynamic)
router.post('/track/:type', async (req, res) => {
    try {
        const { type } = req.params;

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
