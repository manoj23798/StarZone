const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

console.log('📦 authRoutes.js loaded');

// Health Check
router.get('/ping', (req, res) => res.json({ status: 'alive', timestamp: new Date() }));

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'starzone_secret_key',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error during login.' });
    }
});

// Change Password Route (Protected)
router.post('/change-password', authMiddleware, async (req, res) => {
    console.log(`🔑 ATTEMPTING PASSWORD CHANGE FOR USER: ${req.user.id}`);
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        if (!user || !(await user.comparePassword(currentPassword))) {
            return res.status(401).json({ message: 'Incorrect current password.' });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password updated successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error updating password.' });
    }
});

// Update Profile (Rename/Change Email)
router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findById(req.user.id);

        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();
        res.json({ message: 'Profile updated successfully.', user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Server error updating profile.' });
    }
});

module.exports = router;
