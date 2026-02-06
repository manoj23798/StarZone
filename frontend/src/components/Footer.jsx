import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-black-card border-t border-gold/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center space-x-3 group mb-6">
                            <img src={logo} alt="Star Zone Logo" className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-110" />
                            <span className="text-3xl font-heading font-black tracking-tighter text-gold">
                                STAR <span className="text-white">ZONE</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Your premier destination for luxury hair and beauty care. Experience the magic of transformation with our expert stylists and premium treatments in a royal ambiance.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://instagram.com/starzone_unisex_hairbeautycare"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 border border-gold/30 rounded-full flex items-center justify-center hover:bg-gold hover:text-black-main transition-all duration-300"
                            >
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-gold font-heading text-lg mb-6 uppercase tracking-widest">Navigation</h4>
                        <ul className="space-y-4">
                            {['Home', 'Men Services', 'Women Services', 'Gallery', 'About', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-gray-400 hover:text-gold flex items-center transition-colors duration-300 group"
                                    >
                                        <ChevronRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-gold font-heading text-lg mb-6 uppercase tracking-widest">Our Specialties</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li>Premium Hair Styling</li>
                            <li>Advanced Hydra Facials</li>
                            <li>Luxury Bridal Makeup</li>
                            <li>Nail Art & Spa</li>
                            <li>Professional Hair Treatments</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-gold font-heading text-lg mb-6 uppercase tracking-widest">Find Us</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start space-x-3 text-gray-400">
                                <MapPin size={24} className="text-gold flex-shrink-0" />
                                <span className="text-sm">5/925 B, Kalingarayan Palayam Main Road, Near Mysore Filter Coffee, Palaniandavar Kovil Opp, Erode - 638301.</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400">
                                <Phone size={20} className="text-gold flex-shrink-0" />
                                <span className="text-sm">82488 01668 / 90805 18299</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400">
                                <Mail size={20} className="text-gold flex-shrink-0" />
                                <span className="text-sm">contact@starzone.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs text-center md:text-left gap-4">
                    <p>© {new Date().getFullYear()} Star Zone – Unisex Hair & Style Salon. All rights reserved.</p>
                    <p>Designed for Luxury & Elegance</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
