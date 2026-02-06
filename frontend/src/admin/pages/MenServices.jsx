import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, Search, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MenServices = () => {
    const { services, updateService, addService, deleteService, loading } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [editingService, setEditingService] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    if (loading || !services) return <div>Loading Services...</div>;

    const [newService, setNewService] = useState({ name: '', price: '', category: '' });

    useEffect(() => {
        if (services?.men?.length > 0 && !newService.category) {
            setNewService(prev => ({ ...prev, category: services.men[0].category }));
        }
    }, [services]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start lg:items-center space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-2xl md:text-3xl font-heading">Men's Services</h1>
                    <p className="text-gray-500 text-xs md:text-sm">Manage pricing and availability for men's grooming.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="admin-btn-gold flex items-center justify-center space-x-2 w-full md:w-auto"
                >
                    <Plus size={18} />
                    <span>ADD NEW SERVICE</span>
                </button>
            </div>

            <div className="admin-card p-3 flex items-center space-x-4 bg-black-card/50">
                <Search size={20} className="text-gray-500" />
                <input
                    type="text"
                    placeholder="Search by service name..."
                    className="bg-transparent border-none outline-none flex-grow text-sm py-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="columns-1 lg:columns-2 gap-8 space-y-8">
                {services.men.map((category, catIdx) => (
                    <div key={category.category} className="break-inside-avoid space-y-4">
                        <h3 className="text-lg font-heading text-gold flex items-center space-x-3 bg-black/30 p-4 rounded-xl">
                            <span>{category.category}</span>
                            <span className="text-[10px] bg-gold/10 px-2 py-0.5 rounded text-gold">{category.services.length}</span>
                        </h3>

                        <div className="space-y-2">
                            {category.services
                                .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((service, sIdx) => (
                                    <div key={sIdx} className="admin-card py-3.5 px-4 flex justify-between items-center group hover:border-gold/30 transition-all">
                                        <span className="text-base font-medium text-gray-300 group-hover:text-gold transition-colors">{service.name}</span>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-gold font-black text-lg">₹{service.price}</span>
                                            <div className="flex space-x-1">
                                                <button
                                                    onClick={() => setEditingService({ gender: 'men', catIdx, sIdx, ...service })}
                                                    className="p-1 hover:bg-gold/10 text-gray-400 hover:text-gold rounded transition-all"
                                                >
                                                    <Edit2 size={12} />
                                                </button>
                                                <button
                                                    onClick={() => deleteService('men', catIdx, sIdx)}
                                                    className="p-1 hover:bg-red-400/10 text-gray-400 hover:text-red-400 rounded transition-all"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {editingService && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="admin-card w-full max-w-md space-y-6"
                        >
                            <h2 className="text-2xl font-heading">Edit Service</h2>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={editingService.name}
                                    onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                                    className="admin-input"
                                    placeholder="Service Name"
                                />
                                <input
                                    type="text"
                                    value={editingService.price}
                                    onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                                    className="admin-input"
                                    placeholder="Price"
                                />
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setEditingService(null)}
                                    className="flex-grow py-3 border border-white/10 rounded-xl font-bold uppercase tracking-widest text-xs"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        updateService('men', editingService.catIdx, editingService.sIdx, { name: editingService.name, price: editingService.price });
                                        setEditingService(null);
                                    }}
                                    className="flex-grow py-3 bg-gold text-black font-bold rounded-xl flex items-center justify-center space-x-2"
                                >
                                    <Check size={18} />
                                    <span>Update</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Add Modal Placeholder */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="admin-card w-full max-w-md space-y-6"
                        >
                            <h2 className="text-2xl font-heading">Add New Service</h2>
                            <div className="space-y-4">
                                <select
                                    value={newService.category}
                                    onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                                    className="admin-input appearance-none"
                                >
                                    {services.men.map(c => <option key={c.category} value={c.category}>{c.category}</option>)}
                                </select>
                                <input
                                    type="text"
                                    value={newService.name}
                                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                                    className="admin-input"
                                    placeholder="Service Name"
                                />
                                <input
                                    type="text"
                                    value={newService.price}
                                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                                    className="admin-input"
                                    placeholder="Price"
                                />
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-grow py-3 border border-white/10 rounded-xl font-bold uppercase tracking-widest text-xs"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        addService('men', newService.category, { name: newService.name, price: newService.price });
                                        setShowAddModal(false);
                                        setNewService({ ...newService, name: '', price: '' });
                                    }}
                                    className="flex-grow py-3 bg-gold text-black font-bold rounded-xl flex items-center justify-center space-x-2"
                                >
                                    <Plus size={18} />
                                    <span>Add Service</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MenServices;
