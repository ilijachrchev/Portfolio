'use client'

import { useRef } from 'react'
import { useMotionValueEvent } from 'motion/react'

export default function MissionProgressReadout({ progress, suffix = '%' }) {
  const valueRef = useRef(null)

  useMotionValueEvent(progress, 'change', (latest) => {
    if (!valueRef.current) return
    valueRef.current.textContent = `${Math.round(latest * 100)}${suffix}`
  })

  return <span ref={valueRef}>0{suffix}</span>
}
