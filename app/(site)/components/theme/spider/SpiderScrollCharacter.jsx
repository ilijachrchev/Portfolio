'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion } from 'motion/react'
import SpiderWebLayer from './SpiderWebLayer'
import useSpiderTimeline from './useSpiderTimeline'
import styles from './SpiderExperience.module.css'

function StaticFooterHang() {
  const [footer, setFooter] = useState(null)

  useEffect(() => {
    setFooter(document.getElementById('footer'))
  }, [])

  if (!footer) return null

  return createPortal(
    <div className={styles.staticHang} aria-hidden="true">
      <span />
      <img src="/themes/spiderman/spider-swing.svg" alt="" />
    </div>,
    footer
  )
}

function AnimatedSpider() {
  const timeline = useSpiderTimeline()

  if (!timeline.active) return null

  return (
    <>
      <SpiderWebLayer
        path={timeline.strandPath}
        progress={timeline.strandProgress}
        opacity={timeline.opacity}
      />
      <motion.div
        className={styles.swingCharacter}
        style={{
          x: timeline.x,
          y: timeline.y,
          rotate: timeline.rotation,
          scale: timeline.scale,
          opacity: timeline.opacity,
          width: timeline.size,
        }}
        aria-hidden="true"
      >
        <img src="/themes/spiderman/spider-swing.svg" alt="" draggable="false" />
      </motion.div>
    </>
  )
}

export default function SpiderScrollCharacter() {
  const reduceMotion = useReducedMotion()
  return reduceMotion ? <StaticFooterHang /> : <AnimatedSpider />
}
