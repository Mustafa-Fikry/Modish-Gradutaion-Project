import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://gradutionapi-production.up.railway.app/api/v1';
const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const user   = JSON.parse(localStorage.getItem('modish-user'));
    const userId = user?.id;

    const [cart, setCart]             = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    {/* Fetch Data */}
    const fetchCart = () => {
        if (!userId) return;
        axios.get(`${BASE_URL}/cart/${userId}`)
            .then((res) => {
                setCart(res.data.cartItems || []);
                setTotalPrice(res.data.totalPrice || 0);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchCart();
    }, [userId]);

    const addToCart = (product) => {
        axios.post(`${BASE_URL}/cart/AddItems`, {
            user:      userId,
            productId: product._id,
            price:     product.price,
        })
        .then(() => fetchCart())
        .catch((err) => console.log(err));
    };

    const removeFromCart = (productId) => {
        axios.delete(`${BASE_URL}/cart/items/${productId}`, {
            data: { userId }
        })
        .then(() => fetchCart())
        .catch((err) => console.log(err));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        axios.put(`${BASE_URL}/cart/items/${productId}`, {
            userId,
            quantity
        })
        .then(() => fetchCart())
        .catch((err) => console.log(err));
    };

    const clearCart = () => {
        axios.delete(`${BASE_URL}/cart/${userId}`)
            .then(() => {
                setCart([]);
                setTotalPrice(0);
            })
            .catch((err) => console.log(err));
    };

    return (
        <CartContext.Provider value={{
            cart,
            totalPrice,
            totalItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);