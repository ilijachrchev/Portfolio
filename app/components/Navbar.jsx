'use client'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const Navbar = ({isDarkMode, setIsDarkMode}) => {

    const [isScroll, setIsScroll] = useState(false);
    const sideMenuRef = useRef();
    const openMenu = ()=> {
        sideMenuRef.current.style.transform = 'translateX(-16rem)'
    }
    const closeMenu = ()=> {
        sideMenuRef.current.style.transform = 'translateX(16rem)'
    }

    useEffect(()=>{
        window.addEventListener('scroll',()=> {
            if(scrollY > 50) {
                setIsScroll(true);
            } else {
                setIsScroll(false);
            }
        })
    },[])

  return (
    <>
        <div className={`fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] ${ isDarkMode ? "hidden" : "" }`}>
            <Image src={assets.header_bg_color} alt='' className='w-full' />
        </div>

        <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 
        ${isScroll ? "bg-white/60 backdrop-blur-md ring-1 ring-black/10 shadow-sm" : ""}
         ${isDarkMode ? "bg-darkTheme shadow-white/20" : ""}`}>
            <Link href="#top">
                <Image src={isDarkMode ? assets.logo_dark : assets.logo} className='w-28 cursor-pointer mr-14' alt="" />
            </Link>

            <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3
                absolute left-1/2 -translate-x-1/2 
                ${isScroll ? "" : "bg-white shadow-sm bg-opacity-50 border backdrop-blur-md"}
                `}>
                <li><Link className='font-Ovo' href="/#top">Home</Link></li>
                <li><Link className='font-Ovo' href="/#about">About</Link></li>
                <li><Link className='font-Ovo' href="/#service">Services</Link></li>
                <li><Link className='font-Ovo' href="/#work">Work</Link></li>
                <li><Link className='font-Ovo' href="/endorsements-submit-test">Endorsements</Link></li>
            </ul>

            <div className='flex items-center gap-4'>
                
                <button onClick={()=> setIsDarkMode(prev => !prev)}>
                    <Image src={isDarkMode ? assets.sun_icon : assets.moon_icon} alt='' className='w-6 cursor-pointer' />
                </button>

                <Link href="/#contact" className={`hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 font-Ovo
                    ${isDarkMode ? "border-white/50" : ""}`}>Contact 
                    <Image src={isDarkMode ? assets.arrow_icon_dark : assets.arrow_icon } alt="" className='w-3'/></Link>

                    <button className='block md:hidden ml-3' onClick={openMenu}>
                        <Image src={isDarkMode ? assets.menu_white : assets.menu_black} alt='' className='w-6' />
                    </button>
            </div>

            {/* ----------- mobile menu --------- */}

            <ul ref={sideMenuRef} className={`flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64
             top-0 bottom-0 2-64 z-50 h-screen bg-rose-50 transition duration-500
             ${isDarkMode ? "backdrop-blur-md" : ""}`}>
                
                <div className='absolute right-6 top-6' onClick={closeMenu}>
                    <Image src={isDarkMode ? assets.close_white : assets.close_black} alt='' className='w-5 cursor-pointer' />
                </div>

                <li><Link className='font-Ovo' onClick={closeMenu} href="/#top">Home</Link></li>
                <li><Link className='font-Ovo' onClick={closeMenu} href="/#about">About</Link></li>
                <li><Link className='font-Ovo' onClick={closeMenu} href="/#service">Services</Link></li>
                <li><Link className='font-Ovo' onClick={closeMenu} href="/#work">Work</Link></li>
                <li><Link className='font-Ovo' onClick={closeMenu} href="/endorsements-submit-test">Endorse</Link></li>
            </ul>


        </nav>
    </>
  )
}

export default Navbar