'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { assets, duplicatedTools } from '@/assets/assets'

const ease = [0.16, 1, 0.3, 1]

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full scroll-m-20 bg-background px-[8%] py-24 md:py-32 lg:px-[12%]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease }}
        className="mx-auto flex max-w-6xl flex-col items-center"
      >
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="text-base text-muted-foreground"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Introduction
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35, ease }}
          className="mt-2 text-center font-display text-5xl font-normal text-foreground md:text-6xl"
          style={{ fontVariationSettings: '"opsz" 144', letterSpacing: '-0.02em' }}
        >
          About Me
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="mt-16 flex w-full flex-col items-center gap-12 md:gap-16 lg:flex-row lg:items-start lg:gap-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6, ease }}
            className="relative aspect-[4/5] w-72 shrink-0 overflow-hidden rounded-3xl border border-border bg-card sm:w-96 lg:w-[28rem]"
          >
            <Image
              src={assets.user_image}
              alt="Ilija Chrchev"
              fill
              sizes="(max-width: 640px) 288px, (max-width: 1024px) 384px, 448px"
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="flex flex-1 flex-col gap-6"
          >
            <div className="flex max-w-2xl flex-col gap-5 text-base leading-relaxed text-muted-foreground md:text-[17px]">
              <p>
                Hi, I&apos;m Ilija Chrchev, a Computer Science student at UP FAMNIT in Koper,
                Slovenia.
              </p>
              <p>
                I enjoy hackathons and solving real-world problems, and I&apos;ve built a few
                projects worth checking out at{' '}
                <a
                  href="https://github.com/ilijachrchev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-primary"
                >
                  github.com/ilijachrchev
                </a>
                . Currently leading IAESTE LC Koper and active in Student Council, Google Developer
                Group on Campus, Student Tutoring, MSOS, and the IAESTE Slovenia IT Team.
              </p>
              <p>
                Each project pushes me to grow. Always happy to connect, {' '}
                <a
                  href="mailto:ilijachrchev@gmail.com"
                  className="text-foreground underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-primary"
                >
                  ilijachrchev@gmail.com
                </a>
              </p>
            </div>

            <motion.h4
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.85, ease }}
              className="mt-4 text-base text-muted-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Tools I use
            </motion.h4>

            <div className="relative mx-auto w-full max-w-[340px] overflow-hidden py-4 sm:max-w-[520px] md:max-w-[640px] lg:mx-0">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent" />

              <motion.ul
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  opacity: { duration: 0.6, delay: 1 },
                  x: { duration: 20, ease: 'linear', repeat: Infinity },
                }}
                animate={{ x: ['0%', '-50%'] }}
                className="flex items-center gap-3 will-change-transform sm:gap-5"
                style={{ width: 'max-content' }}
              >
                {duplicatedTools.map((tool, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ scale: 1.1, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="flex aspect-square w-12 cursor-pointer items-center justify-center rounded-lg border border-border bg-card sm:w-14"
                  >
                    <Image src={tool} alt="" className="w-5 sm:w-7" aria-hidden="true" />
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}