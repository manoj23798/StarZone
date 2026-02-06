const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique: true // Ensure only one entry per date
    },
    unavailableSlots: {
        type: [String],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Slot', slotSchema);
