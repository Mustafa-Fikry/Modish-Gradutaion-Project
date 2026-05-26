import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

const SERVICE_ID = 'service_ecz2mk8'
const TEMPLATE_ID = 'template_ewp5gy5'
const PUBLIC_KEY = 'kMfUBh1iZqpucmWKg'

const Contact = () => {
const [sending, setSending] = useState(false)
const [success, setSuccess] = useState(false)

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .required('Message is required'),
})

const formik = useFormik({
    initialValues: {
    name: '',
    email: '',
    subject: '',
    message: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
    setSending(true)
    setSuccess(false)

    emailjs
        .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
            from_name: values.name,
            from_email: values.email,
            subject: values.subject,
            message: values.message,
        },
        PUBLIC_KEY
        )
        .then(() => {
        setSending(false)
        setSuccess(true)
        resetForm()
        setTimeout(() => setSuccess(false), 4000)
        })
        .catch((err) => {
        setSending(false)
        console.log('EmailJS Error:', err)
        alert(JSON.stringify(err))
        })
    },
})

const isValidForm =
    formik.values.name &&
    formik.values.email &&
    formik.values.subject &&
    formik.values.message &&
    Object.keys(formik.errors).length === 0

return (
    <section id="contact" className="bg-white dark:bg-[#121212] py-20 px-4 md:px-12">
    <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.3 }}
        className="flex flex-col gap-6 text-center mb-16"
    >
        <h2 className="text-[#524B6B] font-bold text-4xl">Get In Touch</h2>

        <p className="text-[#8E8684] max-w-2xl mx-auto text-lg">
        Have a question about our collections or want to place a custom order?
        We'd love to hear from you. Reach out anytime!
        </p>
    </motion.div>

    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        {/* Contact Info */}
        <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.3 }}
        className="w-full md:w-1/2 space-y-8"
        >
        <h2 className="font-bold text-2xl text-[#524B6B] mb-6">Contact Information</h2>

        <div>
            <h3 className="font-semibold text-lg text-[#524B6B] mb-1">Email</h3>
            <p className="text-[#8E8684] cursor-pointer hover:text-[#A48A84] transition-colors">
                modishstore9@gmail.com
            </p>
        </div>

        <div>
            <h3 className="font-semibold text-lg text-[#524B6B] mb-1">Phone</h3>
            <p className="text-[#8E8684] cursor-pointer hover:text-[#A48A84] transition-colors">
                +201002342853
            </p>
        </div>

        <div>
            <h3 className="font-semibold text-lg text-[#524B6B] mb-1">Business Hours</h3>
            <p className="text-[#8E8684] leading-relaxed">
                Monday - Friday: 9AM - 6PM
                <br />
                Saturday: 10AM - 4PM
                <br />
                Sunday: Closed
            </p>
        </div>
        </motion.div>

        {/* Form Container - Updated Background to #F2F2F7 */}
        <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.3 }}
        className="w-full md:w-1/2 bg-[#F2F2F7] dark:bg-[#121212] p-8 md:p-12 rounded-[40px] shadow-sm border border-white/50"
        >
        {success && (
            <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 text-green-700 font-semibold px-4 py-3 rounded-2xl mb-4 text-center"
            >
            Message sent successfully!
            </motion.div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-5 ">
            <div>
            <label className="block font-semibold text-[#524B6B] mb-2">Name</label>
            <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`dark:bg-[#121212] dark:border-purple-500 w-full p-4 rounded-2xl outline-none border transition-all duration-200 bg-white ${
                formik.touched.name && formik.errors.name
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-transparent focus:border-[#A48A84] focus:ring-[#A48A84]/20'
                } focus:ring-4`}
            />
            {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
            </div>

            <div>
            <label className="block font-semibold text-[#524B6B] mb-2">Email</label>
            <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`dark:bg-[#121212] dark:border-purple-500 w-full p-4 rounded-2xl outline-none border transition-all duration-200 bg-white ${
                formik.touched.email && formik.errors.email
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-transparent focus:border-[#A48A84] focus:ring-[#A48A84]/20'
                } focus:ring-4`}
            />
            {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
            </div>

            <div>
            <label className="block font-semibold text-[#524B6B] mb-2">Subject</label>
            <input
                type="text"
                name="subject"
                placeholder="Enter Subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`dark:bg-[#121212] dark:border-purple-500 w-full p-4 rounded-2xl outline-none border transition-all duration-200 bg-white ${
                formik.touched.subject && formik.errors.subject
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-transparent focus:border-[#A48A84] focus:ring-[#A48A84]/20'
                } focus:ring-4`}
            />
            {formik.touched.subject && formik.errors.subject && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.subject}</p>
            )}
            </div>

            <div>
            <label className="block font-semibold text-[#524B6B] mb-2">Message</label>
            <textarea
                name="message"
                rows="4"
                placeholder="Enter Your Message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`dark:bg-[#121212] dark:border-purple-500 w-full p-4 rounded-2xl outline-none border transition-all duration-200 bg-white ${
                formik.touched.message && formik.errors.message
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-transparent focus:border-[#A48A84] focus:ring-[#A48A84]/20'
                } focus:ring-4`}
            />
            {formik.touched.message && formik.errors.message && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>
            )}
            </div>

            <button
            type="submit"
            disabled={!isValidForm || sending}
            className={`dark:bg-[#121212]  w-full p-4 rounded-2xl font-bold transition-all duration-300 text-white ${
                isValidForm && !sending
                ? 'bg-[#524B6B] hover:bg-[#3d3852] shadow-md hover:shadow-lg active:scale-[0.98]'
                : 'bg-gray-400 cursor-not-allowed opacity-60'
            }`}
            >
            {sending ? 'Sending...' : 'Send Message'}
            </button>
        </form>
        </motion.div>
    </div>
    </section>
)
}

export default Contact