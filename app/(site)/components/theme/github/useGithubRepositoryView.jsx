'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import { getGithubSection, getGithubTab } from './githubRepository'

const GithubRepositoryContext = createContext(null)

export function GithubRepositoryProvider({ children }) {
  const [activeSectionId, setActiveSectionId] = useState('home')
  const [treeOpen, setTreeOpen] = useState(false)
  const activeSection = getGithubSection(activeSectionId) || getGithubSection('home')
  const activeTab = getGithubTab(activeSection.sectionId)

  const value = useMemo(() => ({
    activeSection,
    activeTab,
    treeOpen,
    setTreeOpen,
    setActiveSectionId,
  }), [activeSection, activeTab, treeOpen])

  return (
    <GithubRepositoryContext.Provider value={value}>
      {children}
    </GithubRepositoryContext.Provider>
  )
}

export function useGithubRepositoryView() {
  const context = useContext(GithubRepositoryContext)
  if (!context) {
    throw new Error('useGithubRepositoryView must be used within GithubRepositoryProvider')
  }
  return context
}
