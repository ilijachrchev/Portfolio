'use client'

import GithubRepoHeader from './GithubRepoHeader'
import GithubRepoTabs from './GithubRepoTabs'
import GithubSidebarTree from './GithubSidebarTree'
import styles from './GithubExperience.module.css'

export default function GithubShell() {
  return (
    <div className={styles.shell} aria-label="GitHub repository portfolio">
      <GithubRepoHeader />
      <GithubRepoTabs />
      <GithubSidebarTree />
    </div>
  )
}
