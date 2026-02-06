import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, Sparkles, Heart, Star, Phone, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { useData } from '../context/DataContext';

// Import Assets
import menService from '../assets/men-service.jpg';
import womenService from '../assets/women-service.jpg';
import bridalMakeup from '../assets/bridal-makeup.jpg';
import facialSpa from '../assets/facial-spa.jpg';
import nailArt from '../assets/nail-art.jpg';
import logo from '../assets/logo.png';
import starAsset from '../assets/star.png';

import SEO from '../components/SEO';

const Home = () => {
    const { services, loading } = useData();

    const highlights = [
        {
            title: 'Hair Care',
            desc: 'Expert cuts and styling tailored to your unique personality.',
            icon: <Scissors className="text-gold" size={32} />,
            link: '/men-services',
        },
        {
            title: 'Skin Care',
            desc: 'Rejuvenating facials and treatments for a radiant, healthy glow.',
            icon: <Sparkles className="text-gold" size={32} />,
            link: '/women-services',
        },
        {
            title: 'Bridal Makeup',
            desc: 'Making your special day even more magical with luxury makeup.',
            icon: <Heart className="text-gold" size={32} />,
            link: '/women-services',
        },
        {
            title: 'Nail Art',
            desc: 'Intricate designs and relaxing manicures for the perfect finish.',
            icon: <Star className="text-gold" size={32} />,
            link: '/women-services',
        },
    ];

    if (loading || !services) return (
        <div className="h-screen bg-black flex flex-col items-center justify-center space-y-4 px-6">
            <motion.img
                src={logo}
                alt="Logo"
                className="h-20 w-auto object-contain"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="text-gold font-heading text-2xl animate-pulse text-center">Star Zone is Loading...</div>
        </div>
    );

    const { heroTitle, heroSubtitle, heroTagline, heroImage } = services.homeContent;

    return (
        <PageTransition>
            <SEO
                title="Home | Premium Unisex Salon in Erode"
                description="Welcome to Star Zone Salon. Experience the finest hair styling, bridal makeup, and skin care treatments in Erode. Your radiance starts here."
                url="/"
            />
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden pt-48 md:pt-20">
                {/* Background Overlay */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/70 z-10" />
                    <img
                        src={heroImage}
                        alt="Luxury Salon"
                        className="w-full h-full object-cover"
                    />

                    {/* Floating Particles */}
                    <div className="absolute inset-0 z-[12] pointer-events-none">
                        {[...Array(30)].map((_, i) => (
                            <div
                                key={i}
                                className="floating-particle shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${70 + Math.random() * 30}%`,
                                    width: `${4 + Math.random() * 4}px`,
                                    height: `${4 + Math.random() * 4}px`,
                                    backgroundColor: '#FFFFFF',
                                    opacity: 0.8,
                                    '--duration': `${6 + Math.random() * 10}s`,
                                    animationDelay: `${Math.random() * 10}s`
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="relative z-20 text-center px-4 max-w-7xl w-full pb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10"
                    >
                        <div className="aura-glow">
                            <motion.img
                                src={starAsset}
                                alt="StarLogo"
                                className="w-32 md:w-56 lg:w-72 h-auto opacity-95 glint-effect"
                            />
                        </div>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading leading-tight pt-4 text-center md:text-left">
                            <span className="text-white block tracking-tighter">
                                {heroTitle.split(' ')[0]}
                            </span>
                            <span className="gold-gradient block tracking-tighter glint-effect pb-2">
                                {heroTitle.split(' ')[1] || ''}
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-gray-300 text-lg md:text-xl font-light tracking-[0.3em] uppercase mb-12 max-w-2xl mx-auto"
                    >
                        {heroSubtitle} — {heroTagline}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="flex flex-col sm:flex-row justify-center gap-6"
                    >
                        <Link to="/contact" className="btn-gold group flex items-center justify-center space-x-3 px-10 py-4 text-sm tracking-widest">
                            <span>RESERVE YOUR RADIANCE</span>
                            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                        <Link to="/women-services" className="btn-outline-gold px-10 py-4 text-sm tracking-widest bg-black/20 backdrop-blur-sm">
                            EXPLORE THE MENU
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
                    animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <div className="w-8 h-12 border-2 border-gold/40 rounded-full flex justify-center p-1 backdrop-blur-sm">
                        <div className="w-1.5 h-2.5 bg-gold rounded-full shadow-[0_0_10px_rgba(218,165,32,1)]" />
                    </div>
                </motion.div>
            </section>

            {/* Highlights Section */}
            <section className="py-24 bg-black-main px-4" >
                <div className="max-w-7xl mx-auto">
                    <SectionHeader title="Our Specialties" subtitle="Excellence in every touch" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {highlights.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card group"
                            >
                                <div className="mb-6 p-4 bg-gold/10 rounded-xl inline-block group-hover:bg-gold/20 transition-colors">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-heading mb-4 text-white group-hover:text-gold transition-colors">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">{item.desc}</p>
                                <Link to={item.link} className="text-gold text-xs font-bold tracking-[0.2em] flex items-center group/link">
                                    VIEW MORE <ArrowRight size={14} className="ml-2 group-hover/link:translate-x-2 transition-transform" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gold relative overflow-hidden" >
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[200%] rotate-12 bg-gradient-to-b from-white to-transparent" />
                </div>
                <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <h2 className="text-black-main text-4xl md:text-6xl font-heading mb-8">Ready for a Transformation?</h2>
                    <p className="text-black/80 text-lg mb-12 max-w-2xl mx-auto">
                        Experience the finest grooming and beauty treatments in Erode. Our experts are ready to give you the royal treatment you deserve.
                    </p>
                    <a
                        href="tel:+918248801668"
                        className="inline-flex items-center space-x-4 bg-black-main text-gold px-12 py-5 rounded-full text-xl font-bold hover:bg-black/90 transition-all hover:scale-105 shadow-2xl"
                    >
                        <Phone size={24} />
                        <span>+91 82488 01668</span>
                    </a>
                </div>
            </section>

            {/* Mini Gallery Preview */}
            <section className="py-24 bg-black-card px-4" >
                <div className="max-w-7xl mx-auto">
                    <SectionHeader title="Visual Magic" subtitle="A glimpse of our work" />

                    <div className="space-y-6">
                        {/* Top Row: Two Large Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "Men's Grooming",
                                    desc: "Premium haircuts, beard styling & spa treatments",
                                    img: menService,
                                    link: "/men-services"
                                },
                                {
                                    title: "Women's Beauty",
                                    desc: "Hair styling, facials, makeup & complete beauty care",
                                    img: womenService,
                                    link: "/women-services"
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer"
                                >
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                                        <h3 className="text-3xl md:text-4xl font-heading text-white mb-2">{item.title}</h3>
                                        <p className="text-gray-300 text-sm md:text-base mb-6 max-w-sm">{item.desc}</p>
                                        <Link to={item.link} className="text-gold font-bold flex items-center space-x-2 group/link">
                                            <span>View Services</span>
                                            <ArrowRight size={18} className="group-hover/link:translate-x-2 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Bottom Row: Three Medium Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Bridal Makeup",
                                    img: bridalMakeup,
                                    link: "/women-services"
                                },
                                {
                                    title: "Facial & Spa",
                                    img: facialSpa,
                                    link: "/women-services"
                                },
                                {
                                    title: "Nail Art",
                                    img: nailArt,
                                    link: "/women-services"
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative h-[280px] rounded-3xl overflow-hidden group cursor-pointer"
                                >
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                                        <h3 className="text-2xl font-heading text-white">{item.title}</h3>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/gallery" className="btn-outline-gold">VIEW FULL GALLERY</Link>
                    </div>
                </div>
            </section>
        </PageTransition>
    );
};

export default Home;
