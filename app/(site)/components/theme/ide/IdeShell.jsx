'use client'

import { useLayoutEffect, useRef } from 'react'
import { motion, useTransform } from 'motion/react'
import {
  ChevronDown,
  ChevronRight,
  Code2,
  Files,
  Folder,
  FolderOpen,
  GitBranch,
  Menu,
  Palette,
  PanelBottom,
  Search,
  X,
} from 'lucide-react'
import { IDE_ROOT_FILES, IDE_SECTION_FILES, IDE_SOURCE_FILES } from './ideFiles'
import { useIdeWorkspace } from './useIdeWorkspace'
import styles from './IdeExperience.module.css'

function FileBadge({ file }) {
  return <span className={`${styles.fileBadge} ${styles[`accent_${file.accent}`]}`}>{file.badge}</span>
}

function ExplorerFile({ file, depth = 0 }) {
  const { activeFile, contactModified, navigateToFile, setExplorerOpen } = useIdeWorkspace()
  const selected = activeFile.id === file.id

  return (
    <button
      type="button"
      role="treeitem"
      aria-selected={selected}
      onClick={() => {
        navigateToFile(file.id)
        if (window.matchMedia('(max-width: 1359px)').matches) setExplorerOpen(false)
      }}
      className={`${styles.explorerFile} ${selected ? styles.selectedFile : ''}`}
      style={{ '--ide-tree-depth': depth }}
    >
      <FileBadge file={file} />
      <span>{file.name}</span>
      {file.id === 'contact' && contactModified && (
        <span className={styles.modifiedDot} aria-label="Modified">●</span>
      )}
    </button>
  )
}

