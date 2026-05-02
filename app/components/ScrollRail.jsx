'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ScrollRail({ children, ariaLabel = 'Scrollable content' }) {
  const railRef = useRef(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const updateButtons = useCallback(() => {
    const el = railRef.current
    if (!el) return
    const epsilon = 4
    setCanPrev(el.scrollLeft > epsilon)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - epsilon)
  }, [])

  useEffect(() => {
    updateButtons()
    const el = railRef.current
    if (!el) return

    el.addEventListener('scroll', updateButtons, { passive: true })

    const ro = new ResizeObserver(updateButtons)
    ro.observe(el)

    return () => {
      el.removeEventListener('scroll', updateButtons)
      ro.disconnect()
    }
  }, [updateButtons])

  const scrollByAmount = (direction) => {
    const el = railRef.current
    if (!el) return
    const firstCard = el.querySelector('[data-rail-item]')
    const step = firstCard ? firstCard.getBoundingClientRect().width + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollByAmount(-1)}
        disabled={!canPrev}
        aria-label="Scroll left"
        className="liquid-glass absolute left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-foreground transition-opacity duration-200 disabled:pointer-events-none disabled:opacity-0 md:inline-flex lg:-left-4"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => scrollByAmount(1)}
        disabled={!canNext}
        aria-label="Scroll right"
        className="liquid-glass absolute right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-foreground transition-opacity duration-200 disabled:pointer-events-none disabled:opacity-0 md:inline-flex lg:-right-4"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent"
        aria-hidden="true"
      />

      <div
        ref={railRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 py-2 md:px-6"
        style={{ scrollPaddingLeft: '1rem' }}
      >
        {children}
      </div>
    </div>
  )
}