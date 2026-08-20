'use client'

import Windows98TitleBar from './Windows98TitleBar'
import useWindows98Drag from './useWindows98Drag'
import styles from './Windows98Experience.module.css'

export default function Windows98Window({ active, children, onClose, onFocus, onMaximize, onMinimize, onMove, window }) {
  const drag = useWindows98Drag({ focusWindow: onFocus, moveWindow: onMove, window })
  if (!window.open || window.minimized) return null

  const frameStyle = {
    zIndex: window.zIndex,
    ...(window.maximized ? {} : {
      left: window.position.x, top: window.position.y,
      width: window.size.width, height: window.size.height,
    }),
  }

  return <>
    {window.modal && <div className={styles.windowBackdrop} style={{ zIndex: window.zIndex - 1 }} aria-hidden="true" />}
    <section
      className={`${styles.windowFrame} ${styles.raised} ${window.maximized ? styles.windowMaximized : ''}`}
      style={frameStyle}
      role="dialog"
      aria-modal={window.modal ? 'true' : 'false'}
      aria-label={window.title}
      onPointerDown={onFocus}
    >
      <Windows98TitleBar
        window={window} active={active} onClose={onClose} onMaximize={onMaximize} onMinimize={onMinimize}
        onPointerDown={drag.startDrag} onPointerMove={drag.dragWindow} onPointerUp={drag.finishDrag}
      />
      <div className={styles.windowBody}>{children}</div>
    </section>
  </>
}
