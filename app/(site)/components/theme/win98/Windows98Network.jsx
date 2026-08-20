import { Github, Instagram, Linkedin, Mail } from 'lucide-react'
import styles from './Windows98Experience.module.css'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/ilijachrchev', Icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ilija-chrchev-0a4789296/', Icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/ilijachrchev/', Icon: Instagram },
  { label: 'Email', href: 'mailto:ilijachrchev@gmail.com', Icon: Mail },
]

export default function Windows98Network() {
  return (
    <div className={styles.networkList}>
      <p>Connected portfolio resources:</p>
      {LINKS.map(({ href, Icon, label }) => (
        <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
      <div className={`${styles.statusBox} ${styles.sunken}`}>4 object(s)</div>
    </div>
  )
}
