const express = require('express');
const router = express.Router();
const Slot = require('../models/Slot');
const authMiddleware = require('../middleware/authMiddleware');

// Cleanup past slots (e.g., older than today)
const cleanupPastSlots = async () => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const result = await Slot.deleteMany({ date: { $lt: today } });
        if (result.deletedCount > 0) {
            console.log(`🧹 Cleaned up ${result.deletedCount} past slot records.`);
        }
    } catch (error) {
        console.error('❌ Error during slot cleanup:', error);
    }
};

// Toggle slot availability (Admin only)
router.post('/toggle', authMiddleware, async (req, res) => {
    try {
        await cleanupPastSlots(); // Auto-cleanup on toggle
        const { date, slot } = req.body;
        console.log(`[SlotManager] Toggle request: Date=${date}, Slot=${slot}`);

        if (!date || !slot) {
            console.error('❌ Missing date or slot in request');
            return res.status(400).json({ message: 'Date and slot are required' });
        }

        let slotData = await Slot.findOne({ date });

        if (!slotData) {
            console.log(`✨ Creating NEW slot record for ${date}`);
            slotData = new Slot({ date, unavailableSlots: [slot] });
        } else {
            const index = slotData.unavailableSlots.indexOf(slot);
            if (index > -1) {
                console.log(`🔓 Making slot AVAILABLE: ${slot} on ${date}`);
                slotData.unavailableSlots.splice(index, 1);
            } else {
                console.log(`🔒 Making slot UNAVAILABLE: ${slot} on ${date}`);
                slotData.unavailableSlots.push(slot);
            }
            // Ensure Mongoose marks the array as modified so it saves correctly
            slotData.markModified('unavailableSlots');
        }

        const savedData = await slotData.save();
        console.log(`✅ Successfully saved. Current unavailable slots for ${date}:`, savedData.unavailableSlots);
        res.json(savedData.unavailableSlots);
    } catch (error) {
        console.error('❌ Error toggling slot:', error);
        res.status(500).json({
            message: 'Error toggling slot',
            error: error.message
        });
    }
});

// Get unavailable slots for a specific date
router.get('/:date', async (req, res) => {
    try {
        await cleanupPastSlots(); // Auto-cleanup on fetch
        const { date } = req.params;
        const slotData = await Slot.findOne({ date });
        res.json(slotData ? slotData.unavailableSlots : []);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching slots', error: error.message });
    }
});

module.exports = router;
