const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    url: { type: String, required: true },
    category: { type: String, required: true, enum: ['Hair', 'Skin', 'Bridal', 'Nails'] }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
