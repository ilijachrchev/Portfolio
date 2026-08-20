export const WINDOWS98_COMMANDS = {
  help: { type: 'window', value: 'help' },
  winver: { type: 'window', value: 'winver' },
  theme: { type: 'window', value: 'appearance' },
  home: { type: 'app', value: 'computer' },
  about: { type: 'app', value: 'documents' },
  projects: { type: 'app', value: 'projects' },
  community: { type: 'app', value: 'community' },
  experience: { type: 'app', value: 'community' },
  endorsements: { type: 'app', value: 'guestbook' },
  contact: { type: 'app', value: 'contact' },
  github: { type: 'external', value: 'https://github.com/ilijachrchev' },
}

export function getWindows98Command(input) {
  const command = input.trim().toLowerCase()
  return {
    command,
    action: WINDOWS98_COMMANDS[command] || null,
  }
}
