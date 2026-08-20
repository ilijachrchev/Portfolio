export const THEMES = {
  light: {
    id: 'light',
    label: 'Light',
    shortLabel: 'Light',
    description: 'Warm editorial',
    colorScheme: 'light',
    experience: null,
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
    icon: 'spider',
    preview: ['#07111f', '#d62b3e', '#3e8cff'],
  },
}

export const THEME_IDS = Object.keys(THEMES)
export const DEFAULT_THEME = 'light'

export function isThemeId(value) {
  return typeof value === 'string' && Object.hasOwn(THEMES, value)
}

export function getThemeDefinition(theme) {
  return THEMES[isThemeId(theme) ? theme : DEFAULT_THEME]
}