function Explorer() {
  const {
    explorerOpen,
    setExplorerOpen,
    sourceOpen,
    setSourceOpen,
  } = useIdeWorkspace()
  const asideRef = useRef(null)
  const previousFocusRef = useRef(null)
  const isMobileDrawer = typeof window !== 'undefined' && window.matchMedia('(max-width: 1179px)').matches

  useLayoutEffect(() => {
    if (!window.matchMedia('(max-width: 1179px)').matches) return
    if (explorerOpen) {
      previousFocusRef.current = document.activeElement
      asideRef.current?.querySelector('button')?.focus()
    } else if (previousFocusRef.current instanceof HTMLElement) {
      previousFocusRef.current.focus()
      previousFocusRef.current = null
    }
  }, [explorerOpen])

  const trapFocus = (event) => {
    if (event.key !== 'Tab' || !window.matchMedia('(max-width: 1179px)').matches) return
    const focusable = Array.from(asideRef.current?.querySelectorAll('button:not(:disabled)') || [])
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

  return (
    <>
      <button
        type="button"
        className={`${styles.drawerBackdrop} ${explorerOpen ? styles.drawerBackdropOpen : ''}`}
        onClick={() => setExplorerOpen(false)}
        aria-label="Close Explorer"
        tabIndex={explorerOpen ? 0 : -1}
      />
      <aside
        ref={asideRef}
        className={`${styles.explorer} ${explorerOpen ? styles.explorerOpen : ''}`}
        role={isMobileDrawer ? 'dialog' : 'navigation'}
        aria-modal={isMobileDrawer ? 'true' : undefined}
        aria-label="Explorer"
        aria-hidden={!explorerOpen}
        onKeyDown={trapFocus}
      >
        <header className={styles.explorerHeader}>
          <span>Explorer</span>
          <button type="button" onClick={() => setExplorerOpen(false)} aria-label="Close Explorer">
            <X aria-hidden="true" />
          </button>
        </header>

        <div role="tree" aria-label="Portfolio files" className={styles.fileTree}>
          <div className={styles.folderRow} role="treeitem" aria-expanded="true">
            <ChevronDown aria-hidden="true" />
            <FolderOpen aria-hidden="true" />
            <span>PORTFOLIO</span>
          </div>
          <button
            type="button"
            className={styles.folderRow}
            role="treeitem"
            aria-expanded={sourceOpen}
            onClick={() => setSourceOpen((current) => !current)}
          >
            {sourceOpen ? <ChevronDown aria-hidden="true" /> : <ChevronRight aria-hidden="true" />}
            {sourceOpen ? <FolderOpen aria-hidden="true" /> : <Folder aria-hidden="true" />}
            <span>src</span>
          </button>
          {sourceOpen && (
            <div role="group">
              {IDE_SOURCE_FILES.map((file) => <ExplorerFile key={file.id} file={file} depth={2} />)}
            </div>
          )}
          {IDE_ROOT_FILES.map((file) => <ExplorerFile key={file.id} file={file} depth={1} />)}
        </div>

        <div className={styles.explorerHint}>Ctrl/Cmd + P to open a file</div>
      </aside>
    </>
  )
}

function Tabs() {
  const { activeFile, openFiles, contactModified, navigateToFile, closeFile } = useIdeWorkspace()

  return (
    <div className={styles.tabs} role="tablist" aria-label="Open portfolio files">
      {openFiles.map((file) => {
        const active = activeFile.id === file.id
        return (
          <div key={file.id} className={`${styles.tab} ${active ? styles.activeTab : ''}`}>
            <button
              type="button"
              role="tab"
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              onClick={() => navigateToFile(file.id)}
              className={styles.tabMain}
            >
              <FileBadge file={file} />
              <span>{file.name}</span>
              {file.id === 'contact' && contactModified && (
                <span className={styles.modifiedDot} aria-label="Modified">●</span>
              )}
            </button>
            <button
              type="button"
              className={styles.closeTab}
              onClick={() => closeFile(file.id)}
              aria-label={`Close ${file.name}`}
            >
              <X aria-hidden="true" />
            </button>
          </div>
        )
      })}
    </div>
  )
}

function Breadcrumbs() {
  const { activeFile } = useIdeWorkspace()
  const parts = ['portfolio', ...activeFile.path.split('/')]

  return (
    <div className={styles.breadcrumbs} aria-label="Breadcrumb">
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {index > 0 && <ChevronRight aria-hidden="true" />}
          {part}
        </span>
      ))}
      <span className={styles.breadcrumbSymbol}>
        <ChevronRight aria-hidden="true" />
        {activeFile.breadcrumbSymbol}
      </span>
    </div>
  )
}

function EditorGutter() {
  const { virtualLine, hasSections } = useIdeWorkspace()
  if (!hasSections) return null
  const lines = [-2, -1, 0, 1, 2].map((offset) => Math.max(1, virtualLine + offset))

  return (
    <div className={styles.gutter} aria-hidden="true">
      {lines.map((line, index) => (
        <div key={`${line}-${index}`} className={index === 2 ? styles.currentLine : ''}>
          <span>{index === 2 ? '›' : ''}</span>
          <span>{line}</span>
        </div>
      ))}
    </div>
  )
}

function Minimap() {
  const { documentProgress, hasSections } = useIdeWorkspace()
  const viewportY = useTransform(documentProgress, [0, 1], ['0%', '78%'])
  if (!hasSections) return null

  return (
    <div className={styles.minimap} aria-hidden="true">
      {IDE_SECTION_FILES.map((file, fileIndex) => {
        const lineCount = file.lineRange[1] - file.lineRange[0]
        const bars = 3 + (lineCount % 4)
        return (
          <div key={file.id} className={`${styles.minimapFile} ${styles[`accent_${file.accent}`]}`}>
            {Array.from({ length: bars }).map((_, index) => (
              <i key={index} style={{ width: `${38 + ((fileIndex * 17 + index * 23) % 55)}%` }} />
            ))}
          </div>
        )
      })}
      <motion.div className={styles.minimapViewport} style={{ top: viewportY }} />
    </div>
  )
}

