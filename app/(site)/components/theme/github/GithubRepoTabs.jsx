'use client'

import {
  BookOpen,
  CircleDot,
  GitPullRequest,
  MessageSquare,
  PanelsTopLeft,
} from 'lucide-react'

const TAB_ICONS = {
  code: BookOpen,
  discussions: MessageSquare,
  projects: PanelsTopLeft,
  'pull-requests': GitPullRequest,
  issues: CircleDot,
}

export function GithubTabIcon({ tabId }) {
  const Icon = TAB_ICONS[tabId] || BookOpen
  return <Icon aria-hidden="true" />
}
