'use client'

import { MISSION_SYSTEMS } from './missionSystems'
import { useMissionControl } from './useMissionControl'
import styles from './MissionExperience.module.css'

export default function MissionTelemetry() {
  const { activeSystem, activeSystemId } = useMissionControl()
  const sectionIndex = MISSION_SYSTEMS.findIndex((system) => system.id === activeSystemId) + 1

  return (
    <aside className={styles.telemetryPanel} aria-label="Mission telemetry">
      <header className={styles.telemetryHeader}>
        <span>Telemetry</span>
        <strong>Live</strong>
      </header>

      <dl className={styles.telemetryGrid}>
        <div>
          <dt>System</dt>
          <dd>{activeSystem.telemetryLabel}</dd>
        </div>
        <div>
          <dt>Section</dt>
          <dd>{String(sectionIndex).padStart(2, '0')} / {String(MISSION_SYSTEMS.length).padStart(2, '0')}</dd>
        </div>
      </dl>
    </aside>
  )
}
