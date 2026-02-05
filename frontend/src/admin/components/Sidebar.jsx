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
    Scissors,
    X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import star from '../../assets/star.png';

const Sidebar = ({ isOpen, onClose }) => {
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
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`fixed left-0 top-0 h-full w-64 bg-black-card border-r border-white/5 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-8 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img src={star} alt="Star Zone Logo" className="w-8 h-8 object-contain" />
                        <div>
                            <span className="text-xl font-heading font-black tracking-tighter text-gold">
                                STAR <span className="text-white">ZONE</span>
                            </span>
                            <p className="text-[8px] text-gray-500 uppercase tracking-[0.2em]">Admin Panel</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="lg:hidden p-2 text-gray-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-grow px-4 space-y-2 py-4 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.title}
                            to={item.path}
                            onClick={() => onClose()}
                            className={`sidebar-link ${location.pathname === item.path ? 'sidebar-link-active' : ''}`}
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5 space-y-4">
                    <div className="flex items-center space-x-3 px-4 py-3">
                        <div className="h-10 w-10 border border-gold/20 rounded-full overflow-hidden">
                            <img src={star} alt="Admin" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="text-xs font-bold truncate">Salon Owner</p>
                            <p className="text-[10px] text-gray-500">Super Admin</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-400/5 rounded-xl transition-all font-bold text-sm tracking-widest uppercase"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
