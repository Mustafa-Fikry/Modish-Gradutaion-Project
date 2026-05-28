import React, { useState } from 'react'
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import elegantDress from "../../assets/Elegant_Dress.jpeg";
import luxuryBag from "../../assets/Luxury_bag.jpeg";
import blouse from "../../assets/blouse.jpeg";
import coat from "../../assets/Wool_Coat.jpeg";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();

  const Products = [
    { id: 1, name: "Premium Wool Coat", price: "89.99", imgSrc: coat },
    { id: 2, name: "Elegant Dress", price: "65.00", imgSrc: elegantDress },
    { id: 3, name: "Luxury Handbag", price: "80.99", imgSrc: luxuryBag },
    { id: 4, name: "Silk Blouse", price: "100.99", imgSrc: blouse }
  ];


  return (
    <motion.section
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.6, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.1 }}
      className="py-16 px-14 bg-[#F2F2F7] dark:bg-[#121212]"
      id="product"
    >
      <div className='flex items-center justify-between mb-12'>
        <h2
          onClick={() => navigate('/all-products')}
          className="text-3xl font-bold text-[#524B6B]  cursor-pointer hover:opacity-80 transition-opacity"
        >
          Featured Products
        </h2>
        <button
          onClick={() => navigate('/all-products')}
          className='bg-[#524B6B] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-modish-brown-hover hover:shadow-md active:scale-95'
        >
          View More
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate('/all-products')}
            className="bg-white dark:bg-[#121212] rounded-[30px] p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
          >
            <div className="relative aspect-[4/5] bg-[#F9F9F9] dark:bg-[#121212] rounded-[22px] overflow-hidden">
              <img
                src={product.imgSrc}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

            </div>

            <div className="mt-4 px-1">
              <h3 className="text-[#524B6B]  font-bold text-lg">
                {product.name}
              </h3>
              <p className="text-modish-brown font-bold text-base mt-1">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.section >
  );
};

export default Products;