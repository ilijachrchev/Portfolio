'use client'

import { useEffect, useState } from 'react'

function formatElapsed(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `T+${[hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':')}`
}

export function useMissionClock() {
  const [clock, setClock] = useState({ local: '--:--', elapsed: 'T+00:00:00' })

  useEffect(() => {
    const startedAt = Date.now()
    const update = () => {
      const now = new Date()
      setClock({
        local: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        elapsed: formatElapsed(Math.floor((Date.now() - startedAt) / 1000)),
      })
    }

    update()
    const interval = window.setInterval(update, 1000)
    return () => window.clearInterval(interval)
  }, [])

  return clock
}
