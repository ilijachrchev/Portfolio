import { IDE_ROOT_FILES, IDE_SECTION_FILES, IDE_SOURCE_FILES, getIdeFile } from './ideFiles'

const THEME_ALIASES = {
  code: 'ide',
  spider: 'spiderman',
  'spider-man': 'spiderman',
}

export function createPaletteCommands({ navigateToFile, setExplorerOpen, toggleTerminal, setTheme, themes }) {
  const navigation = IDE_SECTION_FILES.map((file) => ({
    id: `goto-${file.id}`,
    label: `Go to ${file.label}`,
    detail: file.path,
    keywords: `navigate open ${file.name} ${file.path}`,
    run: () => navigateToFile(file.id),
  }))

  const appearance = Object.values(themes).map((theme) => ({
    id: `theme-${theme.id}`,
    label: `Change Theme: ${theme.label}`,
    detail: theme.description,
    keywords: `appearance color ${theme.id} ${theme.shortLabel}`,
    run: () => setTheme(theme.id),
  }))

  return [
    ...navigation,
    {
      id: 'toggle-explorer',
      label: 'Toggle Explorer',
      detail: 'Ctrl/Cmd + B',
      keywords: 'sidebar files',
      run: () => setExplorerOpen((current) => !current),
    },
    {
      id: 'toggle-terminal',
      label: 'Toggle Terminal',
      detail: 'Ctrl + `',
      keywords: 'panel command line shell',
      run: toggleTerminal,
    },
    ...appearance,
  ]
}

export function createApplicationMenus(context) {
  const goItems = IDE_SECTION_FILES.map((file) => ({
    id: `go-${file.id}`,
    label: file.label,
    run: () => context.navigateToFile(file.id),
  }))

  return [
    {
      id: 'file',
      label: 'File',
      items: [
        { id: 'quick-open', label: 'Quick Open…', shortcut: 'Ctrl/Cmd+P', run: () => context.openPalette('files') },
        { id: 'command-palette', label: 'Command Palette…', shortcut: 'Ctrl/Cmd+Shift+P', run: () => context.openPalette('commands') },
        { separator: true },
        { id: 'open-home', label: 'Open Home', run: () => context.navigateToFile('home') },
        { id: 'open-projects', label: 'Open Projects', run: () => context.navigateToFile('projects') },
        { id: 'open-contact', label: 'Open Contact', run: () => context.navigateToFile('contact') },
        { separator: true },
        { id: 'close-editor', label: 'Close Active Editor', run: () => context.closeFile(context.activeFile.id) },
      ],
    },
    {
      id: 'edit',
      label: 'Edit',
      items: [
        { id: 'copy-email', label: 'Copy Email', run: context.copyEmail },
      ],
    },
    {
      id: 'view',
      label: 'View',
      items: [
        { id: 'view-palette', label: 'Command Palette…', shortcut: 'Ctrl/Cmd+Shift+P', run: () => context.openPalette('commands') },
        { id: 'view-explorer', label: 'Toggle Explorer', shortcut: 'Ctrl/Cmd+B', run: () => context.setExplorerOpen((current) => !current) },
        { id: 'view-terminal', label: 'Toggle Terminal', shortcut: 'Ctrl+`', run: context.toggleTerminal },
        { separator: true },
        { id: 'view-minimap', label: context.minimapVisible ? 'Hide Minimap' : 'Show Minimap', run: () => context.setMinimapVisible((current) => !current) },
        { id: 'view-focus', label: context.focusMode ? 'Exit Focus Mode' : 'Focus Mode', run: context.toggleFocusMode },
        { id: 'view-reset', label: 'Reset Workspace Layout', run: context.resetWorkspaceLayout },
        { separator: true },
        { id: 'view-theme', label: 'Change Theme…', run: () => context.openPalette('commands', 'Change Theme') },
      ],
    },
    { id: 'go', label: 'Go', items: goItems },
    {
      id: 'run',
      label: 'Run',
      items: [
        { id: 'run-portfolio', label: 'Run Portfolio', run: () => context.navigateToFile('home') },
        { id: 'run-projects', label: 'Open Projects', run: () => context.navigateToFile('projects') },
        { id: 'run-contact', label: 'Open Contact', run: () => context.navigateToFile('contact') },
      ],
    },
    {
      id: 'terminal',
      label: 'Terminal',
      items: [
        { id: 'terminal-toggle', label: 'Toggle Terminal', shortcut: 'Ctrl+`', run: context.toggleTerminal },
        { id: 'terminal-focus', label: 'Focus Terminal', run: () => context.setTerminalOpen(true) },
        { id: 'terminal-clear', label: 'Clear Terminal', run: context.clearTerminal },
      ],
    },
    {
      id: 'help',
      label: 'Help',
      items: [
        { id: 'help-readme', label: 'README.md', run: () => context.navigateToFile('readme') },
        { id: 'help-shortcuts', label: 'Keyboard Shortcuts', run: () => context.navigateToFile('readme') },
        { id: 'help-about', label: 'About This Portfolio', run: () => context.navigateToFile('about') },
        { id: 'help-contact', label: 'Contact', run: () => context.navigateToFile('contact') },
      ],
    },
  ]
}

