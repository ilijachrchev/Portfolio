'use client'

import {
  BookOpen,
  CircleDot,
  GitPullRequest,
  MessageSquare,
  PanelsTopLeft,
} from 'lucide-react'
import { GITHUB_TABS } from './githubRepository'
import { useGithubRepositoryView } from './useGithubRepositoryView'
import styles from './GithubExperience.module.css'

const TAB_ICONS = {
  code: BookOpen,
  discussions: MessageSquare,
  projects: PanelsTopLeft,
  'pull-requests': GitPullRequest,
  issues: CircleDot,
}

export function GithubTabIcon({ tabId }) {
  const Icon = TAB_ICONS[tabId] || BookOpen
  return <Icon aria-hidden="true" />
}

export default function GithubRepoTabs() {
  const { activeTab, navigateToSection } = useGithubRepositoryView()

  return (
    <nav className={styles.tabs} aria-label="Repository sections">
      {GITHUB_TABS.map((tab) => {
        const active = activeTab.id === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => navigateToSection(tab.sectionId)}
            aria-current={active ? 'page' : undefined}
            className={`${styles.tab} ${active ? styles.tabActive : ''}`}
          >
            <GithubTabIcon tabId={tab.id} />
            <span>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
