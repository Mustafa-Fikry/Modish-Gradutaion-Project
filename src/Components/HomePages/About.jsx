import React from 'react'
import about from '../../assets/About.jpg'
import { motion } from 'framer-motion'

const About = () => {
    return (
        <section id="about" className='bg-[#F2F2F7] dark:bg-[#121212] py-20 px-4'>
            <div className='max-w-7xl mx-auto'>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: -100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.6, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.3 }}
                    className='text-4xl font-bold text-[#524B6B] dark-text-[white] text-center mb-16'>
                    About Us
                </motion.h2>

                {/* Content */}
                <div className='flex flex-col md:flex-row gap-14 items-center'>

                    {/* Image Container */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        viewport={{ once: false, amount: 0.5 }}
                        className='md:w-1/2 overflow-hidden rounded-[40px] shadow-sm'
                    >
                        <img
                            src={about}
                            alt="About Modish"
                            className='w-full h-[400px] md:h-[550px] object-cover rounded-[40px] transition duration-500 hover:scale-105'
                        />
                    </motion.div>

                    {/* Text Container */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        viewport={{ once: false, amount: 0.5 }}
                        className='md:w-1/2 space-y-6 text-[#635C5B] text-lg md:text-xl leading-relaxed'
                    >
                        <p>
                            Modish is a specialized graduation project focused on merging modern web
                            technologies with seamless user experiences. Our team developed a
                            comprehensive platform that includes a responsive web interface and a
                            dedicated mobile application to redefine digital interaction.
                        </p>

                        <p>
                            Collaboratively built by a professional team of six developers, we focused
                            on high performance and scalable architecture. This project showcases our
                            technical journey at the academy, proving that innovation and teamwork
                            can transform a simple idea into a high-quality, production-ready solution.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

export default About