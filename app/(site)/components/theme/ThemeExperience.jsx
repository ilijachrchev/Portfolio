'use client'

import dynamic from 'next/dynamic'
import { useTheme } from '../ThemeProvider'

const SpiderExperience = dynamic(() => import('./spider/SpiderExperience'), {
  ssr: false,
})

const IdeExperience = dynamic(() => import('./ide/IdeExperience'), {
  ssr: false,
})

const Windows98Experience = dynamic(() => import('./win98/Windows98Experience'), {
  ssr: false,
})

const GithubExperience = dynamic(() => import('./github/GithubExperience'), {
  ssr: false,
})

const MissionExperience = dynamic(() => import('./mission/MissionExperience'), {
  ssr: false,
})

export default function ThemeExperience() {
  const { themeDefinition, isHydrated } = useTheme()

  if (!isHydrated) return null

  if (themeDefinition.experience === 'spider') return <SpiderExperience />
  if (themeDefinition.experience === 'ide') return <IdeExperience />
  if (themeDefinition.experience === 'win98') return <Windows98Experience />
  if (themeDefinition.experience === 'github') return <GithubExperience />
  if (themeDefinition.experience === 'mission') return <MissionExperience />

  return null
}
