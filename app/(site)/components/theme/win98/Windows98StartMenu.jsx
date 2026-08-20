import Windows98MenuItem from './Windows98MenuItem'
import styles from './Windows98Experience.module.css'

export default function Windows98StartMenu({ navigateToApp, onOpenUtility, onTogglePrograms, programsOpen }) {
  return (
    <aside className={`${styles.startMenu} ${styles.raised}`} role="menu" aria-label="Start menu">
      <div className={styles.startMenuBrand} aria-hidden="true">
        <strong>Portfolio</strong> <span>98</span>
      </div>
      <div className={styles.startMenuItems}>
        <Windows98MenuItem icon="▣" submenu aria-expanded={programsOpen} onClick={onTogglePrograms}>
          <strong>Programs</strong>
        </Windows98MenuItem>
        <Windows98MenuItem icon="▤" submenu onClick={() => navigateToApp('documents')}>
          <strong>Documents</strong>
        </Windows98MenuItem>
        <Windows98MenuItem icon="⚙" submenu onClick={() => onOpenUtility('appearance')}>
          <strong>Settings</strong>
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
