// HeroSection.jsx

import React from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

function HeroSection() {

    const navigate = useNavigate();

    return (

        <main
            id="home"
            className='px-14 py-10 bg-[#F9F9F9] dark:bg-[#121212] transition-colors duration-300'
        >

            <section className='container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>

                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.5 }}
                    className='rounded-[40px]'
                >

                    <img
                        src='https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800'
                        alt='Autumn Collection Model'
                        className='object-cover w-full h-full rounded-[40px] transition-all duration-300 hover:scale-95 cursor-pointer'
                    />

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.5 }}
                    className='flex flex-col gap-6'
                >

                    <header>

                        <h1 className='text-[#524B6B]  font-bold text-6xl md:text-7xl'>
                            Autumn Collection <br /> 2026
                        </h1>

                    </header>

                    <p className='text-gray-500 dark:text-gray-400 text-lg max-w-md'>
                        Discover our latest collection featuring premium fabrics.
                    </p>

                    <div className='font-bold text-white mt-4'>

                        <button
                            onClick={() => navigate('/all-products')}
                            className='bg-[#524B6B]  rounded-full px-12 py-4
                            transition-all duration-300
                            hover:bg-[#3d3852]  hover:shadow-xl hover:scale-105 active:scale-95'
                        >
                            Shop Now
                        </button>

                    </div>

                </motion.div>

            </section>

        </main>
    );
}

export default HeroSection;