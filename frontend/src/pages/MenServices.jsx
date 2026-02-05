import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { useData } from '../context/DataContext';
import { Scissors, Zap, Crown } from 'lucide-react';

const MenServices = () => {
    const { services, loading } = useData();

    if (loading || !services) return <div className="h-screen bg-black flex items-center justify-center text-gold font-heading text-2xl">Loading Grooming Menu...</div>;

    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-4 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="Premium Men's Grooming"
                        subtitle="Tailored for the modern gentleman"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {services.men.map((category, idx) => (
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
                                    {category.services.map((service, sIdx) => (
                                        <div
                                            key={sIdx}
                                            className="flex justify-between items-end pb-4 group relative"
                                        >
                                            <div className="flex-grow">
                                                <span className="text-white text-lg font-medium group-hover:text-gold transition-colors">{service.name}</span>
                                                <div className="h-[1px] bg-gold/10 w-full mt-2 group-hover:bg-gold/40 transition-all origin-left scale-x-100 group-hover:scale-[1.02]" />
                                            </div>
                                            <div className="ml-4 text-right">
                                                <span className="text-gold font-bold text-xl">₹{service.price}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
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
                        <a href="https://wa.me/918248801668" className="btn-gold inline-block">
                            BOOK A SESSION
                        </a>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
};

export default MenServices;
