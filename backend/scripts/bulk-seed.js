require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../src/models/Service');
const User = require('../src/models/User');
const Gallery = require('../src/models/Gallery');

const MONGO_URI = process.env.MONGO_URI;

const bulkData = {
    men: [
        {
            category: "Hair Cut",
            services: [
                { name: "Stylish Hair Cut", price: "99" },
                { name: "Advanced Hair Cut", price: "149" },
                { name: "Creative Hair Cut", price: "249" },
                { name: "Hair Wash", price: "29" },
                { name: "Shampoo / Conditioning / Blowdry", price: "75" },
                { name: "Shampoo / Conditioning / Blowdry / Styling", price: "99" },
                { name: "Ironing / Roller", price: "299" }
            ]
        },
        {
            category: "Beard",
            services: [
                { name: "Beard Trim / Shave", price: "49" },
                { name: "Beard Design", price: "99" }
            ]
        },
        {
            category: "Hair Colouring",
            services: [
                { name: "Global Hair Colouring", price: "349" },
                { name: "Beard Colouring", price: "99" },
                { name: "Moustache Colouring", price: "49" },
                { name: "Advanced Hair Colouring", price: "599" },
                { name: "Premium Hair Colouring", price: "349" },
                { name: "Premium Global", price: "699" }
            ]
        },
        {
            category: "Hair Treatment",
            services: [
                { name: "Straightening", price: "999" },
                { name: "Smoothening", price: "1499" },
                { name: "Kertain", price: "2999" },
                { name: "Botox", price: "2999" }
            ]
        },
        {
            category: "Hair Spa",
            services: [
                { name: "Basic Spa", price: "499" },
                { name: "Mento Brust Spa", price: "699" },
                { name: "Loreal Hair Spa", price: "599" }
            ]
        }
    ],
    women: [
        {
            category: "Threading",
            services: [
                { name: "Eyebrow", price: "49" },
                { name: "Cheeks", price: "49" },
                { name: "Chin Side", price: "39" },
                { name: "Upper Lip", price: "39" },
                { name: "Forehead", price: "29" },
                { name: "Full Face", price: "99" }
            ]
        },
        {
            category: "Hair Cut",
            services: [
                { name: "Basic U/V/S", price: "199" },
                { name: "Advanced Hair Cut", price: "499" },
                { name: "Creative Hair Cut", price: "699" },
                { name: "Fringes / Bangs", price: "99" },
                { name: "Shampoo / Conditioning / Blowdry", price: "199-299" },
                { name: "Shampoo / Conditioning / Blowdry / Styling", price: "299-399" },
                { name: "Ironing / Roller", price: "499-599" }
            ]
        },
        {
            category: "Kids Cut",
            services: [
                { name: "Baby Cut", price: "99" },
                { name: "Mushroom Cut", price: "99" },
                { name: "Boy Cut", price: "99" }
            ]
        },
        {
            category: "Hair Spa",
            services: [
                { name: "Hair Spa", price: "599" },
                { name: "Mento Brust", price: "799" },
                { name: "Loreal Hair Spa", price: "699" }
            ]
        },
        {
            category: "Hair Colouring",
            services: [
                { name: "Root Touch Up", price: "349" },
                { name: "Global (Medium)", price: "499" },
                { name: "Global (Long)", price: "599" },
                { name: "Advanced Hair Colouring (Ammonia Free) Root Touch Up", price: "499" },
                { name: "Global Medium", price: "1199" },
                { name: "Global Long", price: "1499" }
            ]
        },
        {
            category: "Highlights",
            services: [
                { name: "Highlight Per Streak", price: "149" },
                { name: "Global + Highlight", price: "1599" }
            ]
        },
        {
            category: "Oil Massage (Head)",
            services: [
                { name: "Coconut", price: "349" },
                { name: "Almond", price: "449" },
                { name: "Mento Brust", price: "399" },
                { name: "Olive Oil", price: "449" }
            ]
        },
        {
            category: "Hair Treatment",
            services: [
                { name: "Straightening", price: "1999 / 2999" },
                { name: "Smoothening", price: "2999 / 3999" },
                { name: "Kertain", price: "4999 / 6999" },
                { name: "Botox", price: "4999 / 6999" }
            ]
        },
        {
            category: "Skin Care - Detan",
            services: [
                { name: "Face", price: "149" },
                { name: "Face & Neck", price: "249" },
                { name: "Under Arms", price: "99" },
                { name: "Back Neck", price: "149" },
                { name: "Full Arms", price: "349" },
                { name: "Half Arms", price: "199" },
                { name: "Full Legs", price: "699" },
                { name: "Half Legs", price: "349" },
                { name: "Feet", price: "149" }
            ]
        },
        {
            category: "Skin Care - Bleach",
            services: [
                { name: "Face", price: "199" },
                { name: "Face & Neck", price: "299" },
                { name: "Under Arms", price: "99" },
                { name: "Back Neck", price: "149" },
                { name: "Full Arms", price: "499" },
                { name: "Half Arms", price: "249" },
                { name: "Full Legs", price: "999" },
                { name: "Half Legs", price: "599" },
                { name: "Feet", price: "199" }
            ]
        },
        {
            category: "Skin Care - Cleanup",
            services: [
                { name: "Basic Cleanup", price: "399" },
                { name: "Organic Cleanup", price: "599" },
                { name: "Brazilian Skin Lightening", price: "699" }
            ]
        },
        {
            category: "Skin Care - Facial",
            services: [
                { name: "Gold / Diamond / Pearl", price: "599" },
                { name: "Fruit Facial", price: "649" },
                { name: "Pure Glow Facial", price: "699" },
                { name: "Bridal Glow Facial", price: "799" }
            ]
        },
        {
            category: "Advanced Facial",
            services: [
                { name: "Dead Sea (Acne Pore)", price: "1299" },
                { name: "Vitamin-C (Oil/Dry/Anti-aging)", price: "1399" },
                { name: "Korean Glass", price: "1499" },
                { name: "Ice Facial", price: "1799" },
                { name: "DNA Facial", price: "2999" },
                { name: "Advance Hydra Facial", price: "2999" }
            ]
        },
        {
            category: "Body Care - Waxing",
            services: [
                { name: "Under Arms", price: "149" },
                { name: "Half Arms", price: "250" },
                { name: "Full Arms", price: "350" },
                { name: "Half Leg", price: "349" },
                { name: "Full Leg", price: "449" },
                { name: "Back Neck", price: "199" },
                { name: "Face Sides", price: "149" }
            ]
        },
        {
            category: "Body Care - Manicure",
            services: [
                { name: "Regular", price: "349" },
                { name: "Organic", price: "399" },
                { name: "Tan Removal", price: "799" },
                { name: "Candle Spa Manicure", price: "1199" }
            ]
        },
        {
            category: "Body Care - Pedicure",
            services: [
                { name: "Regular", price: "349" },
                { name: "Organic", price: "499" },
                { name: "Tan Removal", price: "899" },
                { name: "Candle Spa Pedicure", price: "1299" }
            ]
        },
        {
            category: "Nail Care",
            services: [
                { name: "Cut + File (Finger Nails)", price: "75" },
                { name: "File + Polish (Finger Nails)", price: "85" },
                { name: "Cut + File + Polish (Toe Nails)", price: "85" },
                { name: "Cut + File (Toe Nails)", price: "75" }
            ]
        },
        {
            category: "Makeup",
            services: [
                { name: "Bridal Makeup", price: "3999" },
                { name: "HD Makeup", price: "8999" },
                { name: "Guest Makeup", price: "999" },
                { name: "Party Makeup", price: "1999" },
                { name: "Hair Do Basic", price: "349" },
                { name: "Advanced Hair Do", price: "799" },
                { name: "Saree Pre-Plating", price: "249" },
                { name: "Saree Draping", price: "599" }
            ]
        }
    ],
    contact: {
        phones: ["82488 01668", "90805 18299"],
        address: "5/925 B, Kalingarayan Palayam Main Road, Near Mysore Filter Coffee, Palaniandavar Kovil Opp, Erode (DT) – 638301.",
        instagram: "starzone_unisex_hairbeautycare",
        mapUrl: "https://goo.gl/maps/example"
    },
    homeContent: {
        heroTitle: "STAR ZONE",
        heroSubtitle: "UNISEX HAIR & STYLE SALON",
        heroTagline: "Where Royalty Meets Style. Experience premium grooming in Erode.",
        heroImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop"
    }
};

const galleryData = [
    { url: "https://images.unsplash.com/photo-1560066984-138dadb4c035", category: "Hair" },
    { url: "https://images.unsplash.com/photo-1562322140-8baeececf3df", category: "Skin" },
    { url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f", category: "Bridal" },
    { url: "https://images.unsplash.com/photo-1522335789203-aabd1f54bc9e", category: "Nails" }
];

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB Atlas');

        await Service.deleteMany({});
        await Service.create(bulkData);
        console.log('✅ Services & Contact Details Updated from Catalog');

        await Gallery.deleteMany({});
        await Gallery.create(galleryData);
        console.log('✅ Gallery Images Seeded');

        console.log('🏁 ALL SEEDING COMPLETE!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error during bulk seed:', err);
        process.exit(1);
    }
}

seed();
