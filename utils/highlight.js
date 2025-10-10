// utils/highlight.js
export function scrollToAndHighlight(cardId) {
  const el = document.getElementById(cardId)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  el.classList.add('ring-2', 'ring-yellow-400')
  // soft pulse (optional): remove after 3s
  const t = setTimeout(() => {
    el.classList.remove('ring-2', 'ring-yellow-400')
  }, 3000)
  // cleanup if navigated away
  return () => clearTimeout(t)
}
