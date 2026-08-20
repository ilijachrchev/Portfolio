'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import styles from './Windows98Experience.module.css'

export default function Windows98Transition({ direction, onComplete, onCovered }) {
  const [phase, setPhase] = useState('cover')
  const entering = direction === 'enter'

  const finishPhase = () => {
    if (phase === 'cover') {
      onCovered()
      setPhase('reveal')
    } else onComplete()
  }

  return (
    <div className={styles.transitionRoot} aria-hidden="true">
      <motion.div
        key={phase}
        className={styles.transitionScreen}
        initial={{ opacity: phase === 'cover' ? 0 : 1 }}
        animate={{ opacity: phase === 'cover' ? 1 : 0 }}
        transition={{ duration: phase === 'cover' ? 0.38 : 0.34, ease: 'linear' }}
        onAnimationComplete={finishPhase}
      >
        <strong>{entering ? 'Portfolio OS' : 'Closing Portfolio OS'}</strong>
        <span>Preparing desktop...</span>
        <i><b /></i>
      </motion.div>
    </div>
  )
}
