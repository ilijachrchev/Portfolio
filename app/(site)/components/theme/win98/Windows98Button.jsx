import { forwardRef } from 'react'
import styles from './Windows98Experience.module.css'

const Windows98Button = forwardRef(function Windows98Button({ active = false, className = '', children, ...props }, ref) {
  const classes = [
    styles.button,
    styles.raised,
    active ? styles.pressed : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button ref={ref} type="button" className={classes} {...props}>
      {children}
    </button>
  )
})

export default Windows98Button
