'use client'

import MissionSystemButton from './MissionSystemButton'
import { MISSION_SYSTEMS } from './missionSystems'
import { useMissionControl } from './useMissionControl'
import styles from './MissionExperience.module.css'

export default function MissionNavigation() {
  const { activeSystemId, navigateToSystem } = useMissionControl()

  return (
    <nav className={styles.systemRail} aria-label="Portfolio systems">
      <header className={styles.railHeader}>
        <span>Systems</span>
        <strong>{String(MISSION_SYSTEMS.length).padStart(2, '0')} Online</strong>
      </header>
      <div className={styles.systemList}>
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
