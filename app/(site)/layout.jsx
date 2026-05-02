'use client'

import { ThemeProvider } from './components/ThemeProvider'
import Navbar from '../components/Navbar'

export default function SiteLayout({ children }) {
  return (
    <ThemeProvider>
      <div className="min-h-dvh bg-background">
        <Navbar />
        <main>{children}</main>
      </div>
    </ThemeProvider>
  )
}