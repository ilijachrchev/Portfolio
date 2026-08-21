export const MISSION_SYSTEMS = [
  {
    id: 'overview',
    code: 'SYS-01',
    label: 'Overview',
    telemetryLabel: 'Mission Overview',
    sectionId: 'home',
  },
  {
    id: 'profile',
    code: 'SYS-02',
    label: 'Profile',
    telemetryLabel: 'Crew / Profile',
    sectionId: 'about',
  },
  {
    id: 'operations',
    code: 'SYS-03',
    label: 'Ground Ops',
    telemetryLabel: 'Ground Operations',
    sectionId: 'service',
  },
  {
    id: 'missions',
    code: 'SYS-04',
    label: 'Missions',
    telemetryLabel: 'Project Missions',
    sectionId: 'work',
  },
  {
    id: 'reports',
    code: 'SYS-05',
    label: 'Flight Reports',
    telemetryLabel: 'Flight Reports',
    sectionId: 'endorsements-home',
  },
  {
    id: 'comms',
    code: 'SYS-06',
    label: 'Comms',
    telemetryLabel: 'Communications',
    sectionId: 'contact',
  },
]

export function getMissionSystem(value) {
  return MISSION_SYSTEMS.find((system) => (
    system.id === value || system.sectionId === value
  )) || null
}
