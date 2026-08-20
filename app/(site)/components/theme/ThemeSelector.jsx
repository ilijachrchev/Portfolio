'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, ChevronDown, Code2, Github, Monitor, Moon, Palette, Sun } from 'lucide-react'
import spiderMask from '@/app/icon.png'
import { useTheme } from '../ThemeProvider'

const ICONS = {
  light: Sun,
  dark: Moon,
  ide: Code2,
  win98: Monitor,
  github: Github,
}

export default function ThemeSelector({ open, onOpenChange }) {
  const { theme, themes, setTheme } = useTheme()
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const optionRefs = useRef([])
  const themeList = useMemo(() => Object.values(themes), [themes])
  const current = themes[theme]

  useEffect(() => {
    if (!open) return

    const currentIndex = Math.max(0, themeList.findIndex((item) => item.id === theme))
    requestAnimationFrame(() => optionRefs.current[currentIndex]?.focus())

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) onOpenChange(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open, onOpenChange, theme, themeList])

  const closeAndRestoreFocus = () => {
    onOpenChange(false)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }

  const handleListKeyDown = (event) => {
    const activeIndex = optionRefs.current.findIndex((option) => option === document.activeElement)
    let nextIndex = activeIndex

    if (event.key === 'ArrowDown') nextIndex = (activeIndex + 1) % themeList.length
    else if (event.key === 'ArrowUp') nextIndex = (activeIndex - 1 + themeList.length) % themeList.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = themeList.length - 1
    else if (event.key === 'Escape') {
      event.preventDefault()
      closeAndRestoreFocus()
      return
    } else return

    event.preventDefault()
    optionRefs.current[nextIndex]?.focus()
  }

  const selectTheme = (nextTheme) => {
    setTheme(nextTheme)
    closeAndRestoreFocus()
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label={`Appearance: ${current.label}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="theme-palette"
        onClick={() => onOpenChange(!open)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            onOpenChange(true)
          }
        }}
        className="liquid-glass group inline-flex h-10 min-w-10 items-center justify-center gap-2 rounded-full px-2.5 text-foreground transition-transform duration-200 hover:-translate-y-px sm:px-3"
      >
        <Palette className="h-4 w-4 text-primary" aria-hidden="true" />
        <span className="hidden text-[12.5px] font-medium lg:inline">Appearance</span>
        <span className="hidden text-[11px] text-muted-foreground xl:inline">{current.shortLabel}</span>
        <ChevronDown
          className={`hidden h-3.5 w-3.5 text-muted-foreground transition-transform sm:block ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="theme-palette"
            role="dialog"
            aria-label="Choose appearance"
            initial={{ opacity: 0, y: -8, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.985 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="theme-palette fixed right-4 top-[4.75rem] z-[85] w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-popover p-2 text-popover-foreground shadow-2xl sm:absolute sm:right-0 sm:top-[calc(100%+0.75rem)]"
          >
            <div className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Appearance
            </div>

            <div role="radiogroup" aria-label="Portfolio theme" onKeyDown={handleListKeyDown}>
              {themeList.map((item, index) => {
                const Icon = ICONS[item.id]
                const selected = item.id === theme

                return (
                  <button
                    key={item.id}
                    ref={(node) => {
                      optionRefs.current[index] = node
                    }}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectTheme(item.id)}
                    className={`theme-option group/option flex min-h-16 w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-[background-color,border-color,transform] duration-150 hover:bg-muted/70 focus-visible:rounded-xl ${
                      selected ? 'border-primary/35 bg-primary/10' : 'border-transparent'
                    }`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-background/70">
                      {item.id === 'spiderman' ? (
                        <Image
                          src={spiderMask}
                          alt=""
                          className="h-10 w-auto translate-y-1 object-contain transition-transform duration-200 group-hover/option:scale-105"
                          aria-hidden="true"
                        />
                      ) : (
                        <Icon className="h-4.5 w-4.5 text-foreground" aria-hidden="true" />
                      )}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-foreground">{item.label}</span>
                        {selected && <Check className="h-4 w-4 text-primary" aria-hidden="true" />}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{item.description}</span>
                      <span className="mt-2 flex gap-1.5" aria-hidden="true">
                        {item.id === 'github' ? (
                          <span className="relative h-6 w-16 overflow-hidden rounded-sm border border-[#30363d] bg-[#0d1117]">
                            <span className="absolute inset-x-1 top-1 h-1 border-b border-[#30363d]" />
                            <span className="absolute bottom-1 left-1 top-3 w-3 border-r border-[#30363d]" />
                            <span className="absolute bottom-1 left-5 right-1 grid grid-cols-4 gap-px">
                              {[0.25, 0.55, 0.8, 0.4].map((opacity) => (
                                <i key={opacity} className="h-1 bg-[#3fb950]" style={{ opacity }} />
                              ))}
                            </span>
                          </span>
                        ) : item.id === 'win98' ? (
                          <span className="relative h-5 w-14 overflow-hidden border border-black bg-[#008080]">
                            <span className="absolute left-2 top-1 h-3 w-8 bg-[#c0c0c0] shadow-[1px_1px_0_#000]">
                              <span className="block h-1 bg-[#000080]" />
                            </span>
                            <span className="absolute inset-x-0 bottom-0 h-1 bg-[#c0c0c0]" />
                          </span>
                        ) : item.preview.map((color) => (
                          <span key={color} className="h-1.5 w-5 rounded-full border border-foreground/10" style={{ backgroundColor: color }} />
                        ))}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
