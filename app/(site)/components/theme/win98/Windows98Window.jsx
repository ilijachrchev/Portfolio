'use client'

import { useEffect, useRef } from 'react'
import Windows98TitleBar from './Windows98TitleBar'
import useWindows98Drag from './useWindows98Drag'
import styles from './Windows98Experience.module.css'

export default function Windows98Window({ active, children, onClose, onFocus, onMaximize, onMinimize, onMove, window }) {
  const drag = useWindows98Drag({ focusWindow: onFocus, moveWindow: onMove, window })
  const frameRef = useRef(null)

  useEffect(() => {
    if (!window.modal || !window.open || window.minimized) return
    const previousFocus = document.activeElement
    requestAnimationFrame(() => {
      const bodyControl = frameRef.current?.lastElementChild?.querySelector('button, input, [href]')
      bodyControl?.focus()
    })
    return () => {
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus()
      else document.querySelector('button[aria-haspopup="menu"]')?.focus()
    }
  }, [window.minimized, window.modal, window.open])

  const trapModalFocus = (event) => {
    if (!window.modal || event.key !== 'Tab') return
    const controls = [...frameRef.current.querySelectorAll('button:not(:disabled), input:not(:disabled), [href]')]
    const first = controls[0]
    const last = controls.at(-1)
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

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
      ref={frameRef}
      className={`${styles.windowFrame} ${styles.raised} ${window.maximized ? styles.windowMaximized : ''}`}
      style={frameStyle}
      role="dialog"
      aria-modal={window.modal ? 'true' : 'false'}
      aria-label={window.title}
      onKeyDown={trapModalFocus}
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
