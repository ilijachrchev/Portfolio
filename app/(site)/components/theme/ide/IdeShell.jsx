'use client'

import { useLayoutEffect, useRef } from 'react'
import { motion, useTransform } from 'motion/react'
import {
  ChevronDown,
  ChevronRight,
  Files,
  GitBranch,
  Menu,
  PanelBottom,
  Search,
  Settings,
  X,
} from 'lucide-react'
import { IDE_ROOT_FILES, IDE_SECTION_FILES, IDE_SOURCE_FILES } from './ideFiles'
import { IdeFileIcon, IdeFolderIcon } from './IdeIcons'
import IdeMenuBar from './IdeMenuBar'
import { useIdeWorkspace } from './useIdeWorkspace'
import styles from './IdeExperience.module.css'

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
        if (window.matchMedia('(max-width: 1179px)').matches) setExplorerOpen(false)
      }}
      className={`${styles.explorerFile} ${selected ? styles.selectedFile : ''}`}
      style={{ '--ide-tree-depth': depth }}
    >
      <IdeFileIcon file={file} className={styles.fileIcon} />
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
    rootOpen,
    setRootOpen,
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
          <button
            type="button"
            className={styles.folderRow}
            role="treeitem"
            aria-expanded={rootOpen}
            onClick={() => setRootOpen((current) => !current)}
            style={{ '--ide-tree-depth': 0 }}
          >
            {rootOpen ? <ChevronDown aria-hidden="true" /> : <ChevronRight aria-hidden="true" />}
            <IdeFolderIcon kind="root" open={rootOpen} className={styles.folderIcon} />
            <span>PORTFOLIO</span>
          </button>
          {rootOpen && (
            <>
              <button
                type="button"
                className={styles.folderRow}
                role="treeitem"
                aria-expanded={sourceOpen}
                onClick={() => setSourceOpen((current) => !current)}
                style={{ '--ide-tree-depth': 1 }}
              >
                {sourceOpen ? <ChevronDown aria-hidden="true" /> : <ChevronRight aria-hidden="true" />}
                <IdeFolderIcon kind="src" open={sourceOpen} className={styles.folderIcon} />
                <span>src</span>
              </button>
              {sourceOpen && (
                <div role="group">
                  {IDE_SOURCE_FILES.map((file) => <ExplorerFile key={file.id} file={file} depth={2} />)}
                </div>
              )}
              {IDE_ROOT_FILES.map((file) => <ExplorerFile key={file.id} file={file} depth={1} />)}
            </>
          )}
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
              <IdeFileIcon file={file} className={styles.fileIcon} />
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
          {index === parts.length - 1 && <IdeFileIcon file={activeFile} className={styles.breadcrumbIcon} />}
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
  const { documentProgress, hasSections, minimapVisible } = useIdeWorkspace()
  const viewportY = useTransform(documentProgress, [0, 1], ['0%', '78%'])
  if (!hasSections || !minimapVisible) return null

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
        <IdeFileIcon file={activeFile} className={styles.fileIcon} />
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
    setTerminalOpen,
  } = useIdeWorkspace()

  return (
    <div className={styles.shell}>
      <header className={styles.titleBar}>
        <span className={styles.trafficLights} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <button
          type="button"
          className={styles.mobileMenu}
          onClick={() => setExplorerOpen(!explorerOpen)}
          aria-label={explorerOpen ? 'Close Explorer' : 'Open Explorer'}
          aria-expanded={explorerOpen}
        >
          <Menu aria-hidden="true" />
        </button>
        <span className={styles.mobileBrand}>Code</span>
        <button
          type="button"
          className={styles.commandCenter}
          onClick={() => openPalette('files')}
          aria-label="Open Quick Open"
        >
          <Search aria-hidden="true" />
          <span>portfolio — Ilija Chrchev</span>
          <kbd>Ctrl P</kbd>
        </button>
        <span className={styles.windowFile}>{activeFile.name}</span>
        <span className={styles.mobileFile}>{activeFile.name}</span>
        <button
          type="button"
          className={styles.titleAction}
          onClick={() => openPalette('commands', 'Change Theme')}
          aria-label="Change theme"
          title="Appearance"
        >
          <Settings aria-hidden="true" />
        </button>
      </header>

      <IdeMenuBar />

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
        <button type="button" onClick={() => setTerminalOpen(true)} aria-label="Open source control terminal" title="Source Control · git status in Terminal">
          <GitBranch aria-hidden="true" />
        </button>
        <button type="button" onClick={toggleTerminal} aria-label="Toggle Terminal" title="Terminal · Ctrl + `">
          <PanelBottom aria-hidden="true" />
        </button>
        <button className={styles.activitySettings} type="button" onClick={() => openPalette('commands', 'Change Theme')} aria-label="Change theme" title="Appearance">
          <Settings aria-hidden="true" />
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
