export const THEMES = {
  light: {
    id: 'light',
    label: 'Light',
    shortLabel: 'Light',
    description: 'Warm editorial',
    colorScheme: 'light',
    experience: null,
    transition: 'color',
    heroMedia: true,
    icon: 'sun',
    preview: ['#f4efe6', '#a66a43', '#2c2722'],
  },
  dark: {
    id: 'dark',
    label: 'Dark',
    shortLabel: 'Dark',
    description: 'Quiet charcoal',
    colorScheme: 'dark',
    experience: null,
    transition: 'color',
    heroMedia: true,
    icon: 'moon',
    preview: ['#242220', '#d9c98f', '#f1ede5'],
  },
  spiderman: {
    id: 'spiderman',
    label: 'Spider-Man',
    shortLabel: 'Spider',
    description: 'Midnight web',
    colorScheme: 'dark',
    experience: 'spider',
    transition: 'web',
    heroMedia: false,
    icon: 'spider',
    preview: ['#07111f', '#d62b3e', '#3e8cff'],
  },
  ide: {
    id: 'ide',
    label: 'Code',
    shortLabel: 'Code',
    description: 'Developer Workspace',
    colorScheme: 'dark',
    experience: 'ide',
    transition: 'workspace',
    heroMedia: false,
    icon: 'code',
    preview: ['#0b0f14', '#5aa9ff', '#7fd88f'],
  },
  win98: {
    id: 'win98',
    label: 'Windows 98',
    shortLabel: 'Win98',
    description: 'Retro Desktop',
    colorScheme: 'light',
    experience: 'win98',
    transition: 'color',
    heroMedia: false,
    icon: 'monitor',
    preview: ['#008080', '#c0c0c0', '#000080'],
  },
}

export const THEME_IDS = Object.keys(THEMES)
export const DARK_THEME_IDS = Object.values(THEMES)
  .filter((theme) => theme.colorScheme === 'dark')
  .map((theme) => theme.id)
export const DEFAULT_THEME = 'light'

export function isThemeId(value) {
  return typeof value === 'string' && Object.hasOwn(THEMES, value)
}

export function getThemeDefinition(theme) {
  return THEMES[isThemeId(theme) ? theme : DEFAULT_THEME]
}

export function getThemeTransition(fromTheme, toTheme) {
  const transitions = [
    getThemeDefinition(fromTheme).transition,
    getThemeDefinition(toTheme).transition,
  ]

  if (transitions.includes('workspace')) return 'workspace'
  if (transitions.includes('web')) return 'web'
  return 'color'
}
