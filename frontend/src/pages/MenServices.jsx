import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { Scissors, Zap, Crown, Plus, Check, Search, X } from 'lucide-react';
import SEO from '../components/SEO';
import { API_URL } from '../config';
import MenLogo from '../assets/Men_logo.png';

const MenServices = () => {
    const { services, loading } = useData();
    const { addToCart, cartItems } = useCart();
    const [addedId, setAddedId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useState(() => {
        const trackVisit = async () => {
            if (!sessionStorage.getItem('starzone_men_visited')) {
                try {
                    await fetch(`${API_URL}/analytics/track/men_visit`, { method: 'POST' });
                    sessionStorage.setItem('starzone_men_visited', 'true');
                } catch (err) {
                    console.error('Men visit tracking failed:', err);
                }
            }
        };
        trackVisit();
    }, []);

    if (loading || !services) return <div className="h-screen bg-black flex items-center justify-center text-gold font-heading text-2xl">Loading Grooming Menu...</div>;

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
                title="Grooming Menu | Men's Hair & Services"
                description="Explore our premium grooming services for men. From expert hair cuts and beard styling to relaxing facials and head massages."
                url="/men-services"
            />
            <div className="pt-32 pb-24 px-4 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title={<div className="flex items-center justify-center gap-4">Premium Men's Grooming <img src={MenLogo} alt="Men" className="w-32 h-32 object-contain -my-6" /></div>}
                        subtitle="Tailored for the modern gentleman"
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
                                placeholder="Search treatments (e.g. Haircut, Facial...)"
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
                        {services.men.map((category, idx) => {
                            const filteredServices = category.services.filter(s =>
                                s.name.toLowerCase().includes(searchTerm.toLowerCase())
                            );

                            if (filteredServices.length === 0) return null;

                            return (
                                <motion.div
                                    key={category.category}
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="glass-card p-6 flex flex-col"
                                >
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="p-2.5 bg-gold/10 rounded-lg">
                                            {idx % 3 === 0 ? <Scissors className="text-gold" size={20} /> : idx % 3 === 1 ? <Zap className="text-gold" size={20} /> : <Crown className="text-gold" size={20} />}
                                        </div>
                                        <h3 className="text-2xl font-heading text-gold tracking-tight">{category.category}</h3>
                                    </div>

                                    <div className="space-y-4 flex-grow">
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
                                                        className="flex justify-between items-center pb-4 group relative border-b border-gold/5 last:border-0"
                                                    >
                                                        <div className="flex-grow">
                                                            <span className="text-white text-lg font-medium group-hover:text-gold transition-colors">{service.name}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-4">
                                                            <span className="text-gold font-bold text-xl">₹{service.price}</span>
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
                                                    </motion.div>
                                                );
                                            })}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <motion.div
                        className="mt-20 text-center p-12 rounded-3xl border border-gold/20 bg-gradient-to-b from-black-card to-black"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-heading text-white mb-6">Need a sharp look?</h3>
                        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
                            Our master barbers are experts in classic and contemporary styles. Book your session now for a premium grooming experience.
                        </p>
                        <a href="https://wa.me/918248801668" className="btn-gold px-10 md:px-16 whitespace-nowrap inline-block">
                            BOOK A SESSION
                        </a>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
};

export default MenServices;
