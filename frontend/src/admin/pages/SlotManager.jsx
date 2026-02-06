import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle, Save } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../../config';

const SlotManager = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [unavailableSlots, setUnavailableSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toggling, setToggling] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    const timeSlots = [
        '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM',
        '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
        '06:00 PM', '07:00 PM', '08:00 PM', '08:30 PM'
    ];

    useEffect(() => {
        fetchSlots();
    }, [selectedDate]);

    const fetchSlots = async () => {
        setLoading(true);
        try {
            console.log(`[SlotManager] Fetching slots for date: ${selectedDate}`);
            const res = await axios.get(`${API_URL}/slots/${selectedDate}`);
            console.log(`[SlotManager] Received data:`, res.data);
            setUnavailableSlots(res.data);
        } catch (error) {
            console.error('[SlotManager] Error fetching slots:', error);
            setMessage({ type: 'error', text: 'Failed to load slots' });
        } finally {
            setLoading(false);
        }
    };

    const toggleSlot = async (slot) => {
        console.log(`[SlotManager] Toggling slot: ${slot} for ${selectedDate}`);
        setToggling(slot);
        try {
            const token = localStorage.getItem('admin_token');
            const res = await axios.post(
                `${API_URL}/slots/toggle`,
                { date: selectedDate, slot },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(`[SlotManager] Toggle SUCCESS. Current unavailable:`, res.data);
            setUnavailableSlots(res.data);
            setMessage({ type: 'success', text: `Slot updated for ${selectedDate}` });
            setTimeout(() => setMessage({ type: '', text: '' }), 5000);
        } catch (error) {
            console.error('[SlotManager] Error toggling slot:', error);
            setMessage({ type: 'error', text: 'Failed to update slot. Check console for details.' });
        } finally {
            setToggling(null);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-3xl font-heading text-white">Slot Management</h2>
                    <p className="text-gray-500 mt-2">Manage appointment availability by date</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Date Selection */}
                <div className="lg:col-span-1">
                    <div className="admin-card">
                        <div className="flex items-center space-x-3 mb-6">
                            <Calendar className="text-gold" size={20} />
                            <h3 className="text-xl font-heading text-white">Select Date</h3>
                        </div>
                        <input
                            type="date"
                            className="admin-input"
                            value={selectedDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                        <div className="mt-6 p-4 bg-gold/5 rounded-xl border border-gold/10">
                            <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-widest">
                                Pick a date to see and manage available time slots. Blocked slots will be hidden from customers.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Slots Grid */}
                <div className="lg:col-span-2">
                    <div className="admin-card">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center space-x-3">
                                <Clock className="text-gold" size={20} />
                                <h3 className="text-xl font-heading text-white">Time Slots for {selectedDate}</h3>
                            </div>
                            {loading && <div className="animate-spin rounded-full h-5 w-5 border-2 border-gold border-t-transparent"></div>}
                        </div>

                        {message.text && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                    }`}
                            >
                                {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                <span className="text-sm font-medium">{message.text}</span>
                            </motion.div>
                        )}

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {timeSlots.map((slot) => {
                                const isBooked = unavailableSlots.includes(slot);
                                return (
                                    <button
                                        key={slot}
                                        onClick={() => toggleSlot(slot)}
                                        disabled={toggling === slot}
                                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center space-y-2 relative group ${isBooked
                                            ? 'bg-red-500/10 border-red-500/30 text-red-400'
                                            : 'bg-green-500/10 border-green-500/30 text-green-400 hover:border-green-500'
                                            } ${toggling === slot ? 'opacity-50 grayscale' : ''}`}
                                    >
                                        <div className={`p-2 rounded-lg ${isBooked ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                                            {isBooked ? <XCircle size={20} /> : <CheckCircle2 size={20} />}
                                        </div>
                                        <span className="text-sm font-bold tracking-widest">{slot}</span>
                                        <span className={`text-[9px] uppercase tracking-tighter font-black ${isBooked ? 'text-red-500' : 'text-green-500 opacity-60'}`}>
                                            {isBooked ? 'Booked/Blocked' : 'Available'}
                                        </span>

                                        {/* Hover Indicator */}
                                        <div className="absolute inset-x-0 bottom-0 py-1 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-black uppercase tracking-[0.2em] text-center text-white cursor-pointer">
                                            {isBooked ? 'Make Available' : 'Mark Booked'}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlotManager;
