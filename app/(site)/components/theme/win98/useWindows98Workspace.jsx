'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { WINDOWS98_APPS } from './windows98Apps'
import { createWindows98WindowState } from './windows98Windows'

const Windows98WorkspaceContext = createContext(null)

function raiseWindow(current, windowId, patch = {}) {
  const ordered = Object.values(current)
    .filter((window) => window.open && window.id !== windowId)
    .sort((a, b) => a.zIndex - b.zIndex)
  const next = { ...current }
  ordered.forEach((window, index) => {
    next[window.id] = { ...window, zIndex: 41 + index }
  })
  const zIndex = current[windowId].modal ? 56 : 41 + ordered.length
  next[windowId] = { ...current[windowId], ...patch, zIndex }
  return next
}

export function Windows98WorkspaceProvider({ children }) {
  const [selectedShortcut, setSelectedShortcut] = useState('computer')
  const [activeAppId, setActiveAppId] = useState('computer')
  const [windows, setWindows] = useState(createWindows98WindowState)
  const [activeWindowId, setActiveWindowId] = useState(null)
  const [errorMessage, setErrorMessage] = useState('The requested operation could not be completed.')
  const [isShutdown, setIsShutdown] = useState(false)

  const openWindow = useCallback((windowId) => {
    if (!windows[windowId]) return false
    setWindows((current) => raiseWindow(current, windowId, {
      open: true,
      minimized: false,
    }))
    setActiveWindowId(windowId)
    setSelectedShortcut(windowId)
    return true
  }, [windows])

  const closeWindow = useCallback((windowId) => {
    setWindows((current) => ({
      ...current,
      [windowId]: {
        ...current[windowId],
        open: false,
        minimized: false,
      },
    }))
    setActiveWindowId((current) => current === windowId ? null : current)
  }, [])

  const focusWindow = useCallback((windowId) => {
    setWindows((current) => raiseWindow(current, windowId, { minimized: false }))
    setActiveWindowId(windowId)
  }, [])

  const minimizeWindow = useCallback((windowId) => {
    setWindows((current) => ({
      ...current,
      [windowId]: {
        ...current[windowId],
        minimized: true,
      },
    }))
    setActiveWindowId((current) => current === windowId ? null : current)
  }, [])

  const toggleMaximizeWindow = useCallback((windowId) => {
    focusWindow(windowId)
    setWindows((current) => ({
      ...current,
      [windowId]: {
        ...current[windowId],
        maximized: !current[windowId].maximized,
      },
    }))
  }, [focusWindow])

  const moveWindow = useCallback((windowId, position) => {
    setWindows((current) => ({
      ...current,
      [windowId]: {
        ...current[windowId],
        position,
      },
    }))
  }, [])

  const showError = useCallback((message) => {
    setErrorMessage(message)
    openWindow('error')
  }, [openWindow])

  const shutdownPortfolio = useCallback(() => setIsShutdown(true), [])
  const restartPortfolio = useCallback(() => setIsShutdown(false), [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape' || !activeWindowId) return
      if (document.querySelector('[data-app-modal="true"]')) return
      if (document.querySelector('[role="menu"][aria-label="Start menu"]')) return
      event.preventDefault()
      closeWindow(activeWindowId)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeWindowId, closeWindow])

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
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    moveWindow,
    errorMessage,
    showError,
    isShutdown,
    shutdownPortfolio,
    restartPortfolio,
  }), [activeAppId, activeWindowId, closeWindow, errorMessage, focusWindow, isShutdown, minimizeWindow, moveWindow, navigateToApp, openWindow, restartPortfolio, selectedShortcut, showError, shutdownPortfolio, toggleMaximizeWindow, windows])

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
