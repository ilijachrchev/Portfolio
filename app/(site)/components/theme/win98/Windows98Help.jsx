import Windows98Button from './Windows98Button'
import styles from './Windows98Experience.module.css'

export default function Windows98Help({ navigateToApp, onOpenWinver }) {
  return (
    <div className={styles.helpContent}>
      <h2>Welcome to Portfolio Help</h2>
      <p>Use desktop shortcuts, the Start menu, or taskbar buttons to explore the real portfolio.</p>
      <ul>
        <li>Single-click selects a desktop icon; double-click opens it.</li>
        <li>Touch and keyboard activation open shortcuts immediately.</li>
        <li>Drag utility windows by their blue title bars.</li>
        <li>Type portfolio destinations into Run.</li>
      </ul>
      <div className={styles.dialogButtons}>
        <Windows98Button onClick={() => navigateToApp('projects')}>Projects</Windows98Button>
        <Windows98Button onClick={onOpenWinver}>About...</Windows98Button>
      </div>
    </div>
  )
}
