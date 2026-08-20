import Image from 'next/image'
import Windows98Button from './Windows98Button'
import styles from './Windows98Experience.module.css'

export default function Windows98Winver({ onClose }) {
  return (
    <div className={styles.aboutDialog}>
      <Image src="/themes/win98/icons/computer.svg" alt="" width={58} height={58} aria-hidden="true" />
      <div>
        <h2>Windows 98 Portfolio Edition</h2>
        <p>Built for exploring Ilija Chrchev&apos;s portfolio.</p>
        <div className={`${styles.sunken} ${styles.licenseBox}`}>
          Registered to: Curious Internet Visitor<br />
          Product ID: PORTFOLIO-1998
        </div>
        <Windows98Button onClick={onClose}>OK</Windows98Button>
      </div>
    </div>
  )
}
