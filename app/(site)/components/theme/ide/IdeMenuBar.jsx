'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { createApplicationMenus } from './ideCommands'
import { useIdeWorkspace } from './useIdeWorkspace'
import styles from './IdeExperience.module.css'

const EMAIL = 'ilijachrchev@gmail.com'

async function copyEmail() {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(EMAIL)
      return
    }
  } catch {
    // Fall through to the browser-compatible selection fallback.
  }

  const input = document.createElement('textarea')
  input.value = EMAIL
  input.setAttribute('readonly', '')
  input.style.position = 'fixed'
  input.style.opacity = '0'
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  input.remove()
}

export default function IdeMenuBar() {
  const workspace = useIdeWorkspace()
  const [openMenuId, setOpenMenuId] = useState(null)
  const [copied, setCopied] = useState(false)
  const barRef = useRef(null)
  const triggerRefs = useRef([])

  const menus = useMemo(() => createApplicationMenus({
    ...workspace,
    copyEmail: async () => {
      await copyEmail()
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    },
  }), [workspace])

  useEffect(() => {
    if (!openMenuId) return
    const close = (event) => {
      if (!barRef.current?.contains(event.target)) setOpenMenuId(null)
    }
    window.addEventListener('pointerdown', close)
    return () => window.removeEventListener('pointerdown', close)
  }, [openMenuId])

  const focusItem = (menuIndex, itemIndex = 0) => {
    requestAnimationFrame(() => {
      const items = barRef.current?.querySelectorAll(`[data-menu-index="${menuIndex}"] [role="menuitem"]`)
      items?.[Math.max(0, Math.min(itemIndex, items.length - 1))]?.focus()
    })
  }

  const switchMenu = (menuIndex, direction) => {
    const next = (menuIndex + direction + menus.length) % menus.length
    setOpenMenuId(menus[next].id)
    triggerRefs.current[next]?.focus()
    focusItem(next)
  }

  const closeMenu = (menuIndex, restoreFocus = true) => {
    setOpenMenuId(null)
    if (restoreFocus) triggerRefs.current[menuIndex]?.focus()
  }

  return (
    <nav ref={barRef} className={styles.menuBar} aria-label="Application menu">
      {menus.map((menu, menuIndex) => {
        const open = openMenuId === menu.id
        const actionable = menu.items.filter((item) => !item.separator)
        return (
          <div key={menu.id} className={styles.menuGroup} data-menu-index={menuIndex}>
            <button
              ref={(node) => { triggerRefs.current[menuIndex] = node }}
              type="button"
              className={open ? styles.menuTriggerOpen : ''}
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => setOpenMenuId(open ? null : menu.id)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault()
                  setOpenMenuId(menu.id)
                  focusItem(menuIndex)
                } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                  event.preventDefault()
                  const next = (menuIndex + (event.key === 'ArrowRight' ? 1 : -1) + menus.length) % menus.length
                  triggerRefs.current[next]?.focus()
                  if (open) setOpenMenuId(menus[next].id)
                } else if (event.key === 'Escape' && open) {
                  event.preventDefault()
                  closeMenu(menuIndex)
                }
              }}
            >
              {menu.label}
            </button>
            {open && (
              <div className={styles.menuPopover} role="menu" aria-label={`${menu.label} menu`}>
                {menu.items.map((item, itemIndex) => item.separator ? (
                  <div key={`separator-${itemIndex}`} className={styles.menuSeparator} role="separator" />
                ) : (
                  <button
                    key={item.id}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setOpenMenuId(null)
                      item.run()
                    }}
                    onKeyDown={(event) => {
                      const current = actionable.findIndex((candidate) => candidate.id === item.id)
                      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                        event.preventDefault()
                        const direction = event.key === 'ArrowDown' ? 1 : -1
                        focusItem(menuIndex, (current + direction + actionable.length) % actionable.length)
                      } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                        event.preventDefault()
                        switchMenu(menuIndex, event.key === 'ArrowRight' ? 1 : -1)
                      } else if (event.key === 'Escape') {
                        event.preventDefault()
                        closeMenu(menuIndex)
                      }
                    }}
                  >
                    <span>{item.id === 'copy-email' && copied ? <><Check aria-hidden="true" /> Copied Email</> : item.label}</span>
                    {item.shortcut && <kbd>{item.shortcut}</kbd>}
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
