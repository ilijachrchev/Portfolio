'use client'

import { useState } from 'react'
import { FolderGit2, GitBranch, Github, Menu } from 'lucide-react'
import ThemeSelector from '../ThemeSelector'
import { useGithubRepositoryView } from './useGithubRepositoryView'
import styles from './GithubExperience.module.css'

export default function GithubRepoHeader() {
  const { treeOpen, setTreeOpen } = useGithubRepositoryView()
  const [appearanceOpen, setAppearanceOpen] = useState(false)

  return (
    <header className={styles.repoBar}>
      <div className={styles.repoIdentity}>
        <FolderGit2 aria-hidden="true" />
        <strong>ilijachrchev / portfolio</strong>
        <span className={styles.visibility}>Public</span>
      </div>
      <div className={styles.repoActions}>
        <ThemeSelector open={appearanceOpen} onOpenChange={setAppearanceOpen} />
        <span className={styles.branchMeta} title="Current portfolio branch">
          <GitBranch aria-hidden="true" />
          main
        </span>
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
