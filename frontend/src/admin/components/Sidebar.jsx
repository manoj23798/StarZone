import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Home,
    User,
    Users,
    Image,
    Phone,
    Settings,
    LogOut,
    Scissors
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const menuItems = [
        { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
        { title: 'Home Editor', icon: <Home size={20} />, path: '/admin/home-editor' },
        { title: 'Men Services', icon: <Scissors size={20} />, path: '/admin/men-services' },
        { title: 'Women Services', icon: <Scissors size={20} />, path: '/admin/women-services' },
        { title: 'Gallery', icon: <Image size={20} />, path: '/admin/gallery' },
        { title: 'Contact', icon: <Phone size={20} />, path: '/admin/contact' },
        { title: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-black-card border-r border-white/5 flex flex-col z-40">
            <div className="p-8">
                <span className="text-2xl font-heading font-black tracking-tighter text-gold">
                    STAR <span className="text-white">ZONE</span>
                </span>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mt-2">Admin Control Panel</p>
            </div>

            <nav className="flex-grow px-4 space-y-2 py-4">
                {menuItems.map((item) => (
                    <Link
                        key={item.title}
                        to={item.path}
                        className={`sidebar-link ${location.pathname === item.path ? 'sidebar-link-active' : ''}`}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-white/5 space-y-4">
                <div className="flex items-center space-x-3 px-4 py-3">
                    <div className="h-10 w-10 bg-gold/10 rounded-full border border-gold/20 flex items-center justify-center text-gold">
                        <User size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold truncate">Salon Owner</p>
                        <p className="text-[10px] text-gray-500">Super Admin</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-400/5 rounded-xl transition-all"
                >
                    <LogOut size={20} />
                    <span className="font-bold text-sm tracking-widest uppercase">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
