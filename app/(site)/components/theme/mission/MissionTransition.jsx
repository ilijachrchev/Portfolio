'use client'

import styles from './MissionExperience.module.css'

export function MissionTransitionPanel({ entering, phase }) {
  const covered = phase === 'cover'

  return (
    <div className={styles.transitionPanel}>
      <span className={styles.transitionCode}>MC / PORTFOLIO-01</span>
      <strong>
        {covered
          ? entering ? 'System link initializing' : 'Mission link closing'
          : entering ? 'Status nominal' : 'Link released'}
      </strong>
      <p>{covered ? 'Acquiring telemetry channel' : 'Mission Control online'}</p>
      <div className={styles.transitionTrack} aria-hidden="true"><i /></div>
    </div>
  )
}
