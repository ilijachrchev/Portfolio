'use client'

import { motion, useTransform } from 'motion/react'
import { useMissionControl } from './useMissionControl'
import styles from './MissionExperience.module.css'

const TRAJECTORY = 'M28 156 C38 80 76 24 164 22 C135 53 117 98 155 151'

export default function MissionOrbit() {
  const { documentProgress } = useMissionControl()
  const markerX = useTransform(documentProgress, (value) => (
    value < 0.65 ? 28 + (value / 0.65) * 136 : 164 - ((value - 0.65) / 0.35) * 9
  ))
  const markerY = useTransform(documentProgress, (value) => (
    value < 0.65
      ? 156 - Math.sin((value / 0.65) * Math.PI / 2) * 134
      : 22 + ((value - 0.65) / 0.35) * 129
  ))

  return (
    <figure className={styles.orbitPanel} aria-label="Orbital mission progress">
      <figcaption>
        <span>Orbital Track</span>
        <strong>Portfolio trajectory</strong>
      </figcaption>
      <svg viewBox="0 0 190 174" role="img" aria-label="Abstract orbital path around a planet">
        <defs>
          <linearGradient id="mission-planet" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#162f49" />
            <stop offset="1" stopColor="#07101a" />
          </linearGradient>
        </defs>
        <circle cx="72" cy="112" r="45" fill="url(#mission-planet)" stroke="#4c8dff" strokeWidth="1" />
        <ellipse cx="72" cy="112" rx="45" ry="15" fill="none" stroke="#4c8dff" strokeOpacity=".45" />
        <ellipse cx="72" cy="112" rx="19" ry="45" fill="none" stroke="#4c8dff" strokeOpacity=".32" />
        <path d={TRAJECTORY} fill="none" stroke="#263445" strokeWidth="1.5" />
        <motion.path
          d={TRAJECTORY}
          fill="none"
          stroke="#42d9e8"
          strokeWidth="2"
          style={{ pathLength: documentProgress }}
        />
        <motion.g style={{ x: markerX, y: markerY }}>
          <path d="M0-6 4 3 0 1-4 3Z" fill="#f5f8fc" stroke="#42d9e8" strokeWidth=".8" />
          <path d="M-2 3 0 7 2 3" fill="#f6b94a" opacity=".85" />
        </motion.g>
      </svg>
    </figure>
  )
}
