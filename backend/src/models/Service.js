const mongoose = require('mongoose');

const serviceItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true }
});

const serviceCategorySchema = new mongoose.Schema({
    category: { type: String, required: true },
    services: [serviceItemSchema]
});

const servicesSchema = new mongoose.Schema({
    men: [serviceCategorySchema],
    women: [serviceCategorySchema],
    contact: {
        phones: [String],
        address: String,
        instagram: String,
        email: String,
        mapLink: String
    },
    homeContent: {
        heroTitle: String,
        heroSubtitle: String,
        heroTagline: String,
        heroImage: String
    },
    offers: {
        slider: [{
            title: String,
            subtitle: String,
            image: String
        }],
        men: [{
            price: String,
            services: [String],
            hoverText: String,
            prompt: String
        }],
        women: [{
            price: String,
            services: [String],
            hoverText: String,
            prompt: String
        }]
    }
}, { timestamps: true });

module.exports = mongoose.model('Service', servicesSchema);
