import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useCart } from '../../context/CartContext';

const BASE_URL = 'https://gradutionapi-production.up.railway.app/api/v1/products';
const WOMEN_CATEGORY_ID = "69faa0674733f01c24652a4c";

const NewCollections = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryKey, setRetryKey] = useState(0);
    const [addedId, setAddedId] = useState(null);

    const { addToCart } = useCart();
    const [liked, setLiked] = useState([]);
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        const user = JSON.parse(localStorage.getItem('modish-user'));

        if (!user) {
            navigate('/login');
            return;
        }

        addToCart(product);

        setAddedId(product._id);

        setTimeout(() => setAddedId(null), 1000);
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
        axios
            .get(`${BASE_URL}?categories=${WOMEN_CATEGORY_ID}`)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });

    }, [retryKey]);

    useEffect(() => {
        AOS.init({
            duration: 400,
            once: true,
            easing: 'ease-out-cubic'
        });
    }, []);

    return (
        <div className='min-h-screen bg-[#F2F2F7] dark:bg-[#121212]'>

            <section className='px-14 py-14'>

                <div className='container mx-auto'>

                    <h1
                        data-aos="fade-down"
                        className="text-5xl font-bold text-[#524B6B]"
                    >
                        New Collection
                    </h1>

                    <p
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="text-[#8E8684] mt-3 text-lg"
                    >
                        Experience elegance with our minimalist design.
                    </p>

                </div>

            </section>

            <section className='px-4 py-14 md:px-14 bg-white dark:bg-[#121212] rounded-t-[50px]'>

                <div className='container mx-auto'>
                    {/* Loading */}
                    {loading && (
                        <div className="text-center py-20 text-xl font-semibold text-[#A48A84]">
                            Loading Modish...
                        </div>
                    )}
                    {/* Products */}
                    {/* Product Found */}
                    {!loading && !error && (
                        <p className='text-[#AEA9A7] p-4 font-bold text-sm uppercase tracking-widest'>
                            {products.length} Products Found
                        </p>
                    )}
                    {/* */}
                    {error && (
                        <div className="flex flex-col items-center justify-center h-60 gap-4 dark:bg-[#121212]">

                            <p className="text-red-400 text-xl font-semibold">
                                ⚠️ {error}
                            </p>

                            <button
                                onClick={() => setRetryKey(prev => prev + 1)}
                                className="px-8 py-2.5 bg-[#524B6B] text-white rounded-full font-semibold hover:bg-[#3d3852] transition-all duration-300"
                            >
                                Try Again
                            </button>

                        </div>
                    )}

                    {!loading && !error && (

                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>

                            {products.map((product, index) => (

                                <div
                                    key={product._id}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 50}
                                    className="bg-white dark:bg-[#121212]  dark:border-slate-800 rounded-[30px] p-4 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-[#F2F2F7]"
                                >

                                    <div className="relative h-64 w-full overflow-hidden rounded-[22px] bg-[#F9F9F9] dark:bg-[#121212]">

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

                                    <div className="flex flex-col gap-2 mt-4 px-1 flex-1">

                                        {/* Product info */}
                                        <h3 className="text-[15px] font-bold text-[#524B6B] line-clamp-1">
                                            {product.name}
                                        </h3>

                                        <div className='flex justify-between items-center'>

                                            <span className="text-[#A48A84] font-bold text-xl">
                                                ${product.price}
                                            </span>

                                            <div className="flex items-center gap-1 bg-[#F9F9F9]  dark:bg-[#121212] dark:border-slate-800  px-2 py-1 rounded-lg border border-gray-50">

                                                <span className="text-[#F1C40F] text-[10px]">
                                                    ⭐
                                                </span>

                                                <span className="text-[#AEA9A7] text-[12px] font-bold">
                                                    {product.rating || 4.5}
                                                </span>

                                            </div>

                                        </div>

                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className={`py-2.5 mt-2 rounded-full font-bold text-sm text-white transition-all duration-300 active:scale-95 ${addedId === product._id
                                                    ? 'bg-green-500 scale-95'
                                                    : 'bg-[#524B6B] hover:bg-[#3d3852]'
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

export default NewCollections;