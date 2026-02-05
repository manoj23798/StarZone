const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

const authMiddleware = require('../middleware/authMiddleware');

// Get all services & content
router.get('/', async (req, res) => {
    try {
        const services = await Service.findOne();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update all services & content
router.post('/update', authMiddleware, async (req, res) => {
    try {
        let services = await Service.findOne();
        if (!services) {
            services = new Service(req.body);
        } else {
            Object.assign(services, req.body);
        }
        await services.save();
        res.json(services);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
