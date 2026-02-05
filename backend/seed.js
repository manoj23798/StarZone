require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./src/models/Service');
const User = require('./src/models/User');
const initialServices = require('../frontend/src/data/services.json');

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/starzone');
        console.log('Connected to MongoDB for seeding...');

        // Seed Services
        await Service.deleteMany({});
        const seedData = {
            ...initialServices,
            homeContent: {
                heroTitle: 'STAR ZONE',
                heroSubtitle: 'Unisex Hair & Style Salon',
                heroTagline: 'Where Royalty Meets Style',
                heroImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop'
            }
        };
        await Service.create(seedData);
        console.log('✅ Services seeded');

        // Seed Admin User
        await User.deleteMany({});
        await User.create({
            email: 'admin@starzone.com',
            password: 'admin123',
            name: 'Salon Owner'
        });
        console.log('✅ Admin user seeded');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
