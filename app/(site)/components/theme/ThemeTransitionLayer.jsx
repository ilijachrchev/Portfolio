'use client'

import { useTheme } from '../ThemeProvider'
import SpiderTransition from './spider/SpiderTransition'

export default function ThemeTransitionLayer() {
  const { transition, commitPendingTheme, finishThemeTransition } = useTheme()

  if (!transition) return null

  return (
    <SpiderTransition
      direction={transition.to === 'spiderman' ? 'enter' : 'exit'}
      onCovered={commitPendingTheme}
      onComplete={finishThemeTransition}
    />
  )
}
