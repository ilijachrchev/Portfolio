'use client'
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { DEFAULT_THEME, THEMES, getThemeDefinition, isThemeId } from './theme/themes'

const ThemeCtx = createContext(null)

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : DEFAULT_THEME
}

function applyThemeToDocument(theme) {
  const definition = getThemeDefinition(theme)
  const root = document.documentElement

  root.dataset.theme = definition.id
  root.dataset.colorScheme = definition.colorScheme
  root.classList.toggle('dark', definition.colorScheme === 'dark')
  root.style.colorScheme = definition.colorScheme
}

function getInitialClientTheme() {
  if (typeof document === 'undefined') return DEFAULT_THEME
  const theme = document.documentElement.dataset.theme
  return isThemeId(theme) ? theme : DEFAULT_THEME
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialClientTheme)
  const [isHydrated, setIsHydrated] = useState(false)
  const hasExplicitChoice = useRef(false)

  useEffect(() => {
    let storedTheme = null

    try {
      storedTheme = localStorage.getItem('theme')
    } catch {}

    hasExplicitChoice.current = isThemeId(storedTheme)
    const resolvedTheme = hasExplicitChoice.current ? storedTheme : getSystemTheme()
    applyThemeToDocument(resolvedTheme)
    setThemeState(resolvedTheme)
    setIsHydrated(true)

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemChange = () => {
      if (hasExplicitChoice.current) return
      const nextTheme = getSystemTheme()
      applyThemeToDocument(nextTheme)
      setThemeState(nextTheme)
    }

    const handleStorage = (event) => {
      if (event.key !== 'theme') return
      hasExplicitChoice.current = isThemeId(event.newValue)
      const nextTheme = hasExplicitChoice.current ? event.newValue : getSystemTheme()
      applyThemeToDocument(nextTheme)
      setThemeState(nextTheme)
    }

    media.addEventListener?.('change', handleSystemChange)
    window.addEventListener('storage', handleStorage)

    return () => {
      media.removeEventListener?.('change', handleSystemChange)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const setTheme = useCallback((nextTheme) => {
    if (!isThemeId(nextTheme)) return

    hasExplicitChoice.current = true
    applyThemeToDocument(nextTheme)
    setThemeState(nextTheme)

    try {
      localStorage.setItem('theme', nextTheme)
    } catch {}
  }, [])

  const themeDefinition = getThemeDefinition(theme)

  return (
    <ThemeCtx.Provider
      value={{
        theme,
        themeDefinition,
        themes: THEMES,
        setTheme,
        isDarkScheme: themeDefinition.colorScheme === 'dark',
        isHydrated,
      }}
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeCtx.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeCtx)
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>')
  return ctx
}
