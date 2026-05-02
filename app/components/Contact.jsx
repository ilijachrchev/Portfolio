'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

const ease = [0.16, 1, 0.3, 1]

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')

  async function onSubmit(event) {
    event.preventDefault()
    setStatus('sending')
    setStatusMessage('')

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
    if (!accessKey) {
      setStatus('error')
      setStatusMessage('Form is not configured. Please email me directly at ilijachrchev@gmail.com.')
      return
    }

    const formData = new FormData(event.target)
    formData.append('access_key', accessKey)

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setStatusMessage('Thanks! I will get back to you shortly.')
        event.target.reset()
        setTimeout(() => {
          setStatus('idle')
          setStatusMessage('')
        }, 5000)
      } else {
        setStatus('error')
        setStatusMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setStatusMessage('Network error. Please check your connection and try again.')
    }
  }

  const inputBase =
    'w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60'

  const isSending = status === 'sending'

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative w-full scroll-m-24 px-5 pb-24 pt-24 lg:px-8 md:pb-32 md:pt-32 xl:px-[8%]"
    >
      <div className="mx-auto w-full max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="block text-center text-[11px] uppercase tracking-[0.22em] text-primary"
        >
          — Connect
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mt-3 text-center font-display text-4xl font-normal text-foreground sm:text-5xl md:text-6xl"
          style={{ fontVariationSettings: '"opsz" 144', letterSpacing: '-0.02em' }}
        >
          Get in{' '}
          <em
            className="font-light italic text-primary"
            style={{ fontVariationSettings: '"opsz" 144' }}
          >
            touch
          </em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="mx-auto mt-5 max-w-xl text-center text-base leading-relaxed text-muted-foreground"
        >
          Got a project idea, a question, or just want to say hi? Drop a message below!
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.55, ease }}
          onSubmit={onSubmit}
          className="mt-12 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
                Name <span className="text-primary">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                disabled={isSending}
                placeholder="Your name"
                className={inputBase}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
                Email <span className="text-primary">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                disabled={isSending}
                placeholder="you@example.com"
                className={inputBase}
              />
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
              Message <span className="text-primary">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={6}
              disabled={isSending}
              placeholder="What&apos;s on your mind?"
              className={`${inputBase} resize-y leading-relaxed`}
            />
          </div>

          {status === 'error' && (
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{statusMessage}</span>
            </div>
          )}

          {status === 'success' && (
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{statusMessage}</span>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <motion.button
              whileHover={!isSending ? { y: -2 } : undefined}
              whileTap={!isSending ? { scale: 0.98 } : undefined}
              transition={{ duration: 0.2 }}
              type="submit"
              disabled={isSending}
              aria-busy={isSending ? 'true' : 'false'}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-sm transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8, ease }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          Or email me directly at{' '}
          <a
            href="mailto:ilijachrchev@gmail.com"
            className="text-foreground underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-primary"
          >
            ilijachrchev@gmail.com
          </a>
        </motion.p>
      </div>
    </motion.section>
  )
}