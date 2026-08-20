'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
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
  const [treeOpen, setTreeOpen] = useState(
    () => typeof window !== 'undefined' && !window.matchMedia('(max-width: 899px)').matches
  )
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
      delete root.dataset.githubTree
      elements.forEach((element) => {
        delete element.dataset.githubSection
        delete element.dataset.githubPath
      })
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (!visible) return
      setActiveSectionId(visible.target.id)
    }, {
      rootMargin: '-28% 0px -56% 0px',
      threshold: [0, 0.02, 0.15],
    })

    GITHUB_SECTIONS.forEach((section) => {
      const element = document.getElementById(section.sectionId)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.dataset.githubActiveSection = activeSection.id
  }, [activeSection.id])

  useEffect(() => {
    document.documentElement.dataset.githubTree = treeOpen ? 'open' : 'closed'
  }, [treeOpen])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 899px)')
    const handleLayoutChange = (event) => setTreeOpen(!event.matches)
    media.addEventListener?.('change', handleLayoutChange)
    return () => media.removeEventListener?.('change', handleLayoutChange)
  }, [])

  const navigateToSection = useCallback((value) => {
    const section = getGithubSection(value)
    if (!section) return false
    setActiveSectionId(section.sectionId)

    const element = document.getElementById(section.sectionId)
    if (!element) {
      window.location.assign(`/#${section.sectionId}`)
      return true
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const top = element.getBoundingClientRect().top + window.scrollY - 146
    window.scrollTo({
      top: Math.max(0, top),
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
    if (window.matchMedia('(max-width: 899px)').matches) setTreeOpen(false)
    return true
  }, [])

  const value = useMemo(() => ({
    activeSection,
    activeTab,
    treeOpen,
    setTreeOpen,
    setActiveSectionId,
    navigateToSection,
  }), [activeSection, activeTab, navigateToSection, treeOpen])

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
