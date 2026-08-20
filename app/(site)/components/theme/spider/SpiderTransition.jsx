'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import styles from './SpiderExperience.module.css'

const STRANDS = [
  'M-40 120 Q360 290 820 140 T1640 250',
  'M120 -40 Q420 320 260 940',
  'M1480 -40 Q1080 330 1340 940',
  'M-40 760 Q480 430 1640 690',
  'M250 -40 Q760 340 1120 940',
  'M1350 -40 Q890 390 500 940',
  'M-40 420 Q650 90 1640 460',
]

export default function SpiderTransition({ direction, onCovered, onComplete }) {
  const [phase, setPhase] = useState('cover')
  const entering = direction === 'enter'
  const coverDuration = entering ? 0.42 : 0.28
  const revealDuration = entering ? 0.36 : 0.25

  const handlePhaseComplete = () => {
    if (phase === 'cover') {
      onCovered()
      setPhase('reveal')
    } else {
      onComplete()
    }
  }

  return (
    <div className={styles.transitionRoot} aria-hidden="true">
      <motion.div
        key={phase}
        className={styles.transitionCover}
        initial={{ clipPath: phase === 'cover' ? 'circle(0% at 50% 45%)' : 'circle(150% at 50% 45%)' }}
        animate={{ clipPath: phase === 'cover' ? 'circle(150% at 50% 45%)' : 'circle(0% at 78% 20%)' }}
        transition={{ duration: phase === 'cover' ? coverDuration : revealDuration, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={handlePhaseComplete}
      >
        <div className={styles.transitionHalftone} />
        <svg className={styles.transitionWeb} viewBox="0 0 1600 900" preserveAspectRatio="none">
          {STRANDS.map((path, index) => (
            <motion.path
              key={path}
              d={path}
              fill="none"
              stroke={index % 2 ? '#789bc3' : '#dcecff'}
              strokeOpacity={index % 2 ? 0.42 : 0.58}
              strokeWidth={index % 3 === 0 ? 1.8 : 1.1}
              initial={{ pathLength: phase === 'cover' ? 0 : 1, opacity: phase === 'cover' ? 0 : 1 }}
              animate={{ pathLength: phase === 'cover' ? 1 : 0, opacity: phase === 'cover' ? 1 : 0 }}
              transition={{ duration: phase === 'cover' ? coverDuration * 0.9 : revealDuration * 0.8, delay: phase === 'cover' ? index * 0.018 : 0 }}
            />
          ))}
        </svg>
        <div className={styles.transitionMark}>
          <span />
          <span />
        </div>
      </motion.div>
    </div>
  )
}
