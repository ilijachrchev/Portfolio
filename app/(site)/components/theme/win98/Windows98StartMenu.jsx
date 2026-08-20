import Windows98MenuItem from './Windows98MenuItem'
import styles from './Windows98Experience.module.css'

export default function Windows98StartMenu({ navigateToApp, onOpenUtility, onTogglePrograms }) {
  return (
    <aside className={`${styles.startMenu} ${styles.raised}`} role="menu" aria-label="Start menu">
      <div className={styles.startMenuBrand} aria-hidden="true">
        <strong>Portfolio</strong> <span>98</span>
      </div>
      <div className={styles.startMenuItems}>
        <Windows98MenuItem icon="▣" submenu onClick={onTogglePrograms}>
          <strong>Programs</strong>
        </Windows98MenuItem>
        <Windows98MenuItem icon="▤" submenu onClick={() => navigateToApp('documents')}>
          <strong>Documents</strong>
        </Windows98MenuItem>
        <Windows98MenuItem icon="⚙" submenu onClick={() => onOpenUtility('appearance')}>
          <strong>Settings</strong>
        </Windows98MenuItem>
      </div>
    </aside>
  )
}
