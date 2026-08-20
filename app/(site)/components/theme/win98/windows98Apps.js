const ICON_ROOT = '/themes/win98/icons'

export const WINDOWS98_APPS = [
  {
    id: 'computer',
    label: 'My Computer',
    sectionId: 'home',
    icon: `${ICON_ROOT}/computer.svg`,
  },
  {
    id: 'documents',
    label: 'My Documents',
    sectionId: 'about',
    icon: `${ICON_ROOT}/folder.svg`,
  },
  {
    id: 'community',
    label: 'Community',
    sectionId: 'service',
    icon: `${ICON_ROOT}/folder.svg`,
  },
  {
    id: 'projects',
    label: 'Projects',
    sectionId: 'work',
    icon: `${ICON_ROOT}/projects.svg`,
  },
  {
    id: 'guestbook',
    label: 'Guestbook',
    sectionId: 'endorsements-home',
    icon: `${ICON_ROOT}/folder.svg`,
  },
  {
    id: 'contact',
    label: 'Contact',
    sectionId: 'contact',
    icon: `${ICON_ROOT}/contact.svg`,
  },
]

export const WINDOWS98_UTILITIES = [
  {
    id: 'network',
    label: 'Network Neighborhood',
    icon: `${ICON_ROOT}/network.svg`,
  },
  {
    id: 'recycle',
    label: 'Recycle Bin',
    icon: `${ICON_ROOT}/recycle.svg`,
  },
]

export const WINDOWS98_SHORTCUTS = [...WINDOWS98_APPS, ...WINDOWS98_UTILITIES]
