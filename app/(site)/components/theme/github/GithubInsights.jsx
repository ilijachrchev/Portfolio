import { GitCommitHorizontal } from 'lucide-react'
import { GITHUB_ACTIVITY, createPortfolioActivityGrid } from './githubRepository'
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

export function GithubActivityList() {
  return (
    <ol className={styles.activityList} aria-label="Portfolio activity summary">
      {GITHUB_ACTIVITY.map((activity) => (
        <li key={activity.label}>
          <GitCommitHorizontal aria-hidden="true" />
          <div>
            <strong>{activity.label}</strong>
            <span>{activity.detail}</span>
          </div>
          <small>{activity.period}</small>
        </li>
      ))}
    </ol>
  )
}

export default function GithubInsights() {
  return (
    <aside className={styles.insights} aria-labelledby="github-insights-title">
      <header>
        <div>
          <span>Insights</span>
          <h3 id="github-insights-title">Contribution activity</h3>
        </div>
        <span className={styles.insightsBadge}>portfolio</span>
      </header>
      <GithubContributionGrid />
      <GithubActivityList />
    </aside>
  )
}
