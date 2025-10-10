'use client'

import { ThemeProvider, useTheme } from './components/ThemeProvider'
import Navbar from '../components/Navbar' 
import '@/app/globals.css'

function WithNavbar({ children }) {
  const { isDarkMode, setIsDarkMode } = useTheme()
  return (
    <div className="min-h-dvh">
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <main className="pt-16">{children}</main>
    </div>
  )
}

export default function SiteLayout({ children }) {
  return (
    <ThemeProvider>
      <WithNavbar>{children}</WithNavbar>
    </ThemeProvider>
  )
}
