'use client'

import dynamic from 'next/dynamic'
import { useTheme } from '../ThemeProvider'

const SpiderExperience = dynamic(() => import('./spider/SpiderExperience'), {
  ssr: false,
})

export default function ThemeExperience() {
  const { themeDefinition, isHydrated } = useTheme()

  if (!isHydrated || themeDefinition.experience !== 'spider') return null

  return <SpiderExperience />
}
