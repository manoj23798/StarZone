const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');

const authMiddleware = require('../middleware/authMiddleware');

// Get all gallery items
router.get('/', async (req, res) => {
    try {
        const items = await Gallery.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add gallery item
router.post('/', authMiddleware, async (req, res) => {
    const item = new Gallery(req.body);
    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete gallery item
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Gallery.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
