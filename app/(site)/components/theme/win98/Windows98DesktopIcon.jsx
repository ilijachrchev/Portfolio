import Image from 'next/image'
import styles from './Windows98Experience.module.css'

export default function Windows98DesktopIcon({ shortcut, selected, onSelect, onLaunch }) {
  return (
    <button
      type="button"
      className={`${styles.desktopIcon} ${selected ? styles.desktopIconSelected : ''}`}
      aria-label={`${shortcut.label}${selected ? ', selected' : ''}`}
      aria-pressed={selected}
      onClick={onSelect}
      onDoubleClick={onLaunch}
      onKeyDown={(event) => {
        if (event.key !== 'Enter') return
        event.preventDefault()
        onLaunch()
      }}
    >
      <Image src={shortcut.icon} alt="" width={40} height={40} aria-hidden="true" />
      <span>{shortcut.label}</span>
    </button>
  )
}
