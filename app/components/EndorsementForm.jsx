'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { getSupabaseClient } from '../../lib/supabaseClient'
import { COUNTRIES } from '../../lib/countries'
import { useToast } from '../components/toast/ToastProvider'
import { scrollToAndHighlight } from '@/utils/highlight'

const toFlag = (code) =>
  (code || '').toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)))

export default function EndorsementForm({ onSubmitted }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [consent, setConsent] = useState(false)
  const [messageLen, setMessageLen] = useState(0)
  const [countryOpen, setCountryOpen] = useState(false)
  const [countryQuery, setCountryQuery] = useState('')
  const [inlineMsg, setInlineMsg] = useState('')

  const countryBoxRef = useRef(null)
  const toast = useToast()

  const COUNTRY_OPTIONS = useMemo(() => {
    const byCode = new Map()
    for (const c of COUNTRIES) {
      const code = (c.code || '').toLowerCase().trim()
      if (!code) continue
      if (!byCode.has(code)) {
        byCode.set(code, { code, name: c.name, emoji: c.emoji || toFlag(code) })
      }
    }
    return Array.from(byCode.values()).sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  useEffect(() => {
    function onDocMouseDown(e) {
      if (countryBoxRef.current && !countryBoxRef.current.contains(e.target)) {
        setCountryOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (pending) return
    setError('')

    if (!name.trim() || name.trim().length < 2) {
      setError('Please enter your name (min 2 characters).')
      return
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email.')
      return
    }
    if (!message.trim() || message.trim().length < 20 || message.trim().length > 500) {
      setError('Your comment must be between 20 and 500 characters.')
      return
    }
    if (!consent) {
      setError('Please confirm you agree your endorsement may be displayed.')
      return
    }
    if (honeypot) return

    setPending(true)

    let inserted = null
    try {
      const supabase = getSupabaseClient()
      const { data, error: insertError } = await supabase
        .from('endorsements')
        .insert([
          {
            name: name.trim(),
            email: email.trim(),
            country: country.trim() || null,
            message: message.trim(),
          },
        ])
        .select()
        .single()

      if (insertError) {
        setError(insertError.message || 'Failed to submit endorsement.')
        setPending(false)
        return
      }
      inserted = data
    } catch {
      setError('Unexpected error. Please try again.')
      setPending(false)
      return
    }

    setInlineMsg(`Thanks, ${name.trim()}! Your endorsement is live.`)
    setTimeout(() => setInlineMsg(''), 3500)

    try {
      const cardId = inserted?.id ? String(inserted.id) : null
      toast.success({
        title: `Thanks, ${name.trim()}!`,
        body: 'Your endorsement is live.',
        dedupeKey: 'endorsement-saved',
        actions: [
          ...(cardId
            ? [{ label: 'View', onClick: () => scrollToAndHighlight(cardId) }]
            : []),
          {
            label: 'Copy link',
            onClick: () => {
              const hash = cardId ? `#${cardId}` : ''
              const url = `${window.location.origin}${window.location.pathname}${hash}`
              navigator.clipboard?.writeText(url)
            },
          },
        ],
      })
    } catch (toastErr) {
      console.warn('Toast failed:', toastErr)
    }

    try {
      onSubmitted?.(inserted)
    } catch (cbErr) {
      console.warn('onSubmitted threw:', cbErr)
    }

    setName('')
    setEmail('')
    setCountry('')
    setMessage('')
    setMessageLen(0)
    setConsent(false)
    setCountryOpen(false)
    setError('')
    setPending(false)
  }

  const inputBase =
    'w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60'

  const selectedCountry = COUNTRY_OPTIONS.find((c) => c.code === country)
  const filteredCountries = COUNTRY_OPTIONS.filter(
    (c) =>
      c.name.toLowerCase().includes(countryQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(countryQuery.toLowerCase())
  )

  return (
    <>
      {inlineMsg && (
        <div className="mb-4 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
          {inlineMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="endorse-name" className="text-sm font-medium text-foreground">
              Name <span className="text-primary">*</span>
            </label>
            <input
              id="endorse-name"
              className={inputBase}
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={pending}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="endorse-email" className="text-sm font-medium text-foreground">
              Email <span className="text-primary">*</span>
            </label>
            <input
              id="endorse-email"
              type="email"
              className={inputBase}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={pending}
            />
            <p className="text-xs text-muted-foreground">Your email won&apos;t be shown publicly.</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Country (optional)</label>

          <div ref={countryBoxRef} className="relative">
            <button
              type="button"
              onClick={() => setCountryOpen((v) => !v)}
              disabled={pending}
              aria-haspopup="listbox"
              aria-expanded={countryOpen}
              className={`${inputBase} flex items-center justify-between text-left`}
            >
              <span className="truncate">
                {selectedCountry
                  ? `${selectedCountry.emoji} ${selectedCountry.name}`
                  : country
                    ? country.toUpperCase()
                    : 'Select country…'}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform ${
                  countryOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {countryOpen && (
              <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                <div className="border-b border-border p-2">
                  <input
                    autoFocus
                    placeholder="Search country…"
                    value={countryQuery}
                    onChange={(e) => setCountryQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') setCountryOpen(false)
                    }}
                    className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <ul className="max-h-56 overflow-y-auto py-1" role="listbox">
                  {filteredCountries.length === 0 ? (
                    <li className="px-3 py-2 text-sm text-muted-foreground">No country found.</li>
                  ) : (
                    filteredCountries.map((c) => {
                      const isSelected = country === c.code
                      return (
                        <li key={c.code}>
                          <button
                            type="button"
                            onClick={() => {
                              setCountry(c.code)
                              setCountryOpen(false)
                              setCountryQuery('')
                            }}
                            className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-muted ${
                              isSelected ? 'bg-muted text-foreground' : 'text-foreground'
                            }`}
                            role="option"
                            aria-selected={isSelected}
                          >
                            <span>{c.emoji}</span>
                            <span className="text-xs uppercase text-muted-foreground">{c.code}</span>
                            <span className="flex-1">{c.name}</span>
                            {isSelected && <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />}
                          </button>
                        </li>
                      )
                    })
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="endorse-message" className="text-sm font-medium text-foreground">
            Your comment <span className="text-primary">*</span>
          </label>
          <textarea
            id="endorse-message"
            className={`${inputBase} min-h-32 resize-y leading-relaxed`}
            placeholder="Share your thoughts…"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              setMessageLen(e.target.value.length)
            }}
            disabled={pending}
          />
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">20–500 characters required</span>
            <span
              className={
                messageLen < 20 || messageLen > 500
                  ? 'text-destructive'
                  : 'text-primary'
              }
            >
              {messageLen}/500
            </span>
          </div>
        </div>

        {error && (
          <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <label className="flex items-start gap-3 text-sm text-foreground">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            disabled={pending}
            className="mt-1 h-4 w-4 cursor-pointer accent-[var(--primary)]"
          />
          <span>
            I agree my endorsement may be displayed on this site{' '}
            <span className="text-primary">*</span>
          </span>
        </label>

        <button
          type="submit"
          disabled={pending}
          aria-busy={pending ? 'true' : 'false'}
          className="h-12 w-full rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-sm transition-[transform,opacity] duration-200 hover:-translate-y-px hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? 'Submitting…' : 'Submit endorsement'}
        </button>
      </form>
    </>
  )
}