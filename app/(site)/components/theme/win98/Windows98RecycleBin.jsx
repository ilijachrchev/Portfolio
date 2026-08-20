import Image from 'next/image'
import styles from './Windows98Experience.module.css'

export default function Windows98RecycleBin() {
  return (
    <div className={styles.emptyUtility}>
      <Image src="/themes/win98/icons/recycle.svg" alt="" width={48} height={48} aria-hidden="true" />
      <div>
        <strong>Recycle Bin is delightfully empty.</strong>
        <p>0 deleted projects. A few old bugs escaped before pickup.</p>
      </div>
    </div>
  )
}
