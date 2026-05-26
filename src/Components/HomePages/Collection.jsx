import React from 'react'
import collectionImg from '../../assets/Beckham.jpeg'
import {motion} from "framer-motion"
import { useNavigate } from 'react-router-dom';

const Collection = () => {
    const navigate = useNavigate();
  return (
    <section className='px-6 py-12 bg-[#F9F9F9] dark:bg-[#121212]'>
      <div className='bg-[#F2F2F7] dark:bg-[#121212] rounded-[40px] p-8 flex flex-col md:flex-row justify-between overflow-hidden'>
        {/* Script */}
        <motion.div
        initial={{opacity:0 , x: -100}}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 , ease: "easeOut" }}
        viewport={{ once: false , amount: 0.5 }}
        className='md:w-1/2 flex flex-col gap-6'>
          <h2  className='text-[#524B6B]  font-bold text-6xl md:text-7xl'> New Collection - Hang Out & Party </h2>
          <p className='text-[#8E8684]  text-lg max-w-md'>Express yourself with our latest casual collection designed for modern living.</p>
          <button
          onClick={() => navigate('/collections')}
          className='bg-[#524B6B] text-white font-medium text-lg rounded-full px-10 py-4  w-fit
          transition-all duration-300 hover:bg-[#3d3852] hover:shadow-lg hover:scale-105 active:scale-95 '>
            Explore Collection
          </button>
        </motion.div>
        {/* Image */}
<motion.div
        initial={{opacity:0 , x: 100}}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 , ease: "easeOut" }}
        viewport={{ once: false , amount: 0.5 }}
        className='md:w-1/2 mt-8 flex justify-center'>
  <img
    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
    alt="casual-collection"
    className='w-full h-66 object-cover rounded-[30px]'
  />
</motion.div>
      </div>
    </section>
  )
}

export default Collection ;