'use client'

import GithubShell from './GithubShell'
import { GithubRepositoryProvider } from './useGithubRepositoryView'

export default function GithubExperience() {
  return (
    <GithubRepositoryProvider>
      <GithubShell />
    </GithubRepositoryProvider>
  )
}
