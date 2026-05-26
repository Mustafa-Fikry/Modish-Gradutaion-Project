import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
  { name: 'Women', icon: '✨', apiCategory: "69faa0674733f01c24652a4c" },
  { name: 'Men',   icon: '👔', apiCategory: "69faa0de4733f01c24652a4d" },
  { name: 'Jewelery', icon: '💎', apiCategory: "69faa0f74733f01c24652a4e" },
];

  return (
    <motion.section
    initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.6, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    className="py-16 px-14 bg-[#F9F9F9] dark:bg-[#121212]">
      <div className="container mx-auto">

        <div className="flex items-center justify-between mb-12">
          <h2

            className="text-3xl font-bold text-[#524B6B] "
          >
            Browse Categories
          </h2>

          <button
            onClick={() => navigate('/category-products')}
            className="bg-[#524B6B] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-[#3d3852] active:scale-95 hover:shadow-md"
          >
            View All
          </button>
        </div>

        <div className="flex flex-wrap justify-around gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigate(`/category-products?category=${cat.apiCategory}`)}

              className="
                bg-white
                dark:bg-[#121212]
                rounded-[30px]
                py-10
                min-w-[150px]
                flex-1
                flex flex-col items-center justify-center gap-4
                cursor-pointer
                shadow-sm hover:shadow-lg
                transition-all duration-300
                border border-[#F3F3F3]
                group
              "
            >
              <div
                className="text-4xl"
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                {cat.icon}
              </div>

              <span className="text-lg font-semibold text-[#524B6B] dark:text-white">
                {cat.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </motion.section>
  );
};

export default Categories;