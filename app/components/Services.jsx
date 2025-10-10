import { assets, serviceData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import {motion} from "motion/react"

const Services = ({isDarkMode}) => {
  return (
    <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} 
        id='service' className='w-full px-[12%] py-10 scroll-m-20'>
        <motion.h4
        initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} 
        className='text-center mb-2 text-lg font-Ovo'>Smeni go posle</motion.h4>
        <motion.h2
        initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} 
        className='text-center text-5xl font-Ovo'>Voluntering</motion.h2>

        <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }} 
        className='text-center mx-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
            Through volunteering, I have supported student communities by tutoring, organizing events,
             and creating a positive learning environment. These experiences strengthened my communication,
              teamwork, and leadership skills while allowing me to give back and stay connected with others.
        </motion.p>

        <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }} 
        className={`grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] lg:grid-cols-2 my-10`}>
            {serviceData.map(({icon, title, description, link}, index)=>(
                <motion.div
                whileHover={{ scale: 1.05 }}
                key={index} className={`border border-gray-400 rounded-lg px-8 py-12 
                 cursor-pointer hover:-translate-y-1 duration-500 hover:shadow-lg
                ${isDarkMode 
                ? "hover:bg-darkHover/40 hover:shadow-white " 
                : "hover:bg-lightHover/40 hover:shadow-black"}`}>
                    <Image src={icon} alt='' className='w-10' />

                    <h3 className={`text-lg my-4 text-gray-700 ${isDarkMode ? "text-white" : ""}`}>{title}</h3>

                    <p className={`text-sm text-gray-600 leading-5 ${isDarkMode ? "text-white/80" : ""}`}>
                        {description}
                    </p>

                    <a href={link} className='flex items-center gap-2 text-sm mt-5' >
                        Read More <Image alt='' src={assets.right_arrow} className='w-4' />
                    </a>
                </motion.div>
            ))}
        </motion.div>
    </motion.div>
  )
}

export default Services