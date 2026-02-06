import React from 'react';
import OfferSlider from '../components/OfferSlider';
import OfferCard from '../components/OfferCard';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

const Offers = () => {
    const { services, loading } = useData();

    if (loading) return <div className="h-screen bg-black flex items-center justify-center text-gold font-heading text-2xl">Loading Exclusive Offers...</div>;

    const menOffers = services?.offers?.men || [];
    const womenOffers = services?.offers?.women || [];

    return (
        <div className="bg-black-main min-h-screen text-white pt-24 pb-20">
            <SEO
                title="Special Offers | Exclusive Salon Combos"
                description="Luxury beauty and grooming at unbeatable prices. Check our monthly exclusive combo offers for men and women at Star Zone Salon."
                url="/offers"
            />
            {/* Hero Section with Slider */}
            <section className="mb-20">
                <div className="max-w-7xl mx-auto px-4 text-center mb-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-heading font-black text-gold mb-4"
                    >
                        EXCLUSIVE OFFERS
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Discover our premium combo packages and seasonal deals designed to give you the ultimate styling experience at the best value.
                    </motion.p>
                </div>
                <OfferSlider />
            </section>

            {/* Men's Offers */}
            <section className="mb-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center space-x-4 mb-12">
                        <h2 className="text-3xl font-heading font-bold text-white">MEN'S COMBO <span className="text-gold">OFFERS</span></h2>
                        <div className="flex-grow h-px bg-gold/30"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
                        {menOffers.map((offer, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <OfferCard
                                    price={offer.price}
                                    services={offer.services}
                                    hoverText={offer.hoverText}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Women's Offers */}
            <section className="mb-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center space-x-4 mb-12">
                        <h2 className="text-3xl font-heading font-bold text-white">WOMEN'S COMBO <span className="text-gold">OFFERS</span></h2>
                        <div className="flex-grow h-px bg-gold/30"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
                        {womenOffers.map((offer, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <OfferCard
                                    price={offer.price}
                                    services={offer.services}
                                    hoverText={offer.hoverText}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="mt-20 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-black-card border border-gold/20 p-12 rounded-3xl max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl font-heading font-bold mb-6">DON'T MISS OUT!</h2>
                    <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                        These offers are for a limited time only. Secure your spot today and experience the Star Zone difference.
                    </p>
                    <a
                        href="https://wa.me/918248801668"
                        className="btn-gold inline-flex items-center space-x-2 text-lg px-10 py-4"
                    >
                        BOOK YOUR APPOINTMENT NOW
                    </a>
                </motion.div>
            </section>
        </div>
    );
};

export default Offers;
