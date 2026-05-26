import React, { useState, useEffect } from 'react';
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useCart } from '../../context/CartContext';

const categories = [
  { name: 'All', icon: '🛍️', apiCategory: '' },
  { name: "Women's section", icon: '✨', apiCategory: "69faa0674733f01c24652a4c" },
  { name: "Men's section", icon: '👔', apiCategory: "69faa0de4733f01c24652a4d" },
  { name: 'Jewelery', icon: '💎', apiCategory: "69faa0f74733f01c24652a4e" },
];

const BASE_URL = 'https://gradutionapi-production.up.railway.app/api/v1/products';

const CategoryProducts = () => {

  const [activeCategory, setActiveCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);
  const [liked, setLiked] = useState([]);
  const [addedId, setAddedId] = useState(null);

  const { addToCart } = useCart();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('modish-user'));

  const handleAddToCart = (product) => {

    if (!user) {
      navigate('/login');
      return;
    }

    addToCart(product);

    setAddedId(product._id);

    setTimeout(() => {
      setAddedId(null);
    }, 1000);

  };

  const toggleLiked = (e, id) => {

    e.preventDefault();
    e.stopPropagation();

    if (liked.includes(id)) {

      setLiked(liked.filter(item => item !== id));

    } else {

      setLiked([...liked, id]);

    }

  };

  useEffect(() => {

    setLoading(true);
    setError(null);

    const url = activeCategory
      ? `${BASE_URL}?categories=${activeCategory}`
      : BASE_URL;

    axios.get(url)

      .then((res) => {

        setProducts(res.data);
        setLoading(false);

      })

      .catch((err) => {

        setError(err.message || 'Connection failed');
        setLoading(false);

      });

  }, [activeCategory, retryKey]);

  useEffect(() => {

    AOS.init({
      duration: 500,
      once: true,
      easing: 'ease-out-cubic'
    });

  }, []);

  return (

    <div className="min-h-screen bg-[#F2F2F7] dark:bg-[#121212]">
      <section className="px-14 py-14">

        <div className="container mx-auto">

          <h1 className="text-5xl font-bold text-[#524B6B]">

            {activeCategory
              ? categories.find((c) => activeCategory === c.apiCategory)?.name
              : 'Shop By Category'}

          </h1>

          <p className="text-[#8E8684] mt-3 text-lg">
            Browse our collections and find your perfect style.
          </p>

        </div>

      </section>

      {/* Categories */}
      <section className="bg-white dark:bg-[#121212] py-14 px-14 shadow-sm rounded-t-[50px] ">

        <div className="container mx-auto flex flex-wrap gap-3 ">

          {categories.map((cat) => (

            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.apiCategory)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300
            ${activeCategory === cat.apiCategory
                  ? 'bg-[#A48A84] text-white shadow-md dark:bg-[#121212]'
                  : 'bg-[#F9F9F9] text-[#524B6B] dark:bg-[#121212] hover:bg-[#F2EEED]'}`}
            >

              <span>{cat.icon}</span>

              <span>{cat.name}</span>

            </button>

          ))}

        </div>

      </section>

      {/* Products */}
      <section className="py-14 px-14 bg-white dark:bg-[#121212]">

        <div className="container mx-auto">

          {!loading && !error && (

            <p className="text-[#8E8684] mb-8 font-medium">
              {products.length} Products Found
            </p>

          )}

          {loading && (

            <div className="text-center py-20 text-xl font-semibold text-[#A48A84]">
              Loading Modish...
            </div>

          )}

          {error && (

            <div className="flex flex-col items-center justify-center h-60 gap-4">

              <p className="text-red-400 text-xl font-semibold">
                ⚠️ {error}
              </p>

              <button
                onClick={() => setRetryKey(prev => prev + 1)}
                className="px-8 py-2.5 bg-[#A48A84] text-white rounded-full font-semibold dark:bg-[#121212] dark:hover:bg-[#524B6B] hover:bg-[#8e756f]"
              >
                Try Again
              </button>

            </div>

          )}

          {!loading && !error && (

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

              {products.map((product, index) => (

                <div
                  key={product._id}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  className="bg-white dark:bg-[#121212] dark:border-slate-800 rounded-[30px] p-4 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-[#F2EEED]"
                >

                  {/* Image */}
                  <div className="relative h-64 w-full overflow-hidden rounded-[22px] bg-[#F9F9F9] dark:bg-[#121212] ">

                    <Link
                      to={`/product/fs/${product._id}`}
                      className="w-full h-full block"
                    >

                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                    </Link>



                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-2 mt-4 px-1 flex-1">

                    <h3 className="text-[15px] font-bold text-[#524B6B] line-clamp-1">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between">

                      <span className="text-[#524B6B] font-bold text-xl">
                        ${product.price}
                      </span>

                      <div className="flex items-center gap-1 bg-[#F9F9F9] dark:bg-[#18181C] dark:border-slate-800 px-2 py-1 rounded-lg border border-gray-50">
                        <span className="text-[#F1C40F] text-[10px]">⭐</span>
                        <span className="text-[#AEA9A7] text-[12px] font-bold">
                          {product.rating}
                        </span>
                      </div>

                    </div>

                    {/* Add to Cart */}
                    <button
                      onClick={(e) => {

                        e.preventDefault();
                        e.stopPropagation();

                        handleAddToCart(product);

                      }}
                      className={`py-2.5 mt-2 rounded-full font-semibold text-sm transition-all duration-300 active:scale-95 ${addedId === product._id
                          ? 'bg-green-500 text-white scale-95'
                          : 'bg-[#524B6B] hover:bg-[#3d3852] text-white'
                        }`}
                    >

                      {addedId === product._id
                        ? '✅ Added!'
                        : 'Add to Cart 🛒'}

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

    </div>

  );
};

export default CategoryProducts;