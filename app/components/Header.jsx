'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Download, ChevronDown } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

export default function Header() {
  const reduceMotion = useReducedMotion()

  const rise = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease, delay },
  })

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen w-full flex-col overflow-hidden"
    >
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover saturate-90 contrast-[1.02] dark:saturate-75 dark:contrast-[1.05] dark:brightness-95 motion-reduce:hidden"
        src="/videos/hero.mp4"
        poster="/videos/hero-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 z-[5] hidden motion-reduce:block bg-[radial-gradient(ellipse_at_50%_40%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_55%),linear-gradient(180deg,var(--background),var(--card))]"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 z-[10] bg-gradient-to-b from-[var(--hero-overlay-top)] via-[var(--hero-overlay-mid)] to-[var(--hero-overlay-bot)]"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 z-[11] bg-[radial-gradient(ellipse_70%_65%_at_50%_50%,transparent_0%,transparent_45%,color-mix(in_oklch,var(--background)_35%,transparent)_85%,color-mix(in_oklch,var(--background)_65%,transparent)_100%)]"
        aria-hidden="true"
      />

      <div
        className="absolute inset-x-0 bottom-0 z-[12] h-[22vh] bg-gradient-to-b from-transparent via-[color-mix(in_oklch,var(--background)_55%,transparent)] to-background"
        aria-hidden="true"
      />

      <div className="relative z-20 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-[clamp(40px,10vh,140px)] px-6 pb-14 pt-28 text-center">
        <div className="flex flex-col items-center gap-6">
          <motion.div
            {...rise(0.1)}
            className="liquid-glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[11.5px] font-medium uppercase tracking-[0.06em] text-foreground"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              style={{ animation: reduceMotion ? 'none' : 'pulse-ring 2.2s cubic-bezier(0.4,0,0.6,1) infinite' }}
              aria-hidden="true"
            />
            <span>Ilija Chrchev</span>
          </motion.div>

          <motion.h1
            {...rise(0.3)}
            className="m-0 max-w-[52rem] font-display text-[clamp(36px,6.2vw,76px)] font-normal leading-[1.02] tracking-[-0.035em] text-foreground text-balance"
            style={{ fontVariationSettings: '"opsz" 144' }}
          >
            Building thoughtful software,{' '}
            <em
              className="font-light italic text-primary"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              one project at a time.
            </em>
          </motion.h1>
        </div>

        <div className="flex flex-col items-center gap-7">
          <motion.p
            {...rise(0.6)}
            className="m-0 max-w-[36rem] text-[clamp(15px,1.3vw,18px)] font-normal leading-[1.55] text-muted-foreground"
          >
            CS student in Koper. I ship full-stack products, lead IAESTE LC Koper,
            and spend weekends at hackathons.
          </motion.p>

          <motion.div
            {...rise(0.8)}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[13.5px] font-medium tracking-[0.005em] text-primary-foreground transition-[transform,opacity] duration-200 hover:-translate-y-px hover:opacity-90"
            >
              See my work
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>

            <a
              href="/Ilija_Chrchev_CV.pdf"
              download
              className="liquid-glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[13.5px] font-medium tracking-[0.005em] text-foreground transition-transform duration-200 hover:-translate-y-px"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Download CV
            </a>
          </motion.div>

          <motion.div
            {...rise(1.1)}
            className="mt-4 flex flex-col items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
            aria-hidden="true"
          >
            <span>scroll</span>
            <ChevronDown
              className="h-3.5 w-3.5"
              style={{ animation: reduceMotion ? 'none' : 'chev-bob 2s ease-in-out infinite' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}