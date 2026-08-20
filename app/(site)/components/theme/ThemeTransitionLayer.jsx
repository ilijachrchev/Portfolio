'use client'

import { useTheme } from '../ThemeProvider'
import SpiderTransition from './spider/SpiderTransition'
import IdeTransition from './ide/IdeTransition'

export default function ThemeTransitionLayer() {
  const { transition, commitPendingTheme, finishThemeTransition } = useTheme()

  if (!transition) return null

  if (transition.kind === 'workspace') {
    return (
      <IdeTransition
        direction={transition.to === 'ide' ? 'enter' : 'exit'}
        onCovered={commitPendingTheme}
        onComplete={finishThemeTransition}
      />
    )
  }

  return (
    <SpiderTransition
      direction={transition.to === 'spiderman' ? 'enter' : 'exit'}
      onCovered={commitPendingTheme}
      onComplete={finishThemeTransition}
    />
  )
}
