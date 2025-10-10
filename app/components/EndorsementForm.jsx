'use client'

import { useState, useEffect, useRef, useMemo } from "react"
import { getSupabaseClient } from "../../lib/supabaseClient";
import { COUNTRIES } from "../../lib/countries";

import {  useToast } from '../components/toast/ToastProvider'
import { scrollToAndHighlight } from "@/utils/highlight";


export default function EndorsementForm({ onSubmitted }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [message, setMessage] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');
    const [consent, setConsent] = useState(false);
    const [messageLen, setMessageLen] = useState(0);
    const [countryOpen, setCountryOpen] = useState(false);
    const [countryQuery, setCountryQuery] = useState("");
    const countryBoxRef = useRef(null);
    const [inlineMsg, setInlineMsg] = useState('');
    const toast = useToast();

    const COUNTRY_OPTIONS = useMemo(() => {
  const byCode = new Map();                 
  for (const c of COUNTRIES) {
    const code = (c.code || "").toLowerCase().trim();
    if (!code) continue;
    if (!byCode.has(code)) {
      byCode.set(code, {
        code,
        name: c.name,
        emoji: c.emoji || toFlag(code),
      });
    }
  }
  return Array.from(byCode.values()).sort((a, b) => a.name.localeCompare(b.name));
}, []);

    useEffect(() => {
        function onDocMouseDown(e) {
      if (countryBoxRef.current && !countryBoxRef.current.contains(e.target)) {
        setCountryOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (pending) return;
        setError('');

        if (!name.trim() || name.trim().length < 2) {
            setError('Please enter your name(min 2 characters).');
            return;
        }
        if (!email.includes('@')) {
            setError('Please enter a valid email.');
            return;
        }
        if (!message.trim() || message.trim().length < 20 || message.trim().length > 500 ) {
            setError('Your comment must be between 20 and 500 characters!');
            return;
        }
        if (!consent) {
            setError('Please confirm you agree your endorsement may be displayed!');
            return;
        }
        if (honeypot) {
            return;
        }

        setPending(true);

        let inserted = null;
        try {
            const supabase = getSupabaseClient();

            const { data, error } = await supabase
            .from('endorsements')
            .insert([
                {
                    name: name.trim(),
                    email: email.trim(),
                    country: country.trim() || null,
                    message: message.trim(),
                }
            ])
            .select()
            .single();

            if (error) {
                setError(error.message || 'Failed to submit endorsement!');
                setPending(false);
                return;
            }
            inserted = data;
          } catch (err) {
            setError('Unexpected error. Please try again!');
            setPending(false);
            return;
          }

            setInlineMsg(`Thanks, ${name.trim()}! Your endosement is live!`);
            setTimeout(() => {
              setInlineMsg('')
            }, 3500);

            try {
              const cardId = inserted?.id ? String(inserted.id) : null;

              toast.success({
                title: `Thanks, ${name.trim()}!`,
                body: 'Your endorsement is live.',
                dedupeKey: 'endorsement-saved',
                actions: [
                  ...COUNTRIES(cardId ? [{
                    label: 'View',
                    onClick: () => scrollToAndHighlight(cardId),
                  }] : []),
                  {
                    label: 'Copy link',
                    onClick: () => {
                      const hash = cardId ? `#${cardId}` : '';
                      const url = `${window.location.origin}${window.location.pathname}${hash}`;
                      navigator.clipboard?.writeText(url);
                    },
                  },
                ],
              });
            } catch (e) {
              console.warn(`Toast/UI actions failed:`, e);
            }

            try { onSubmitted?.(inserted); } catch (e) { console.warn('onSubmitted threw:', e); }


        setName('');
        setEmail('');
        setCountry('');
        setMessage('');
        setMessageLen(0);
        setConsent(false);
        setCountryOpen(false);
        setError('');

        setPending(false);
    }


    return (
      <>
      {inlineMsg && (
      <div className="mb-3 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
        {inlineMsg}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium">Name *</label>
          <input
            className="w-full rounded-md border px-3 py-2 text-base sm:text-sm
             bg-white dark:bg-neutral-900
             border-neutral-300 dark:border-neutral-700
             text-black dark:text-white
             placeholder-neutral-500 dark:placeholder-neutral-300"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={pending}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Email *</label>
          <input
            className="w-full rounded-md border px-3 py-2"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={pending}
          />
          <p className="text-xs text-neutral-500">Your email won’t be shown publicly.</p>
        </div>
      </div>

      <div className="space-y-1">
  <label className="text-sm font-medium">Country (optional)</label>

  <div ref={countryBoxRef} className="relative">
    <button
      type="button"
      onClick={() => setCountryOpen(v => !v)}
      disabled={pending}
      aria-haspopup="listbox"
      aria-expanded={countryOpen}
      className="w-full rounded-md border px-3 py-2 flex items-center justify-between
      bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-black dark:text-white"
    >
      <span className="truncate text-left">
        {country
          ? (() => {
              const c = COUNTRY_OPTIONS.find(x => x.code.toLowerCase() === country);
              return c ? `${c.emoji} ${c.name}` : country.toUpperCase();
            })()
          : "Select Country..."}
      </span>
      <svg className="h-4 w-4 opacity-60" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.4a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </button>

    {countryOpen && (
      <div className="absolute left-0 right-0 top-full z-50 mt-1 w-full rounded-md border bg-white dark:bg-neutral-900
       border-neutral-200 dark:border-neutral-700 shadow-lg">
        <div className="p-2">
          <input
            autoFocus
            placeholder="Search country..."
            value={countryQuery}
            onChange={(e) => setCountryQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setCountryOpen(false);
            }}
            className="w-full rounded border px-2 py-1 bg-white dark:bg-neutral-700 border-neutral-300
            dark:border-neutral-700 text-black
            dark:text-white placeholder-neutral-500 dark:placeholder-neutral-300"
          />
        </div>

        <ul className="max-h-56 overflow-y-auto py-1" role="listbox">
          {(() => {
            const results = COUNTRY_OPTIONS.filter(c =>
              c.name.toLowerCase().includes(countryQuery.toLowerCase()) ||
              c.code.toLowerCase().includes(countryQuery.toLowerCase())
            );

            if (results.length === 0) {
              return (
                <li className="px-3 py-2 text-sm text-neutral-500 dark:text-neutral-400">
                  No country found.
                </li>
              );
            }

            return results.map((c) => (
              <li key={c.code}>
                <button
                  type="button"
                  onClick={() => {
                    setCountry(c.code.toLowerCase());
                    setCountryOpen(false);
                    setCountryQuery("");
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-neutral-100 flex items-center gap-2
                     dark:hover:bg-neutral-800 
                    ${ country === c.code.toLowerCase() ? "bg-neutral-100 dark:bg-neutral-800" : ""}
                    text-black dark:text-white`}
                  role="option"
                  aria-selected={country === c.code.toLowerCase()}
                >
                  <span>{c.emoji}</span>
                  <span className="uppercase text-xs opacity-60">{c.code}</span>
                  <span>{c.name}</span>
                </button>
              </li>
            ));
          })()}
        </ul>
      </div>
    )}
  </div>
</div>


      <div className="space-y-1">
        <label className="text-sm font-medium">Your Comment *</label>
        <textarea
          className="w-full rounded-md border px-3 py-2 min-h-28 text-base sm:text-sm
             bg-white dark:bg-neutral-900
             border-neutral-300 dark:border-neutral-700
             text-black dark:text-white
             placeholder-neutral-500 dark:placeholder-neutral-300"
          placeholder="Share your thoughts…"
          value={message}
          onChange={(e) => {
            const val = e.target.value;
            setMessage(val);
            setMessageLen(val.length);
          }}
          disabled={pending}
        />
        <div className="flex justify-between text-xs text-neutral-500">
            <span>20-500 characters required</span>
            <span className={messageLen < 20 || messageLen > 500 
                ? 'text-red-600' 
                : 'text-green-600'}>{messageLen}/500</span>
        </div>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <label className="flex items-start gap-2 text-sm">
        <input
        type="checkbox" checked={consent}
        onChange={(e) => setConsent(e.target.checked)}
        disabled={pending} className="mt-1"
        />
        <span>I agree my endorsement may be displayed on this site <span className="text-red-600">*</span></span>
      </label>

      <button
        type="submit"
        disabled={pending}
        aria-busy= {pending ? "true" : "false"}
        className="w-full h-11 rounded-md bg-[#0E1628] text-white font-semibold shadow-sm transition-colors
             hover:bg-[#0B1222] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E1628]
             disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? 'Submitting…' : 'Submit endorsement'}
      </button>
    </form>
    </>
  );
}