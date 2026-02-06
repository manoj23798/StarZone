import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { Camera, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

const Gallery = () => {
    const { gallery, loading } = useData();
    const [filter, setFilter] = useState('All');
    const [selectedImage, setSelectedImage] = useState(null);

    if (loading) return <div className="h-screen bg-black flex items-center justify-center text-gold font-heading text-2xl animate-pulse">Entering The Gallery...</div>;

    const categories = ['All', 'Hair', 'Skin', 'Bridal', 'Nails'];

    const filteredImages = filter === 'All' ? gallery : gallery.filter(img => img.category === filter);

    return (
        <PageTransition>
            <SEO
                title="Visual Gallery | Our Best Style & Makeovers"
                description="Take a visual tour of our work at Star Zone Salon. Real makeovers, bridal excellence, and premium hair artistry."
                url="/gallery"
            />
            <div className="pt-32 pb-24 px-4 min-h-screen overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="Our Gallery"
                        subtitle="Showcasing our art and skill"
                    />

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-8 py-2 rounded-full border transition-all duration-300 tracking-widest text-sm ${filter === cat
                                    ? 'bg-gold border-gold text-black-main font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                                    : 'border-gold/30 text-gray-400 hover:border-gold hover:text-gold'
                                    }`}
                            >
                                {cat.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        <AnimatePresence mode='popLayout'>
                            {filteredImages.map((img) => (
                                <motion.div
                                    key={img._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative group aspect-[3/4] rounded-2xl overflow-hidden border border-gold/10 cursor-pointer"
                                    onClick={() => setSelectedImage(img.url)}
                                >
                                    <img
                                        src={img.url}
                                        alt={img.category}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Camera className="text-gold" size={32} />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-8 right-8 text-white hover:text-gold transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={selectedImage}
                            alt="Preview"
                            className="max-w-full max-h-[85vh] rounded-xl shadow-2xl border border-gold/20"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </PageTransition>
    );
};

export default Gallery;
