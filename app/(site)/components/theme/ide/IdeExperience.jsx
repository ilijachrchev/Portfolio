'use client'

import IdeCommandPalette from './IdeCommandPalette'
import IdeShell from './IdeShell'
import IdeTerminal from './IdeTerminal'
import { IdeWorkspaceProvider, useIdeWorkspace } from './useIdeWorkspace'

function WorkspaceSurfaces() {
  const { palette } = useIdeWorkspace()

  return (
    <>
      <IdeShell />
      <IdeTerminal />
      {palette.open && <IdeCommandPalette key={`${palette.mode}-${palette.query}`} />}
    </>
  )
}

export default function IdeExperience() {
  return (
    <IdeWorkspaceProvider>
      <WorkspaceSurfaces />
    </IdeWorkspaceProvider>
  )
}
