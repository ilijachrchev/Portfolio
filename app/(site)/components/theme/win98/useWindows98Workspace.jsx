'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { WINDOWS98_APPS } from './windows98Apps'

const Windows98WorkspaceContext = createContext(null)

export function Windows98WorkspaceProvider({ children }) {
  const [selectedShortcut, setSelectedShortcut] = useState('computer')
  const [activeAppId, setActiveAppId] = useState('computer')

  const navigateToApp = useCallback((appId) => {
    const app = WINDOWS98_APPS.find((candidate) => candidate.id === appId)
    if (!app) return false

    setSelectedShortcut(app.id)
    setActiveAppId(app.id)
    const section = document.getElementById(app.sectionId)
    if (!section) {
      window.location.assign(`/#${app.sectionId}`)
      return true
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const top = section.getBoundingClientRect().top + window.scrollY - 14
    window.scrollTo({
      top: Math.max(0, top),
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
    return true
  }, [])

  const value = useMemo(() => ({
    selectedShortcut,
    setSelectedShortcut,
    activeAppId,
    setActiveAppId,
    navigateToApp,
  }), [activeAppId, navigateToApp, selectedShortcut])

  return (
    <Windows98WorkspaceContext.Provider value={value}>
      {children}
    </Windows98WorkspaceContext.Provider>
  )
}

export function useWindows98Workspace() {
  const context = useContext(Windows98WorkspaceContext)
  if (!context) throw new Error('useWindows98Workspace must be used within Windows98WorkspaceProvider')
  return context
}
