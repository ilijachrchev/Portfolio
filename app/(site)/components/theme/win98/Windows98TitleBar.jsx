import Image from 'next/image'
import styles from './Windows98Experience.module.css'

export default function Windows98TitleBar({ window, active, onClose, onMaximize, onMinimize, onPointerDown, onPointerMove, onPointerUp }) {
  const handleDoubleClick = (event) => {
    if (!event.target.closest('button')) onMaximize()
  }

  return (
    <header
      className={`${styles.windowTitleBar} ${active ? styles.windowTitleBarActive : ''}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onDoubleClick={handleDoubleClick}
    >
      <Image src={window.icon} alt="" width={16} height={16} aria-hidden="true" />
      <strong>{window.title}</strong>
      <span className={styles.windowControls}>
        {window.minimizable !== false && (
          <button type="button" onClick={onMinimize} aria-label={`Minimize ${window.title}`}>_</button>
        )}
        {window.maximizable !== false && (
          <button type="button" onClick={onMaximize} aria-label={`${window.maximized ? 'Restore' : 'Maximize'} ${window.title}`}>
            {window.maximized ? '❐' : '□'}
          </button>
        )}
        <button type="button" onClick={onClose} aria-label={`Close ${window.title}`}>×</button>
      </span>
    </header>
  )
}