export function executeTerminalCommand(rawCommand, context) {
  const raw = rawCommand.trim()
  const [command = '', ...args] = raw.split(/\s+/)
  const normalized = command.toLowerCase()
  const argument = args.join(' ').trim()

  if (!normalized) return { lines: [] }
  if (normalized === 'clear') return { clear: true, lines: [] }

  if (normalized === 'help') {
    return {
      lines: [
        'help · whoami · pwd · ls · tree · open <file>',
        'home · about · community · projects · endorsements · contact',
        'theme [light|dark|spiderman|ide] · git status · resume · clear',
      ],
    }
  }

  if (normalized === 'whoami') {
    return { lines: ['Ilija Chrchev — Computer Science student and software builder.'] }
  }
  if (normalized === 'pwd') return { lines: ['/portfolio'] }
  if (normalized === 'ls') {
    return { lines: [`src/  ${IDE_ROOT_FILES.map((file) => file.name).join('  ')}`] }
  }
  if (normalized === 'tree') {
    const rootNames = IDE_ROOT_FILES.map((file) => file.name)
    return {
      lines: [
        'portfolio/',
        '├── src/',
        ...IDE_SOURCE_FILES.map((file, index) => `${index === IDE_SOURCE_FILES.length - 1 ? '│   └──' : '│   ├──'} ${file.name}`),
        ...rootNames.map((name, index) => `${index === rootNames.length - 1 ? '└──' : '├──'} ${name}`),
      ],
    }
  }

  if (normalized === 'open') {
    if (!argument) return { lines: ['Usage: open <file>'] }
    const file = getIdeFile(argument)
    if (!file) return { lines: [`File not found: ${argument}`] }
    context.navigateToFile(file.id)
    return { lines: [`Opened ${file.path}`] }
  }

  const navigationFile = IDE_SECTION_FILES.find((file) => file.id === normalized)
  if (navigationFile) {
    context.navigateToFile(navigationFile.id)
    return { lines: [`Opened ${navigationFile.path}`] }
  }

  if (normalized === 'theme') {
    if (!argument) {
      return {
        lines: Object.values(context.themes).map(
          (theme) => `${theme.id}${theme.id === context.theme ? ' *' : ''}`
        ),
      }
    }
    const requested = (THEME_ALIASES[argument.toLowerCase()] || argument).toLowerCase()
    if (!context.themes[requested]) {
      return { lines: [`Unknown theme: ${argument}`, 'Use `theme` to list available themes.'] }
    }
    context.setTheme(requested)
    return { lines: [`Switching theme to ${context.themes[requested].label}…`] }
  }

  if (normalized === 'git' && args[0]?.toLowerCase() === 'status') {
    return {
      lines: [
        'Virtual portfolio workspace',
        'On branch portfolio',
        'working tree clean',
      ],
    }
  }

  if (normalized === 'resume') {
    const resume = getIdeFile('resume')
    window.open(resume.href, '_blank', 'noopener,noreferrer')
    return { lines: ['Opened the public CV in a new tab.'] }
  }

  return {
    lines: [`command not found: ${raw}`, 'Type `help` for available commands.'],
  }
}
