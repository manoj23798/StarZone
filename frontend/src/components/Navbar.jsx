import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ClipboardCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { itemCount } = useCart();

    const isCartPage = location.pathname === '/cart';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleCartClick = (e) => {
        e.preventDefault();
        if (isCartPage) {
            navigate(-1);
        } else {
            navigate('/cart');
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Men', path: '/men-services' },
        { name: 'Women', path: '/women-services' },
        { name: 'Offers', path: '/offers' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const CartIcon = () => (
        <button
            onClick={handleCartClick}
            className={`relative p-2 transition-colors cursor-pointer ${isCartPage ? 'text-gold' : 'text-white hover:text-gold'}`}
        >
            <ClipboardCheck size={24} />
            {itemCount > 0 && (
                <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gold text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                >
                    {itemCount}
                </motion.span>
            )}
        </button>
    );

    return (
        <nav
            className={`fixed w-full z-[1000] transition-all duration-500 ${scrolled ? 'bg-black-main/90 backdrop-blur-md py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-gold/10' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <img src={logo} alt="Star Zone Logo" className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-110" />
                        <span className="text-2xl md:text-3xl font-heading font-black tracking-tighter text-gold">
                            STAR <span className="text-white">ZONE</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm uppercase tracking-widest hover:text-gold transition-colors duration-300 ${location.pathname === link.path ? 'text-gold' : 'text-white'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <CartIcon />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <CartIcon />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white p-2 focus:outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black-card/95 border-t border-gold/10 overflow-hidden"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block text-xl font-heading py-2 ${location.pathname === link.path ? 'text-gold' : 'text-white'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <a
                                href="https://wa.me/918248801668"
                                className="btn-gold flex justify-center items-center space-x-2 w-full mt-4"
                            >
                                <Phone size={18} />
                                <span>BOOK APPOINTMENT</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
