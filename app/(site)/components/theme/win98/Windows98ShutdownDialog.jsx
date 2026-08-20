'use client'

import { useState } from 'react'
import Windows98Button from './Windows98Button'
import styles from './Windows98Experience.module.css'

const OPTIONS = [
  ['shutdown', 'Shut down portfolio'],
  ['restart', 'Restart portfolio'],
  ['appearance', 'Switch appearance'],
]

export default function Windows98ShutdownDialog({ onCancel, onConfirm }) {
  const [choice, setChoice] = useState('shutdown')
  return (
    <div className={styles.shutdownDialog}>
      <p>What would you like the portfolio to do?</p>
      {OPTIONS.map(([value, label]) => (
        <label key={value}>
          <input type="radio" name="shutdown-action" value={value} checked={choice === value} onChange={() => setChoice(value)} />
          {label}
        </label>
      ))}
      <div className={styles.dialogButtons}>
        <Windows98Button onClick={() => onConfirm(choice)}>OK</Windows98Button>
        <Windows98Button onClick={onCancel}>Cancel</Windows98Button>
      </div>
    </div>
  )
}
