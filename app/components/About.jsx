import { assets, infoList, toolsData, duplicatedTools } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import {motion} from "motion/react"

const About = ({isDarkMode}) => {
  return (
    <motion.div id='about' className='w-full px-[12%] py-10 scroll-m-20'
        initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 1}}
    >
        <motion.h4
        initial={{opacity: 0, y: -20}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.3}}
        className='text-center mb-2 text-lg font-Ovo'>Introduction</motion.h4>

        <motion.h2  initial={{opacity: 0, y: -20}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.5}}
         className='text-center text-5xl font-Ovo'>About Me</motion.h2>

        <motion.div
        initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 0.8}}
         className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>
            <motion.div
            initial={{opacity: 0, scale: 0.9}} whileInView={{opacity: 1, scale: 1}}
             transition={{duration: 0.6}}
            className="relative w-64 sm:w-80 h-80 sm:h-96 rounded-3xl overflow-hidden">
                <Image src={assets.user_image} alt="user" fill className="object-cover" priority />
            </motion.div>

            <motion.div
            initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 0.6, delay: 0.8}}
            className='flex-1'>
                <p className='mb-10 max-w-2xl font-Ovo'>
                    I am Ilija Chrchev, a computer science student passionate about technology,
                     digital marketing, and creative problem-solving. My experiences in sports,
                      hospitality, and marketing have shaped my teamwork, leadership,
                       and adaptability while sharpening my technical and communication skills.
                        I am always eager to learn, take on new challenges, and create a positive
                         impact through both tech and people-focused work.
                </p>

                <motion.h4
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.3, delay: 0.5 }}
                    className={`my-6 text-gray-700 font-Ovo ${isDarkMode ? "text-white/80" : ""}`}
                    >
                    Tools I use
                </motion.h4>

                <div className="relative overflow-hidden w-full py-4
                    mx-auto lg:mx-0 max-w-[340px] sm:max-w-[520px] md:max-w-[640px]">
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r
                    from-white to-transparent dark:from-[#0b0f19]" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l
                    from-white to-transparent dark:from-[#0b0f19]" />

                    <motion.ul
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{
                            opacity: { duration: 0.6, delay: 1.0 },    
                            x: { duration: 20, ease: "linear", repeat: Infinity }, 
                        }}
                        className="flex items-center gap-3 sm:gap-5 will-change-transform"
                        animate={{ x: ["0%", "-50%"] }}                
                        style={{ width: "max-content" }}
                        >
                        {duplicatedTools.map((tool, index) => (
                            <motion.li
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            className="flex items-center justify-center w-12 sm:w-14 aspect-square
                                        border border-gray-400 rounded-lg cursor-pointer
                                        hover:-translate-y-1 duration-500">
                            <Image src={tool} alt="Tool" className="w-5 sm:w-7" />
                            </motion.li>
                        ))}
                    </motion.ul>

                </div>
                
            </motion.div>
        </motion.div>
    </motion.div>
  )
}

export default About