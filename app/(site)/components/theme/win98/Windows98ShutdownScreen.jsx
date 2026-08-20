import Windows98Button from './Windows98Button'
import { useWindows98Workspace } from './useWindows98Workspace'
import styles from './Windows98Experience.module.css'

export default function Windows98ShutdownScreen() {
  const { isShutdown, navigateToApp, restartPortfolio } = useWindows98Workspace()
  if (!isShutdown) return null

  const restart = () => {
    restartPortfolio()
    navigateToApp('computer')
  }

  return (
    <div className={styles.shutdownScreen} role="dialog" aria-modal="true" aria-labelledby="shutdown-heading">
      <h2 id="shutdown-heading">It is now safe to close this portfolio.</h2>
      <p>Your projects and messages are still exactly where you left them.</p>
      <Windows98Button autoFocus onClick={restart}>Restart</Windows98Button>
    </div>
  )
}
