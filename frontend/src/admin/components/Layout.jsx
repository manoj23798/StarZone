import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { Bell, Search, User, LogOut, Menu, X } from 'lucide-react';
import star from '../../assets/star.png';

const Layout = () => {
    const { user, loading, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        { id: 1, text: "System security check passed", time: "2 mins ago" },
        { id: 2, text: "New service category: 'Bridal' added", time: "1 hour ago" },
        { id: 3, text: "Gallery size reaching limit (85%)", time: "5 hours ago" },
    ];

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
    </div>;

    if (!user) return <Navigate to="/admin/login" replace />;

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className={`flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-64'}`}>
                {/* Fixed sidebar margin on desktop (ml-64), none on mobile */}
                <div className="lg:ml-0"></div>

                {/* Top Header */}
                <header className="h-20 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 text-gray-400 hover:text-gold transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <h2 className="text-lg md:text-xl font-heading tracking-tight">Management Suite</h2>
                    </div>

                    <div className="flex items-center space-x-6">

                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className={`relative p-2 transition-colors ${showNotifications ? 'text-gold' : 'text-gray-400 hover:text-gold'}`}
                            >
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full" />
                            </button>

                            <AnimatePresence>
                                {showNotifications && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-4 w-80 bg-black-card border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
                                        >
                                            <div className="p-4 border-b border-white/5 flex justify-between items-center">
                                                <h3 className="font-bold text-sm">Notifications</h3>
                                                <span className="text-[10px] text-gold font-bold uppercase tracking-widest">3 New</span>
                                            </div>
                                            <div className="max-h-96 overflow-y-auto">
                                                {notifications.map(n => (
                                                    <div key={n.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                                                        <p className="text-xs text-gray-300 group-hover:text-white transition-colors">{n.text}</p>
                                                        <p className="text-[10px] text-gray-500 mt-1">{n.time}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="w-full py-3 text-[10px] text-gray-500 uppercase tracking-widest font-bold hover:text-gold transition-colors">
                                                View all activity
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={logout}
                            className="flex items-center space-x-2 p-2 px-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all text-[10px] font-black uppercase tracking-widest"
                        >
                            <LogOut size={14} />
                            <span>Exit</span>
                        </button>
                        <div className="h-10 w-10 border border-gold/20 rounded-full overflow-hidden">
                            <img src={star} alt="Admin" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="p-4 md:p-8 flex-grow overflow-x-hidden">
                    <Outlet />
                </main>

                <footer className="p-4 md:p-8 border-t border-white/5 text-gray-600 text-[10px] uppercase tracking-widest text-center">
                    © {new Date().getFullYear()} Star Zone Salon — Proprietary Management System
                </footer>
            </div>
        </div>
    );
};

export default Layout;
