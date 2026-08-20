'use client'

import styles from './Windows98Experience.module.css'
import Windows98Desktop from './Windows98Desktop'
import { Windows98WorkspaceProvider } from './useWindows98Workspace'

export default function Windows98Experience() {
  return (
    <Windows98WorkspaceProvider>
      <div className={styles.desktop} data-win98-desktop aria-label="Windows 98 portfolio desktop">
        <Windows98Desktop />
      </div>
    </Windows98WorkspaceProvider>
  )
}
