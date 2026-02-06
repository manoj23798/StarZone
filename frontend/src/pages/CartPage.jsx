import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { Trash2, ClipboardCheck, User, Phone, Send, Scissors, Tag, ChevronRight, MessageSquare, Calendar, Clock, CloudSun, AlertCircle, Venus, Mars } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CartPage = () => {
    const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();
    const [userData, setUserData] = useState({ name: '', phone: '', date: '', time: '', gender: '' });
    const [isBooking, setIsBooking] = useState(false);
    const [unavailableSlots, setUnavailableSlots] = useState([]);
    const [slotsLoading, setSlotsLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        if (userData.date) {
            fetchUnavailableSlots();
        }
    }, [userData.date]);

    const fetchUnavailableSlots = async () => {
        setSlotsLoading(true);
        try {
            console.log(`[CartPage] Fetching slots for date: ${userData.date}`);
            const res = await axios.get(`${API_URL}/slots/${userData.date}`);
            console.log(`[CartPage] Received unavailable slots:`, res.data);
            setUnavailableSlots(res.data);

            // If currently selected time becomes unavailable, reset it
            if (res.data.includes(userData.time)) {
                console.log(`[CartPage] Resetting selected time because it became unavailable`);
                setUserData(prev => ({ ...prev, time: '' }));
            }
        } catch (error) {
            console.error('[CartPage] Error fetching slots:', error);
        } finally {
            setSlotsLoading(false);
        }
    };

    const handleRemove = (id, name) => {
        removeFromCart(id, name);
    };

    const handleBooking = (e) => {
        e.preventDefault();
        if (!userData.name || !userData.phone || !userData.date || !userData.time || !userData.gender) {
            alert("Please complete all booking details (Gender, Name, Phone, Date, and Time).");
            return;
        }

        setIsBooking(true);

        const trackBooking = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                await axios.post(`${API_URL}/analytics/track/booking`);
            } catch (err) {
                console.error('Booking tracking failed:', err);
            }
        };

        const salonPhone = "918248801668";
        const itemsList = cartItems.map(item => {
            // Sanitize name to remove price if it was accidentally included (e.g. from old cart items)
            const cleanName = item.name.replace(/ - ₹\d+$/, '');
            return `• *${cleanName}* - ₹${item.price}${item.category ? ` (${item.category})` : ''}`;
        }).join('\n');

        const message = `*Salon Appointment Request*\n` +
            `-------------------------\n` +
            `*Client:* ${userData.name}\n` +
            `*Gender:* ${userData.gender}\n` +
            `*Phone:* ${userData.phone}\n` +
            `*Date:* ${userData.date}\n` +
            `*Time:* ${userData.time}\n\n` +
            `*Selected Treatments:*\n${itemsList}\n\n` +
            `*Total Amount:* ${totalPrice}\n` +
            `-------------------------\n` +
            `_For any doubts or more details, contact: 918248801668_\n` +
            `_Sent from Star Zone Website_`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${salonPhone}?text=${encodedMessage}`;

        trackBooking();
        window.open(whatsappUrl, '_blank');
        setIsBooking(false);
    };

    if (cartItems.length === 0) {
        return (
            <PageTransition>
                <div className="pt-40 pb-24 px-4 min-h-screen flex flex-col items-center justify-center text-center">
                    <div className="bg-gold/10 p-8 rounded-full mb-8">
                        <ClipboardCheck size={64} className="text-gold opacity-50" />
                    </div>
                    <h2 className="text-3xl font-heading text-white mb-4">No treatments selected</h2>
                    <p className="text-gray-400 mb-10 max-w-md">Looks like you haven't selected any treatments yet. Explore our menu to book your premium experience.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/men-services" className="btn-gold px-8 py-3 flex items-center space-x-2">
                            <Scissors size={18} />
                            <span>Men's Menu</span>
                        </Link>
                        <Link to="/women-services" className="btn-gold px-8 py-3 flex items-center space-x-2">
                            <CloudSun size={18} />
                            <span>Women's Menu</span>
                        </Link>
                    </div>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-4 min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <SectionHeader
                        title="Your Selected Treatments"
                        subtitle="Review your selection and book your appointment"
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            <AnimatePresence mode='popLayout'>
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="glass-card p-6 flex flex-col sm:flex-row justify-between items-center group"
                                    >
                                        <div className="flex items-center space-x-5 mb-4 sm:mb-0">
                                            <div className="p-3 bg-gold/10 rounded-xl group-hover:bg-gold/20 transition-colors">
                                                {item.type === 'offer' ? <Tag size={20} className="text-gold" /> : <Scissors size={20} className="text-gold" />}
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-heading text-white">{item.name}</h4>
                                                {item.category && <p className="text-gray-500 text-sm uppercase tracking-widest">{item.category}</p>}
                                                {item.details && <p className="text-gray-400 text-xs mt-1 italic">{item.details}</p>}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-8">
                                            <span className="text-gold font-bold text-2xl">₹{item.price}</span>
                                            <button
                                                onClick={() => handleRemove(item.id, item.name)}
                                                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                                title="Remove Item"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            <div className="flex justify-between items-center p-6 bg-gold/5 rounded-2xl border border-gold/10">
                                <button
                                    onClick={clearCart}
                                    className="text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-widest flex items-center space-x-2"
                                >
                                    <Trash2 size={16} />
                                    <span>Clear List</span>
                                </button>
                                <div className="text-right">
                                    <p className="text-gray-400 text-sm uppercase tracking-widest">Estimated Total</p>
                                    <h3 className="text-4xl font-heading text-gold">{totalPrice}</h3>
                                </div>
                            </div>
                        </div>

                        {/* Booking Form */}
                        <div className="lg:col-span-1">
                            <div className="glass-card p-8 sticky top-32">
                                <div className="flex items-center space-x-3 mb-8">
                                    <div className="p-2 bg-gold/20 rounded-lg">
                                        <MessageSquare size={20} className="text-gold" />
                                    </div>
                                    <h3 className="text-2xl font-heading text-white">Booking Details</h3>
                                </div>

                                <form onSubmit={handleBooking} className="space-y-6">
                                    <div>
                                        <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-3 px-1 font-black">Select Gender</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setUserData({ ...userData, gender: 'Male' })}
                                                className={`py-4 rounded-xl flex items-center justify-center space-x-3 transition-all border-2 ${userData.gender === 'Male'
                                                        ? 'bg-gold/20 border-gold text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                                                        : 'bg-black/40 border-gold/10 text-gray-400 hover:border-gold/30'
                                                    }`}
                                            >
                                                <Mars size={18} className={userData.gender === 'Male' ? 'text-gold' : 'text-gray-500'} />
                                                <span className="font-bold tracking-widest uppercase text-xs">Male</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setUserData({ ...userData, gender: 'Female' })}
                                                className={`py-4 rounded-xl flex items-center justify-center space-x-3 transition-all border-2 ${userData.gender === 'Female'
                                                        ? 'bg-gold/20 border-gold text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                                                        : 'bg-black/40 border-gold/10 text-gray-400 hover:border-gold/30'
                                                    }`}
                                            >
                                                <Venus size={18} className={userData.gender === 'Female' ? 'text-gold' : 'text-gray-500'} />
                                                <span className="font-bold tracking-widest uppercase text-xs">Female</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2 px-1 font-black">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
                                            <input
                                                type="text"
                                                required
                                                placeholder="Your Name"
                                                className="w-full bg-black/40 border border-gold/20 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
                                                value={userData.name}
                                                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2 px-1">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
                                            <input
                                                type="tel"
                                                required
                                                placeholder="Your WhatsApp Number"
                                                className="w-full bg-black/40 border border-gold/20 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
                                                value={userData.phone}
                                                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="sm:col-span-2">
                                            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2 px-1">Appointment Date</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
                                                <input
                                                    type="date"
                                                    required
                                                    className="w-full bg-black/40 border border-gold/20 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors [color-scheme:dark]"
                                                    value={userData.date}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    onChange={(e) => setUserData({ ...userData, date: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <div className="flex justify-between items-center mb-3 px-1">
                                                <label className="block text-gray-400 text-xs uppercase tracking-widest">Select Time Slot</label>
                                                {slotsLoading && <div className="animate-spin rounded-full h-3 w-3 border border-gold border-t-transparent"></div>}
                                            </div>
                                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                                {['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '08:30 PM'].map((time) => {
                                                    const isBooked = unavailableSlots.includes(time);
                                                    return (
                                                        <button
                                                            key={time}
                                                            type="button"
                                                            disabled={isBooked || slotsLoading}
                                                            onClick={() => setUserData({ ...userData, time })}
                                                            className={`py-3 px-1 rounded-xl text-xs font-bold transition-all border-2 ${userData.time === time
                                                                ? 'bg-gold text-black border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                                                                : isBooked
                                                                    ? 'bg-red-500/20 text-red-500 border-red-500/40 cursor-not-allowed'
                                                                    : 'bg-black/40 text-gray-400 border-gold/10 hover:border-gold/40 hover:text-white'
                                                                }`}
                                                        >
                                                            {time}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            {unavailableSlots.length > 0 && (
                                                <p className="text-[10px] text-red-500/60 mt-2 flex items-center space-x-1">
                                                    <AlertCircle size={10} />
                                                    <span>Red slots are already booked or unavailable.</span>
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isBooking || (userData.date && !userData.time)}
                                            className="btn-gold w-full py-5 flex items-center justify-center space-x-3 shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-gold/40 transition-shadow disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                                        >
                                            {isBooking ? (
                                                <div className="w-6 h-6 border-2 border-black border-t-transparent animate-spin rounded-full" />
                                            ) : (
                                                <>
                                                    <Send size={20} />
                                                    <span className="text-lg">Confirm & Book via WhatsApp</span>
                                                </>
                                            )}
                                        </button>
                                        <p className="text-center text-gray-500 text-[10px] mt-4 uppercase tracking-widest">Fast booking • Pay at salon</p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default CartPage;
