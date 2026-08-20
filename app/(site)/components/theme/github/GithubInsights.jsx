import { createPortfolioActivityGrid } from './githubRepository'
import styles from './GithubExperience.module.css'

const LEVEL_LABELS = ['No marker', 'Low', 'Moderate', 'Strong', 'High']

export function GithubContributionGrid() {
  const levels = createPortfolioActivityGrid()

  return (
    <div className={styles.contributionRegion}>
      <div
        className={styles.contributionGrid}
        role="img"
        aria-label="A representative portfolio activity pattern; not live GitHub contribution data"
      >
        {levels.map((level, index) => (
          <i
            key={index}
            data-level={level}
            title={`${LEVEL_LABELS[level]} portfolio activity marker`}
          />
        ))}
      </div>
      <p>Representative portfolio activity, not account analytics.</p>
    </div>
  )
}
