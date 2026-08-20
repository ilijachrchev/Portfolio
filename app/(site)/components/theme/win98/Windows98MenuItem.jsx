import styles from './Windows98Experience.module.css'

export default function Windows98MenuItem({ icon, children, submenu = false, ...props }) {
  return (
    <button
      type="button"
      role="menuitem"
      className={styles.menuItem}
      {...props}
    >
      <span className={styles.menuItemIcon} aria-hidden="true">{icon}</span>
      <span>{children}</span>
      {submenu && <span className={styles.submenuArrow} aria-hidden="true">▶</span>}
    </button>
  )
}
