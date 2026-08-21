'use client'

import { useEffect, useState } from 'react'
import MissionProgressReadout from './MissionProgressReadout'
import { useMissionControl } from './useMissionControl'
import styles from './MissionExperience.module.css'

export default function MissionMobileTelemetry() {
  const [open, setOpen] = useState(false)
  const { activeSystem, documentProgress, missionLog } = useMissionControl()

  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <aside className={styles.mobileTelemetry} aria-label="Compact mission telemetry">
      <span>
        <b>SYS</b> {activeSystem.label}
      </span>
      <span>
        <b>PROGRESS</b> <MissionProgressReadout progress={documentProgress} />
      </span>
      <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? 'Close data' : 'Mission data'}
      </button>
      {open && (
        <div className={styles.mobileTelemetryDrawer}>
          <dl>
            <div><dt>Status</dt><dd>Nominal</dd></div>
            <div><dt>Uplink</dt><dd>Online</dd></div>
          </dl>
          <ol>
            {missionLog.slice(0, 3).map((entry) => (
              <li key={entry.id}><time>{entry.timestamp}</time> {entry.system}</li>
            ))}
          </ol>
        </div>
      )}
    </aside>
  )
}
