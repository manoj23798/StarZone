import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Save, Image as ImageIcon, Send, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

const HomeEditor = () => {
    const { services, updateAllData, uploadImage, loading } = useData();
    const [formData, setFormData] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (services) setFormData(services.homeContent);
    }, [services]);

    if (loading || !formData) return <div>Loading...</div>;

    const handleSave = async () => {
        setIsSaving(true);
        const success = await updateAllData({ ...services, homeContent: formData });
        setIsSaving(false);
        if (success) alert('Home content updated successfully!');
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const url = await uploadImage(file);
        if (url) {
            setFormData({ ...formData, heroImage: url });
        } else {
            alert('Upload failed. Please try again.');
        }
        setIsUploading(false);
    };

    return (
        <div className="max-w-4xl space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-heading font-black tracking-tight">Home Page Editor</h1>
                    <p className="text-gray-500 text-sm mt-1">Customize your hero section and headlines live.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="admin-btn-gold flex items-center space-x-3 shadow-xl"
                >
                    <Save size={20} />
                    <span>{isSaving ? 'SAVING...' : 'SAVE CHANGES'}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="admin-card space-y-6">
                        <h3 className="text-lg font-heading text-gold">Hero Content</h3>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="admin-label">Main Title</label>
                                <input
                                    type="text"
                                    value={formData.heroTitle}
                                    onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                                    className="admin-input"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="admin-label">Subtitle</label>
                                <input
                                    type="text"
                                    value={formData.heroSubtitle}
                                    onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                                    className="admin-input"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="admin-label">Tagline</label>
                                <textarea
                                    value={formData.heroTagline}
                                    onChange={(e) => setFormData({ ...formData, heroTagline: e.target.value })}
                                    className="admin-input h-32 resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="admin-card space-y-6">
                        <h3 className="text-lg font-heading text-gold">Hero Media</h3>

                        <div className="space-y-4">
                            <div className="aspect-video bg-black rounded-xl border border-white/5 overflow-hidden">
                                <img src={formData.heroImage} alt="Preview" className="w-full h-full object-cover" />
                            </div>

                            <div className="space-y-4">
                                <label className="admin-label">Hero Image</label>
                                <div className="flex gap-4">
                                    <div className="relative flex-grow">
                                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
                                        <input
                                            type="text"
                                            value={formData.heroImage}
                                            onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                                            className="admin-input pl-14"
                                            placeholder="https://images.unsplash.com/..."
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
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest pl-1 italic">Or paste a direct URL above</p>
                            </div>
                        </div>
                    </div>

                    <div className="admin-card border-gold/20 bg-gold/5 flex items-center space-x-4">
                        <div className="p-3 bg-gold rounded-full text-black">
                            <Send size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-sm tracking-tighter">Pro Tip</p>
                            <p className="text-[10px] text-gray-400">Use high-resolution images (at least 1920x1080) for the best background effect.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeEditor;
