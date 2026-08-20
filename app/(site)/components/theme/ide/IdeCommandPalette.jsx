'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Command, File, Search, X } from 'lucide-react'
import { useTheme } from '../../ThemeProvider'
import { createPaletteCommands } from './ideCommands'
import { IDE_FILES } from './ideFiles'
import { IdeFileIcon } from './IdeIcons'
import { useIdeWorkspace } from './useIdeWorkspace'
import styles from './IdeExperience.module.css'

export default function IdeCommandPalette() {
  const workspace = useIdeWorkspace()
  const { themes, setTheme } = useTheme()
  const [query, setQuery] = useState(workspace.palette.query)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const dialogRef = useRef(null)
  const previousFocusRef = useRef(null)

  const commands = useMemo(() => createPaletteCommands({
    navigateToFile: workspace.navigateToFile,
    setExplorerOpen: workspace.setExplorerOpen,
    toggleTerminal: workspace.toggleTerminal,
    setTheme,
    themes,
  }), [themes, setTheme, workspace.navigateToFile, workspace.setExplorerOpen, workspace.toggleTerminal])

  const entries = useMemo(() => {
    if (workspace.palette.mode === 'files') {
      return IDE_FILES.map((file) => ({
        id: file.id,
        label: file.name,
        detail: file.path,
        keywords: `${file.label} ${file.languageLabel}`,
        file,
        run: () => workspace.navigateToFile(file.id),
      }))
    }
    return commands
  }, [commands, workspace.palette.mode, workspace.navigateToFile])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return entries
    return entries.filter((entry) =>
      `${entry.label} ${entry.detail || ''} ${entry.keywords || ''}`.toLowerCase().includes(needle)
    )
  }, [entries, query])

  useEffect(() => {
    previousFocusRef.current = document.activeElement
    requestAnimationFrame(() => inputRef.current?.focus())
    return () => {
      if (previousFocusRef.current instanceof HTMLElement) previousFocusRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (selectedIndex >= filtered.length) setSelectedIndex(Math.max(0, filtered.length - 1))
  }, [filtered.length, selectedIndex])

  const choose = (entry) => {
    if (!entry) return
    workspace.closePalette()
    entry.run()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelectedIndex((current) => filtered.length ? (current + 1) % filtered.length : 0)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelectedIndex((current) => filtered.length ? (current - 1 + filtered.length) % filtered.length : 0)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      choose(filtered[selectedIndex])
    } else if (event.key === 'Escape') {
      event.preventDefault()
      workspace.closePalette()
    } else if (event.key === 'Tab') {
      const focusable = Array.from(dialogRef.current?.querySelectorAll('input, button:not(:disabled)') || [])
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  return (
    <div className={styles.paletteBackdrop} onMouseDown={workspace.closePalette}>
      <section
        ref={dialogRef}
        className={styles.palette}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ide-palette-title"
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <header>
          {workspace.palette.mode === 'files' ? <File aria-hidden="true" /> : <Command aria-hidden="true" />}
          <span id="ide-palette-title">
            {workspace.palette.mode === 'files' ? 'Quick Open' : 'Command Palette'}
          </span>
          <button type="button" onClick={workspace.closePalette} aria-label="Close palette">
            <X aria-hidden="true" />
          </button>
        </header>
        <label className={styles.paletteSearch}>
          <Search aria-hidden="true" />
          <span className="sr-only">Search files or commands</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setSelectedIndex(0)
            }}
            placeholder={workspace.palette.mode === 'files' ? 'Type a file name…' : 'Type a command…'}
            aria-controls="ide-palette-results"
            aria-activedescendant={filtered[selectedIndex] ? `ide-command-${filtered[selectedIndex].id}` : undefined}
          />
        </label>
        <div id="ide-palette-results" role="listbox" className={styles.paletteResults}>
          {filtered.length ? filtered.map((entry, index) => (
            <button
              key={entry.id}
              id={`ide-command-${entry.id}`}
              type="button"
              role="option"
              aria-selected={index === selectedIndex}
              className={index === selectedIndex ? styles.paletteSelected : ''}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => choose(entry)}
            >
              <span>{entry.file ? <IdeFileIcon file={entry.file} className={styles.paletteFileIcon} /> : <Command aria-hidden="true" />}</span>
              <span className={styles.paletteLabel}>
                <strong>{entry.label}</strong>
                {entry.detail && <small>{entry.detail}</small>}
              </span>
              <ArrowRight aria-hidden="true" />
            </button>
          )) : (
            <p className={styles.emptyResults}>No matching {workspace.palette.mode === 'files' ? 'files' : 'commands'}.</p>
          )}
        </div>
        <footer><span>↑↓ Navigate</span><span>Enter Select</span><span>Esc Close</span></footer>
      </section>
    </div>
  )
}
