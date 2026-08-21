'use client'

import MissionShell from './MissionShell'
import { MissionControlProvider } from './useMissionControl'

export default function MissionExperience() {
  return (
    <MissionControlProvider>
      <MissionShell />
    </MissionControlProvider>
  )
}
