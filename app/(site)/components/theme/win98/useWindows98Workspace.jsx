'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { WINDOWS98_APPS } from './windows98Apps'

const Windows98WorkspaceContext = createContext(null)

export function Windows98WorkspaceProvider({ children }) {
  const [selectedShortcut, setSelectedShortcut] = useState('computer')
  const [activeAppId, setActiveAppId] = useState('computer')

  useEffect(() => {
    document.documentElement.dataset.win98ActiveApp = activeAppId
    return () => delete document.documentElement.dataset.win98ActiveApp
  }, [activeAppId])

  useEffect(() => {
    const sections = WINDOWS98_APPS.map((app) => {
      const element = document.getElementById(app.sectionId)
      if (!element) return null
      element.dataset.win98App = app.id
      element.dataset.win98Title = app.label
      return element
    }).filter(Boolean)

    document.documentElement.dataset.win98Workspace = 'true'
    return () => {
      delete document.documentElement.dataset.win98Workspace
      sections.forEach((element) => {
        delete element.dataset.win98App
        delete element.dataset.win98Title
      })
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (!visible) return

      const app = WINDOWS98_APPS.find((candidate) => candidate.sectionId === visible.target.id)
      if (app) setActiveAppId(app.id)
    }, {
      rootMargin: '-32% 0px -52% 0px',
      threshold: [0, 0.05, 0.2],
    })

    WINDOWS98_APPS.forEach((app) => {
      const section = document.getElementById(app.sectionId)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

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
