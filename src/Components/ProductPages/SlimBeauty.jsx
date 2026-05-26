import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useCart } from '../../context/CartContext';

const BASE_URL = 'https://gradutionapi-production.up.railway.app/api/v1/products';
const WOMEN_CATEGORY_ID = "69faa0674733f01c24652a4c";
const JEWELRY_CATEGORY_ID = "69faa0674733f01c24652a4c";

const SlimBeauty = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryKey, setRetryKey] = useState(0);
    const { addToCart } = useCart();
    const [addedId, setAddedId] = useState(null);
    const navigate = useNavigate();
    const [liked, setLiked] = useState([]);

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

    useEffect(() => {
        setLoading(true);
        setError(null);
        const timeout = setTimeout(() => {
            setError('Connection failed. Please check your internet.');
            setLoading(false);
        }, 5000);

        axios.get(`${BASE_URL}?categories=${WOMEN_CATEGORY_ID},${JEWELRY_CATEGORY_ID}`)
            .then((res) => {
                clearTimeout(timeout);
                const data = res.data.products || res.data;
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                clearTimeout(timeout);
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
        <div className="min-h-screen bg-[#F2F2F7] dark:bg-[#121212]">
            {/* Header Section */}
            <section className='px-14 py-14'>
                <div className='container mx-auto'>
                    <h1 data-aos="fade-down"
                        className="text-5xl font-bold text-[#524B6B]">
                        For Slim & Beauty
                    </h1>
                    <p data-aos="fade-up" data-aos-delay="100" className="text-[#8E8684] mt-3 text-lg">
                        Celebrate your silhouette with Modish. Discover our 'Slim & Beauty
                    </p>
                </div>
            </section>
            {/* Products */}
            <section className='py-14 px-4 md:px-14 bg-white dark:bg-[#121212] rounded-t-[50px]'>
                <div className='container mx-auto'>
                    {/* Product Found */}
                    {!loading && !error && (
                        <p className='text-[#AEA9A7] mb-8 font-bold text-sm uppercase tracking-widest'> {products.length} Product Found </p>
                    )}
                    {/* Loading */}
                    {loading && (
                        <div className="text-center py-20 text-xl font-semibold text-[#524B6B]">
                            Loading Modish Products...
                        </div>
                    )}
                    {/* Error */}
                    {error && (
                        <div className="flex flex-col items-center justify-center h-60 gap-4 dark:bg-[#121212]">
                            <p className="text-red-400 text-xl font-semibold">⚠️ {error}</p>
                            <button
                                onClick={() => setRetryKey(prev => prev + 1)}
                                className="px-8 py-2.5 bg-[#524B6B] text-white rounded-full font-semibold hover:bg-[#3d3852] transition-all duration-300"
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
                                    className="bg-white dark:bg-[#121212] dark:border-slate-800  rounded-[30px] p-4 flex flex-col gap-3 shadow-sm hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-[#F2F2F7]"
                                >
                                    <Link to={`/product/fs/${product._id}`}>
                                        <div className="relative h-64 w-full flex items-center justify-center overflow-hidden rounded-[22px] bg-[#F9F9F9]">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                loading="lazy"
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />

                                        </div>
                                    </Link>

                                    <h3 className="text-[15px] font-bold text-[#524B6B] line-clamp-1 px-1">
                                        {product.name}
                                    </h3>

                                    <div className="flex items-center justify-between mt-auto px-1">
                                        <span className="text-[#A48A84] font-bold text-xl">
                                            ${product.price}
                                        </span>
                                        <div className="flex items-center gap-1 bg-[#F9F9F9] dark:bg-[#121212] dark:border-slate-800  px-2 py-1 rounded-lg border border-gray-50">
                                            <span className="text-[#F1C40F] text-[10px]">⭐</span>
                                            <span className="text-[#AEA9A7] text-[12px] font-bold">
                                                {product.rating}
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
                                        {addedId === product._id ? '✅ Added!' : 'Add to Cart 🛒'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default SlimBeauty;