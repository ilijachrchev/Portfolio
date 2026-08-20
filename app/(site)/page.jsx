import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer.jsx'
import Header from '../components/Header.jsx'
import Services from '../components/Services.jsx'
import Work from '../components/Work.jsx'
import EndorsementsHome from '../components/EndorsementsHome'

export default function Home() {
  return (
    <>
      <Header />
      <About />
      <Services />
      <Work />
      <EndorsementsHome />
      <Contact />
      <Footer />
    </>
  )
}
