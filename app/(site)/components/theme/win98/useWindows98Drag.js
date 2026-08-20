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
      lastPosition: window.position,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }, [focusWindow, window])

  const dragWindow = useCallback((event) => {
    const drag = dragRef.current
    if (!drag || event.pointerId !== drag.pointerId) return

    const maxX = Math.max(0, innerWidth - window.size.width)
    const maxY = Math.max(0, innerHeight - 62)
    const nextX = Math.min(maxX, Math.max(0, drag.originX + event.clientX - drag.startX))
    const nextY = Math.min(maxY, Math.max(0, drag.originY + event.clientY - drag.startY))
    drag.lastPosition = { x: nextX, y: nextY }
    const frame = event.currentTarget.closest('[role="dialog"]')
    if (frame instanceof HTMLElement) {
      frame.style.left = `${nextX}px`
      frame.style.top = `${nextY}px`
    }
  }, [window.size.width])

  const finishDrag = useCallback((event) => {
    if (event.pointerId !== dragRef.current?.pointerId) return
    moveWindow(window.id, dragRef.current.lastPosition)
    dragRef.current = null
    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }, [moveWindow, window.id])

  return {
    dragWindow,
    finishDrag,
    startDrag,
  }
}
