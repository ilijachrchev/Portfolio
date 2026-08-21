'use client'

import { useEffect, useRef } from 'react'
import { useMissionControl } from './useMissionControl'

const SELECTORS = {
  profile: '[data-mission-capability]',
  operations: '[data-mission-ops]',
  missions: '[data-mission-id]',
  reports: '[data-mission-report]',
  comms: '[data-mission-field]',
}

export default function MissionObjectReadout() {
  const { activeSystem } = useMissionControl()
  const outputRef = useRef(null)

  useEffect(() => {
    const section = document.getElementById(activeSystem.sectionId)
    const selector = SELECTORS[activeSystem.id]
    const update = () => {
      const count = selector ? section?.querySelectorAll(selector).length || 0 : 1
      const adjustedCount = activeSystem.id === 'profile' ? Math.ceil(count / 2) : count
      if (outputRef.current) outputRef.current.textContent = String(adjustedCount).padStart(2, '0')
    }
    update()
    if (!section) return undefined
    const observer = new MutationObserver(update)
    observer.observe(section, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [activeSystem.id, activeSystem.sectionId])

  return <span ref={outputRef}>00</span>
}
