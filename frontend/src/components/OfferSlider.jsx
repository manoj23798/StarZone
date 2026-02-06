import React, { useState, useEffect, useCallback } from 'react';
import './OfferSlider.css';

// Import images
import bridalMakeup from '../assets/bridal-makeup.jpg';
import facialSpa from '../assets/facial-spa.jpg';
import menService from '../assets/men-service.jpg';
import nailArt from '../assets/nail-art.jpg';
import womenService from '../assets/women-service.jpg';

import { useData } from '../context/DataContext';

const OfferSlider = () => {
    const { services } = useData();

    const rawSlides = services?.offers?.slider?.length > 0
        ? services.offers.slider
        : [
            { id: 1, img: bridalMakeup, title: "Bridal Packages", subtitle: "Exclusive Offers for Your Special Day" },
            { id: 2, img: facialSpa, title: "Skin Glow Combo", subtitle: "Premium Facials & Spa Treatments" },
            { id: 3, img: menService, title: "Men's Luxury Grooming", subtitle: "Full Service Styling & Care" },
            { id: 4, img: nailArt, title: "Creative Nail Art", subtitle: "Modern Designs & Long Lasting Care" },
            { id: 5, img: womenService, title: "Women's Hair Magic", subtitle: "Expert Cuts & Vibrant Colors" },
        ];

    const slides = rawSlides.map((s, idx) => ({
        ...s,
        id: s.id || (idx + 1),
        displayImage: s.image || s.img
    }));

    const [currentSlide, setCurrentSlide] = useState(1);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === slides.length ? 1 : prev + 1));
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === 1 ? slides.length : prev - 1));
    }, [slides.length]);

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [nextSlide, currentSlide]);

    const handleManualChange = (id) => {
        setCurrentSlide(id);
    };

    return (
        <div className="offer-slider-container">
            <div className="carousel-wrapper">
                {/* Navigation Dots */}
                <div className="dots-container">
                    {slides.map(slide => (
                        <div
                            key={slide.id}
                            className={`nav-dot ${currentSlide === slide.id ? 'active' : ''}`}
                            onClick={() => handleManualChange(slide.id)}
                            style={{
                                width: currentSlide === slide.id ? '30px' : '12px',
                                borderRadius: currentSlide === slide.id ? '10px' : '50%',
                                backgroundColor: currentSlide === slide.id ? '#d4af37' : 'rgba(255, 255, 255, 0.5)'
                            }}
                        />
                    ))}
                </div>

                {/* Arrows */}
                <button
                    className="left-arrow"
                    onClick={prevSlide}
                    style={{ display: 'flex' }}
                > &lt; </button>
                <button
                    className="right-arrow"
                    onClick={nextSlide}
                    style={{ display: 'flex' }}
                > &gt; </button>

                <div className="carousel">
                    <ul style={{
                        width: `${slides.length * 100}%`,
                        left: `-${(currentSlide - 1) * 100}%`,
                        transition: 'left 0.8s cubic-bezier(0.77, 0, 0.175, 1)',
                        display: 'flex',
                        position: 'relative',
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        height: '100%'
                    }}>
                        {slides.map((slide, idx) => (
                            <li key={slide.id} style={{ width: `${100 / slides.length}%`, height: '100%' }}>
                                <div className="slide-content" style={{ width: '100%', height: '100%', position: 'relative' }}>
                                    <img
                                        src={slide.displayImage}
                                        alt={slide.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#000' }}
                                    />
                                    {(slide.title || slide.subtitle) && (
                                        <div className="slide-overlay">
                                            <h3>{slide.title}</h3>
                                            <p>{slide.subtitle}</p>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OfferSlider;
