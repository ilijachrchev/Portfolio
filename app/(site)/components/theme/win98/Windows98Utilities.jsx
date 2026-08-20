import Windows98Network from './Windows98Network'
import Windows98RecycleBin from './Windows98RecycleBin'
import Windows98Window from './Windows98Window'
import { useWindows98Workspace } from './useWindows98Workspace'

const CONTENT = {
  network: Windows98Network,
  recycle: Windows98RecycleBin,
}

export default function Windows98Utilities() {
  const { activeWindowId, closeWindow, focusWindow, minimizeWindow, moveWindow, toggleMaximizeWindow, windows } = useWindows98Workspace()

  return Object.values(windows).map((window) => {
    const Content = CONTENT[window.id]
    if (!Content) return null
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
        <Content />
      </Windows98Window>
    )
  })
}
