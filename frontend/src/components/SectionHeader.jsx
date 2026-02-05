import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle, centered = true }) => {
    return (
        <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
            <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block"
            >
                {subtitle}
            </motion.span>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-6xl font-heading text-white"
            >
                {title}
            </motion.h2>
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`w-24 h-1 bg-gold mt-6 ${centered ? 'mx-auto' : ''}`}
            />
        </div>
    );
};

export default SectionHeader;
