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
