import React from 'react'
import slim from '../../assets/slim.jpg'
import comfortable from '../../assets/comfortable.jpeg'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const TopCollections = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.6, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
      className="bg-[#F2F2F7] py-16 px-4 md:px-10 dark:bg-[#121212]"
    >
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h2 className="text-4xl font-bold text-[#524B6B] dark:text-[white] tracking-tight">
            Top Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* الكارت الأول */}
          <div className="group flex flex-col md:flex-row bg-white dark:bg-[#121212] rounded-[45px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="md:w-1/2 h-[350px] overflow-hidden">
              <img
                src={slim}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Slim & Beauty"
              />
            </div>
            <div className="md:w-1/2 p-10 flex flex-col justify-center items-start">
              <h3 className="text-3xl font-bold text-[#524B6B]  mb-3">For Slim & Beauty</h3>
              <p className="text-gray-400  text-lg mb-8">Enhance your natural elegance</p>
              <button
                onClick={() => navigate('/slim-beauty')}
                className="bg-[#524B6B] text-white px-8 py-3 rounded-full font-bold hover:bg-[#3d3852] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Shop Collection
              </button>
            </div>
          </div>

          <div className="group flex flex-col md:flex-row-reverse bg-white dark:bg-[#121212] rounded-[45px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="md:w-1/2 h-[350px] overflow-hidden">
              <img
                src={comfortable}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Comfortable Design"
              />
            </div>
            <div className="md:w-1/2 p-10 flex flex-col justify-center items-start">
              <h3 className="text-3xl font-bold text-[#524B6B]  mb-3 leading-tight">
                Most Comfortable & <br/> Fabulous Design
              </h3>
              <p className="text-gray-400 text-lg mb-8">Premium comfort meets style</p>
              <button
                onClick={() => navigate('/comfortable-design')}
                className="bg-[#524B6B] text-white px-8 py-3 rounded-full font-bold hover:bg-[#3d3852] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Shop Collection
              </button>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default TopCollections;