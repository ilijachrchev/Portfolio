import Image from 'next/image'
import Windows98Button from './Windows98Button'
import styles from './Windows98Experience.module.css'

export default function Windows98Error({ message, onClose }) {
  return (
    <div className={styles.errorDialog} role="alert">
      <Image src="/themes/win98/icons/error.svg" alt="" width={40} height={40} aria-hidden="true" />
      <p>{message}</p>
      <div className={styles.dialogButtons}>
        <Windows98Button autoFocus onClick={onClose}>OK</Windows98Button>
      </div>
    </div>
  )
}
