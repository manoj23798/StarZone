import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { Bell, Search, User } from 'lucide-react';

const Layout = () => {
    const { user, loading } = useAuth();

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
    </div>;

    if (!user) return <Navigate to="/admin/login" replace />;

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Sidebar />
            <div className="ml-64 flex flex-col min-h-screen">
                {/* Top Header */}
                <header className="h-20 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-heading tracking-tight">Management Suite</h2>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="hidden md:flex items-center bg-white/5 rounded-full px-4 py-2 border border-white/10 group focus-within:border-gold/50 transition-all">
                            <Search size={16} className="text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none outline-none px-3 text-sm w-48"
                            />
                        </div>
                        <button className="relative p-2 text-gray-400 hover:text-gold transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full" />
                        </button>
                        <div className="h-10 w-10 bg-gradient-to-tr from-gold to-gold-light rounded-full flex items-center justify-center text-black font-bold">
                            SZ
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="p-8 flex-grow">
                    <Outlet />
                </main>

                <footer className="p-8 border-t border-white/5 text-gray-600 text-[10px] uppercase tracking-widest text-center">
                    © {new Date().getFullYear()} Star Zone Salon — Proprietary Management System
                </footer>
            </div>
        </div>
    );
};

export default Layout;
