'use client'
import React, { createContext, useCallback, useContext, useLayoutEffect, useRef, useState } from 'react'
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

function getAppliedDocumentTheme() {
  const root = document.documentElement
  const theme = root.dataset.theme

  if (!isThemeId(theme)) return null

  const definition = getThemeDefinition(theme)
  const isDark = definition.colorScheme === 'dark'
  const matchesBootstrapState =
    root.dataset.colorScheme === definition.colorScheme &&
    root.classList.contains('dark') === isDark &&
    root.style.colorScheme === definition.colorScheme

  return matchesBootstrapState ? theme : null
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(DEFAULT_THEME)
  const [isHydrated, setIsHydrated] = useState(false)
  const [transition, setTransition] = useState(null)
  const hasExplicitChoice = useRef(false)

  const commitTheme = useCallback((nextTheme, persist = true) => {
    applyThemeToDocument(nextTheme)
    setThemeState(nextTheme)

    if (!persist) return
    try {
      localStorage.setItem('theme', nextTheme)
    } catch {}
  }, [])

  useLayoutEffect(() => {
    let storedTheme = null

    try {
      storedTheme = localStorage.getItem('theme')
    } catch {}

    hasExplicitChoice.current = isThemeId(storedTheme)
    const documentTheme = getAppliedDocumentTheme()
    const resolvedTheme = hasExplicitChoice.current
      ? storedTheme
      : isThemeId(documentTheme)
        ? documentTheme
        : getSystemTheme()
    applyThemeToDocument(resolvedTheme)
    setThemeState(resolvedTheme)
    setIsHydrated(true)

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemChange = () => {
      if (hasExplicitChoice.current) return
      const nextTheme = getSystemTheme()
      commitTheme(nextTheme, false)
    }

    const handleStorage = (event) => {
      if (event.key !== 'theme') return
      hasExplicitChoice.current = isThemeId(event.newValue)
      const nextTheme = hasExplicitChoice.current ? event.newValue : getSystemTheme()
      setTransition(null)
      commitTheme(nextTheme, false)
    }

    media.addEventListener?.('change', handleSystemChange)
    window.addEventListener('storage', handleStorage)

    return () => {
      media.removeEventListener?.('change', handleSystemChange)
      window.removeEventListener('storage', handleStorage)
    }
  }, [commitTheme])

  const setTheme = useCallback((nextTheme) => {
    if (!isThemeId(nextTheme) || transition) return

    hasExplicitChoice.current = true
    if (nextTheme === theme) {
      try {
        localStorage.setItem('theme', nextTheme)
      } catch {}
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const usesSpiderTransition = theme === 'spiderman' || nextTheme === 'spiderman'

    if (usesSpiderTransition && !reduceMotion) {
      setTransition({ from: theme, to: nextTheme })
      return
    }

    commitTheme(nextTheme)
  }, [commitTheme, theme, transition])

  const commitPendingTheme = useCallback(() => {
    if (!transition) return
    commitTheme(transition.to)
  }, [commitTheme, transition])

  const finishThemeTransition = useCallback(() => {
    setTransition(null)
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
        transition,
        commitPendingTheme,
        finishThemeTransition,
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
