'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
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

export default function MissionTransition({ direction, onCovered, onComplete }) {
  const [phase, setPhase] = useState('cover')
  const reduceMotion = useReducedMotion()
  const entering = direction === 'enter'
  const duration = reduceMotion ? 0.12 : phase === 'cover' ? 0.42 : 0.34

  const finishPhase = () => {
    if (phase === 'cover') {
      onCovered()
      setPhase('reveal')
    } else onComplete()
  }

  return (
    <motion.div
      key={phase}
      className={styles.transitionRoot}
      initial={{ opacity: phase === 'cover' ? 0 : 1 }}
      animate={{ opacity: phase === 'cover' ? 1 : 0 }}
      transition={{ duration, ease: 'easeInOut' }}
      onAnimationComplete={finishPhase}
      aria-live="polite"
      aria-label={entering ? 'Opening Mission Control appearance' : 'Closing Mission Control appearance'}
    >
      <MissionTransitionPanel entering={entering} phase={phase} />
    </motion.div>
  )
}
