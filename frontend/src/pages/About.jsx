import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { Target, Eye, Gem } from 'lucide-react';
import aboutImg from '../assets/about.png';
import SEO from '../components/SEO';

const About = () => {
    return (
        <PageTransition>
            <SEO
                title="Our Story | Excellence in Style"
                description="Experience the mission of Star Zone Salon. Dedicated to providing premium, personalized grooming experiences for everyone in Erode since inception."
                url="/about"
            />
            <div className="pt-32 pb-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Decorative Corner Design */}
                            <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 bg-gold rounded-[3rem] -z-0" />

                            <img
                                src={aboutImg}
                                alt="Salon Interior"
                                className="rounded-3xl shadow-2xl border border-gold/10 relative z-10 w-full h-auto"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs">Royal Experience</span>
                            <h2 className="text-5xl md:text-7xl font-heading text-white">Your Star Zone Journey</h2>
                            <p className="text-gray-400 text-lg leading-relaxed flex items-center flex-wrap gap-2">
                                Welcome to
                                <span className="flex items-center space-x-2 bg-gold/5 px-3 py-1 rounded-full border border-gold/10">
                                    <img src={aboutImg} alt="Logo" className="h-5 w-auto object-contain" />
                                    <span className="text-gold font-bold italic">Star Zone</span>
                                </span>
                                – Unisex Hair & Style Salon, where we believe every individual deserves to be treated like royalty. Founded with a vision to redefine beauty standards in Erode, we combine tradition with modern techniques.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                Our team of certified professionals is dedicated to providing personalized care. Whether it's a simple trim or a complete bridal transformation, we use only the most premium products to ensure your hair and skin receive the best treatment possible.
                            </p>
                            <div className="pt-6 grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-4xl font-heading text-gold mb-1">5★</p>
                                    <p className="text-xs tracking-widest text-gray-500 uppercase">Customer Rating</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-heading text-gold mb-1">10+</p>
                                    <p className="text-xs tracking-widest text-gray-500 uppercase">Expert Stylists</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Vision/Mission */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="glass-card text-center p-12">
                            <div className="inline-block p-4 bg-gold/10 rounded-2xl mb-6 text-gold">
                                <Target size={40} />
                            </div>
                            <h3 className="text-2xl font-heading mb-4">Our Mission</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                To provide world-class grooming services that empower our clients and boost their confidence through exceptional skill and hospitality.
                            </p>
                        </div>
                        <div className="glass-card text-center p-12 border-gold/40">
                            <div className="inline-block p-4 bg-gold/10 rounded-2xl mb-6 text-gold">
                                <Eye size={40} />
                            </div>
                            <h3 className="text-2xl font-heading mb-4">Our Vision</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                To become Erode's most trusted luxury salon brand, known for innovation, quality, and an unforgettable royal experience.
                            </p>
                        </div>
                        <div className="glass-card text-center p-12">
                            <div className="inline-block p-4 bg-gold/10 rounded-2xl mb-6 text-gold">
                                <Gem size={40} />
                            </div>
                            <h3 className="text-2xl font-heading mb-4">Core Values</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                We prioritize hygiene, customer satisfaction, and continuous learning to stay at the forefront of global style trends.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default About;
