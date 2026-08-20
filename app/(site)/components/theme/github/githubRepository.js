export const GITHUB_SECTIONS = [
  {
    id: 'overview',
    label: 'Overview',
    sectionId: 'home',
    path: 'portfolio/',
    kind: 'repository',
  },
  {
    id: 'readme',
    label: 'README.md',
    sectionId: 'about',
    path: 'README.md',
    kind: 'readme',
  },
  {
    id: 'community',
    label: 'community',
    sectionId: 'service',
    path: 'community/',
    kind: 'directory',
  },
  {
    id: 'projects',
    label: 'projects',
    sectionId: 'work',
    path: 'projects/',
    kind: 'directory',
  },
  {
    id: 'reviews',
    label: 'reviews.json',
    sectionId: 'endorsements-home',
    path: 'reviews.json',
    kind: 'json',
  },
  {
    id: 'issues',
    label: 'contact.yml',
    sectionId: 'contact',
    path: '.github/ISSUE_TEMPLATE/contact.yml',
    kind: 'issue',
  },
]

export const GITHUB_TABS = [
  {
    id: 'code',
    label: 'Code',
    sectionId: 'about',
    sectionIds: ['home', 'about'],
  },
  {
    id: 'discussions',
    label: 'Discussions',
    sectionId: 'service',
    sectionIds: ['service'],
  },
  {
    id: 'projects',
    label: 'Projects',
    sectionId: 'work',
    sectionIds: ['work'],
  },
  {
    id: 'pull-requests',
    label: 'Pull requests',
    sectionId: 'endorsements-home',
    sectionIds: ['endorsements-home'],
  },
  {
    id: 'issues',
    label: 'Issues',
    sectionId: 'contact',
    sectionIds: ['contact'],
  },
]

export function getGithubSection(value) {
  return GITHUB_SECTIONS.find((section) => (
    section.id === value || section.sectionId === value || section.path === value
  )) || null
}

export function getGithubTab(sectionId) {
  return GITHUB_TABS.find((tab) => tab.sectionIds.includes(sectionId)) || GITHUB_TABS[0]
}

export function isGithubEditableTarget(target) {
  return target instanceof HTMLElement && Boolean(
    target.closest('input, textarea, select, [contenteditable="true"], [role="textbox"]')
  )
}

export const GITHUB_ACTIVITY = [
  {
    label: 'Leading IAESTE LC Koper',
    detail: 'Community leadership and volunteer coordination',
    period: '2025 — present',
  },
  {
    label: 'Building full-stack products',
    detail: 'Next.js, React, .NET, Python, and PostgreSQL',
    period: 'active focus',
  },
  {
    label: 'Supporting student communities',
    detail: 'Student Council, tutoring, GDG, and MSOS',
    period: 'ongoing',
  },
]
