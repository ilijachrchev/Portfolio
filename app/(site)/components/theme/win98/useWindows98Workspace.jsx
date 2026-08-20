'use client'

import { createContext, useContext, useMemo, useState } from 'react'

const Windows98WorkspaceContext = createContext(null)

export function Windows98WorkspaceProvider({ children }) {
  const [selectedShortcut, setSelectedShortcut] = useState('computer')
  const [activeAppId, setActiveAppId] = useState('computer')

  const value = useMemo(() => ({
    selectedShortcut,
    setSelectedShortcut,
    activeAppId,
    setActiveAppId,
  }), [activeAppId, selectedShortcut])

  return (
    <Windows98WorkspaceContext.Provider value={value}>
      {children}
    </Windows98WorkspaceContext.Provider>
  )
}

export function useWindows98Workspace() {
  const context = useContext(Windows98WorkspaceContext)
  if (!context) throw new Error('useWindows98Workspace must be used within Windows98WorkspaceProvider')
  return context
}
