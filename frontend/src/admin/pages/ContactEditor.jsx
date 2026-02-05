import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Save, MapPin, Phone, Instagram, ExternalLink } from 'lucide-react';

const ContactEditor = () => {
    const { services, updateAllData, loading } = useData();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (services) setFormData(services.contact);
    }, [services]);

    if (loading || !formData) return <div>Loading...</div>;

    const handleSave = async () => {
        await updateAllData({ ...services, contact: formData });
        alert('Contact details updated!');
    };

    return (
        <div className="max-w-4xl space-y-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-heading">Contact Manager</h1>
                    <p className="text-gray-500 text-sm">Update address, phones, and social links.</p>
                </div>
                <button onClick={handleSave} className="admin-btn-gold flex items-center space-x-2">
                    <Save size={18} />
                    <span>PUBLISH DETAILS</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="admin-card space-y-8">
                    <h3 className="text-lg font-heading text-gold flex items-center space-x-3">
                        <Phone size={20} />
                        <span>Phone Numbers</span>
                    </h3>
                    <div className="space-y-4">
                        {formData.phones.map((phone, idx) => (
                            <div key={idx} className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Line {idx + 1}</label>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => {
                                        const newPhones = [...formData.phones];
                                        newPhones[idx] = e.target.value;
                                        setFormData({ ...formData, phones: newPhones });
                                    }}
                                    className="admin-input"
                                />
                            </div>
                        ))}
                    </div>

                    <h3 className="text-lg font-heading text-gold flex items-center space-x-3 pt-4 border-t border-white/5">
                        <Instagram size={20} />
                        <span>Social Media</span>
                    </h3>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Instagram Handle</label>
                        <input
                            type="text"
                            value={formData.instagram}
                            onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                            className="admin-input"
                        />
                    </div>
                </div>

                <div className="admin-card space-y-8">
                    <h3 className="text-lg font-heading text-gold flex items-center space-x-3">
                        <MapPin size={20} />
                        <span>Location & Map</span>
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Full Address</label>
                            <textarea
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="admin-input h-32 resize-none"
                            />
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 mb-2">
                                <ExternalLink size={16} className="text-gold" />
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Google Map URL</label>
                            </div>
                            <input
                                type="text"
                                placeholder="Paste Google Maps URL here..."
                                value={formData.mapUrl || ''}
                                onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                                className="admin-input"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactEditor;
