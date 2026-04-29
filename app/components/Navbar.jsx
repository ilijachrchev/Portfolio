'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react'
import { useTheme } from '../(site)/components/ThemeProvider'

const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'service', label: 'Volunteering', href: '#service' },
  { id: 'work', label: 'Projects', href: '#work' },
  { id: 'endorsements-home', label: 'Endorsements', href: '#endorsements-home' },
]

export default function Navbar() {
  const { isDarkMode, setIsDarkMode } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const drawerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id).concat('contact')
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.01, 0.1] }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? 'liquid-glass' : ''
        }`}
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8">
          <Link
            href="#home"
            aria-label="Ilija, home"
            className="flex items-center gap-1 font-display text-2xl italic text-foreground"
            style={{ letterSpacing: '-0.01em' }}
          >
            <span>ilija</span>
            <span className="-mb-1 ml-0.5 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
          </Link>

          <div className="hidden items-center gap-8 text-[13.5px] md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                data-nav={link.id}
                className={`text-foreground transition-opacity duration-200 ${
                  active === link.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
                style={{ letterSpacing: '0.005em' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsDarkMode((v) => !v)}
              aria-label="Toggle theme"
              aria-pressed={isDarkMode}
              className="liquid-glass inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-transform duration-200 hover:-translate-y-px"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
              )}
            </button>

            <Link
              href="#contact"
              className="liquid-glass hidden items-center gap-1.5 rounded-full px-4 py-2 text-[13.5px] text-foreground transition-transform duration-200 hover:-translate-y-px lg:inline-flex"
              style={{ letterSpacing: '0.005em' }}
            >
              Contact
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="liquid-glass inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground md:hidden"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed right-0 top-0 z-[70] flex h-full w-72 flex-col gap-2 bg-background p-8 pt-20 shadow-2xl transition-transform duration-300 md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <nav className="flex flex-col gap-1" aria-label="Mobile primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 font-display text-lg text-foreground transition-colors hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex items-center justify-between rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
          >
            Contact
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>
      </aside>
    </>
  )
}