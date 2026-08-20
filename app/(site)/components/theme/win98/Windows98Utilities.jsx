import Windows98Help from './Windows98Help'
import Windows98Network from './Windows98Network'
import Windows98RecycleBin from './Windows98RecycleBin'
import Windows98Run from './Windows98Run'
import Windows98Winver from './Windows98Winver'
import Windows98Window from './Windows98Window'
import { useWindows98Workspace } from './useWindows98Workspace'
import { getWindows98Command } from './windows98Commands'

const CONTENT = {
  network: Windows98Network,
  recycle: Windows98RecycleBin,
}

export default function Windows98Utilities() {
  const { activeWindowId, closeWindow, focusWindow, minimizeWindow, moveWindow, navigateToApp, openWindow, showError, toggleMaximizeWindow, windows } = useWindows98Workspace()

  const executeCommand = (input) => {
    const { command, action } = getWindows98Command(input)
    closeWindow('run')
    if (!action) {
      showError(`Windows cannot find '${command}'. Try help, projects, contact, theme, or winver.`)
      return
    }
    if (action.type === 'app') navigateToApp(action.value)
    if (action.type === 'window') openWindow(action.value)
    if (action.type === 'external') window.open(action.value, '_blank', 'noopener,noreferrer')
  }

  return Object.values(windows).map((window) => {
    const Content = CONTENT[window.id]
    if (!Content && !['help', 'run', 'winver'].includes(window.id)) return null
    const content = window.id === 'help'
      ? <Windows98Help navigateToApp={navigateToApp} onOpenWinver={() => openWindow('winver')} />
      : window.id === 'winver'
        ? <Windows98Winver onClose={() => closeWindow('winver')} />
        : window.id === 'run'
          ? <Windows98Run onCancel={() => closeWindow('run')} onExecute={executeCommand} />
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
