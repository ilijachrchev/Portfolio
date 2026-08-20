'use client'

import { X } from 'lucide-react'
import GithubFileIcon from './GithubFileIcon'
import { GITHUB_SECTIONS } from './githubRepository'
import { useGithubRepositoryView } from './useGithubRepositoryView'
import styles from './GithubExperience.module.css'

export function GithubTreeItem({ section }) {
  const { activeSection, navigateToSection } = useGithubRepositoryView()
  const active = activeSection.id === section.id

  return (
    <button
      type="button"
      role="treeitem"
      aria-selected={active}
      onClick={() => navigateToSection(section.id)}
      className={`${styles.treeItem} ${active ? styles.treeItemActive : ''}`}
    >
      <GithubFileIcon kind={section.kind} />
      <span>{section.label}</span>
    </button>
  )
}

export default function GithubSidebarTree() {
  const { activeSection, treeOpen, setTreeOpen } = useGithubRepositoryView()

  return (
    <>
    <button
      type="button"
      className={`${styles.treeBackdrop} ${treeOpen ? styles.treeBackdropOpen : ''}`}
      onClick={() => setTreeOpen(false)}
      aria-label="Close repository tree"
      tabIndex={treeOpen ? 0 : -1}
    />
    <aside className={`${styles.tree} ${treeOpen ? styles.treeOpen : styles.treeClosed}`} aria-label="Repository files">
      <header className={styles.treeHeader}>
        <span>portfolio</span>
        <button type="button" onClick={() => setTreeOpen(false)} aria-label="Close repository tree">
          <X aria-hidden="true" />
        </button>
      </header>
      <div className={styles.treeList} role="tree" aria-label="Portfolio repository tree">
        {GITHUB_SECTIONS.map((section) => (
          <GithubTreeItem key={section.id} section={section} />
        ))}
      </div>
      <p className={styles.treePath} aria-live="polite">
        active: {activeSection.path}
      </p>
    </aside>
    </>
  )
}
