'use client'

import { useMissionControl } from './useMissionControl'
import styles from './MissionExperience.module.css'

export default function MissionLog() {
  const { missionLog } = useMissionControl()

  return (
    <section className={styles.missionLog} aria-labelledby="mission-log-title">
      <header>
        <span id="mission-log-title">Mission Log</span>
        <strong>Session</strong>
      </header>
      <ol aria-live="polite">
        {missionLog.map((entry) => (
          <li key={entry.id}>
            <time>{entry.timestamp}</time>
            <span>{entry.system}</span>
            <b>Acquired</b>
          </li>
        ))}
      </ol>
    </section>
  )
}
