'use client'
import { formatDuration } from "date-fns";
import React, { createContext, useContext, useMemo, useRef, useState } from "react";


const ToastCtx = createContext(null)

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])
    const idRef = useRef(0);

    const api = useMemo(() => ({
        push(t) {
            setToasts(prev => {
                if (t.dedupeKey) {
                    const i =prev.findIndex(x => x.dedupeKey === t.dedupeKey)
                    if (i !== -1) {
                        const next = [...prev]
                        next[i] = { ...next[i], ...t }
                        return next
                    }
                }
                const id = ++idRef.current
                return [...prev, { id, duration: t.duration ?? (t.type === 'success' ? 3500 : 4000), ...t }]
            })
        },
        dismiss(id) { setToasts(prev => prev.filter(t => t.id !== id)) },
        clear() { setToasts([]) },
        success(opts) { api.push({ type: 'success', ...opts }) },
        info(opts) { api.push({ type: 'info', ...opts }) },
        error(opts) { api.push({ type: 'error', duration: null, ...opts }) },
    }), [])

    return (
        <ToastCtx.Provider value={api}>
            {children}
            <ToastViewport toasts={toasts} dismiss={api.dismiss} />
        </ToastCtx.Provider>
    )
}

export function useToast() {
  const ctx = useContext(ToastCtx)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
function ToastViewport({ toasts, dismiss }) {
  const visible = toasts.slice(0, 2) // show at most 2, queue the rest

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]">
      {/* Desktop: top-right */}
      <div className="absolute right-6 top-6 hidden w-[min(92vw,360px)] space-y-3 sm:block">
        {visible.map(t => <ToastItem key={t.id} t={t} dismiss={dismiss} />)}
      </div>

      {/* Mobile: bottom-center */}
      <div className="absolute left-1/2 bottom-[env(safe-area-inset-bottom,16px)] -translate-x-1/2 w-[calc(100vw-32px)] max-w-[420px] space-y-3 sm:hidden">
        {visible.map(t => <ToastItem key={t.id} t={t} dismiss={dismiss} mobile />)}
      </div>
    </div>
  )
}

function ToastItem({ t, dismiss, mobile }) {
  const [hover, setHover] = useState(false)

  React.useEffect(() => {
    if (t.duration == null) return // sticky toast (e.g., errors)
    if (hover) return
    const id = setTimeout(() => dismiss(t.id), t.duration)
    return () => clearTimeout(id)
  }, [t.duration, hover, dismiss, t.id])

  const colors =
    t.type === 'success'
      ? 'bg-green-600 text-white'
      : t.type === 'error'
        ? 'bg-red-600 text-white'
        : 'bg-white text-black dark:bg-neutral-900 dark:text-white'

  const icon = t.type === 'success' ? '✓' : t.type === 'error' ? '!' : 'ℹ︎'

  return (
    <motion.div
      initial={{ opacity: 0, y: mobile ? 12 : -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: mobile ? 12 : -12 }}
      transition={{ type: 'tween', duration: 0.18 }}
      className={`pointer-events-auto rounded-xl shadow-xl ${colors}`}
      role="status" aria-live="polite"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="mt-0.5 select-none">{icon}</div>
        <div className="flex-1">
          {t.title && <p className="font-semibold leading-5">{t.title}</p>}
          {t.body && <p className="text-sm opacity-90">{t.body}</p>}
          {t.actions?.length > 0 && (
            <div className="mt-2 flex gap-3">
              {t.actions.map((a, i) => (
                <button
                  key={i}
                  onClick={() => { a.onClick?.(); dismiss(t.id) }}
                  className="text-sm underline underline-offset-2"
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => dismiss(t.id)}
          className="ml-1 text-sm opacity-80 hover:opacity-100"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </motion.div>
  )
}