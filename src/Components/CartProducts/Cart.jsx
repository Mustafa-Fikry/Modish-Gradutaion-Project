import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';

const Cart = () => {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        totalItems
    } = useCart();

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#121212]">

            {/* HERO SECTION */}
            <section className="bg-[#F2F2F7] dark:bg-[#121212] py-14 px-14">
                <div className="container mx-auto">

                    {/* Page Title Animation */}
                    <motion.h1
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="text-5xl font-bold text-[#524B6B]"
                    >
                        My Cart 🛒
                    </motion.h1>

                    {/* Cart Items Count */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-[#8E8684] mt-3 text-lg"
                    >
                        {totalItems} Items in your cart
                    </motion.p>

                </div>
            </section>

            <section className="py-14 px-14">
                <div className="container mx-auto">

                    {/* EMPTY CART STATE */}
                    {cart.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-60 gap-4">

                            {/* Empty Cart Icon */}
                            <p className="text-6xl">🛒</p>

                            {/* Empty Message */}
                            <p className="text-[#8E8684] text-xl font-semibold">
                                Your cart is empty!
                            </p>

                            {/* Redirect to Shopping */}
                            <button
                                onClick={() => navigate('/all-products')}
                                className="bg-[#524B6B] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[#3d3852]  hover:shadow-md"
                            >
                                Start Shopping
                            </button>

                        </div>
                    )}

                    {/* CART ITEMS LIST */}
                    {cart.length > 0 && (
                        <div className="flex flex-col lg:flex-row gap-8">

                            {/* PRODUCTS LIST */}
                            <div className="flex-1 flex flex-col gap-4">

                                {cart.map((item, index) => (
                                    <motion.div
                                        key={item._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        className="bg-white dark:bg-[#121212] rounded-[25px] p-5 flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-5 shadow-md"
                                    >

                                        {/* Product Image */}
                                        <img
                                            src={item.product?.image}
                                            alt={item.product?.name}
                                            className="w-24 h-24 object-contain rounded-[15px] bg-[#F9F9F9] p-2"
                                        />

                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-[#524B6B] line-clamp-1">
                                                {item.product?.name}
                                            </h3>
                                            <p className="text-[#A48A84] font-bold text-lg mt-1">
                                                ${item.price}
                                            </p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3 ">

                                            {/* Decrease Quantity */}
                                            <button
                                                onClick={() => updateQuantity(item.product?._id, item.quantity - 1)}
                                                className="w-8 h-8 rounded-full bg-[#F2EEED] dark:bg-[#524B6B] dark:text-white font-bold text-[#524B6B] hover:bg-[#A48A84] hover:text-white transition-colors duration-300"
                                            >
                                                -
                                            </button>

                                            {/* Quantity Value */}
                                            <span className="font-semibold text-[#524B6B] w-6 text-center dark:bg-[#524B6B] dark:text-white dark:rounded-full">
                                                {item.quantity}
                                            </span>

                                            {/* Increase Quantity */}
                                            <button
                                                onClick={() => updateQuantity(item.product?._id, item.quantity + 1)}
                                                className="w-8 h-8 rounded-full bg-[#F2EEED] dark:bg-[#524B6B] dark:text-white font-bold  text-[#524B6B] hover:bg-[#A48A84] hover:text-white transition-colors duration-300"
                                            >
                                                +
                                            </button>

                                        </div>

                                        {/* Total Price Per Item */}
                                        <p className="font-bold text-[#524B6B] text-lg w-20 text-right">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>

                                        {/* Remove Item */}
                                        <button
                                            onClick={() => removeFromCart(item.product?._id)}
                                            className="text-red-400 hover:text-red-600 transition-colors duration-300 text-xl"
                                        >
                                            🗑️
                                        </button>

                                    </motion.div>
                                ))}

                            </div>

                            {/* ORDER SUMMARY */}
                            <div className="lg:w-80">

                                <div className="bg-white dark:bg-[#121212] rounded-[25px] p-6 shadow-md sticky top-24">

                                    {/* Title */}
                                    <h2 className="text-xl font-bold text-[#524B6B] mb-6">
                                        Order Summary
                                    </h2>

                                    {/* Items Total */}
                                    <div className="flex justify-between mb-3 text-[#8E8684]">
                                        <span>Items ({totalItems})</span>
                                        <span>${totalPrice}</span>
                                    </div>

                                    {/* Shipping Info */}
                                    <div className="flex justify-between mb-3 text-[#8E8684]">
                                        <span>Shipping</span>
                                        <span className="text-green-500 font-semibold">Free</span>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-[#F2EEED] my-4" />

                                    {/* Total Price */}
                                    <div className="flex justify-between font-bold text-[#524B6B] text-lg mb-6">
                                        <span>Total</span>
                                        <span>${totalPrice}</span>
                                    </div>

                                    {/* Checkout Button */}
                                    <button
                                        onClick={() => navigate('/checkout')}
                                        className="w-full bg-[#524B6B] text-white py-3 rounded-full font-semibold hover:bg-[#3d3852] transition-colors duration-300 mb-3"
                                    >
                                        Checkout →
                                    </button>

                                    {/* Clear Cart Button */}
                                    <button
                                        onClick={clearCart}
                                        className="w-full border border-red-300 text-red-400 py-3 rounded-full font-semibold hover:bg-red-50 transition-colors duration-300"
                                    >
                                        Clear Cart 🗑️
                                    </button>

                                </div>
                            </div>

                        </div>
                    )}

                </div>
            </section>
        </div>
    );
};

export default Cart;