function VirtualPreview() {
  const { activeFile, navigateToFile } = useIdeWorkspace()
  if (activeFile.sectionId || !activeFile.content) return null

  return (
    <section className={styles.virtualPreview} aria-label={`${activeFile.name} preview`}>
      <header>
        <FileBadge file={activeFile} />
        <span>{activeFile.path}</span>
        <button type="button" onClick={() => navigateToFile('home')} aria-label="Close file preview">
          <X aria-hidden="true" />
        </button>
      </header>
      <pre>{activeFile.content.map((line, index) => `${String(index + 1).padStart(2, ' ')}  ${line}`).join('\n')}</pre>
    </section>
  )
}

function StatusBar() {
  const { activeFile, virtualLine, explorerOpen, terminalOpen } = useIdeWorkspace()
  return (
    <footer className={styles.statusBar} aria-label="Workspace status">
      <span><GitBranch aria-hidden="true" /> portfolio</span>
      <span className={styles.statusState}>{explorerOpen ? 'Explorer' : 'Focus'} · {terminalOpen ? 'Terminal' : 'Editor'}</span>
      <span className={styles.statusSpacer} />
      <span>Ln {virtualLine}, Col 1</span>
      <span className={styles.encoding}>UTF-8</span>
      <span>{activeFile.languageLabel}</span>
    </footer>
  )
}

export default function IdeShell() {
  const {
    activeFile,
    explorerOpen,
    setExplorerOpen,
    openPalette,
    toggleTerminal,
  } = useIdeWorkspace()

  return (
    <div className={styles.shell}>
      <header className={styles.titleBar}>
        <button
          type="button"
          className={styles.mobileMenu}
          onClick={() => setExplorerOpen(!explorerOpen)}
          aria-label={explorerOpen ? 'Close Explorer' : 'Open Explorer'}
          aria-expanded={explorerOpen}
        >
          <Menu aria-hidden="true" />
        </button>
        <span className={styles.workspaceTitle}>
          <Code2 aria-hidden="true" />
          <span>portfolio</span>
          <small>Developer Workspace</small>
        </span>
        <button
          type="button"
          className={styles.commandCenter}
          onClick={() => openPalette('commands')}
          aria-label="Open Command Palette"
        >
          <Search aria-hidden="true" />
          <span>Search files or run a command…</span>
          <kbd>Ctrl ⇧ P</kbd>
        </button>
        <span className={styles.mobileFile}>{activeFile.name}</span>
        <button
          type="button"
          className={styles.titleAction}
          onClick={() => openPalette('commands', 'Change Theme')}
          aria-label="Change theme"
          title="Appearance"
        >
          <Palette aria-hidden="true" />
        </button>
      </header>

      <nav className={styles.activityBar} aria-label="Workspace tools">
        <button
          type="button"
          className={explorerOpen ? styles.activityActive : ''}
          onClick={() => setExplorerOpen(!explorerOpen)}
          aria-label="Toggle Explorer"
          aria-pressed={explorerOpen}
          title="Explorer · Ctrl/Cmd + B"
        >
          <Files aria-hidden="true" />
        </button>
        <button type="button" onClick={() => openPalette('files')} aria-label="Quick Open" title="Quick Open · Ctrl/Cmd + P">
          <Search aria-hidden="true" />
        </button>
        <button type="button" onClick={toggleTerminal} aria-label="Toggle Terminal" title="Terminal · Ctrl + `">
          <PanelBottom aria-hidden="true" />
        </button>
        <button type="button" onClick={() => openPalette('commands', 'Change Theme')} aria-label="Change theme" title="Appearance">
          <Palette aria-hidden="true" />
        </button>
      </nav>

      <Explorer />
      <div className={styles.editorTop}>
        <Tabs />
        <Breadcrumbs />
      </div>
      <EditorGutter />
      <Minimap />
      <VirtualPreview />
      <StatusBar />
    </div>
  )
}
