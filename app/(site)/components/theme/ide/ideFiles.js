export const IDE_FILES = [
  {
    id: 'home',
    name: 'home.tsx',
    path: 'src/home.tsx',
    sectionId: 'home',
    language: 'typescriptreact',
    languageLabel: 'TypeScript React',
    label: 'Home',
    lineRange: [1, 42],
    personality: 'entry',
    badge: 'TSX',
    accent: 'function',
    breadcrumbSymbol: 'Home',
  },
  {
    id: 'about',
    name: 'about.md',
    path: 'src/about.md',
    sectionId: 'about',
    language: 'markdown',
    languageLabel: 'Markdown',
    label: 'About',
    lineRange: [43, 98],
    personality: 'markdown',
    badge: 'MD',
    accent: 'keyword',
    breadcrumbSymbol: 'About',
  },
  {
    id: 'community',
    name: 'community.ts',
    path: 'src/community.ts',
    sectionId: 'service',
    language: 'typescript',
    languageLabel: 'TypeScript',
    label: 'Community',
    lineRange: [99, 164],
    personality: 'collection',
    badge: 'TS',
    accent: 'string',
    breadcrumbSymbol: 'communityRoles',
  },
  {
    id: 'projects',
    name: 'projects.tsx',
    path: 'src/projects.tsx',
    sectionId: 'work',
    language: 'typescriptreact',
    languageLabel: 'TypeScript React',
    label: 'Projects',
    lineRange: [165, 248],
    personality: 'modules',
    badge: 'TSX',
    accent: 'function',
    breadcrumbSymbol: 'projects',
  },
  {
    id: 'endorsements',
    name: 'endorsements.log',
    path: 'src/endorsements.log',
    sectionId: 'endorsements-home',
    language: 'log',
    languageLabel: 'Log',
    label: 'Endorsements',
    lineRange: [249, 320],
    personality: 'log',
    badge: 'LOG',
    accent: 'number',
    breadcrumbSymbol: 'trusted_records',
  },
  {
    id: 'contact',
    name: 'contact.http',
    path: 'src/contact.http',
    sectionId: 'contact',
    language: 'http',
    languageLabel: 'HTTP',
    label: 'Contact',
    lineRange: [321, 380],
    personality: 'request',
    badge: 'HTTP',
    accent: 'error',
    breadcrumbSymbol: 'POST /contact',
  },
  {
    id: 'readme',
    name: 'README.md',
    path: 'README.md',
    sectionId: null,
    language: 'markdown',
    languageLabel: 'Markdown',
    label: 'Workspace README',
    lineRange: [1, 18],
    personality: 'readme',
    badge: 'MD',
    accent: 'keyword',
    breadcrumbSymbol: 'shortcuts',
    content: [
      '# portfolio',
      '',
      'Interactive developer workspace for the portfolio.',
      '',
      '## shortcuts',
      '',
      '- Ctrl/Cmd + P — Quick Open',
      '- Ctrl/Cmd + Shift + P — Command Palette',
      '- Ctrl/Cmd + B — Toggle Explorer',
      '- Ctrl + ` — Toggle Terminal',
    ],
  },
  {
    id: 'package',
    name: 'package.json',
    path: 'package.json',
    sectionId: null,
    language: 'json',
    languageLabel: 'JSON',
    label: 'Workspace Package',
    lineRange: [1, 12],
    personality: 'metadata',
    badge: 'JSON',
    accent: 'number',
    breadcrumbSymbol: 'scripts',
    content: [
      '{',
      '  "name": "portfolio",',
      '  "private": true,',
      '  "scripts": {',
      '    "dev": "next dev --turbopack",',
      '    "build": "next build --turbopack",',
      '    "lint": "eslint"',
      '  }',
      '}',
    ],
  },
]

export const IDE_SECTION_FILES = IDE_FILES.filter((file) => file.sectionId)
export const IDE_ROOT_FILES = IDE_FILES.filter((file) => !file.path.includes('/'))
export const IDE_SOURCE_FILES = IDE_FILES.filter((file) => file.path.startsWith('src/'))

export function getIdeFile(value) {
  if (!value) return null
  const normalized = String(value).trim().toLowerCase().replace(/^\.\//, '')
  return IDE_FILES.find((file) =>
    [file.id, file.name, file.path, file.label].some(
      (candidate) => candidate.toLowerCase() === normalized
    )
  ) || null
}

export function getIdeFileBySection(sectionId) {
  return IDE_SECTION_FILES.find((file) => file.sectionId === sectionId) || null
}

export function getVirtualLine(file, progress = 0) {
  const [start, end] = file.lineRange
  return Math.round(start + Math.max(0, Math.min(1, progress)) * (end - start))
}
