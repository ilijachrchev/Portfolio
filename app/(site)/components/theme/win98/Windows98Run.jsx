'use client'

import { useState } from 'react'
import Windows98Button from './Windows98Button'
import styles from './Windows98Experience.module.css'

export default function Windows98Run({ onCancel, onExecute }) {
  const [command, setCommand] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (command.trim()) onExecute(command)
  }

  return (
    <form className={styles.runDialog} onSubmit={submit}>
      <p>Type a portfolio destination or command, then choose OK.</p>
      <label htmlFor="win98-run-command">Open:</label>
      <input
        id="win98-run-command" className={styles.sunken} value={command}
        onChange={(event) => setCommand(event.target.value)} autoComplete="off"
      />
      <div className={styles.dialogButtons}>
        <Windows98Button type="submit">OK</Windows98Button>
        <Windows98Button onClick={onCancel}>Cancel</Windows98Button>
        <Windows98Button onClick={() => setCommand('projects')}>Browse...</Windows98Button>
      </div>
    </form>
  )
}
