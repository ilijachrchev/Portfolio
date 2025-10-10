'use client'
import { useTheme } from './components/ThemeProvider'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer.jsx'
import Header from '../components/Header.jsx'
import Services from '../components/Services.jsx'
import Work from '../components/Work.jsx'

export default function Home() {
  const { isDarkMode } = useTheme()

  return (
    <>
      <Header isDarkMode={isDarkMode} />
      <About isDarkMode={isDarkMode} />
      <Services isDarkMode={isDarkMode} />
      <Work isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </>
  )
}
