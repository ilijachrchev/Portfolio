import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from "motion/react"

const Contact = ({isDarkMode}) => {

    const [result, setResult] = useState("");
    const [showToast, setShowToast] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    setShowToast(true);
    setResult("Sending....");

    const formData = new FormData(event.target);
    formData.append("access_key", "0e6afea5-42ad-4d08-b089-b7e19124d313");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }

    setTimeout(() => {
      setShowToast(false);

      setResult("");
    }, 1800);
  };

  return (
        <motion.div
        initial = {{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}
        id='contact' className='w-full px-[12%] py-10 scroll-mt-20 bg-[url("public\footer-bg-color.png)]
         bg-no-repeat bg-center bg-[length:90%_auto]'>
        <motion.h4
        initial = {{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}
        className='text-center mb-2 text-lg font-Ovo'>Connect with me</motion.h4>

        <motion.h2
        initial = {{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
        className='text-center text-5xl font-Ovo'>Get in Tocuh</motion.h2>

        <motion.p
        initial = {{opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }}
        className='text-center mx-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
            I would love to hear from you! If you have any questions, comments, or feedback, please use the form below.
        </motion.p>

        <motion.form
        initial = {{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.5 }}
        onSubmit={onSubmit} className='max-w-2xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-8'>

                <motion.input
                initial = {{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }}
                type="text" placeholder='Enter Your Name' required
                className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white' name='name' />

                <motion.input
                initial = {{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}
                type="email" placeholder='Enter Your Email' required 
                className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white' name='email' />
            </div>

            <motion.textarea
            initial = {{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 1.3, duration: 0.6 }}
            rows='6' placeholder='Enter Your Message' required
            className='w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6' name='message' ></motion.textarea>

            <motion.button
            whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}
            type='submit'
            className={`py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full
            mx-auto hover:bg-black duration-500
            ${isDarkMode ? "bg-transparent border-[0.5px] hover:bg-darkHover" : ""}`}>
              Submit Now <Image src={assets.right_arrow_white} alt='' className='w-5'/> </motion.button>
        
        
        </motion.form>


        {showToast && (
          <div className='fixed inset-0 z-[60] flex items-center justify-center' aria-live="polite" >
            <div className='absolute inset-0 bg-black/40' />
              <div className='relative z-[61] w-[90%] max-w-sm rounded-2xl bg-white px-5 py-4 text-center shadow-xl'>
                <p className='font-medium'>{result || "..."}</p>
            </div>
          </div>
        )}
      </motion.div>
  )
}

export default Contact