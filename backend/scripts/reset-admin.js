require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/starzone';

async function resetAdmin() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const email = 'ranjith@starzone.com';
        const password = 'ranjithstarzone';
        const name = 'Ranjith';

        let user = await User.findOne({ email: 'admin@starzone.com' }); // Find old one
        if (!user) {
            user = await User.findOne({ email }); // Or find existing one with new email
        }

        if (user) {
            user.email = email;
            user.password = password;
            user.name = name;
            await user.save();
            console.log(`✅ Admin updated: ${email}`);
        } else {
            user = new User({ email, password, name });
            await user.save();
            console.log(`✅ New Admin created: ${email}`);
        }

        process.exit(0);
    } catch (err) {
        console.error('❌ Error resetting admin:', err);
        process.exit(1);
    }
}

resetAdmin();
