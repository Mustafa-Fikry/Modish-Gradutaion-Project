// Navbar.jsx

import React, { useState } from 'react';
import { HiMenu, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '#product' },
        { name: 'About', href: '#about' },
        { name: 'Contact Us', href: '#contact' }
    ];

    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const { totalItems } = useCart();

    const { darkMode, toggleDarkMode } = useTheme();

    const user = JSON.parse(localStorage.getItem('modish-user'));

    const handleLogout = () => {
        localStorage.removeItem('modish-user');
        localStorage.removeItem('modish-token');
        window.location.reload();
        navigate('/');

    };

    return (

        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className='bg-[#F9F9F9] dark:bg-[#121212] px-14 py-6 flex justify-between items-center relative z-50 transition-colors duration-300'
        >
            <button
                onClick={() => navigate('/')}
                className='font-bold text-2xl cursor-pointer text-[#524B6B]  transition-all duration-300 hover:text-[#A48A84] hover:scale-105'
            >
                Modish
            </button>

            {/* Mobile Button */}
            <button
                className='text-3xl md:hidden block text-[#524B6B] '
                onClick={() => setIsOpen(!isOpen)}
            >
                {!isOpen ? <HiMenu /> : <HiX />}
            </button>

            {/* Nav Links */}
            <nav
                className={`absolute md:static left-0 w-full md:w-auto bg-[#F9F9F9] dark:bg-[#121212] transition-all duration-500 ease-in-out overflow-hidden
                ${isOpen
                        ? 'top-full opacity-100 max-h-[400px] visible'
                        : 'top-[80%] opacity-0 invisible md:max-h-none md:opacity-100 md:visible'
                    }`}
            >

                <ul className='flex flex-col md:flex-row gap-6 md:gap-10 w-full items-center'>

                    {navLinks.map((link) => (
                        <li
                            key={link.name}
                            className='inline-block transition-all text-[#524B6B] hover:text-[#A48A84] duration-300 ease-in-out font-medium text-lg md:text-base'
                        >
                            <a href={link.href}>{link.name}</a>
                        </li>
                    ))}

                    {/* Cart */}
                    <li>

                        <button
                            onClick={() => navigate('/cart')}
                            className='relative text-2xl text-[#524B6B] dark:bg-[#121212] hover:text-[#A48A84] transition-all duration-300 hover:scale-110'
                        >

                            🛒

                            {totalItems > 0 && (
                                <span className='absolute -top-1 -right-1 bg-[#A48A84] dark:bg-slate-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold'>
                                    {totalItems}
                                </span>
                            )}

                        </button>

                    </li>

                    {/* Dark Mode */}
                    <li>

                        <button
                            onClick={toggleDarkMode}
                            className='text-2xl transition-all duration-300 hover:scale-110'
                        >
                            {darkMode ? '☀️' : '🌙'

                            }

                        </button>

                    </li>
                    {/* Login */}
                    {!user && (
                        <li>

                            <button
                                onClick={() => navigate('/login')}
                                className='bg-[#524B6B] text-white px-8 py-2.5 rounded-full font-medium transition-all duration-300 hover:bg-[#3d3852]  hover:shadow-md active:scale-95'
                            >
                                Login
                            </button>

                        </li>
                    )}

                    {/* User */}
                    {user && (
                        <li className='flex items-center gap-3'>

                            <span className='text-[#524B6B]  font-semibold'>
                                Hi, {user.name} 👋
                            </span>

                            <button
                                onClick={handleLogout}
                                className='bg-[#524B6B]  text-white px-5 py-2 rounded-full font-medium hover:bg-[#3d3852]  transition-all duration-300 active:scale-95'
                            >
                                Log out
                            </button>

                        </li>
                    )}

                </ul>

            </nav>

        </motion.header>
    );
};

export default Navbar;