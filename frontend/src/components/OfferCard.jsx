import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Plus, Check } from 'lucide-react';
import './OfferCard.css';

const OfferCard = ({ price, services = [], hoverText = "Limited Time Offer", prompt = "BOOK NOW", id }) => {
    const { addToCart, cartItems } = useCart();
    const [isAdded, setIsAdded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const itemId = id || `offer-${price}-${services.join('-')}`;
    const isInCart = cartItems.some(item => item.id === itemId);

    const handleAddToCart = (e) => {
        // Only trigger if we click while hovered or if specifically clicking the button
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const item = {
            id: itemId,
            name: `Combo Deal`,
            price: price,
            details: services.join(', '),
            type: 'offer'
        };

        addToCart(item);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div
            className={`offer-card-wrapper ${isHovered ? 'is-hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="container noselect">
                <div
                    className="canvas"
                    onClick={handleAddToCart}
                >
                    {[...Array(25)].map((_, i) => (
                        <div key={i} className={`tracker tr-${i + 1}`} />
                    ))}
                    <div id="card">
                        <div className="card-content">
                            {/* Permanent Decorative Elements */}
                            <div className="card-glare" />
                            <div className="cyber-lines">
                                <span /><span /><span /><span />
                            </div>
                            <div className="glowing-elements">
                                <div className="glow-1" />
                                <div className="glow-2" />
                                <div className="glow-3" />
                            </div>
                            <div className="card-particles">
                                <span /><span /><span /> <span /><span /><span />
                            </div>
                            <div className="corner-elements">
                                <span /><span /><span /><span />
                            </div>
                            <div className="scan-line" />

                            {/* Dynamic Content Layers */}
                            <div className="content-container">
                                {/* Default State: Price and Services */}
                                <div className="default-content">
                                    <div className="price-tag">
                                        <span className="currency">₹</span>
                                        <span className="amount">{price}</span>
                                    </div>
                                    <div className="divider" />
                                    <div className="services-list">
                                        {services.map((service, index) => (
                                            <div key={index} className="service-item">{service}</div>
                                        ))}
                                    </div>
                                    <div className="hint-container">
                                        <p id="prompt">HOVER FOR DETAILS</p>
                                    </div>
                                </div>

                                {/* Hover State: Promo Text and Add to Cart Button */}
                                <div className="hover-content">
                                    <p className="hover-text">{hoverText}</p>
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={isInCart && !isAdded}
                                        className={`book-btn flex items-center space-x-2 ${isAdded ? 'bg-gold text-black' : ''}`}
                                    >
                                        {isAdded ? <Check size={16} /> : <Plus size={16} />}
                                        <span>{isAdded ? 'Added' : isInCart ? 'Selected' : 'Add to Selection'}</span>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OfferCard;
