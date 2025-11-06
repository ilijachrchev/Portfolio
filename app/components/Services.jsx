import { assets, serviceData } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {motion} from "motion/react"

const Services = ({isDarkMode}) => {

    const [active, setActive] = useState(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        function onKey(e) { if (e.key === "Escape") setOpen(false) }
        if (open) {
            document.addEventListener('keydown', onKey)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = ''
        }
    }, [open])

    const openModal = (item) => { setActive(item); setOpen(true) }
    const closeModal = () => setOpen(false)

  return (
    <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} 
        id='service' className='w-full px-[12%] py-10 scroll-m-20'>
        <motion.h4
        initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} 
        className='text-center mb-2 text-lg font-Ovo'>Building skills by helping others</motion.h4>
        <motion.h2
        initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} 
        className='text-center text-5xl font-Ovo'>Volunteering & Organizations</motion.h2>

        <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }} 
        className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
            Volunteering is a way for me to give back, connect with others, and grow both personally and professionally.
            It continues to strengthen my communication, teamwork, and leadership skills while reminding
             me of the value of community.
        </motion.p>

        <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }} 
        className={`grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-10`}>
            {serviceData.map(({icon, title, description, link, organization, details}, index)=>(
                <motion.div
                whileHover={{ scale: 1.05 }}
                key={index} className={`border border-gray-400 rounded-lg px-8 py-12 
                 cursor-pointer hover:-translate-y-1 duration-500 hover:shadow-lg
                ${isDarkMode 
                ? "hover:bg-darkHover/40 hover:shadow-white " 
                : "hover:bg-lightHover/40 hover:shadow-black"}`}>
                    <Image src={icon} alt='' className='w-10' />

                    <h3 className={`text-lg my-4 text-gray-700 ${isDarkMode ? "text-white" : ""}`}>{title}</h3>

                    <p
                        className={`text-sm italic text-gray-500 mb-2 ${
                            isDarkMode ? "text-white/60" : ""
                        }`}
                        >
                        Organization: <b>{organization}</b>
                    </p>


                    <p className={`text-sm text-gray-600 leading-5 ${isDarkMode ? "text-white/80" : ""}`}>
                        {description}
                    </p>

                    <button onClick={() => openModal({icon, title, organization, description, link, details})}
                        className='flex items-center gap-2 text-sm mt-5 hover:cursor-grab'>
                            Read More
                            <Image alt='' src={assets.right_arrow} className='w-4' />
                    </button>
                </motion.div>
            ))}
        </motion.div>

            {open && active && (
                <div className='fixed inset-0 z-[70] flex items-center justify-center'>
                    <motion.div className='absolute inset-0 bg-black/50'
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal}>
                    </motion.div>
                    <motion.div role='dialog' aria-modal="true" aria-labelledby='volunteering-title'
                    className='relative z-[71] w-[92%] max-w-2xl rounded-2xl bg-white dark:bg-neutral-900
                    shadow-2xl border border-black/10 dark:border-white/10'
                    initial={{ y: 40, opacity: 0, scale: 0.98 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 10, opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}>
                        <div className='flex items-start gap-3 p-5 border-b border-black/5 dark:border-white/10'>
                            {active.icon && <Image src={active.icon} alt='' className='w-8 h-8' />}
                            <div className='flex-1'>
                                <h3 id='volunteering-title' className='text-lg font-semibold'>{active.title}</h3>
                                {active.organization && (
                                    <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                                        {active.organization}
                                    </p>
                                )}
                            </div>
                            <button onClick={closeModal} aria-label='Close' 
                            className='p-2 rounded hover:bg-black/5 dark:hover:bg-white/10'>
                                ✕
                            </button>
                        </div>
                        <div className="p-5 space-y-4">
                            {active.details?.period && (
                                <p className="text-sm">
                                <span className="font-medium">Period:</span> {active.details.period}
                                </p>
                            )}
                            {active.details?.location && (
                            <p className="text-sm">
                            <span className="font-medium">Location:</span> {active.details.location}
                            </p>
                            )}

                            {active.description && (
                                <p className="text-sm text-neutral-700 dark:text-neutral-200">
                                {active.description}
                                </p>
                            )}

                            {Array.isArray(active.details?.highlights) && active.details.highlights.length > 0 && (
                                <div>
                                <p className="text-sm font-medium mb-2">Highlights</p>
                                <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700 dark:text-neutral-200">
                                    {active.details.highlights.map((h, i) => <li key={i}>{h}</li>)}
                                </ul>
                                </div>
                            )}

                            {Array.isArray(active.details?.links) && active.details.links.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                {active.details.links.map((l, i) => (
                                    <a
                                    key={i}
                                    href={l.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm underline underline-offset-2 hover:opacity-80"
                                    >
                                    {l.label} ↗
                                    </a>
                                ))}
                                </div>
                            )}
                            </div>

                            {/* footer */}
                            <div className="p-4 flex justify-end border-t border-black/5 dark:border-white/10">
                            <button
                                onClick={closeModal}
                                className="px-4 h-10 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-black/5 dark:hover:bg-white/10"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>

                </div>
            )}

    </motion.div>
  )
}

export default Services