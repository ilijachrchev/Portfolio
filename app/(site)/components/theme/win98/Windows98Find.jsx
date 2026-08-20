'use client'

import { useMemo, useState } from 'react'
import { WINDOWS98_APPS } from './windows98Apps'
import styles from './Windows98Experience.module.css'

export default function Windows98Find({ onNavigate }) {
  const [query, setQuery] = useState('')
  const results = useMemo(() => WINDOWS98_APPS.filter((app) => (
    app.label.toLowerCase().includes(query.trim().toLowerCase())
  )), [query])

  return (
    <div className={styles.findDialog}>
      <label htmlFor="win98-find">Named:</label>
      <input
        id="win98-find" className={styles.sunken} value={query} autoFocus
        onChange={(event) => setQuery(event.target.value)} placeholder="Projects"
      />
      <div className={`${styles.findResults} ${styles.sunken}`}>
        {results.map((app) => (
          <button type="button" key={app.id} onClick={() => onNavigate(app.id)}>
            {app.label}
          </button>
        ))}
        {!results.length && <p>No matching portfolio applications.</p>}
      </div>
    </div>
  )
}
