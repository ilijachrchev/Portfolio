'use client'

import { useTheme } from '../../ThemeProvider'
import Windows98Button from './Windows98Button'
import styles from './Windows98Experience.module.css'

export default function Windows98Appearance({ onClose }) {
  const { setTheme, theme, themes } = useTheme()

  return (
    <div className={styles.appearanceDialog}>
      <p>Choose a portfolio appearance:</p>
      <div className={`${styles.appearanceList} ${styles.sunken}`} role="radiogroup" aria-label="Portfolio appearance">
        {Object.values(themes).map((item) => (
          <button
            type="button" role="radio" aria-checked={theme === item.id} key={item.id}
            onClick={() => setTheme(item.id)} className={theme === item.id ? styles.appearanceSelected : ''}
          >
            <span style={{ background: item.preview[0] }} aria-hidden="true" />
            {item.label}
          </button>
        ))}
      </div>
      <div className={styles.dialogButtons}>
        <Windows98Button onClick={onClose}>OK</Windows98Button>
      </div>
    </div>
  )
}
