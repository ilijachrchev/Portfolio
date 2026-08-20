'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Code2 } from 'lucide-react'
import styles from './IdeExperience.module.css'

export default function IdeTransition({ direction, onCovered, onComplete }) {
  const [phase, setPhase] = useState('cover')
  const entering = direction === 'enter'
  const coverDuration = entering ? 0.42 : 0.26
  const revealDuration = entering ? 0.36 : 0.18

  useEffect(() => {
    document.documentElement.dataset.ideTransition = direction
    return () => {
      delete document.documentElement.dataset.ideTransition
    }
  }, [direction])

  const handleComplete = () => {
    if (phase === 'cover') {
      onCovered()
      setPhase('reveal')
    } else {
      delete document.documentElement.dataset.ideTransition
      onComplete()
    }
  }

  return (
    <div className={styles.workspaceTransition} aria-live="polite" aria-label={entering ? 'Opening workspace' : 'Closing workspace'}>
      <motion.div
        key={phase}
        className={styles.workspaceWipe}
        initial={{ x: phase === 'cover' ? '-102%' : '0%' }}
        animate={{ x: phase === 'cover' ? '0%' : '102%' }}
        transition={{ duration: phase === 'cover' ? coverDuration : revealDuration, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={handleComplete}
      >
        <div className={styles.transitionGrid} aria-hidden="true" />
        <div className={styles.transitionMessage}>
          <Code2 aria-hidden="true" />
          <span>{entering ? '> opening workspace…' : '> closing workspace…'}</span>
          <i aria-hidden="true" />
        </div>
        <div className={styles.transitionScan} aria-hidden="true" />
      </motion.div>
    </div>
  )
}
