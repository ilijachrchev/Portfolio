'use client'

import { useEffect, useEffectEvent, useMemo, useState } from 'react'
import { getSupabaseClient } from '../../lib/supabaseClient'
import { COUNTRIES } from '../../lib/countries'
import { formatDistanceToNow } from 'date-fns'
import { SegmentPrefixRSCPathnameNormalizer } from 'next/dist/server/normalizers/request/segment-prefix-rsc'

export default function EndorsementsFeed() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [q, setQ] = useState('');
    const [countryFilter, setCountryFilter] = useState('all');
    const pageSize = 3;
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('newest');


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
    const copy = [...filtered];
    switch(sortBy) {
        case 'oldest':
            copy.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            break;
        case 'featured':
            copy.sort((a, b) => {
                const fa = a.featured ? 1 : 0;
                const fb = b.featured ? 1 : 0;
                if (fb !== fa) return fb-fa;
                return new Date(b.created_at) - new Date(a.created_at);
            });
            break;
            default:
                copy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    return copy;
  }, [filtered, sortBy]);

    useEffect(() => {
        setPage(1);
    }, [q, countryFilter, items]);
    const total = sorted.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, total);
    const visible = sorted.slice(startIndex, endIndex);
    
    function prevPage() {
        setPage((p) => Math.max(1, p - 1));
    }
    function nextPage() {
        setPage((p) => Math.min(totalPages, p + 1));
    }
    const rangeLabel = `${total === 0 ? 0 : startIndex + 1}-${endIndex} of ${total}`;


async function fetchItems({ initial = false } = {}) {

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('endorsements')
        .select('id, name, country, message, created_at, featured')
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(100);
    if (!error) setItems(data || []);
    setLoading(false);

}


  const COUNTRY_OPTIONS = useMemo(() => {
    const toFlag = (code) =>
      code.toUpperCase().replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt(0)))
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

 useEffect(() => { fetchItems({ initial: true }); }, []);

useEffect(() => {
  const supabase = getSupabaseClient();

  const channel = supabase
    .channel('endorsements-feed')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'endorsements', filter: 'approved=eq.true' },
      (payload) => {
        const row = payload.new;
        setItems((prev) => {
          if (prev.some((x) => x.id === row.id)) return prev;
          return [row, ...prev].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
        });
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

  const countryMeta = (code) =>
    COUNTRY_OPTIONS.find((c) => c.code === (code || '').toLowerCase())

  const renderCard = (row) => {
    const meta = COUNTRY_OPTIONS.find((c) => c.code === (row.country || '').toLowerCase());
    return (
        <div key={row.id} className='rounded-md border p-4 h-full'>
            <div className='flex items-center justify-between gap-3'>
                <div>
                    <div className='font-semibold'>{row.name}</div>
                    <div className='text-sm text-neutral-500'>
                        {meta ? (<><span className='mr-1'>{meta.emoji}</span>{meta.name}</>)
                         : (row.country ? row.country.toUpperCase() : '—')}
                    </div>
                </div>
                <div className='text-xs text-neutral-500'>
                    {formatDistanceToNow(new Date(row.created_at), { addSuffix: true })}
                </div>
            </div>
            <p className='text-sm mt-2 whitespace-pre-wrap break-words'>{row.message}</p>
        </div>
    );
  };

  return (
    <div className="space-y-3">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className="w-full rounded-md border px-3 py-2"
          placeholder="Search by name or comment…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <select
          className="rounded-md border px-3 py-2 sm:w-[220px]"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        >
          <option value="all">All Countries</option>
          {COUNTRY_OPTIONS.map((c) => (
            <option key={c.code} value={c.code}>
              {c.emoji} {c.name}
            </option>
          ))}
        </select>
        <select 
        className="rounded-md border px-3 py-2 sm:w-[160px]"
        value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label='Sort Endorsements'
        >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="featured">Featured</option>
        </select>

      </div>

      {/* Results */}
{loading ? (
  <div className="text-center py-12 text-neutral-500">Loading…</div>
) : total === 0 ? (
  <div className="text-center py-12 text-neutral-500">No results</div>
) : (
  <>
    {/* Desktop & tablet: vertical list, 3 per page with Prev/Next */}
    <div className="hidden md:block">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-neutral-500" aria-live="polite">{rangeLabel}</div>
        <div className="flex gap-2">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="rounded-md border px-3 py-1.5 bg-white hover:bg-neutral-50 disabled:opacity-50"
            aria-label="Previous endorsements"
          >
            ‹
          </button>
          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className="rounded-md border px-3 py-1.5 bg-white hover:bg-neutral-50 disabled:opacity-50"
            aria-label="Next endorsements"
          >
            ›
          </button>
        </div>
      </div>

      <ul className="space-y-3">
        {visible.map((row) => <li key={row.id}>{renderCard(row)}</li>)}
      </ul>
    </div>

    {/* Mobile: horizontal swipe, 1 card per view (snap) */}
    <div className="md:hidden">
      <div
      className='relative'
      aria-label='Recent endorsements, swipe left or right to browse'>
        <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth gap-4 pb-2"
        style={{ scrollSnapType: 'x mandatory' }}>
          {sorted.map((row) => (
            <div key={row.id} className="shrink-0 w-full snap-start" role='group'
            aria-roledescription='endorsement card'>
              {renderCard(row)}
            </div>
          ))}
        </div>
      <div className='pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-background to-transparent' />
      <div className='pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-1 from-background to-transparent' />
    </div>
    <p className='mt-2 text-center text-xs text-neutral-500 dark:text-neutral-400'>
      Swipe to see more
      <span aria-hidden="true"> →</span>
    </p>
    <div className="mt-1 flex justify-center gap-1">
      {sorted.slice(0, 6).map((_, i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
      ))}
    </div>
    </div>
  </>
)}   
    </div>
  )
}
