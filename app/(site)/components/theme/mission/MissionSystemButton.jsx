'use client'

import styles from './MissionExperience.module.css'

export default function MissionSystemButton({ active, onSelect, system }) {
  const state = active ? 'Active' : system.id === 'comms' ? 'Standby' : 'Nominal'

  return (
    <button
      type="button"
      className={`${styles.systemButton} ${active ? styles.systemButtonActive : ''}`}
      aria-current={active ? 'location' : undefined}
      onClick={() => onSelect(system.id)}
    >
      <span className={styles.systemCode}>{system.code}</span>
      <span className={styles.systemName}>{system.label}</span>
      <span className={styles.systemState}>
        <i aria-hidden="true" />
        {state}
      </span>
    </button>
  )
}
