'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useMotionValue } from 'motion/react'
import { getMissionSystem, MISSION_SYSTEMS } from './missionSystems'

const MissionControlContext = createContext(null)

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

export function findActiveMissionSystem(metrics, scrollTop, viewportHeight) {
  if (!metrics.length) return null

  const activationY = scrollTop + clamp(viewportHeight * 0.32, 150, 320)
  let activeMetric = metrics[0]

  for (const metric of metrics) {
    if (metric.top <= activationY) activeMetric = metric
    else break
  }

  const scrollRange = document.documentElement.scrollHeight - viewportHeight
  return scrollTop >= scrollRange - 3 ? metrics[metrics.length - 1] : activeMetric
}

export function MissionControlProvider({ children }) {
  const [activeSystemId, setActiveSystemId] = useState('overview')
  const documentProgress = useMotionValue(0)
  const activeSystemRef = useRef('overview')
  const metricsRef = useRef([])
  const scrollFrameRef = useRef(0)
  const measureFrameRef = useRef(0)
  const navigationLockRef = useRef(null)
  const activeSystem = MISSION_SYSTEMS.find((system) => system.id === activeSystemId)
    || MISSION_SYSTEMS[0]

  const activateSystem = useCallback((systemId) => {
    const system = MISSION_SYSTEMS.find((candidate) => candidate.id === systemId)
    if (!system || activeSystemRef.current === system.id) return
    activeSystemRef.current = system.id
    setActiveSystemId(system.id)
  }, [])

  const updateFromScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    documentProgress.set(clamp(scrollTop / scrollRange))

    const activeMetric = findActiveMissionSystem(
      metricsRef.current,
      scrollTop,
      window.innerHeight,
    )
    if (!activeMetric) return

    const navigationLock = navigationLockRef.current
    if (navigationLock?.until > Date.now()) return
    navigationLockRef.current = null
    activateSystem(activeMetric.system.id)
  }, [activateSystem, documentProgress])

  const scheduleScrollUpdate = useCallback(() => {
    if (scrollFrameRef.current) return
    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = 0
      updateFromScroll()
    })
  }, [updateFromScroll])

  const measureSystems = useCallback(() => {
    metricsRef.current = MISSION_SYSTEMS.map((system, index) => {
      const element = document.getElementById(system.sectionId)
      if (!element) return null
      const rect = element.getBoundingClientRect()

      return {
        system,
        index,
        element,
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
      }
    }).filter(Boolean).sort((a, b) => a.top - b.top)

    updateFromScroll()
    return metricsRef.current
  }, [updateFromScroll])

  const scheduleMeasure = useCallback(() => {
    cancelAnimationFrame(measureFrameRef.current)
    measureFrameRef.current = requestAnimationFrame(measureSystems)
  }, [measureSystems])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.missionControl = 'true'
    const elements = MISSION_SYSTEMS.map((system, index) => {
      const element = document.getElementById(system.sectionId)
      if (!element) return null
      element.dataset.missionSystem = system.id
      element.dataset.missionStage = String(index + 1).padStart(2, '0')
      return element
    }).filter(Boolean)

    return () => {
      delete root.dataset.missionControl
      delete root.dataset.missionActiveSystem
      elements.forEach((element) => {
        delete element.dataset.missionSystem
        delete element.dataset.missionStage
      })
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.missionActiveSystem = activeSystem.id
  }, [activeSystem.id])

  useEffect(() => {
    const metrics = measureSystems()
    const resizeObserver = new ResizeObserver(scheduleMeasure)
    metrics.forEach(({ element }) => resizeObserver.observe(element))

    window.addEventListener('scroll', scheduleScrollUpdate, { passive: true })
    window.addEventListener('resize', scheduleMeasure, { passive: true })
    window.addEventListener('load', scheduleMeasure)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('scroll', scheduleScrollUpdate)
      window.removeEventListener('resize', scheduleMeasure)
      window.removeEventListener('load', scheduleMeasure)
      cancelAnimationFrame(scrollFrameRef.current)
      cancelAnimationFrame(measureFrameRef.current)
    }
  }, [measureSystems, scheduleMeasure, scheduleScrollUpdate])

  const navigateToSystem = useCallback((value) => {
    const system = getMissionSystem(value)
    if (!system) return false

    activateSystem(system.id)
    const element = document.getElementById(system.sectionId)
    if (!element) {
      window.location.assign(`/#${system.sectionId}`)
      return true
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const headerOffset = window.matchMedia('(max-width: 919px)').matches ? 118 : 76
    navigationLockRef.current = {
      systemId: system.id,
      until: Date.now() + (reduceMotion ? 100 : 1400),
    }
    window.scrollTo({
      top: Math.max(0, element.getBoundingClientRect().top + window.scrollY - headerOffset),
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
    return true
  }, [activateSystem])

  const value = useMemo(() => ({
    activeSystem,
    activeSystemId,
    documentProgress,
    activateSystem,
    navigateToSystem,
  }), [activateSystem, activeSystem, activeSystemId, documentProgress, navigateToSystem])

  return (
    <MissionControlContext.Provider value={value}>
      {children}
    </MissionControlContext.Provider>
  )
}

export function useMissionControl() {
  const context = useContext(MissionControlContext)
  if (!context) throw new Error('useMissionControl must be used within MissionControlProvider')
  return context
}
