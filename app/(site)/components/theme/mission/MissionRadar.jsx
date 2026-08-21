import styles from './MissionExperience.module.css'

export default function MissionRadar() {
  return (
    <figure className={styles.radarPanel} aria-hidden="true">
      <figcaption>
        <span>Tracking Array</span>
        <strong>Signal lock</strong>
      </figcaption>
      <svg viewBox="0 0 180 180">
        <g className={styles.radarGrid}>
          <circle cx="90" cy="90" r="66" />
          <circle cx="90" cy="90" r="44" />
          <circle cx="90" cy="90" r="22" />
          <path d="M24 90h132M90 24v132" />
          <path d="m43 43 94 94m0-94-94 94" />
        </g>
        <path className={styles.radarSweep} d="M90 90 90 24A66 66 0 0 1 148 58Z" />
        <g className={styles.radarTargets}>
          <circle cx="121" cy="62" r="2.5" />
          <circle cx="58" cy="108" r="2" />
          <circle cx="104" cy="126" r="1.8" />
        </g>
        <circle className={styles.radarCore} cx="90" cy="90" r="3" />
      </svg>
    </figure>
  )
}
