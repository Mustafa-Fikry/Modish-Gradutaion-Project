import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const BASE_URL = 'https://gradutionapi-production.up.railway.app/api/v1';

const Auth = () => {

    const [activeTab, setActiveTab] = useState('login');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    {/* Login Validation */}
    const loginSchema = Yup.object({
        email: Yup.string().email('Invaild Email').required('Required'),
        password: Yup.string().required('Required'),
    })
    {/* Register Schema */}
    const registerSchema = Yup.object({
        name: Yup.string().min(3,'Too Short Email').required('Required'),
        email:    Yup.string().email('Invalid email').required('Required'),
        phone: Yup.string().required('Required'),
        password: Yup.string().min(8 , 'Short Password Should be 8+'),
    })
    {/* login Form */}
    const loginForm = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            setLoading(true);
            setError(null);
            const timeout = setTimeout(() => {
                setError('Connection failed. Please check your internet.');
                setLoading(false)
            }, (2000));
            axios.post(`${BASE_URL}/users/login`, values)
                .then((res) => {
                    clearTimeout(timeout);
                    localStorage.setItem('modish-token', res.data.token);
                    localStorage.setItem('modish-user', JSON.stringify({
                        email: res.data.user,
                        id:    res.data.userId
                    }));

                    setLoading(false);
                    navigate('/');
                    window.location.reload();
                })
                .catch((err) => {
                    clearTimeout(timeout);
                    setError(err.response?.data || 'Invalid email or password');
                    setLoading(false);
                });
        }
    });
    const registerForm = useFormik({
        initialValues: { name: '', email: '', phone: '', password: '' },
        validationSchema: registerSchema,
        onSubmit: (values, { resetForm }) => {
            setLoading(true);
            setError(null);
            axios.post(`${BASE_URL}/users/register`, {
                ...values,
                street:  '',
                city:    '',
                zip:     '',
                country: ''
            })
                .then(() => {
                    setActiveTab('login');
                    setLoading(false);
                    resetForm();
                })
                .catch((err) => {
                    setError(err.response?.data || 'Something went wrong');
                    setLoading(false);
                });
        }
    });

    return (
        <div className="min-h-screen bg-[#F2F2F7] dark:bg-[#121212] flex items-center justify-center px-4 text-[#262626]">

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white dark:bg-[#121212] border-2  dark:border-[#524B6B] rounded-[35px] shadow-xl w-full max-w-md p-8"
            >

                <h1 className="text-3xl font-bold text-center mb-2 text-[#524B6B]">Modish</h1>
                <p className="text-center text-[#AEA9A7] mb-8">
                    Premium fashion for the modern lifestyle
                </p>

                {/* Tabs */}
                <div className="flex bg-[#F9F9F9] rounded-full p-1 mb-8">
                    <button
                        onClick={() => { setActiveTab('login'); setError(null); }}
                        className={`flex-1 py-2 rounded-full font-semibold text-sm ${
                            activeTab === 'login' ? 'bg-[#524B6B] text-white' : 'text-[#AEA9A7]'
                        }`}
                    >
                        Log in
                    </button>
                    <button
                        onClick={() => { setActiveTab('register'); setError(null); }}
                        className={`flex-1 py-2 rounded-full font-semibold text-sm ${
                            activeTab === 'register' ? 'bg-[#524B6B] text-white' : 'text-[#AEA9A7]'
                        }`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-2xl mb-4 text-center text-sm">
                        ⚠️ {error}
                    </div>
                )}

                <AnimatePresence mode="wait">

                    {/* Login Form */}
                    {activeTab === 'login' && (
                        <motion.form
                            key="login"
                            onSubmit={loginForm.handleSubmit}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex flex-col gap-4"
                        >
                            <input
                                type="email"
                                placeholder="Email"
                                {...loginForm.getFieldProps('email')}
                                className="p-4 border border-[#F9F9F9] bg-[#F9F9F9] rounded-2xl outline-none focus:border-[#A48A84] transition-all"
                            />
                            {loginForm.touched.email && loginForm.errors.email && (
                                <span className="text-red-500 text-sm">{loginForm.errors.email}</span>
                            )}

                            <input
                                type="password"
                                placeholder="Password"
                                {...loginForm.getFieldProps('password')}
                                className="p-4 border border-[#F9F9F9] bg-[#F9F9F9] rounded-2xl outline-none focus:border-[#A48A84] transition-all"
                            />
                            {loginForm.touched.password && loginForm.errors.password && (
                                <span className="text-red-500 text-sm">{loginForm.errors.password}</span>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`py-3 rounded-2xl text-white font-semibold transition-all duration-300 ${
                                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#524B6B] hover:bg-[#3d3852]'
                                }`}
                            >
                                {loading ? '⏳ Loading...' : 'Log in'}
                            </button>

                            <p className="text-center text-sm text-gray-400">
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('register')}
                                    className="text-[#A48A84] font-semibold hover:underline"
                                >
                                    Sign Up
                                </button>
                            </p>
                        </motion.form>
                    )}

                    {/* Register Form */}
                    {activeTab === 'register' && (
                        <motion.form
                            key="register"
                            onSubmit={registerForm.handleSubmit}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex flex-col gap-4"
                        >
                            <input
                                type="text"
                                placeholder="Name"
                                {...registerForm.getFieldProps('name')}
                                className="p-4 border border-[#F9F9F9] bg-[#F9F9F9] rounded-2xl outline-none focus:border-[#A48A84] transition-all"
                            />
                            {registerForm.touched.name && registerForm.errors.name && (
                                <span className="text-red-500 text-sm">{registerForm.errors.name}</span>
                            )}

                            <input
                                type="email"
                                placeholder="Email"
                                {...registerForm.getFieldProps('email')}
                                className="p-4 border border-[#F9F9F9] bg-[#F9F9F9] rounded-2xl outline-none focus:border-[#A48A84] transition-all"
                            />
                            {registerForm.touched.email && registerForm.errors.email && (
                                <span className="text-red-500 text-sm">{registerForm.errors.email}</span>
                            )}

                            <input
                                type="text"
                                placeholder="Phone"
                                {...registerForm.getFieldProps('phone')}
                                className="p-4 border border-[#F9F9F9] bg-[#F9F9F9] rounded-2xl outline-none focus:border-[#A48A84] transition-all"
                            />
                            {registerForm.touched.phone && registerForm.errors.phone && (
                                <span className="text-red-500 text-sm">{registerForm.errors.phone}</span>
                            )}

                            <input
                                type="password"
                                placeholder="Password"
                                {...registerForm.getFieldProps('password')}
                                className="p-4 border border-[#F9F9F9] bg-[#F9F9F9] rounded-2xl outline-none focus:border-[#A48A84] transition-all"
                            />
                            {registerForm.touched.password && registerForm.errors.password && (
                                <span className="text-red-500 text-sm">{registerForm.errors.password}</span>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`py-3 rounded-2xl text-white font-semibold transition-all duration-300 ${
                                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#524B6B] hover:bg-[#3d3852]'
                                }`}
                            >
                                {loading ? '⏳ Loading...' : 'Sign Up'}
                            </button>

                            <p className="text-center text-sm text-gray-400">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('login')}
                                    className="text-[#A48A84] font-semibold hover:underline"
                                >
                                    Log in
                                </button>
                            </p>
                        </motion.form>
                    )}

                </AnimatePresence>

            </motion.div>
        </div>
    );
};

export default Auth;