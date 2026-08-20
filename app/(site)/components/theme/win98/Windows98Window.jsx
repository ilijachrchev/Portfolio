'use client'

import Windows98TitleBar from './Windows98TitleBar'
import useWindows98Drag from './useWindows98Drag'
import styles from './Windows98Experience.module.css'

export default function Windows98Window({ active, children, onClose, onFocus, onMaximize, onMinimize, onMove, window }) {
  const drag = useWindows98Drag({ focusWindow: onFocus, moveWindow: onMove, window })
  if (!window.open || window.minimized) return null

  const frameStyle = window.maximized ? undefined : {
    left: window.position.x,
    top: window.position.y,
    width: window.size.width,
    height: window.size.height,
    zIndex: window.zIndex,
  }

  return (
    <section
      className={`${styles.windowFrame} ${styles.raised} ${window.maximized ? styles.windowMaximized : ''}`}
      style={frameStyle}
      role="dialog"
      aria-modal="false"
      aria-label={window.title}
      onPointerDown={onFocus}
    >
      <Windows98TitleBar
        window={window} active={active} onClose={onClose} onMaximize={onMaximize} onMinimize={onMinimize}
        onPointerDown={drag.startDrag} onPointerMove={drag.dragWindow} onPointerUp={drag.finishDrag}
      />
      <div className={styles.windowBody}>{children}</div>
    </section>
  )
}
