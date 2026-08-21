'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import { useMotionValue } from 'motion/react'
import { MISSION_SYSTEMS } from './missionSystems'

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
  const activeSystem = MISSION_SYSTEMS.find((system) => system.id === activeSystemId)
    || MISSION_SYSTEMS[0]

  const value = useMemo(() => ({
    activeSystem,
    activeSystemId,
    documentProgress,
    setActiveSystemId,
  }), [activeSystem, activeSystemId, documentProgress])

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
