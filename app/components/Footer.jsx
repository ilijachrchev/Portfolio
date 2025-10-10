import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { Github, Linkedin, Instagram } from 'lucide-react'

const Footer = ({isDarkMode}) => {
  return (
    <div className='mt-20'>
        <div className='text-center'>
            <Image src={isDarkMode ? assets.logo_dark : assets.logo} alt='' className='w-36 mx-auto mb-2' />

            <div className='w-max flex items-center gap-2 mx-auto'>
                <Image src={isDarkMode ? assets.mail_icon_dark : assets.mail_icon} alt='' className='w-6' />
                ilijachrchev@gmail.com
            </div>
        </div>

        <div className=' text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6'>
            <p>© 2025 Ilija Chrchev. All rights reserved.</p>
            <ul className="flex items-center gap-10 justify-center mt-4 sm:mt-0">
                <li>
                    <a
                    href="https://github.com/ilijachrchev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:opacity-80 transition"
                    aria-label="GitHub"
                    title="GitHub"
                    >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                    </a>
                </li>

                <li>
                    <a
                    href="https://www.linkedin.com/in/ilija-chrchev-0a4789296/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:opacity-80 transition"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                    </a>
                </li>

                <li>
                    <a
                    href="https://www.instagram.com/ilijachrchev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:opacity-80 transition"
                    aria-label="Instagram"
                    title="Instagram"
                    >
                    <Instagram className="w-5 h-5" />
                    <span>Instagram</span>
                    </a>
                </li>
            </ul>

        </div>
    </div>
  )
}

export default Footer