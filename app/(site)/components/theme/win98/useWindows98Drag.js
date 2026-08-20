import { useCallback, useRef } from 'react'

export default function useWindows98Drag({ focusWindow, moveWindow, window }) {
  const dragRef = useRef(null)

  const startDrag = useCallback((event) => {
    if (event.button !== 0 || event.target.closest('button') || window.maximized) return
    if (matchMedia('(max-width: 640px)').matches) return

    focusWindow(window.id)
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: window.position.x,
      originY: window.position.y,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }, [focusWindow, window])

  return {
    dragRef,
    moveWindow,
    startDrag,
  }
}
