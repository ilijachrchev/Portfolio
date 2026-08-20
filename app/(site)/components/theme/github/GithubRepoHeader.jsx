'use client'

import { Github, Menu, Repository } from 'lucide-react'
import { useGithubRepositoryView } from './useGithubRepositoryView'
import styles from './GithubExperience.module.css'

export default function GithubRepoHeader() {
  const { treeOpen, setTreeOpen } = useGithubRepositoryView()

  return (
    <header className={styles.repoBar}>
      <div className={styles.repoIdentity}>
        <Repository aria-hidden="true" />
        <strong>ilijachrchev / portfolio</strong>
        <span className={styles.visibility}>Public</span>
      </div>
      <div className={styles.repoActions}>
        <button
          type="button"
          onClick={() => setTreeOpen(!treeOpen)}
          aria-label={treeOpen ? 'Close repository tree' : 'Open repository tree'}
          aria-expanded={treeOpen}
          className={styles.treeToggle}
        >
          <Menu aria-hidden="true" />
        </button>
        <a
          href="https://github.com/ilijachrchev"
          target="_blank"
          rel="noreferrer"
          className={styles.profileLink}
        >
          <Github aria-hidden="true" />
          <span>Profile</span>
        </a>
      </div>
    </header>
  )
}
