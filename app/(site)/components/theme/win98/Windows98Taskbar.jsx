'use client'

import { useState } from 'react'
import Windows98Button from './Windows98Button'
import Windows98Clock from './Windows98Clock'
import { WINDOWS98_APPS } from './windows98Apps'
import { useWindows98Workspace } from './useWindows98Workspace'
import styles from './Windows98Experience.module.css'

export default function Windows98Taskbar() {
  const [startOpen, setStartOpen] = useState(false)
  const { activeAppId, activeWindowId, focusWindow, navigateToApp, windows } = useWindows98Workspace()
  const openUtilities = Object.values(windows).filter((window) => window.open)

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
      <div className={styles.taskbarApps} aria-label="Open applications">
        {WINDOWS98_APPS.map((app) => (
          <Windows98Button
            key={app.id}
            className={styles.taskbarApp}
            active={activeAppId === app.id}
            aria-pressed={activeAppId === app.id}
            onClick={() => navigateToApp(app.id)}
          >
            {app.label}
          </Windows98Button>
        ))}
        {openUtilities.map((window) => (
          <Windows98Button
            key={window.id}
            className={styles.taskbarApp}
            active={activeWindowId === window.id && !window.minimized}
            aria-pressed={activeWindowId === window.id && !window.minimized}
            onClick={() => focusWindow(window.id)}
          >
            {window.title}
          </Windows98Button>
        ))}
      </div>
      <Windows98Clock />
    </footer>
  )
}
