import Windows98Help from './Windows98Help'
import Windows98Network from './Windows98Network'
import Windows98RecycleBin from './Windows98RecycleBin'
import Windows98Winver from './Windows98Winver'
import Windows98Window from './Windows98Window'
import { useWindows98Workspace } from './useWindows98Workspace'

const CONTENT = {
  network: Windows98Network,
  recycle: Windows98RecycleBin,
}

export default function Windows98Utilities() {
  const { activeWindowId, closeWindow, focusWindow, minimizeWindow, moveWindow, navigateToApp, openWindow, toggleMaximizeWindow, windows } = useWindows98Workspace()

  return Object.values(windows).map((window) => {
    const Content = CONTENT[window.id]
    if (!Content && !['help', 'winver'].includes(window.id)) return null
    const content = window.id === 'help'
      ? <Windows98Help navigateToApp={navigateToApp} onOpenWinver={() => openWindow('winver')} />
      : window.id === 'winver'
        ? <Windows98Winver onClose={() => closeWindow('winver')} />
        : <Content />
    return (
      <Windows98Window
        key={window.id}
        window={window}
        active={activeWindowId === window.id}
        onClose={() => closeWindow(window.id)}
        onFocus={() => focusWindow(window.id)}
        onMaximize={() => toggleMaximizeWindow(window.id)}
        onMinimize={() => minimizeWindow(window.id)}
        onMove={moveWindow}
      >
        {content}
      </Windows98Window>
    )
  })
}
