import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useCart } from '../../Context/CartContext';

const ProductDetails = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addedId, setAddedId] = useState(null);
    const [retryKey, setRetryKey] = useState(0);

    const navigate = useNavigate();

    const { addToCart } = useCart();

    const handleAddToCart = (product) => {

        const user = JSON.parse(localStorage.getItem('modish-user'));

        if (!user) {
            navigate('/login');
            return;
        }

        addToCart(product);

        setAddedId(product._id);

        setTimeout(() => {
            setAddedId(null)
        }, 1000);
    }

    useEffect(() => {

        setLoading(true);
        setError(null);

        axios
            .get(`https://gradutionapi-production.up.railway.app/api/v1/products/${id}`)
            .then((res) => {

                setProduct(res.data);

                setLoading(false);

            })
            .catch((err) => {

                setError(err.message);

                setLoading(false);

            });

    }, [id, retryKey]);

    return (
        <div className='min-h-screen bg-[#F2F2F7] dark:bg-[#121212] py-20 px-6 md:px-14'>

            {loading && (
                <div className='text-center text-xl font-semibold text-[#524B6B]'>
                    Loading...
                </div>
            )}

            {error && (
                <div className='flex flex-col gap-4 items-center justify-center h-60 dark:bg-[#121212]'>
                    <p className='text-red-400 text-xl font-semibold'>
                        ⚠️ {error}
                    </p>

                    <button
                        onClick={() => setRetryKey((prev) => prev + 1)}
                        className='px-6 py-2 bg-[#524B6B] text-white rounded-full font-semibold dark:bg-[#121212] dark:hover:bg-[#524B6B] hover:bg-[#3d3852] transition-colors duration-300'
                    >
                        Try Again
                    </button>
                </div>
            )}

            {!loading && !error && (
                <div className='min-h-screen'>

                    <div className='container mx-auto bg-white dark:bg-[#121212] dark:border-slate-800 rounded-[30px] shadow-sm overflow-hidden border border-white'>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 md:p-12">

                            {/* Image */}
                            <motion.div
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className='flex items-center justify-center'
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className='max-h-[400px] object-contain rounded-[20px]'
                                />
                            </motion.div>

                            {/* Info */}
                            <motion.div
                                className='flex flex-col justify-center'
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                            >
                                <h1 className='text-3xl font-bold text-[#524B6B] mb-4'>
                                    {product.name}
                                </h1>

                                <div className="flex items-center gap-4 mb-6 ">
                                    <span className="text-2xl font-bold text-[#A48A84]">
                                        ${product.price}
                                    </span>

                                    <span className="bg-[#F9F9F9] dark:bg-[#121212] dark:border-slate-800 text-[#AEA9A7] text-xs px-3 py-1 rounded-full font-bold border border-gray-50">
                                        ⭐ {product.rating}
                                    </span>
                                </div>

                                <p className="text-[#8E8684] mb-8 leading-relaxed">
                                    {product.description}
                                </p>

                                {/* Add To Cart */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleAddToCart(product);
                                    }}
                                    className={`py-3 rounded-[12px] text-white font-semibold text-sm transition-all duration-300
                                        ${addedId === product._id
                                            ? 'bg-green-500 scale-95'
                                            : 'bg-[#524B6B] hover:bg-[#3d3852]'
                                        }
                                    `}
                                >
                                    {addedId === product._id
                                        ? '✅ Added!'
                                        : 'Add to Cart 🛒'
                                    }
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;