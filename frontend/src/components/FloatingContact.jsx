import { motion } from 'framer-motion';
import { MessageSquare, Phone } from 'lucide-react';

const FloatingContact = () => {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
            {/* Phone Number Floating Button */}
            <motion.a
                href="tel:918248801668"
                className="bg-gold text-black p-3.5 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all duration-300 group flex items-center justify-center relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
            >
                <Phone size={22} fill="currentColor" />
                <span className="absolute right-full mr-4 bg-black/80 text-white text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-2xl">
                    CALL US: +91 82488 01668
                </span>
            </motion.a>

            {/* WhatsApp Floating Button */}
            <motion.a
                href="https://wa.me/918248801668"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold text-black p-3.5 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all duration-300 group flex items-center justify-center relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <MessageSquare size={22} />
                <span className="absolute right-full mr-4 bg-black/80 text-white text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-2xl">
                    WHATSAPP US
                </span>
            </motion.a>
        </div>
    );
};

export default FloatingContact;
