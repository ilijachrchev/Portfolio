import styles from './Windows98Experience.module.css'

export default function Windows98Button({ active = false, className = '', children, ...props }) {
  const classes = [
    styles.button,
    styles.raised,
    active ? styles.pressed : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
