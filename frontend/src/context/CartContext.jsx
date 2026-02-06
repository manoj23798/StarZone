import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('salon_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('salon_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        // item should have: id, name, price, type (service/offer)
        const exists = cartItems.find(i => i.id === item.id && i.name === item.name);
        if (!exists) {
            setCartItems([...cartItems, item]);
            return true;
        }
        return false;
    };

    const removeFromCart = (id, name) => {
        setCartItems(cartItems.filter(i => !(i.id === id && i.name === name)));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const calculateTotal = () => {
        let min = 0;
        let max = 0;

        cartItems.forEach(item => {
            const priceStr = item.price.toString();
            // Handle split formats like "1999 / 2999" or "199-299"
            const parts = priceStr.split(/[/-]/).map(p =>
                parseFloat(p.trim().replace(/[^0-9.]/g, ''))
            ).filter(p => !isNaN(p));

            if (parts.length >= 2) {
                min += Math.min(...parts);
                max += Math.max(...parts);
            } else if (parts.length === 1) {
                min += parts[0];
                max += parts[0];
            }
        });

        return min === max ? `₹${min}` : `₹${min} / ${max}`;
    };

    const totalPrice = calculateTotal();

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            totalPrice,
            itemCount: cartItems.length
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
