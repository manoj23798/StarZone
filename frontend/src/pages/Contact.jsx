import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { MapPin, Phone, Instagram, Send, Clock } from 'lucide-react';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

const Contact = () => {
    const { services, loading } = useData();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: 'Hair Cut & Styling',
        message: ''
    });

    if (loading || !services) return <div className="h-screen bg-black flex items-center justify-center text-gold font-heading text-2xl animate-pulse">Establishing Connection...</div>;

    const { contact } = services;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Format the message for WhatsApp
        const text = `*New Inquiry from Star Zone Website*%0A%0A` +
            `*Name:* ${formData.name}%0A` +
            `*Phone:* ${formData.phone}%0A` +
            `*Service:* ${formData.service}%0A` +
            `*Message:* ${formData.message}`;

        // Shop Owner's WhatsApp Number (from Navbar)
        const whatsappNumber = "918248801668";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <PageTransition>
            <SEO
                title="Contact & Booking | Visit Erode's Best Salon"
                description="Book your luxury experience at Star Zone Salon today. Find our location in Erode, call us, or send us a WhatsApp message directly."
                url="/contact"
            />
            <div className="pt-32 pb-24 px-4 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="Connect With Us"
                        subtitle="Let's start your transformation"
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Info and Map */}
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-3xl font-heading text-white mb-8">Visit The Zone</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-6 group">
                                        <div className="p-4 bg-gold/10 rounded-full group-hover:bg-gold transition-colors text-gold group-hover:text-black">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-1">Our Address</h4>
                                            <p className="text-gray-400 leading-relaxed max-w-sm">
                                                {contact.address}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-6 group">
                                        <div className="p-4 bg-gold/10 rounded-full group-hover:bg-gold transition-colors text-gold group-hover:text-black">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-1">Call Us</h4>
                                            <p className="text-gray-400">{contact.phones.join(' / ')}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-6 group">
                                        <div className="p-4 bg-gold/10 rounded-full group-hover:bg-gold transition-colors text-gold group-hover:text-black">
                                            <Instagram size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-1">Follow Us</h4>
                                            <a href={`https://instagram.com/${contact.instagram.replace('@', '')}`} className="text-gray-400 hover:text-gold transition-colors">{contact.instagram}</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-6 group">
                                        <div className="p-4 bg-gold/10 rounded-full group-hover:bg-gold transition-colors text-gold group-hover:text-black">
                                            <Clock size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-1">Working Hours</h4>
                                            <p className="text-gray-400">Mon - Sun: 09:00 AM - 09:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Embed */}
                            <div className="rounded-3xl overflow-hidden h-[300px] border border-gold/20 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
                                <iframe
                                    src={contact.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15651.983734493392!2d77.72!3d11.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96bd28537b0d7%3A0xe5a14d8753239e9d!2sBhavani%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1715423456789!5m2!1sen!2sin"}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>

                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="glass-card p-12 bg-black-card/50"
                        >
                            <h3 className="text-3xl font-heading text-gold mb-8">Send A Message</h3>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-gold font-bold">Full Name</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            type="text"
                                            required
                                            className="w-full bg-black border border-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-gold font-bold">Phone Number</label>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            type="tel"
                                            required
                                            className="w-full bg-black border border-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                                            placeholder="98765 43210"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-gold font-bold">Service Interested In</label>
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full bg-black border border-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                                    >
                                        <option>Hair Cut & Styling</option>
                                        <option>Global Colouring</option>
                                        <option>Bridal Makeup</option>
                                        <option>Luxury Skin Treatment</option>
                                        <option>Manicure / Pedicure</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-gold font-bold">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        required
                                        className="w-full bg-black border border-gold/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                                        placeholder="I would like to book an appointment for tomorrow..."
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn-gold w-full flex items-center justify-center space-x-3">
                                    <Send size={18} />
                                    <span>SEND MESSAGE</span>
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Contact;
