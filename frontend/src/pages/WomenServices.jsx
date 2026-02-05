import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { useData } from '../context/DataContext';
import { Sparkles, Heart, Star, CloudSun } from 'lucide-react';

const WomenServices = () => {
    const { services, loading } = useData();

    if (loading || !services) return <div className="h-screen bg-black flex items-center justify-center text-gold font-heading text-2xl">Loading Beauty Menu...</div>;

    return (
        <PageTransition>
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
                                    {category.services.map((service, sIdx) => (
                                        <div
                                            key={sIdx}
                                            className="flex flex-col pb-4 group relative"
                                        >
                                            <div className="flex justify-between items-end mb-1">
                                                <span className="text-gray-300 text-lg group-hover:text-gold transition-colors">{service.name}</span>
                                                <span className="text-gold font-bold text-xl ml-2">
                                                    ₹{service.price}
                                                </span>
                                            </div>
                                            <div className="h-[1px] bg-gold/10 w-full group-hover:bg-gold/40 transition-all origin-left scale-x-100 group-hover:scale-[1.02]" />
                                        </div>
                                    ))}
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
