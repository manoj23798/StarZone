require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../src/models/Service');

const seedOffers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🚀 Connected to MongoDB for seeding offers...");

        const menOffers = [
            { price: "199", services: ["Hair Cut", "Beard Trim / Shave", "Head Massage"], hoverText: "Starter Pack" },
            { price: "299", services: ["Hair Cut", "Beard Trim / Shave", "Hair Wash / De-Tan"], hoverText: "Essential Care" },
            { price: "399", services: ["Hair Cut / Hair Wash", "Beard Trim or Shave", "Oil Head Massage (or) De-Tan (Face & Neck)"], hoverText: "Relaxing Duo" },
            { price: "499", services: ["Hair Cut / Beard Trim / Hair Wash", "Clean Up (or) Peel Off Mask"], hoverText: "Deep Clean" },
            { price: "599", services: ["Hair Cut / Beard Trim / Hair Wash", "Hair Spa (or) Hair Colour", "Head Massage"], hoverText: "Style & Care" },
            { price: "699", services: ["Hair Cut / Hair Wash", "Beard Trim / Shave", "Hair Spa / D-Tan"], hoverText: "Total Transformation" }
        ];

        const womenOffers = [
            { price: "399", services: ["Threading / B-Haircut", "Hair Wash / De-Tan"], hoverText: "Beauty Basic" },
            { price: "599", services: ["Threading / B-Haircut", "Hair Wash", "Face Cleanup (or) Peel Off Mask"], hoverText: "Radiant Duo" },
            { price: "799", services: ["Threading", "Cut, File & Polish", "B-Haircut / Hair Wash", "Hair Spa"], hoverText: "Complete Care" },
            { price: "899", services: ["Threading / B-Haircut", "Facial (Gold/Pearl/Fruit)", "Hair Wash / De-Tan"], hoverText: "Glow Pack" },
            { price: "999", services: ["Threading / B-Haircut", "Hair Wash / Facial (Gold/Pearl/Fruit)", "Manicure or Pedicure"], hoverText: "Royal Pamper" },
            { price: "1499", services: ["Threading / B-Haircut", "Hair Wash / Facial (Gold/Pearl/Fruit)", "Hair Spa", "De-Tan (Face & Neck)"], hoverText: "Ultimate Luxury" }
        ];

        // We only have one document in Service collection
        const existingService = await Service.findOne();
        if (existingService) {
            existingService.offers = {
                ...existingService.offers,
                men: menOffers,
                women: womenOffers
            };
            await existingService.save();
            console.log("✅ Success! All 12 Combo Offers imported to your database.");
        } else {
            console.log("❌ Could not find Service document to update.");
        }

        mongoose.connection.close();
    } catch (err) {
        console.error("❌ Seeding Error:", err);
        process.exit(1);
    }
};

seedOffers();
