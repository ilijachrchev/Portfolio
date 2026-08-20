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
    icon: '/themes/ide/icons/files/react-ts.svg',
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
    icon: '/themes/ide/icons/files/markdown.svg',
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
    icon: '/themes/ide/icons/files/typescript.svg',
    accent: 'string',
    breadcrumbSymbol: 'communityRoles',
  },
  {
    id: 'projects',
    name: 'projects.js',
    path: 'src/projects.js',
    sectionId: 'work',
    language: 'javascript',
    languageLabel: 'JavaScript',
    label: 'Projects',
    lineRange: [165, 248],
    personality: 'modules',
    icon: '/themes/ide/icons/files/javascript.svg',
    accent: 'function',
    breadcrumbSymbol: 'projects',
  },
  {
    id: 'endorsements',
    name: 'endorsements.json',
    path: 'src/endorsements.json',
    sectionId: 'endorsements-home',
    language: 'json',
    languageLabel: 'JSON',
    label: 'Endorsements',
    lineRange: [249, 320],
    personality: 'data',
    icon: '/themes/ide/icons/files/json.svg',
    accent: 'number',
    breadcrumbSymbol: 'endorsements',
  },
  {
    id: 'contact',
    name: 'contact.html',
    path: 'src/contact.html',
    sectionId: 'contact',
    language: 'html',
    languageLabel: 'HTML',
    label: 'Contact',
    lineRange: [321, 380],
    personality: 'markup',
    icon: '/themes/ide/icons/files/html.svg',
    accent: 'error',
    breadcrumbSymbol: 'form',
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
    icon: '/themes/ide/icons/files/markdown.svg',
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
    icon: '/themes/ide/icons/files/json.svg',
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
  {
    id: 'resume',
    name: 'Ilija_Chrchev_Resume.pdf',
    path: 'Ilija_Chrchev_Resume.pdf',
    sectionId: null,
    language: 'pdf',
    languageLabel: 'PDF',
    label: 'Resume',
    lineRange: [1, 1],
    personality: 'document',
    icon: '/themes/ide/icons/files/pdf.svg',
    accent: 'error',
    breadcrumbSymbol: 'document',
    href: '/Ilija_Chrchev_CV.pdf',
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
