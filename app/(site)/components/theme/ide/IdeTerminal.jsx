'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Terminal, X } from 'lucide-react'
import { useTheme } from '../../ThemeProvider'
import { executeTerminalCommand } from './ideCommands'
import { hasOpenAppModal, useIdeWorkspace } from './useIdeWorkspace'
import styles from './IdeExperience.module.css'

const INITIAL_OUTPUT = [
  { id: 0, lines: ['Portfolio terminal ready. Type `help` for available commands.'] },
]

export default function IdeTerminal() {
  const workspace = useIdeWorkspace()
  const { theme, themes, setTheme } = useTheme()
  const [value, setValue] = useState('')
  const [output, setOutput] = useState(INITIAL_OUTPUT)
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null)
  const outputRef = useRef(null)
  const idRef = useRef(1)

  useEffect(() => {
    if (!workspace.terminalOpen || hasOpenAppModal()) return
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [workspace.terminalOpen])

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight })
  }, [output])

  useEffect(() => {
    if (!workspace.terminalClearSignal) return
    setOutput([])
    setValue('')
    setHistoryIndex(-1)
  }, [workspace.terminalClearSignal])

  if (!workspace.terminalOpen) return null

  const runCommand = () => {
    const command = value.trim()
    if (!command) return
    const result = executeTerminalCommand(command, {
      navigateToFile: workspace.navigateToFile,
      theme,
      themes,
      setTheme,
    })

    setHistory((current) => [...current, command])
    setHistoryIndex(-1)
    setValue('')
    if (result.clear) {
      setOutput([])
      return
    }
    setOutput((current) => [
      ...current,
      { id: idRef.current++, command, lines: result.lines || [] },
    ])
  }

  const handleKeyDown = (event) => {
    event.stopPropagation()
    if (event.key === 'Enter') {
      event.preventDefault()
      runCommand()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!history.length) return
      const next = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(next)
      setValue(history[next])
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyIndex < 0) return
      const next = historyIndex + 1
      if (next >= history.length) {
        setHistoryIndex(-1)
        setValue('')
      } else {
        setHistoryIndex(next)
        setValue(history[next])
      }
    } else if (event.key === 'Escape') {
      event.preventDefault()
      workspace.setTerminalOpen(false)
    } else if (event.ctrlKey && event.key.toLowerCase() === 'l') {
      event.preventDefault()
      setOutput([])
    }
  }

  return (
    <section className={styles.terminal} aria-label="Workspace terminal">
      <header className={styles.panelHeader}>
        <span><Terminal aria-hidden="true" /> Terminal</span>
        <div>
          <button type="button" onClick={() => workspace.setTerminalOpen(false)} aria-label="Collapse terminal">
            <ChevronDown aria-hidden="true" />
          </button>
          <button type="button" onClick={() => workspace.setTerminalOpen(false)} aria-label="Close terminal">
            <X aria-hidden="true" />
          </button>
        </div>
      </header>
      <div ref={outputRef} className={styles.terminalOutput} aria-live="polite">
        {output.map((entry) => (
          <div key={entry.id} className={styles.terminalEntry}>
            {entry.command && (
              <div><span className={styles.prompt}>visitor@portfolio:~$</span> {entry.command}</div>
            )}
            {entry.lines.map((line, index) => <div key={`${entry.id}-${index}`}>{line || '\u00a0'}</div>)}
          </div>
        ))}
        <label className={styles.terminalPrompt}>
          <span className={styles.prompt}>visitor@portfolio:~$</span>
          <span className="sr-only">Terminal command</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="Terminal command"
          />
        </label>
      </div>
    </section>
  )
}
