import { useEffect, useRef } from 'react'
import Windows98MenuItem from './Windows98MenuItem'
import styles from './Windows98Experience.module.css'

export default function Windows98StartMenu({ navigateToApp, onOpenUtility, onTogglePrograms, programsOpen }) {
  const menuRef = useRef(null)

  useEffect(() => {
    requestAnimationFrame(() => menuRef.current?.querySelector('[role="menuitem"]')?.focus())
  }, [])

  const handleKeyDown = (event) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
    const items = Array.from(menuRef.current?.querySelectorAll('[role="menuitem"]') || [])
    const currentIndex = items.indexOf(document.activeElement)
    let nextIndex = currentIndex
    if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % items.length
    if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + items.length) % items.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = items.length - 1
    event.preventDefault()
    items[nextIndex]?.focus()
  }

  return (
    <aside ref={menuRef} className={`${styles.startMenu} ${styles.raised}`} role="menu" aria-label="Start menu" onKeyDown={handleKeyDown}>
      <div className={styles.startMenuBrand} aria-hidden="true">
        <strong>Portfolio</strong> <span>98</span>
      </div>
      <div className={styles.startMenuItems}>
        <Windows98MenuItem icon="▣" submenu aria-expanded={programsOpen} onClick={onTogglePrograms}>
          <strong>Programs</strong>
        </Windows98MenuItem>
        <Windows98MenuItem icon="▤" onClick={() => navigateToApp('documents')}>
          <strong>Documents</strong>
        </Windows98MenuItem>
        <Windows98MenuItem icon="⚙" onClick={() => onOpenUtility('appearance')}>
          <strong>Settings</strong>
        </Windows98MenuItem>
        <Windows98MenuItem icon="⌕" onClick={() => onOpenUtility('find')}>
          <strong>Find</strong>
        </Windows98MenuItem>
        <Windows98MenuItem icon="?" onClick={() => onOpenUtility('help')}>Help</Windows98MenuItem>
        <Windows98MenuItem icon="▸" onClick={() => onOpenUtility('run')}>Run...</Windows98MenuItem>
        <div className={styles.menuSeparator} role="separator" />
        <Windows98MenuItem icon="◉" onClick={() => onOpenUtility('shutdown')}>
          Shut Down...
        </Windows98MenuItem>
      </div>
      {programsOpen && (
        <div className={`${styles.programsMenu} ${styles.raised}`} role="menu" aria-label="Programs">
          <Windows98MenuItem icon="▰" onClick={() => navigateToApp('projects')}>Projects</Windows98MenuItem>
          <Windows98MenuItem icon="▤" onClick={() => navigateToApp('community')}>Community</Windows98MenuItem>
          <Windows98MenuItem icon="✉" onClick={() => navigateToApp('contact')}>Contact</Windows98MenuItem>
        </div>
      )}
    </aside>
  )
}
