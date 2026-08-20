import Windows98DesktopIcon from './Windows98DesktopIcon'
import { WINDOWS98_SHORTCUTS } from './windows98Apps'
import { useWindows98Workspace } from './useWindows98Workspace'
import styles from './Windows98Experience.module.css'

export default function Windows98Desktop() {
  const { navigateToApp, openWindow, selectedShortcut, setSelectedShortcut } = useWindows98Workspace()

  return (
    <div className={styles.iconGrid} aria-label="Desktop shortcuts">
      {WINDOWS98_SHORTCUTS.map((shortcut) => (
        <Windows98DesktopIcon
          key={shortcut.id}
          shortcut={shortcut}
          selected={selectedShortcut === shortcut.id}
          onSelect={() => setSelectedShortcut(shortcut.id)}
          onLaunch={() => {
            setSelectedShortcut(shortcut.id)
            if (!navigateToApp(shortcut.id)) openWindow(shortcut.id)
          }}
        />
      ))}
    </div>
  )
}
