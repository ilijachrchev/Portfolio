'use client'

import { motion } from 'motion/react'
import styles from './SpiderExperience.module.css'

export default function SpiderWebLayer({ path, progress, opacity }) {
  return (
    <svg className={styles.swingWebLayer} aria-hidden="true">
      <motion.path
        d={path}
        pathLength={progress}
        style={{ opacity }}
        className={styles.swingStrandShadow}
      />
      <motion.path
        d={path}
        pathLength={progress}
        style={{ opacity }}
        className={styles.swingStrand}
      />
    </svg>
  )
}
