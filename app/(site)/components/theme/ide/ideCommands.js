import { IDE_FILES, IDE_SECTION_FILES, getIdeFile } from './ideFiles'

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
    return { lines: ['src/  README.md  package.json'] }
  }
  if (normalized === 'tree') {
    const sourceNames = IDE_FILES.filter((file) => file.path.startsWith('src/')).map((file) => file.name)
    return {
      lines: [
        'portfolio/',
        '├── src/',
        ...sourceNames.map((name, index) => `${index === sourceNames.length - 1 ? '│   └──' : '│   ├──'} ${name}`),
        '├── README.md',
        '└── package.json',
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
    window.open('/Ilija_Chrchev_CV.pdf', '_blank', 'noopener,noreferrer')
    return { lines: ['Opened the public CV in a new tab.'] }
  }

  return {
    lines: [`command not found: ${raw}`, 'Type `help` for available commands.'],
  }
}
