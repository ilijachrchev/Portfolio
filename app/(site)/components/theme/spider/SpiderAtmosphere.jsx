import styles from './SpiderExperience.module.css'

function WebCorner({ className = '' }) {
  return (
    <svg className={`${styles.webCorner} ${className}`} viewBox="0 0 220 220" fill="none">
      <g stroke="currentColor" strokeWidth="1">
        <path d="M0 0C58 38 94 86 118 148M0 0C92 22 154 64 220 134M0 0C24 76 28 144 18 220" />
        <path d="M26 18C21 35 17 52 15 70M57 36C46 60 41 84 42 109M92 58C77 84 73 112 79 143M127 82C111 104 108 128 118 153" />
        <path d="M15 70C25 73 34 78 42 85M42 109C54 114 66 123 79 143M79 143C91 144 104 148 118 153" />
      </g>
    </svg>
  )
}

export default function SpiderAtmosphere({ showCity }) {
  return (
    <div className={styles.atmosphere} aria-hidden="true">
      <div className={`${styles.glow} ${styles.glowRed}`} />
      <div className={`${styles.glow} ${styles.glowBlue}`} />
      <div className={styles.halftone} />
      <WebCorner className={styles.webLeft} />
      <WebCorner className={styles.webRight} />

      {showCity && (
        <svg className={styles.city} viewBox="0 0 1600 460" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="spider-city-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#132b49" stopOpacity="0.26" />
              <stop offset="1" stopColor="#07111f" stopOpacity="0.96" />
            </linearGradient>
            <pattern id="spider-windows" width="34" height="30" patternUnits="userSpaceOnUse">
              <rect x="7" y="7" width="5" height="8" rx="1" fill="#79b1ff" opacity="0.22" />
              <rect x="21" y="7" width="5" height="8" rx="1" fill="#f16574" opacity="0.18" />
            </pattern>
          </defs>
          <path d="M0 460V262h92V184h66v278h72V232h106v228h82V126h42V76h28v50h58v334h102V210h80v250h74V164h132v296h76V248h96v212h68V112h120v348h78V218h122v242h74V282h104v178H0Z" fill="url(#spider-city-fade)" />
          <path d="M0 460V262h92V184h66v278h72V232h106v228h82V126h128v334h102V210h80v250h74V164h132v296h76V248h96v212h68V112h120v348h78V218h122v242h74V282h104v178H0Z" fill="url(#spider-windows)" opacity="0.72" />
          <path d="M0 404C282 361 466 422 694 386C944 347 1162 367 1600 310V460H0Z" fill="#07111f" opacity="0.9" />
        </svg>
      )}
    </div>
  )
}
