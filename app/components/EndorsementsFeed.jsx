'use client'

import { useEffect, useMemo, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getSupabaseClient } from '../../lib/supabaseClient'
import { COUNTRIES } from '../../lib/countries'

const toFlag = (code) =>
  (code || '').toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)))

export default function EndorsementsFeed() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [q, setQ] = useState('')
  const [countryFilter, setCountryFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('newest')

  const pageSize = 3

  const COUNTRY_OPTIONS = useMemo(() => {
    const byCode = new Map()
    for (const c of COUNTRIES) {
      const code = (c.code || '').toLowerCase()
      if (!code) continue
      if (!byCode.has(code)) {
        byCode.set(code, { code, name: c.name, emoji: c.emoji || toFlag(code) })
      }
    }
    return Array.from(byCode.values()).sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return items.filter((row) => {
      const inCountry = countryFilter === 'all' || (row.country || '').toLowerCase() === countryFilter
      const inText =
        !needle ||
        (row.name || '').toLowerCase().includes(needle) ||
        (row.message || '').toLowerCase().includes(needle)
      return inCountry && inText
    })
  }, [items, q, countryFilter])

  const sorted = useMemo(() => {
    const copy = [...filtered]
    switch (sortBy) {
      case 'oldest':
        copy.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        break
      case 'featured':
        copy.sort((a, b) => {
          const fa = a.featured ? 1 : 0
          const fb = b.featured ? 1 : 0
          if (fb !== fa) return fb - fa
          return new Date(b.created_at) - new Date(a.created_at)
        })
        break
      default:
        copy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
    return copy
  }, [filtered, sortBy])

  useEffect(() => {
    setPage(1)
  }, [q, countryFilter, items])

  const total = sorted.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const startIndex = (page - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, total)
  const visible = sorted.slice(startIndex, endIndex)
  const rangeLabel = `${total === 0 ? 0 : startIndex + 1}–${endIndex} of ${total}`

  const prevPage = () => setPage((p) => Math.max(1, p - 1))
  const nextPage = () => setPage((p) => Math.min(totalPages, p + 1))

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from('endorsements')
        .select('id, name, country, message, created_at, featured')
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(100)
      if (!mounted) return
      if (!error) setItems(data || [])
      setLoading(false)
    })()
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    const supabase = getSupabaseClient()
    const channel = supabase
      .channel('endorsements-feed')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'endorsements', filter: 'approved=eq.true' },
        (payload) => {
          const row = payload.new
          setItems((prev) => {
            if (prev.some((x) => x.id === row.id)) return prev
            return [row, ...prev].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const renderCard = (row) => {
    const meta = COUNTRY_OPTIONS.find((c) => c.code === (row.country || '').toLowerCase())
    return (
      <div className="h-full rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-semibold text-foreground">{row.name}</div>
            <div className="text-sm text-muted-foreground">
              {meta ? (
                <>
                  <span className="mr-1">{meta.emoji}</span>
                  {meta.name}
                </>
              ) : row.country ? (
                row.country.toUpperCase()
              ) : (
                '—'
              )}
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(row.created_at), { addSuffix: true })}
          </div>
        </div>
        <p className="mt-2 whitespace-pre-wrap break-words text-sm text-foreground">{row.message}</p>
      </div>
    )
  }

  const inputBase =
    'rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30'

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          className={`${inputBase} w-full`}
          placeholder="Search by name or comment…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <select
          className={`${inputBase} sm:w-[200px]`}
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        >
          <option value="all">All countries</option>
          {COUNTRY_OPTIONS.map((c) => (
            <option key={c.code} value={c.code}>
              {c.emoji} {c.name}
            </option>
          ))}
        </select>

        <select
          className={`${inputBase} sm:w-[140px]`}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort endorsements"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="featured">Featured</option>
        </select>
      </div>

      {loading ? (
        <div className="py-12 text-center text-muted-foreground">Loading…</div>
      ) : total === 0 ? (
        <div className="py-12 text-center text-muted-foreground">No results</div>
      ) : (
        <>
          <div className="hidden md:block">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-xs text-muted-foreground" aria-live="polite">
                {rangeLabel}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prevPage}
                  disabled={page === 1}
                  className="liquid-glass inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground disabled:opacity-40"
                  aria-label="Previous endorsements"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  onClick={nextPage}
                  disabled={page === totalPages}
                  className="liquid-glass inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground disabled:opacity-40"
                  aria-label="Next endorsements"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <ul className="space-y-3">
              {visible.map((row) => (
                <li key={row.id}>{renderCard(row)}</li>
              ))}
            </ul>
          </div>

          <div className="md:hidden">
            <div
              className="relative"
              aria-label="Recent endorsements, swipe left or right to browse"
            >
              <div
                className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
                style={{ scrollSnapType: 'x mandatory' }}
              >
                {sorted.map((row) => (
                  <div
                    key={row.id}
                    className="w-full shrink-0 snap-start"
                    role="group"
                    aria-roledescription="endorsement card"
                  >
                    {renderCard(row)}
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-card to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-card to-transparent" />
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Swipe to see more <span aria-hidden="true">→</span>
            </p>
            <div className="mt-1 flex justify-center gap-1">
              {sorted.slice(0, 6).map((_, i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-border" />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}