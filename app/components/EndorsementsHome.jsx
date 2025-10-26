'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { getSupabaseClient } from '@/lib/supabaseClient'
import { COUNTRIES } from '@/lib/countries'
import { formatDistanceToNow } from 'date-fns'
import { motion, AnimatePresence } from 'motion/react'

const gridVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1, y: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.1, duration: 0.35 }
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 }}
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4 } }
}



const toFlag = (code) =>
  (code || '').toUpperCase().replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt(0)))

function getInitials(name = "") {
  const clean = name.trim().replace(/\s+/g, " ");
  if (!clean) return "??";

  const parts = clean.split(" ");
  const first = parts[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1] : "";

  const firstChar = Array.from(first)[0] || "";
  const secondChar = last ? ( Array.from(last)[0] || "") : (Array.from(first)[1] || "");

  const initials = (firstChar + secondChar).toLocaleUpperCase();
  return initials || "??";
}

function Card({ row }) {
  const code = (row.country || '').toLowerCase()
  const meta = useMemo(() => {
    const found = COUNTRIES.find(c => (c.code || '').toLowerCase() === code)
    return found ? { name: found.name, emoji: found.emoji || toFlag(found.code) } : null
  }, [code])

  return (
    <article className="rounded-2xl border border-black/5 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 shadow-sm p-5 flex flex-col gap-3 h-full">
      <header className="flex items-start justify-between">

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-neutral-800 text-gray-800
          dark:text-gray-100 flex items-center justify-center text-xs font-bold select-none">
            {getInitials(row.name)}
          </div>
          <div className="leading-tight">
            <div className="font-medium">{row.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {meta ? (<><span className="mr-1">{meta.emoji}</span>{meta.name}</>) : '—'}
            </div>
          </div>
        </div>

        <time className="text-xs text-gray-400">
          {formatDistanceToNow(new Date(row.created_at), { addSuffix: true })}
        </time>
      </header>

      <p className="text-sm text-gray-700 dark:text-gray-200 leading-6 whitespace-pre-wrap break-words">
        {row.message}
      </p>
    </article>
  )
}

function Skeleton() {
  return (
    <div className="rounded-2xl border border-black/5 dark:border-neutral-800 p-5 animate-pulse h-full">
      <div className="flex items-center justify-between">
        <div className="h-4 w-28 bg-gray-200 dark:bg-neutral-800 rounded" />
        <div className="h-3 w-16 bg-gray-200 dark:bg-neutral-800 rounded" />
      </div>
      <div className="mt-3 h-3 w-3/4 bg-gray-200 dark:bg-neutral-800 rounded" />
      <div className="mt-2 h-3 w-5/6 bg-gray-200 dark:bg-neutral-800 rounded" />
      <div className="mt-2 h-3 w-2/3 bg-gray-200 dark:bg-neutral-800 rounded" />
    </div>
  )
}

export default function EndorsementsHome() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const [perPage, setPerPage] = useState(6)

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

  const [page, setPage] = useState(1)
  useEffect(() => { setPage(1) }, [perPage])

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
    return () => { mounted = false }
  }, [])

  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const start = (page - 1) * perPage
  const end = Math.min(start + perPage, total)
  const visible = items.slice(start, end)

  const rangeLabel = loading
    ? 'Loading…'
    : total === 0
      ? '0–0'
      : `${start + 1}–${end}`

  const hasPrev = page > 1
  const hasNext = page < totalPages
  const prev = () => hasPrev && setPage(p => p - 1)
  const next = () => hasNext && setPage(p => p + 1)

  return (
    <motion.section id="endorsements-home" className="py-16 lg:py-24"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: false, amount: 0.2 }}>
      <div className="mx-auto w-full max-w-6xl px-5 lg:px-8 xl:px-[8%]">
        <motion.div className="text-center mb-8"
        initial={{ y: -16, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: false }}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-Ovo">What People Say</h2>

          <motion.div className="mt-3 inline-flex items-center gap-2 rounded-full
                          bg-rose-50 dark:bg-neutral-800/60
                          px-4 py-2 text-sm text-rose-600 dark:text-rose-300"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.4 }}
                          viewport={{ once: false }}>
            <span className="h-2 w-2 rounded-full bg-rose-400 dark:bg-rose-300" />
            {rangeLabel} of {loading ? '…' : total}
          </motion.div>
        </motion.div>

        <AnimatePresence mode='popLayout' initial={false}>
          <motion.div
            className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
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
          <div className="mt-8 flex items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={prev}
              disabled={!hasPrev}
              className="h-10 rounded-full border px-4 disabled:opacity-40 dark:border-neutral-700"
              aria-label="Previous endorsements"
            >
              ‹ Prev
            </motion.button>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Page {page} of {totalPages}
            </span>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={next}
              disabled={!hasNext}
              className="h-10 rounded-full border px-4 disabled:opacity-40 dark:border-neutral-700"
              aria-label="Next endorsements"
            >
              Next ›
            </motion.button>
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <Link
            href="/endorsements-submit-test"
            className="rounded-full border border-gray-300 dark:border-neutral-700 px-5 py-2.5 text-sm
                       bg-white/70 dark:bg-neutral-900/60 hover:bg-white dark:hover:bg-neutral-900 transition"
          >
            Leave an endorsement! →
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
