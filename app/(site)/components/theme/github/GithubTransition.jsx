'use client'

import { GitBranch } from 'lucide-react'
import { motion } from 'motion/react'
import styles from './GithubExperience.module.css'

export function GithubTransitionPanel({ entering, phase }) {
  return (
    <div className={styles.transitionPanel}>
      <header>
        <GitBranch aria-hidden="true" />
        <strong>{entering ? 'Initializing repository…' : 'Closing repository…'}</strong>
      </header>
      <p>{phase === 'cover' ? 'Receiving portfolio objects' : 'Working tree ready'}</p>
      <div className={styles.transitionTrack} aria-hidden="true">
        <motion.div
          initial={{ scaleX: phase === 'cover' ? 0 : 1 }}
          animate={{ scaleX: phase === 'cover' ? 1 : 0 }}
          transition={{ duration: phase === 'cover' ? 0.34 : 0.22, ease: 'easeOut' }}
          style={{ height: '100%', originX: phase === 'cover' ? 0 : 1, background: '#3fb950' }}
        />
      </div>
    </div>
  )
}
