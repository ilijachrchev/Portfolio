'use client'

import { useState } from 'react'
import ThemeSelector from '../ThemeSelector'
import { useMissionClock } from './useMissionClock'
import styles from './MissionExperience.module.css'

export default function MissionHeader() {
  const [appearanceOpen, setAppearanceOpen] = useState(false)
  const clock = useMissionClock()

  return (
    <header className={styles.missionHeader}>
      <div className={styles.missionIdentity}>
        <span className={styles.eyebrow}>Mission Control</span>
        <strong>ILIJA'S PORTFOLIO</strong>
      </div>

      <dl className={styles.headerStatus} aria-label="Mission status">
        <div>
          <dt>Status</dt>
          <dd><i className={styles.nominalLed} /> Nominal</dd>
        </div>
        <div>
          <dt>Mode</dt>
          <dd>Active</dd>
        </div>
        <div>
          <dt>Link</dt>
          <dd>Online</dd>
        </div>
      </dl>

      <dl className={styles.clockGrid} aria-label="Mission time">
        <div><dt>Local</dt><dd>{clock.local}</dd></div>
        <div><dt>Mission Elapsed</dt><dd>{clock.elapsed}</dd></div>
      </dl>

      <div className={styles.appearanceControl}>
        <ThemeSelector open={appearanceOpen} onOpenChange={setAppearanceOpen} />
      </div>
    </header>
  )
}
