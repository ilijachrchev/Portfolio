'use client'

import { useEffect, useRef } from 'react'
import MissionSystemButton from './MissionSystemButton'
import { MISSION_SYSTEMS } from './missionSystems'
import { useMissionControl } from './useMissionControl'
import styles from './MissionExperience.module.css'

export default function MissionNavigation() {
  const { activeSystemId, navigateToSystem } = useMissionControl()
  const listRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(max-width: 919px)').matches) return
    const activeButton = listRef.current?.querySelector('[aria-current="location"]')
    activeButton?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [activeSystemId])

  const handleKeyDown = (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    const buttons = [...event.currentTarget.querySelectorAll('button')]
    const currentIndex = buttons.indexOf(document.activeElement)
    if (currentIndex < 0) return
    event.preventDefault()
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? buttons.length - 1
        : (currentIndex + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length
    buttons[nextIndex]?.focus()
  }

  return (
    <nav className={styles.systemRail} aria-label="Portfolio systems">
      <header className={styles.railHeader}>
        <span>Systems</span>
        <strong>{String(MISSION_SYSTEMS.length).padStart(2, '0')} Online</strong>
      </header>
      <div ref={listRef} className={styles.systemList} onKeyDown={handleKeyDown}>
        {MISSION_SYSTEMS.map((system) => (
          <MissionSystemButton
            key={system.id}
            system={system}
            active={system.id === activeSystemId}
            onSelect={navigateToSystem}
          />
        ))}
      </div>
    </nav>
  )
}
