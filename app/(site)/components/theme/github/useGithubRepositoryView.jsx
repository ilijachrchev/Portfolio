'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { GITHUB_SECTIONS, getGithubSection, getGithubTab } from './githubRepository'

const GithubRepositoryContext = createContext(null)

export function findActiveGithubSection(metrics, scrollTop, viewportHeight) {
  if (!metrics.length) return null
  const activationY = scrollTop + Math.min(320, Math.max(150, viewportHeight * 0.32))
  let active = metrics[0]

  for (const metric of metrics) {
    if (metric.top <= activationY) active = metric
    else break
  }

  const scrollRange = document.documentElement.scrollHeight - viewportHeight
  return scrollTop >= scrollRange - 3 ? metrics[metrics.length - 1] : active
}

export function GithubRepositoryProvider({ children }) {
  const [activeSectionId, setActiveSectionId] = useState('home')
  const [treeOpen, setTreeOpen] = useState(false)
  const activeSection = getGithubSection(activeSectionId) || getGithubSection('home')
  const activeTab = getGithubTab(activeSection.sectionId)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.githubRepository = 'true'
    const elements = GITHUB_SECTIONS.map((section) => {
      const element = document.getElementById(section.sectionId)
      if (!element) return null
      element.dataset.githubSection = section.id
      element.dataset.githubPath = section.path
      return element
    }).filter(Boolean)

    return () => {
      delete root.dataset.githubRepository
      delete root.dataset.githubActiveSection
      elements.forEach((element) => {
        delete element.dataset.githubSection
        delete element.dataset.githubPath
      })
    }
  }, [])

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
