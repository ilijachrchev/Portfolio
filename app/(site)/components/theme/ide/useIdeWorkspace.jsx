'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { usePathname } from 'next/navigation'
import { useMotionValue } from 'motion/react'
import { IDE_FILES, IDE_SECTION_FILES, getIdeFile, getVirtualLine } from './ideFiles'

const IdeWorkspaceContext = createContext(null)

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

export function isEditableTarget(target) {
  return target instanceof HTMLElement && Boolean(
    target.closest('input, textarea, select, [contenteditable="true"], [role="textbox"]')
  )
}

export function hasOpenAppModal() {
  return Boolean(document.querySelector('[data-app-modal="true"]'))
}

export function IdeWorkspaceProvider({ children }) {
  const pathname = usePathname()
  const [activeFileId, setActiveFileId] = useState('home')
  const [openFileIds, setOpenFileIds] = useState(['home'])
  const [explorerOpen, setExplorerOpen] = useState(
    () => typeof window === 'undefined' || !window.matchMedia('(max-width: 1179px)').matches
  )
  const [sourceOpen, setSourceOpen] = useState(true)
  const [rootOpen, setRootOpen] = useState(true)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [terminalClearSignal, setTerminalClearSignal] = useState(0)
  const [minimapVisible, setMinimapVisible] = useState(true)
  const [focusMode, setFocusMode] = useState(false)
  const [palette, setPalette] = useState({ open: false, mode: 'commands', query: '' })
  const [virtualLine, setVirtualLine] = useState(1)
  const [contactModified, setContactModified] = useState(false)
  const [hasSections, setHasSections] = useState(false)
  const sectionProgress = useMotionValue(0)
  const documentProgress = useMotionValue(0)
  const metricsRef = useRef([])
  const activeFileRef = useRef('home')
  const navigationLockRef = useRef(null)
  const scrollFrameRef = useRef(0)
  const measureFrameRef = useRef(0)

  const activateFile = useCallback((fileId, shouldOpen = true) => {
    const file = getIdeFile(fileId)
    if (!file) return

    activeFileRef.current = file.id
    setActiveFileId(file.id)
    if (shouldOpen) {
      setOpenFileIds((current) => current.includes(file.id) ? current : [...current, file.id])
    }
    setVirtualLine(file.lineRange[0])
  }, [])

  const updateFromScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    documentProgress.set(clamp(scrollTop / scrollRange))

    const metrics = metricsRef.current
    if (!metrics.length) return

    const activationY = scrollTop + clamp(window.innerHeight * 0.32, 150, 320)
    let metric = metrics[0]
    for (const candidate of metrics) {
      if (candidate.top <= activationY) metric = candidate
      else break
    }

    if (scrollTop >= scrollRange - 3) metric = metrics[metrics.length - 1]

    const localProgress = clamp((activationY - metric.top) / Math.max(1, metric.bottom - metric.top))
    sectionProgress.set(localProgress)

    const locked = navigationLockRef.current
    if (!locked || locked.until < Date.now()) {
      navigationLockRef.current = null
      if (activeFileRef.current !== metric.file.id) activateFile(metric.file.id)
      setVirtualLine(getVirtualLine(metric.file, localProgress))
    }
  }, [activateFile, documentProgress, sectionProgress])

  const scheduleScrollUpdate = useCallback(() => {
    if (scrollFrameRef.current) return
    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = 0
      updateFromScroll()
    })
  }, [updateFromScroll])

  const measureSections = useCallback(() => {
    const metrics = IDE_SECTION_FILES.map((file) => {
      const element = document.getElementById(file.sectionId)
      if (!element) return null
      const rect = element.getBoundingClientRect()
      element.dataset.ideFile = file.name
      element.dataset.idePath = file.path
      element.dataset.ideKind = file.personality
      return {
        file,
        element,
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
      }
    }).filter(Boolean).sort((a, b) => a.top - b.top)

    metricsRef.current = metrics
    setHasSections(metrics.length > 0)
    updateFromScroll()
    return metrics
  }, [updateFromScroll])

  const scheduleMeasure = useCallback(() => {
    cancelAnimationFrame(measureFrameRef.current)
    measureFrameRef.current = requestAnimationFrame(measureSections)
  }, [measureSections])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.ideWorkspace = 'true'

    const metrics = measureSections()
    const resizeObserver = new ResizeObserver(scheduleMeasure)
    metrics.forEach(({ element }) => resizeObserver.observe(element))

    window.addEventListener('scroll', scheduleScrollUpdate, { passive: true })
    window.addEventListener('resize', scheduleMeasure, { passive: true })
    window.addEventListener('load', scheduleMeasure)

    return () => {
      delete root.dataset.ideWorkspace
      delete root.dataset.ideExplorer
      delete root.dataset.ideActiveFile
      IDE_SECTION_FILES.forEach((file) => {
        const element = document.getElementById(file.sectionId)
        if (!element) return
        delete element.dataset.ideFile
        delete element.dataset.idePath
        delete element.dataset.ideKind
      })
      resizeObserver.disconnect()
      window.removeEventListener('scroll', scheduleScrollUpdate)
      window.removeEventListener('resize', scheduleMeasure)
      window.removeEventListener('load', scheduleMeasure)
      cancelAnimationFrame(scrollFrameRef.current)
      cancelAnimationFrame(measureFrameRef.current)
    }
  }, [measureSections, pathname, scheduleMeasure, scheduleScrollUpdate])

  useLayoutEffect(() => {
    document.documentElement.dataset.ideExplorer = explorerOpen ? 'open' : 'closed'
  }, [explorerOpen])

  useLayoutEffect(() => {
    document.documentElement.dataset.ideFocus = focusMode ? 'true' : 'false'
    return () => delete document.documentElement.dataset.ideFocus
  }, [focusMode])

  useEffect(() => {
    const file = getIdeFile(activeFileId)
    if (file) document.documentElement.dataset.ideActiveFile = file.id
  }, [activeFileId])

  useEffect(() => {
    const form = document.querySelector('[data-theme-slot="contact-form"]')
    if (!form) return

    const updateModified = () => {
      const hasValue = Array.from(form.querySelectorAll('input:not([type="hidden"]), textarea'))
        .some((field) => field.value.trim().length > 0)
      setContactModified(hasValue)
    }
    const handleReset = () => requestAnimationFrame(updateModified)

    form.addEventListener('input', updateModified)
    form.addEventListener('reset', handleReset)
    return () => {
      form.removeEventListener('input', updateModified)
      form.removeEventListener('reset', handleReset)
    }
  }, [pathname])

  const navigateToFile = useCallback((value) => {
    const file = getIdeFile(value)
    if (!file) return false

    if (file.href) {
      window.open(file.href, '_blank', 'noopener,noreferrer')
      return true
    }

    activateFile(file.id)
    if (!file.sectionId) return true

    if (pathname !== '/') {
      window.location.assign(`/#${file.sectionId}`)
      return true
    }

    const element = document.getElementById(file.sectionId)
    if (!element) return false
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const top = element.getBoundingClientRect().top + window.scrollY - 112
    navigationLockRef.current = { id: file.id, until: Date.now() + (reduceMotion ? 100 : 950) }
    window.scrollTo({ left: 0, top: Math.max(0, top), behavior: reduceMotion ? 'auto' : 'smooth' })
    window.setTimeout(() => {
      if (navigationLockRef.current?.id === file.id) navigationLockRef.current = null
      scheduleScrollUpdate()
    }, reduceMotion ? 120 : 980)
    return true
  }, [activateFile, pathname, scheduleScrollUpdate])

  const closeFile = useCallback((value) => {
    const file = getIdeFile(value)
    if (!file) return
    const remaining = openFileIds.filter((id) => id !== file.id)
    setOpenFileIds(remaining)
    if (activeFileRef.current === file.id) {
      navigateToFile(remaining[remaining.length - 1] || 'home')
    }
  }, [navigateToFile, openFileIds])

  const openPalette = useCallback((mode = 'commands', query = '') => {
    setTerminalOpen(false)
    setPalette({ open: true, mode, query })
  }, [])

  const closePalette = useCallback(() => {
    setPalette((current) => ({ ...current, open: false }))
  }, [])

  const toggleTerminal = useCallback(() => {
    setPalette((current) => ({ ...current, open: false }))
    setTerminalOpen((current) => !current)
  }, [])

  const clearTerminal = useCallback(() => {
    setTerminalOpen(true)
    setTerminalClearSignal((current) => current + 1)
  }, [])

  const toggleFocusMode = useCallback(() => {
    setFocusMode((current) => {
      if (!current) setExplorerOpen(false)
      return !current
    })
  }, [])

  const resetWorkspaceLayout = useCallback(() => {
    setExplorerOpen(!window.matchMedia('(max-width: 1179px)').matches)
    setSourceOpen(true)
    setRootOpen(true)
    setTerminalOpen(false)
    setMinimapVisible(true)
    setFocusMode(false)
    setPalette((current) => ({ ...current, open: false }))
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (hasOpenAppModal()) {
        setPalette((current) => ({ ...current, open: false }))
        setTerminalOpen(false)
        return
      }
      if (isEditableTarget(event.target)) return

      const commandKey = event.metaKey || event.ctrlKey
      if (commandKey && event.key.toLowerCase() === 'p') {
        event.preventDefault()
        openPalette(event.shiftKey ? 'commands' : 'files')
        return
      }
      if (commandKey && event.key.toLowerCase() === 'b') {
        event.preventDefault()
        setExplorerOpen((current) => !current)
        return
      }
      if (event.ctrlKey && event.key === '`') {
        event.preventDefault()
        toggleTerminal()
        return
      }
      if (event.key === 'Escape') {
        if (palette.open) closePalette()
        else if (terminalOpen) setTerminalOpen(false)
        else if (window.matchMedia('(max-width: 1179px)').matches) setExplorerOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closePalette, openPalette, palette.open, terminalOpen, toggleTerminal])

  const activeFile = getIdeFile(activeFileId) || IDE_FILES[0]
  const openFiles = openFileIds.map(getIdeFile).filter(Boolean)

  const value = useMemo(() => ({
    activeFile,
    openFiles,
    navigateToFile,
    closeFile,
    explorerOpen,
    setExplorerOpen,
    sourceOpen,
    setSourceOpen,
    rootOpen,
    setRootOpen,
    terminalOpen,
    setTerminalOpen,
    toggleTerminal,
    terminalClearSignal,
    clearTerminal,
    minimapVisible,
    setMinimapVisible,
    focusMode,
    toggleFocusMode,
    resetWorkspaceLayout,
    palette,
    openPalette,
    closePalette,
    virtualLine,
    contactModified,
    hasSections,
    sectionProgress,
    documentProgress,
    remeasure: scheduleMeasure,
  }), [
    activeFile,
    openFiles,
    navigateToFile,
    closeFile,
    explorerOpen,
    sourceOpen,
    rootOpen,
    terminalOpen,
    toggleTerminal,
    terminalClearSignal,
    clearTerminal,
    minimapVisible,
    focusMode,
    toggleFocusMode,
    resetWorkspaceLayout,
    palette,
    openPalette,
    closePalette,
    virtualLine,
    contactModified,
    hasSections,
    sectionProgress,
    documentProgress,
    scheduleMeasure,
  ])

  return <IdeWorkspaceContext.Provider value={value}>{children}</IdeWorkspaceContext.Provider>
}

export function useIdeWorkspace() {
  const context = useContext(IdeWorkspaceContext)
  if (!context) throw new Error('useIdeWorkspace must be used within IdeWorkspaceProvider')
  return context
}
