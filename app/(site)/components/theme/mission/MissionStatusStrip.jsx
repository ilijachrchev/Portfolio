'use client'

import MissionProgressReadout from './MissionProgressReadout'
import { useMissionControl } from './useMissionControl'
import styles from './MissionExperience.module.css'

export default function MissionStatusStrip() {
  const { activeSystem, documentProgress } = useMissionControl()

  return (
    <footer className={styles.statusStrip} aria-label="Live mission status">
      <span><b>Uplink</b> Online</span>
      <span><b>Tracking</b> Locked</span>
      <span><b>Mission</b> Active</span>
      <span className={styles.statusSystem}><b>System</b> {activeSystem.label}</span>
      <span><b>Scroll</b> <MissionProgressReadout progress={documentProgress} /></span>
    </footer>
  )
}
