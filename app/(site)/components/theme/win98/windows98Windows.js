export const WINDOWS98_WINDOWS = {
  network: {
    id: 'network',
    title: 'Network Neighborhood',
    icon: '/themes/win98/icons/network.svg',
    position: { x: 180, y: 86 },
    size: { width: 430, height: 280 },
  },
  recycle: {
    id: 'recycle',
    title: 'Recycle Bin',
    icon: '/themes/win98/icons/recycle.svg',
    position: { x: 250, y: 120 },
    size: { width: 360, height: 220 },
  },
  help: {
    id: 'help',
    title: 'Portfolio Help',
    icon: '/themes/win98/icons/info.svg',
    position: { x: 210, y: 100 },
    size: { width: 440, height: 300 },
  },
  run: {
    id: 'run',
    title: 'Run',
    icon: '/themes/win98/icons/computer.svg',
    position: { x: 260, y: 170 },
    size: { width: 410, height: 190 },
    maximizable: false,
  },
  winver: {
    id: 'winver',
    title: 'About Windows 98 Portfolio',
    icon: '/themes/win98/icons/info.svg',
    position: { x: 230, y: 110 },
    size: { width: 430, height: 270 },
    maximizable: false,
  },
  find: {
    id: 'find',
    title: 'Find: Portfolio',
    icon: '/themes/win98/icons/folder.svg',
    position: { x: 280, y: 130 },
    size: { width: 420, height: 230 },
  },
  appearance: {
    id: 'appearance',
    title: 'Appearance Properties',
    icon: '/themes/win98/icons/computer.svg',
    position: { x: 240, y: 90 },
    size: { width: 440, height: 340 },
    maximizable: false,
  },
  shutdown: {
    id: 'shutdown',
    title: 'Shut Down Portfolio',
    icon: '/themes/win98/icons/info.svg',
    position: { x: 270, y: 150 },
    size: { width: 410, height: 220 },
    maximizable: false,
    minimizable: false,
    modal: true,
  },
  error: {
    id: 'error',
    title: 'Portfolio OS',
    icon: '/themes/win98/icons/error.svg',
    position: { x: 300, y: 180 },
    size: { width: 380, height: 190 },
    maximizable: false,
    minimizable: false,
    modal: true,
  },
}

export function createWindows98WindowState() {
  return Object.fromEntries(Object.values(WINDOWS98_WINDOWS).map((window) => [window.id, {
    ...window,
    open: false,
    minimized: false,
    maximized: false,
    zIndex: 41,
  }]))
}
