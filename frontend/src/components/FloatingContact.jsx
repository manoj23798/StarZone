import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone, X, MessageCircle } from 'lucide-react';

const FloatingContact = () => {
    const [isOpen, setIsOpen] = useState(false);

    const contactOptions = [
        {
            icon: <Phone size={20} fill="currentColor" />,
            href: "tel:918248801668",
            color: "bg-gold",
            label: "Call Us",
            subtitle: "+91 82488 01668"
        },
        {
            icon: <MessageSquare size={20} />,
            href: "https://wa.me/918248801668",
            color: "bg-gold",
            label: "WhatsApp",
            subtitle: "Instant Chat"
        }
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[2000] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="flex flex-col items-end space-y-3 mb-4"
                    >
                        {contactOptions.map((option, index) => (
                            <motion.a
                                key={index}
                                href={option.href}
                                target={option.href.startsWith('http') ? "_blank" : undefined}
                                rel={option.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`${option.color} text-black p-4 rounded-full shadow-2xl hover:scale-110 transition-transform group relative flex items-center justify-center`}
                            >
                                {option.icon}

                                {/* Tooltip */}
                                <div className="absolute right-full mr-4 bg-black/90 backdrop-blur-md border border-white/10 text-white p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-2xl scale-90 group-hover:scale-100">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-0.5">{option.label}</p>
                                    <p className="text-xs font-medium text-gray-300">{option.subtitle}</p>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`${isOpen ? 'bg-black-card text-gold' : 'bg-gold text-black'} p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-500 flex items-center justify-center relative border border-gold/20`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="relative">
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <X size={24} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                className="flex items-center justify-center"
                            >
                                <MessageCircle size={24} />
                                {/* Pulsing Ring */}
                                <div className="absolute inset-0 bg-black/20 rounded-full animate-ping scale-150 opacity-20" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.button>
        </div>
    );
};

export default FloatingContact;
