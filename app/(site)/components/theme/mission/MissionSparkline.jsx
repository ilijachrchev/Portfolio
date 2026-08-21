'use client'

import { useEffect, useRef } from 'react'
import { useMissionControl } from './useMissionControl'
import styles from './MissionExperience.module.css'

const buildPoints = (samples) => samples.map((value, index) => {
  const x = (index / Math.max(1, samples.length - 1)) * 180
  return `${x.toFixed(1)},${(48 - value * 38).toFixed(1)}`
}).join(' ')

export default function MissionSparkline() {
  const { documentProgress } = useMissionControl()
  const lineRef = useRef(null)
  const samplesRef = useRef(Array(18).fill(0))

  useEffect(() => documentProgress.on('change', (value) => {
    const samples = [...samplesRef.current.slice(1), value]
    samplesRef.current = samples
    lineRef.current?.setAttribute('points', buildPoints(samples))
  }), [documentProgress])

  return (
    <figure className={styles.sparklinePanel} aria-hidden="true">
      <figcaption>Progress signal</figcaption>
      <svg viewBox="0 0 180 56" preserveAspectRatio="none">
        <path d="M0 48H180M0 29H180M0 10H180" />
        <polyline ref={lineRef} points={buildPoints(samplesRef.current)} />
      </svg>
    </figure>
  )
}
