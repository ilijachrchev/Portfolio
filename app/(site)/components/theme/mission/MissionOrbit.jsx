'use client'

import styles from './MissionExperience.module.css'

const TRAJECTORY = 'M28 156 C38 80 76 24 164 22 C135 53 117 98 155 151'

export default function MissionOrbit() {
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
      </svg>
    </figure>
  )
}
