'use client'

import styles from './MissionExperience.module.css'
import MissionHeader from './MissionHeader'
import MissionNavigation from './MissionNavigation'
import MissionTelemetry from './MissionTelemetry'
import MissionStatusStrip from './MissionStatusStrip'

export default function MissionShell() {
  return (
    <div className={styles.shell} aria-label="Mission Control portfolio operations center">
      <div className={styles.atmosphere} aria-hidden="true" />
      <MissionHeader />
      <MissionNavigation />
      <MissionTelemetry />
      <MissionStatusStrip />
    </div>
  )
}
