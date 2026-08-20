import { ThemeProvider } from './components/ThemeProvider'
import ThemeExperience from './components/theme/ThemeExperience'
import ThemeTransitionLayer from './components/theme/ThemeTransitionLayer'
import Navbar from '../components/Navbar'

export default function SiteLayout({ children }) {
  return (
    <ThemeProvider>
      <div className="relative min-h-dvh bg-background">
        <ThemeExperience />
        <ThemeTransitionLayer />
        <Navbar />
        <main className="relative z-10">{children}</main>
      </div>
    </ThemeProvider>
  )
}
