'use client'

import dynamic from 'next/dynamic'
import { useTheme } from '../ThemeProvider'

const SpiderExperience = dynamic(() => import('./spider/SpiderExperience'), {
  ssr: false,
})

const IdeExperience = dynamic(() => import('./ide/IdeExperience'), {
  ssr: false,
})

export default function ThemeExperience() {
  const { themeDefinition, isHydrated } = useTheme()

  if (!isHydrated) return null

  if (themeDefinition.experience === 'spider') return <SpiderExperience />
  if (themeDefinition.experience === 'ide') return <IdeExperience />

  return null
}
