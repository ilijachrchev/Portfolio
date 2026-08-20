'use client'

import GithubFileIcon from './GithubFileIcon'
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
