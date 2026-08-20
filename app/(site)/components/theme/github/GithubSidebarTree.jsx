'use client'

import { useLayoutEffect, useRef } from 'react'
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
  const asideRef = useRef(null)
  const previousFocusRef = useRef(null)

  useLayoutEffect(() => {
    if (!window.matchMedia('(max-width: 899px)').matches) return
    if (treeOpen) {
      previousFocusRef.current = document.activeElement
      asideRef.current?.querySelector('button')?.focus()
    } else if (previousFocusRef.current instanceof HTMLElement) {
      previousFocusRef.current.focus()
      previousFocusRef.current = null
    }
  }, [treeOpen])

  const handleDrawerKeyDown = (event) => {
    if (!window.matchMedia('(max-width: 899px)').matches) return
    if (event.key === 'Escape') {
      event.preventDefault()
      setTreeOpen(false)
      return
    }
    if (event.key !== 'Tab') return
    const focusable = Array.from(asideRef.current?.querySelectorAll('button:not(:disabled)') || [])
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <>
      <button
        type="button"
        className={`${styles.treeBackdrop} ${treeOpen ? styles.treeBackdropOpen : ''}`}
        onClick={() => setTreeOpen(false)}
        aria-label="Close repository tree"
        tabIndex={treeOpen ? 0 : -1}
      />
      <aside
        ref={asideRef}
        className={`${styles.tree} ${treeOpen ? styles.treeOpen : styles.treeClosed}`}
        aria-label="Repository files"
        aria-hidden={!treeOpen}
        onKeyDown={handleDrawerKeyDown}
      >
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
