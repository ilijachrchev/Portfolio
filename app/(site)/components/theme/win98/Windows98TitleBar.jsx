import Image from 'next/image'
import styles from './Windows98Experience.module.css'

export default function Windows98TitleBar({ window, active, onClose, onMaximize, onMinimize, onPointerDown }) {
  return (
    <header
      className={`${styles.windowTitleBar} ${active ? styles.windowTitleBarActive : ''}`}
      onPointerDown={onPointerDown}
      onDoubleClick={onMaximize}
    >
      <Image src={window.icon} alt="" width={16} height={16} aria-hidden="true" />
      <strong>{window.title}</strong>
      <span className={styles.windowControls}>
        <button type="button" onClick={onMinimize} aria-label={`Minimize ${window.title}`}>_</button>
        <button type="button" onClick={onMaximize} aria-label={`${window.maximized ? 'Restore' : 'Maximize'} ${window.title}`}>
          {window.maximized ? '❐' : '□'}
        </button>
        <button type="button" onClick={onClose} aria-label={`Close ${window.title}`}>×</button>
      </span>
    </header>
  )
}
