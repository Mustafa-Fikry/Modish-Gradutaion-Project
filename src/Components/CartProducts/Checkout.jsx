import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { useCart } from '../../context/CartContext';

const BASE_URL = 'https://gradutionapi-production.up.railway.app/api/v1';
const SERVICE_ID = 'service_ecz2mk8';
const TEMPLATE_ID = 'template_t3y53kk';
const PUBLIC_KEY = 'kMfUBh1iZqpucmWKg';

const Checkout = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('modish-user'));
    const userId = user?.id;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        phone: Yup.string().required('Phone is required'),
        street: Yup.string().required('Street is required'),
        city: Yup.string().required('City is required'),
        zip: Yup.string().required('ZIP code is required'),
        country: Yup.string().required('Country is required'),
        shippingAddress2: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phone: '',
            street: '',
            city: '',
            zip: '',
            country: '',
            shippingAddress2: '',
        },
        validationSchema,
        onSubmit: (values) => {
            setLoading(true);
            setError(null);
            const orderItems = cart.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
            }));
            axios.post(`${BASE_URL}/Order/BasketOrder`,
                {
                    orderItems,
                    shippingAddress1: values.street,
                    shippingAddress2: values.shippingAddress2,
                    city: values.city,
                    zip: values.zip,
                    country: values.country,
                    phone: values.phone,
                    user: userId,
                    firstName: values.firstName,
                    lastName: values.lastName,
                }
            ).then((res) => {
                const newOrderId = res.data._id || 'ORD-' + Date.now();
                setOrderId(newOrderId);

                const orderItemsText = cart
                    .map(item => `- ${item.product?.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`)
                    .join('\n');

                const emailData = {
                    customer_name: `${values.firstName} ${values.lastName}`,
                    customer_email: user?.email,
                    order_id: newOrderId,
                    total_price: totalPrice,
                    shipping_address: `${values.street}, ${values.city}, ${values.country} ${values.zip}`,
                    order_items: orderItemsText,
                };
                emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData, PUBLIC_KEY)
                    .then(() => {
                        setSuccess(true);
                        clearCart();
                        setLoading(false);
                    })
                    .catch(() => {
                        setSuccess(true);
                        clearCart();
                        setLoading(false);
                    });
            }).catch((err) => {
                setError(err.response?.data || 'Something went wrong');
                setLoading(false);
            })
        }
    })

    if (success) {
        return (
            <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#121212]  flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white dark:bg-[#121212] rounded-[35px] p-10 shadow-xl text-center max-w-md w-full"
                >
                    <p className="text-6xl mb-4">🎉</p>
                    <h2 className="text-3xl font-bold text-[#524B6B] mb-2">Order Confirmed!</h2>
                    <p className="text-[#8E8684] mb-2">Thank you for your purchase.</p>
                    <p className="text-[#8E8684] mb-2">
                        A confirmation email has been sent to 📧 <strong>{user?.email}</strong>
                    </p>
                    <p className="text-[#8E8684] font-semibold mb-8">
                        Order ID: #{orderId}
                    </p>
                    <button
                        onClick={() => navigate('/all-products')}
                        className="w-full bg-[#504871] text-white py-3 rounded-full font-semibold hover:bg-[#3d3852]  hover:shadow-md transition-colors duration-300"
                    >
                        Continue Shopping
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#121212]">
            <section className="bg-[#F2F2F7] dark:bg-[#121212] py-14 px-14">
                <div className="container mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="text-5xl font-bold text-[#524B6B]"
                    >
                        Checkout
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-[#8E8684] mt-3 text-lg"
                    >
                        Complete your order details below.
                    </motion.p>
                </div>
            </section>

            <section className="py-14 px-14">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1">
                            <div className="bg-white dark:bg-[#121212] rounded-[25px] p-8 shadow-md">
                                <h2 className="text-xl font-bold text-[#524B6B] mb-6">
                                    Shipping Information
                                </h2>

                                {error && (
                                    <div className="bg-red-50 text-red-500 p-3 rounded-2xl mb-4 text-center text-sm">
                                        ⚠️ {error}
                                    </div>
                                )}

                                <form onSubmit={formik.handleSubmit}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-semibold text-[#524B6B] mb-1">First Name</label>
                                            <input
                                                name="firstName"
                                                placeholder="Enter first name"
                                                {...formik.getFieldProps('firstName')}
                                                className={` dark:bg-[#121212] w-full p-4 border rounded-2xl outline-none transition-all ${formik.touched.firstName && formik.errors.firstName
                                                    ? 'border-red-400' : 'border-[#F2EEED] dark:border-purple-500 focus:border-[#A48A84]'
                                                    }`}
                                            />
                                            {formik.touched.firstName && formik.errors.firstName && (
                                                <p className="text-red-500 text-sm mt-1">{formik.errors.firstName}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#524B6B] mb-1">Last Name</label>
                                            <input
                                                name="lastName"
                                                placeholder="Enter last name"
                                                {...formik.getFieldProps('lastName')}
                                                className={`dark:bg-[#121212] w-full p-4 border rounded-2xl outline-none transition-all ${formik.touched.lastName && formik.errors.lastName
                                                    ? 'border-red-400' : 'border-[#F2EEED] dark:border-purple-500 focus:border-[#A48A84]'
                                                    }`}
                                            />
                                            {formik.touched.lastName && formik.errors.lastName && (
                                                <p className="text-red-500 text-sm mt-1">{formik.errors.lastName}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#524B6B] mb-1">Phone</label>
                                            <input
                                                name="phone"
                                                placeholder="Enter phone number"
                                                {...formik.getFieldProps('phone')}
                                                className={`dark:bg-[#121212] w-full p-4 border rounded-2xl outline-none transition-all ${formik.touched.phone && formik.errors.phone
                                                    ? 'border-red-400' : 'border-[#F2EEED] dark:border-purple-500 focus:border-[#A48A84]'
                                                    }`}
                                            />
                                            {formik.touched.phone && formik.errors.phone && (
                                                <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#524B6B] mb-1">Country</label>
                                            <input
                                                name="country"
                                                placeholder="Enter country"
                                                {...formik.getFieldProps('country')}
                                                className={`dark:bg-[#121212] w-full p-4 border rounded-2xl outline-none transition-all ${formik.touched.country && formik.errors.country
                                                    ? 'border-red-400' : 'border-[#F2EEED] dark:border-purple-500 focus:border-[#A48A84]'
                                                    }`}
                                            />
                                            {formik.touched.country && formik.errors.country && (
                                                <p className="text-red-500 text-sm mt-1">{formik.errors.country}</p>
                                            )}
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block font-semibold text-[#524B6B] mb-1">Street Address</label>
                                            <input
                                                name="street"
                                                placeholder="Enter street address"
                                                {...formik.getFieldProps('street')}
                                                className={`dark:bg-[#121212] w-full p-4 border rounded-2xl outline-none transition-all ${formik.touched.street && formik.errors.street
                                                    ? 'border-red-400' : 'border-[#F2EEED] dark:border-purple-500 focus:border-[#A48A84]'
                                                    }`}
                                            />
                                            {formik.touched.street && formik.errors.street && (
                                                <p className="text-red-500 text-sm mt-1">{formik.errors.street}</p>
                                            )}
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className=" block font-semibold text-[#524B6B] mb-1">
                                                Apartment / Suite
                                                <span className="text-[#8E8684]  font-normal"> (Optional)</span>
                                            </label>
                                            <input
                                                name="shippingAddress2"
                                                placeholder="Apartment, suite, etc."
                                                {...formik.getFieldProps('shippingAddress2')}
                                                className="dark:bg-[#121212] w-full p-4 border border-[#F2EEED] dark:border-purple-500 rounded-2xl outline-none focus:border-[#A48A84] transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#524B6B] mb-1">City</label>
                                            <input
                                                name="city"
                                                placeholder="Enter city"
                                                {...formik.getFieldProps('city')}
                                                className={`dark:bg-[#121212] w-full p-4 border rounded-2xl outline-none transition-all ${formik.touched.city && formik.errors.city
                                                    ? 'border-red-400' : 'border-[#F2EEED] dark:border-purple-500 focus:border-[#A48A84]'
                                                    }`}
                                            />
                                            {formik.touched.city && formik.errors.city && (
                                                <p className="text-red-500 text-sm mt-1">{formik.errors.city}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#524B6B] mb-1">ZIP Code</label>
                                            <input
                                                name="zip"
                                                placeholder="Enter ZIP code"
                                                {...formik.getFieldProps('zip')}
                                                className={`dark:bg-[#121212] w-full p-4 border rounded-2xl outline-none transition-all ${formik.touched.zip && formik.errors.zip
                                                    ? 'border-red-400' : 'border-[#F2EEED] dark:border-purple-500 focus:border-[#A48A84]'
                                                    }`}
                                            />
                                            {formik.touched.zip && formik.errors.zip && (
                                                <p className="text-red-500 text-sm mt-1">{formik.errors.zip}</p>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="lg:w-80">
                            <div className="bg-white dark:bg-[#121212] border-2 dark:border-purple-600 rounded-[25px] p-6 shadow-md sticky top-24">
                                <h2 className="text-xl font-bold text-[#524B6B] mb-6">Order Summary</h2>

                                <div className="flex flex-col gap-3 mb-4">
                                    {cart.map((item) => (
                                        <div key={item._id} className="flex items-center gap-3">
                                            <img
                                                src={item.product?.image}
                                                alt={item.product?.name}
                                                className="w-12 h-12 object-contain rounded-xl bg-[#F9F9F9] p-1"
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-[#524B6B] line-clamp-1">
                                                    {item.product?.name}
                                                </p>
                                                <p className="text-xs text-[#8E8684]">x{item.quantity}</p>
                                            </div>
                                            <span className="text-[#A48A84] font-bold text-sm">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-[#F2EEED] my-4" />

                                <div className="flex justify-between mb-3 text-[#8E8684]">
                                    <span>Subtotal</span>
                                    <span>${totalPrice}</span>
                                </div>

                                <div className="flex justify-between mb-3 text-[#8E8684]">
                                    <span>Shipping</span>
                                    <span className="text-green-500 font-semibold">Free</span>
                                </div>

                                <div className="border-t border-[#F2EEED] my-4" />

                                <div className="flex justify-between font-bold text-[#524B6B] text-lg mb-6">
                                    <span>Total</span>
                                    <span>${totalPrice}</span>
                                </div>

                                <button
                                    type="submit"
                                    onClick={() => formik.handleSubmit()}
                                    disabled={!formik.isValid || !formik.dirty || loading}
                                    className={`w-full py-3 rounded-full font-semibold transition-all duration-300 text-white ${!formik.isValid || !formik.dirty || loading
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-[#524B6B] hover:bg-[#3d3852]'
                                        }`}
                                >
                                    {loading ? '⏳ Placing Order...' : 'Place Order ✅'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Checkout;