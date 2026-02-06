import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { Sparkles, Heart, Star, CloudSun, Plus, Check } from 'lucide-react';
import SEO from '../components/SEO';

const WomenServices = () => {
    const { services, loading } = useData();
    const { addToCart, cartItems } = useCart();
    const [addedId, setAddedId] = useState(null);

    if (loading || !services) return <div className="h-screen bg-black flex items-center justify-center text-gold font-heading text-2xl">Loading Beauty Menu...</div>;

    const handleAddToCart = (service, category) => {
        const item = {
            id: `${category}-${service.name}`,
            name: service.name,
            price: service.price,
            category: category,
            type: 'service'
        };
        addToCart(item);
        setAddedId(item.id);
        setTimeout(() => setAddedId(null), 2000);
    };

    return (
        <PageTransition>
            <SEO 
                title="Beauty Menu | Women's Styling & Care"
                description="Premium beauty services for women in Erode. Discover our range of haircuts, styling, radiant facials, bridal makeup, and nail art."
                url="/women-services"
            />
            <div className="pt-32 pb-24 px-4 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="Luxury Beauty Services"
                        subtitle="The royal treatment for every queen"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {services.women.map((category, idx) => (
                            <motion.div
                                key={category.category}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-6 break-inside-avoid"
                            >
                                <div className="flex items-center space-x-3 mb-5">
                                    <div className="p-2 bg-gold/10 rounded-lg">
                                        {idx % 4 === 0 ? <Sparkles className="text-gold" size={18} /> : idx % 4 === 1 ? <Heart className="text-gold" size={18} /> : idx % 4 === 2 ? <Star className="text-gold" size={18} /> : <CloudSun className="text-gold" size={18} />}
                                    </div>
                                    <h3 className="text-xl font-heading text-gold">{category.category}</h3>
                                </div>

                                <div className="space-y-3">
                                    {category.services.map((service, sIdx) => {
                                        const itemId = `${category.category}-${service.name}`;
                                        const isInCart = cartItems.some(i => i.id === itemId);

                                        return (
                                            <div
                                                key={sIdx}
                                                className="flex flex-col pb-4 group relative border-b border-gold/5 last:border-0"
                                            >
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-gray-300 text-lg group-hover:text-gold transition-colors">{service.name}</span>
                                                    <div className="flex items-center space-x-4">
                                                        <span className="text-gold font-bold text-xl ml-2">
                                                            ₹{service.price}
                                                        </span>
                                                        <button
                                                            onClick={() => handleAddToCart(service, category.category)}
                                                            className={`p-2 rounded-full transition-all ${addedId === itemId
                                                                ? 'bg-gold text-black'
                                                                : isInCart
                                                                    ? 'bg-gold/20 text-gold cursor-default'
                                                                    : 'bg-gold/10 text-gold hover:bg-gold hover:text-black'
                                                                }`}
                                                            disabled={isInCart && addedId !== itemId}
                                                        >
                                                            {addedId === itemId ? <Check size={16} /> : <Plus size={16} />}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Special Message */}
                    <motion.div
                        className="mt-20 glass-card bg-gold/5 border-gold/30 text-center py-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-4xl font-heading text-gold mb-6 italic">Radiate Your Inner Beauty</h3>
                        <p className="text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                            From head to toe, we provide the ultimate pampering experience. Our therapeutic treatments and professional styling will leave you feeling confident and refreshed.
                        </p>
                        <a href="https://wa.me/918248801668" className="btn-gold px-10 md:px-16 whitespace-nowrap">
                            BOOK PAMPER SESSION
                        </a>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
};

export default WomenServices;
