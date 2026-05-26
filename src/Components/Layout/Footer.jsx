import React from 'react';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
return (
    <motion.footer
        className="bg-[#F2F2F7] dark:bg-[#121212] pt-16 pb-8 px-6 md:px-14 border-t border-gray-200"
    >
    <div className="max-w-7xl mx-auto">

        {/* Main Footer Content - Flex Row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4 mb-16 text-left">

            {/* 1. Brand Section */}
            <div className="flex-1 min-w-[200px]">
                <h2 className="text-2xl font-bold text-[#524B6B] mb-4">Modish</h2>
                <p className="text-[#8E8684] leading-relaxed">
                    Premium fashion for the modern lifestyle. Built as a graduation project by an ambitious team.
                </p>
            </div>

            {/* 2. Navigation Section */}
            <div className="flex-1 min-w-[150px]">
                <h3 className="font-bold text-[#524B6B] mb-6 uppercase text-sm tracking-wider">Navigation</h3>
                <ul className="space-y-3 text-[#8E8684] font-medium">
                    <li><a href="/" className="hover:text-[#A48A84] transition-colors duration-300">Home</a></li>
                    <li><a href="#product" className="hover:text-[#A48A84] transition-colors duration-300">Shop</a></li>
                    <li><a href="#about" className="hover:text-[#A48A84] transition-colors duration-300">About</a></li>
                    <li><a href="#contact" className="hover:text-[#A48A84] transition-colors duration-300">Contact</a></li>
                </ul>
            </div>

            {/* 3. Social Media Section */}
            <div className="flex-1 min-w-[150px]">
                <h3 className="font-bold text-[#524B6B] mb-6 uppercase text-sm tracking-wider">Follow Us</h3>
                <div className="flex gap-5">
                    <a href="#"
                        target='_blank'
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-[#D1D1D6] text-[#524B6B] hover:bg-[#524B6B] hover:text-white transition-all duration-300 shadow-sm"
                    >
                        <FaInstagram size={20} />
                    </a>
                    <a href="https://www.facebook.com/mostafa.fikry.754/"
                        target='_blank'
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-[#D1D1D6] text-[#524B6B] hover:bg-[#524B6B] hover:text-white transition-all duration-300 shadow-sm"
                    >
                        <FaFacebookF size={18} />
                    </a>
                </div>
            </div>

            {/* 4. Contact Section */}
            <div className="flex-1 min-w-[200px]">
                <h3 className="font-bold text-[#524B6B] mb-6 uppercase text-sm tracking-wider">Contact</h3>
                <div className="text-[#8E8684] space-y-2 font-medium">
                    <p className="hover:text-[#A48A84] transition-colors cursor-pointer break-words">
                        Email: modishstore9@gmail.com
                    </p>
                    <p>Support available 24/7 for our community.</p>
                </div>
            </div>

        </div>

        {/* Bottom Bar - Copyright */}
        <div className="border-t border-[#D1D1D6] pt-8 flex flex-col md:flex-row justify-center items-center">
            <p className="text-[#AEA9A7] text-sm font-medium">
                © 2026 Modish. All rights reserved.
            </p>
        </div>
    </div>
    </motion.footer>
);
};

export default Footer;