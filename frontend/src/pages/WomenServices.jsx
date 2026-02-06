import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { Sparkles, Heart, Star, CloudSun, Plus, Check, Search, X } from 'lucide-react';
import SEO from '../components/SEO';

const WomenServices = () => {
    const { services, loading } = useData();
    const { addToCart, cartItems } = useCart();
    const [addedId, setAddedId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useState(() => {
        const trackVisit = async () => {
            if (!sessionStorage.getItem('starzone_women_visited')) {
                try {
                    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                    await fetch(`${API_URL}/analytics/track/women_visit`, { method: 'POST' });
                    sessionStorage.setItem('starzone_women_visited', 'true');
                } catch (err) {
                    console.error('Women visit tracking failed:', err);
                }
            }
        };
        trackVisit();
    }, []);

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

                    {/* Luxury Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto mb-8 md:mb-16 relative group px-4"
                    >
                        <div className="absolute inset-0 bg-gold/5 blur-xl group-hover:bg-gold/10 transition-all rounded-full" />
                        <div className="relative flex items-center bg-black-card/50 backdrop-blur-xl border border-white/5 rounded-2xl px-6 py-4 group-hover:border-gold/20 transition-all shadow-2xl">
                            <Search className="text-gold/50 group-hover:text-gold transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search beauty treatments..."
                                className="bg-transparent border-none outline-none flex-grow ml-4 text-white placeholder:text-gray-600 text-sm md:text-base font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="p-1 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-all"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 px-4">
                        {services.women.map((category, idx) => {
                            const filteredServices = category.services.filter(s =>
                                s.name.toLowerCase().includes(searchTerm.toLowerCase())
                            );

                            if (filteredServices.length === 0) return null;

                            return (
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
                                        <AnimatePresence mode="popLayout">
                                            {filteredServices.map((service, sIdx) => {
                                                const itemId = `${category.category}-${service.name}`;
                                                const isInCart = cartItems.some(i => i.id === itemId);

                                                return (
                                                    <motion.div
                                                        key={sIdx}
                                                        layout
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
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
                                                    </motion.div>
                                                );
                                            })}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
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
