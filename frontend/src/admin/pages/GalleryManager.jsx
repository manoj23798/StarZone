import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Trash2, Camera, Filter, X, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryManager = () => {
    const { gallery, addGalleryItem, deleteGalleryItem, uploadImage, loading } = useData();
    const [filter, setFilter] = useState('All');
    const [showAdd, setShowAdd] = useState(false);
    const [newItem, setNewItem] = useState({ url: '', category: 'Hair' });
    const [isUploading, setIsUploading] = useState(false);

    if (loading) return <div>Loading Gallery...</div>;

    const categories = ['All', 'Hair', 'Skin', 'Bridal', 'Nails'];
    const filtered = filter === 'All' ? gallery : gallery.filter(i => i.category === filter);

    const handleDelete = (id) => {
        deleteGalleryItem(id);
    };

    const handleAdd = async () => {
        if (!newItem.url) return;
        await addGalleryItem(newItem);
        setShowAdd(false);
        setNewItem({ url: '', category: 'Hair' });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const url = await uploadImage(file);
        if (url) {
            setNewItem({ ...newItem, url });
        } else {
            alert('Upload failed. Please try again.');
        }
        setIsUploading(false);
    };

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-heading">Gallery Manager</h1>
                    <p className="text-gray-500 text-sm">Upload and organize portfolio images.</p>
                </div>
                <button
                    onClick={() => setShowAdd(true)}
                    className="admin-btn-gold flex items-center space-x-2"
                >
                    <Camera size={18} />
                    <span>UPLOAD IMAGE</span>
                </button>
            </div>

            <div className="flex flex-wrap gap-4">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2 rounded-xl border text-xs font-bold tracking-widest transition-all ${filter === cat ? 'bg-gold border-gold text-black shadow-lg shadow-gold/20' : 'border-white/5 text-gray-500 hover:border-white/20'
                            }`}
                    >
                        {cat.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                <AnimatePresence>
                    {filtered.map((img) => (
                        <motion.div
                            key={img._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="admin-card p-2 group relative aspect-[4/5]"
                        >
                            <img src={img.url} alt="" className="w-full h-full object-cover rounded-xl" />
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleDelete(img._id)}
                                    className="p-2 bg-red-500 text-white rounded-lg shadow-xl"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="absolute bottom-4 left-4">
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] bg-black/60 backdrop-blur px-2 py-1 rounded border border-white/10">{img.category}</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Add Modal */}
            <AnimatePresence>
                {showAdd && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="admin-card w-full max-w-md space-y-8 max-h-[90vh] overflow-y-auto custom-scrollbar"
                        >
                            <h2 className="text-2xl font-heading">New Portfolio Item</h2>
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Image Source</label>
                                    <div className="flex gap-4">
                                        <div className="relative flex-grow">
                                            <input
                                                type="text"
                                                className="admin-input"
                                                placeholder="Paste URL..."
                                                value={newItem.url}
                                                onChange={e => setNewItem({ ...newItem, url: e.target.value })}
                                            />
                                        </div>
                                        <label className="flex items-center justify-center p-4 bg-gold/10 rounded-xl border border-gold/20 text-gold cursor-pointer hover:bg-gold/20 transition-all shrink-0">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                            {isUploading ? (
                                                <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <Upload size={20} />
                                            )}
                                        </label>
                                    </div>
                                    {newItem.url && (
                                        <div className="aspect-[4/5] bg-black rounded-xl overflow-hidden border border-white/10">
                                            <img src={newItem.url} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Category</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {categories.filter(c => c !== 'All').map(c => (
                                            <button
                                                key={c}
                                                onClick={() => setNewItem({ ...newItem, category: c })}
                                                className={`py-2 rounded-lg text-[10px] font-bold tracking-widest border transition-all ${newItem.category === c ? 'bg-gold border-gold text-black' : 'border-white/10 text-gray-400'
                                                    }`}
                                            >
                                                {c.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-4 pt-4">
                                <button onClick={() => setShowAdd(false)} className="flex-grow py-3 text-xs font-black uppercase text-gray-500">Cancel</button>
                                <button onClick={handleAdd} className="flex-grow admin-btn-gold">Upload</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GalleryManager;
