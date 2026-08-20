'use client'

import { useState } from 'react'
import Windows98Button from './Windows98Button'
import styles from './Windows98Experience.module.css'

export default function Windows98Taskbar() {
  const [startOpen, setStartOpen] = useState(false)

  return (
    <footer className={`${styles.taskbar} ${styles.raised}`} aria-label="Windows taskbar">
      <Windows98Button
        className={styles.startButton}
        active={startOpen}
        aria-haspopup="menu"
        aria-expanded={startOpen}
        onClick={() => setStartOpen((current) => !current)}
      >
        <span className={styles.startMark} aria-hidden="true"><i /><i /><i /><i /></span>
        <strong>Start</strong>
      </Windows98Button>
      <div className={styles.taskbarApps} aria-label="Open applications" />
    </footer>
  )
}
