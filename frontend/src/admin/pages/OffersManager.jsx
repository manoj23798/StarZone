import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { Plus, Trash2, Tag, Image as ImageIcon, Sparkles, Scissors, Save, AlertCircle, Loader2, X } from 'lucide-react';

const OffersManager = () => {
    const { services, updateAllData, uploadImage, loading } = useData();
    const [offers, setOffers] = useState({ slider: [], men: [], women: [] });
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('slider'); // slider, men, women
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (services?.offers) {
            setOffers({
                slider: services.offers.slider || [],
                men: services.offers.men || [],
                women: services.offers.women || []
            });
        }
    }, [services]);

    const handleSave = async () => {
        setIsSaving(true);
        const success = await updateAllData({ ...services, offers });
        setIsSaving(false);
        setStatus(success ? 'success' : 'error');
        setTimeout(() => setStatus(null), 3000);
    };

    const addSliderItem = () => {
        setOffers({
            ...offers,
            slider: [...offers.slider, { title: '', subtitle: '', image: '' }]
        });
    };

    const addComboItem = (gender) => {
        setOffers({
            ...offers,
            [gender]: [...offers[gender], { price: '', services: [''], hoverText: '', prompt: 'BOOK NOW' }]
        });
    };

    const removeSliderItem = (index) => {
        const newSlider = [...offers.slider];
        newSlider.splice(index, 1);
        setOffers({ ...offers, slider: newSlider });
    };

    const removeComboItem = (gender, index) => {
        const newCombo = [...offers[gender]];
        newCombo.splice(index, 1);
        setOffers({ ...offers, [gender]: newCombo });
    };

    const handleImageUpload = async (index, file) => {
        const url = await uploadImage(file);
        if (url) {
            const newSlider = [...offers.slider];
            newSlider[index].image = url;
            setOffers({ ...offers, slider: newSlider });
        }
    };

    if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-gold" size={40} /></div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-heading font-black text-white">OFFERS <span className="text-gold">MANAGER</span></h1>
                    <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest">Manage your dynamic deals and promotions</p>
                </div>
                <div className="flex items-center space-x-3">
                    {status && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${status === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}
                        >
                            {status === 'success' ? <Sparkles size={14} /> : <AlertCircle size={14} />}
                            <span>{status === 'success' ? 'Changes Saved' : 'Update Failed'}</span>
                        </motion.div>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="btn-gold px-8 py-3 flex items-center space-x-2 disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        <span>{isSaving ? 'SAVING...' : 'SAVE ALL CHANGES'}</span>
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-4 border-b border-white/5 pb-px">
                {['slider', 'men', 'women'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-8 py-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-gold' : 'text-gray-500 hover:text-white'}`}
                    >
                        {tab === 'slider' ? 'Promo Slider' : `${tab} Combo Deals`}
                        {activeTab === tab && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-gold" />
                        )}
                    </button>
                ))}
            </div>

            <div className="mt-8">
                {activeTab === 'slider' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {offers.slider.map((slide, idx) => (
                                <motion.div key={idx} layout className="admin-card group relative">
                                    <button
                                        onClick={() => removeSliderItem(idx)}
                                        className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="space-y-4">
                                        <div className="aspect-video bg-black rounded-xl overflow-hidden border border-white/5 relative group/img">
                                            {slide.image ? (
                                                <img src={slide.image} alt="" className="w-full h-full object-cover opacity-60" />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-700">
                                                    <ImageIcon size={48} />
                                                    <p className="text-[10px] uppercase tracking-tighter mt-2 font-black">No Image Selected</p>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                id={`slide-${idx}`}
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(idx, e.target.files[0])}
                                            />
                                            <label
                                                htmlFor={`slide-${idx}`}
                                                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer"
                                            >
                                                <span className="bg-gold text-black px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest">Update Photo</span>
                                            </label>
                                        </div>
                                        <div className="space-y-3">
                                            <input
                                                placeholder="Slide Title (e.g. Bridal Packages)"
                                                value={slide.title}
                                                onChange={(e) => {
                                                    const newSlider = [...offers.slider];
                                                    newSlider[idx].title = e.target.value;
                                                    setOffers({ ...offers, slider: newSlider });
                                                }}
                                                className="admin-input"
                                            />
                                            <input
                                                placeholder="Slide Subtitle (e.g. Exclusive Offers)"
                                                value={slide.subtitle}
                                                onChange={(e) => {
                                                    const newSlider = [...offers.slider];
                                                    newSlider[idx].subtitle = e.target.value;
                                                    setOffers({ ...offers, slider: newSlider });
                                                }}
                                                className="admin-input"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            <button
                                onClick={addSliderItem}
                                className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-gray-500 hover:border-gold/50 hover:text-gold transition-all group"
                            >
                                <div className="p-4 bg-white/5 rounded-full group-hover:bg-gold/10 transition-colors mb-4">
                                    <Plus size={32} />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest">Add New Promo Slide</span>
                            </button>
                        </div>
                    </div>
                )}

                {(activeTab === 'men' || activeTab === 'women') && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {offers[activeTab].map((offer, idx) => (
                                <motion.div key={idx} layout className="admin-card group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 -rotate-45 translate-x-16 -translate-y-16 pointer-events-none" />
                                    <button
                                        onClick={() => removeComboItem(activeTab, idx)}
                                        className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white z-10"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <label className="admin-label">Pricing Details</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold font-bold">₹</span>
                                                <input
                                                    type="number"
                                                    placeholder="199"
                                                    value={offer.price}
                                                    onChange={(e) => {
                                                        const newCombo = [...offers[activeTab]];
                                                        newCombo[idx].price = e.target.value;
                                                        setOffers({ ...offers, [activeTab]: newCombo });
                                                    }}
                                                    className="admin-input pl-8"
                                                />
                                            </div>
                                            <input
                                                placeholder="Hover Badge (e.g. Best Value)"
                                                value={offer.hoverText}
                                                onChange={(e) => {
                                                    const newCombo = [...offers[activeTab]];
                                                    newCombo[idx].hoverText = e.target.value;
                                                    setOffers({ ...offers, [activeTab]: newCombo });
                                                }}
                                                className="admin-input"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <label className="admin-label">Included Services</label>
                                            <div className="space-y-2">
                                                {offer.services.map((service, sIdx) => (
                                                    <div key={sIdx} className="flex space-x-2">
                                                        <input
                                                            value={service}
                                                            onChange={(e) => {
                                                                const newCombo = [...offers[activeTab]];
                                                                newCombo[idx].services[sIdx] = e.target.value;
                                                                setOffers({ ...offers, [activeTab]: newCombo });
                                                            }}
                                                            className="admin-input py-2 text-sm"
                                                            placeholder="Hair cut..."
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                const newCombo = [...offers[activeTab]];
                                                                newCombo[idx].services.splice(sIdx, 1);
                                                                setOffers({ ...offers, [activeTab]: newCombo });
                                                            }}
                                                            className="p-2 text-gray-600 hover:text-red-500"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    onClick={() => {
                                                        const newCombo = [...offers[activeTab]];
                                                        newCombo[idx].services.push('');
                                                        setOffers({ ...offers, [activeTab]: newCombo });
                                                    }}
                                                    className="text-[10px] font-black uppercase tracking-widest text-gold hover:text-white flex items-center space-x-1"
                                                >
                                                    <Plus size={10} />
                                                    <span>Add Service</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            <button
                                onClick={() => addComboItem(activeTab)}
                                className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-gray-500 hover:border-gold/50 hover:text-gold transition-all group min-h-[250px]"
                            >
                                <div className="p-4 bg-white/5 rounded-full group-hover:bg-gold/10 transition-colors mb-4">
                                    <Tag size={32} />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest">Create New {activeTab === 'men' ? "Men's" : "Women's"} Combo Deal</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OffersManager;
