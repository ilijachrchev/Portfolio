'use client'

import { useEffect, useState } from 'react'
import styles from './Windows98Experience.module.css'

export default function Windows98Clock() {
  const [time, setTime] = useState(null)

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date()))

    update()
    const timer = window.setInterval(update, 60_000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className={`${styles.tray} ${styles.sunken}`} aria-label={time ? `Current time ${time}` : 'Clock'}>
      <span className={styles.trayStatus} aria-hidden="true" />
      <time>{time || '--:--'}</time>
    </div>
  )
}
