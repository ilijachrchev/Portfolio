'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import { useMotionValue } from 'motion/react'
import { MISSION_SYSTEMS } from './missionSystems'

const MissionControlContext = createContext(null)

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
