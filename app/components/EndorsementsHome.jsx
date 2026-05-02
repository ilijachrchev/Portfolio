'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { formatDistanceToNow } from 'date-fns'
import { getSupabaseClient } from '@/lib/supabaseClient'
import { COUNTRIES } from '@/lib/countries'

const gridVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.1, duration: 0.35 },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const toFlag = (code) =>
  (code || '').toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)))

function getInitials(name = '') {
  const clean = name.trim().replace(/\s+/g, ' ')
  if (!clean) return '??'
  const parts = clean.split(' ')
  const first = parts[0] || ''
  const last = parts.length > 1 ? parts[parts.length - 1] : ''
  const firstChar = Array.from(first)[0] || ''
  const secondChar = last ? Array.from(last)[0] || '' : Array.from(first)[1] || ''
  return (firstChar + secondChar).toLocaleUpperCase() || '??'
}

function Card({ row }) {
  const code = (row.country || '').toLowerCase()
  const meta = useMemo(() => {
    const found = COUNTRIES.find((c) => (c.code || '').toLowerCase() === code)
    return found ? { name: found.name, emoji: found.emoji || toFlag(found.code) } : null
  }, [code])

  return (
    <article className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <header className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground select-none">
            {getInitials(row.name)}
          </div>
          <div className="leading-tight">
            <div className="font-medium text-foreground">{row.name}</div>
            <div className="text-xs text-muted-foreground">
              {meta ? (
                <>
                  <span className="mr-1">{meta.emoji}</span>
                  {meta.name}
                </>
              ) : (
                '—'
              )}
            </div>
          </div>
        </div>

        <time className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(row.created_at), { addSuffix: true })}
        </time>
      </header>

      <p className="whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground">
        {row.message}
      </p>
    </article>
  )
}

function Skeleton() {
  return (
    <div className="h-full animate-pulse rounded-2xl border border-border p-5">
      <div className="flex items-center justify-between">
        <div className="h-4 w-28 rounded bg-muted" />
        <div className="h-3 w-16 rounded bg-muted" />
      </div>
      <div className="mt-3 h-3 w-3/4 rounded bg-muted" />
      <div className="mt-2 h-3 w-5/6 rounded bg-muted" />
      <div className="mt-2 h-3 w-2/3 rounded bg-muted" />
    </div>
  )
}

export default function EndorsementsHome() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [perPage, setPerPage] = useState(6)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 640px)')
    const apply = () => setPerPage(mq.matches ? 2 : 6)
    apply()
    mq.addEventListener?.('change', apply)
    mq.addListener?.(apply)
    return () => {
      mq.removeEventListener?.('change', apply)
      mq.removeListener?.(apply)
    }
  }, [])

  useEffect(() => {
    setPage(1)
  }, [perPage])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const sb = getSupabaseClient()
      const { data, error } = await sb
        .from('endorsements')
        .select('id, name, country, message, created_at, featured')
        .eq('approved', true)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(30)
      if (!mounted) return
      if (!error) setItems(data || [])
      setLoading(false)
    })()
    return () => {
      mounted = false
    }
  }, [])

  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const start = (page - 1) * perPage
  const end = Math.min(start + perPage, total)
  const visible = items.slice(start, end)

  const rangeLabel = loading ? 'Loading…' : total === 0 ? '0–0' : `${start + 1}–${end}`

  const hasPrev = page > 1
  const hasNext = page < totalPages
  const prev = () => hasPrev && setPage((p) => p - 1)
  const next = () => hasNext && setPage((p) => p + 1)

  return (
    <motion.section
      id="endorsements-home"
      className="scroll-m-24 px-5 pb-24 pt-32 lg:px-8 md:pb-32 md:pt-40 xl:px-[8%]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          className="mb-10 text-center"
          initial={{ y: -16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: false }}
        >
          <h2
            className="font-display text-4xl font-normal text-foreground sm:text-5xl md:text-6xl"
            style={{ fontVariationSettings: '"opsz" 144', letterSpacing: '-0.02em' }}
          >
            What people{' '}
            <em className="font-light italic text-primary" style={{ fontVariationSettings: '"opsz" 144' }}>
              say
            </em>
          </h2>

          <motion.div
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            viewport={{ once: false }}
          >
            <span className="h-2 w-2 rounded-full bg-primary" />
            {rangeLabel} of {loading ? '…' : total}
          </motion.div>
        </motion.div>

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={gridVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {(loading ? Array.from({ length: perPage }) : visible).map((row, i) => (
              <motion.div key={loading ? i : row.id} variants={cardVariants}>
                {loading ? <Skeleton /> : <Card row={row} />}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {!loading && total > 0 && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={prev}
              disabled={!hasPrev}
              className="liquid-glass h-10 rounded-full px-4 text-sm text-foreground disabled:opacity-40"
              aria-label="Previous endorsements"
            >
              ‹ Prev
            </motion.button>
            <span className="text-xs text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={next}
              disabled={!hasNext}
              className="liquid-glass h-10 rounded-full px-4 text-sm text-foreground disabled:opacity-40"
              aria-label="Next endorsements"
            >
              Next ›
            </motion.button>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            href="/endorsements-submit-test"
            className="liquid-glass rounded-full px-5 py-2.5 text-sm text-foreground transition-transform duration-200 hover:-translate-y-px"
          >
            Leave an endorsement →
          </Link>
        </div>
      </div>
    </motion.section>
  )
}