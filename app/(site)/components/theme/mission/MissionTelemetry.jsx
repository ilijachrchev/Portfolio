'use client'

import { MISSION_SYSTEMS } from './missionSystems'
import MissionProgressReadout from './MissionProgressReadout'
import { useMissionControl } from './useMissionControl'
import styles from './MissionExperience.module.css'

export default function MissionTelemetry() {
  const { activeSystem, activeSystemId, documentProgress } = useMissionControl()
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
        <div>
          <dt>Scroll</dt>
          <dd><MissionProgressReadout progress={documentProgress} /></dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd className={styles.nominalValue}>Nominal</dd>
        </div>
        <div>
          <dt>Mode</dt>
          <dd>Tracking</dd>
        </div>
        <div>
          <dt>Uplink</dt>
          <dd className={styles.nominalValue}>Online</dd>
        </div>
      </dl>
    </aside>
  )
}
