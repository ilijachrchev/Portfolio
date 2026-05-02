'use client'

import { motion } from 'motion/react'
import EndorsementForm from '../../components/EndorsementForm'
import EndorsementsFeed from '../../components/EndorsementsFeed'

export default function EndorsementsSubmitPage() {
  return (
    <section className="relative w-full scroll-m-24 px-5 pb-24 pt-32 lg:px-8 md:pb-32 md:pt-40 xl:px-[8%]">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <h1
            className="font-display text-4xl font-normal text-foreground sm:text-5xl md:text-6xl"
            style={{ fontVariationSettings: '"opsz" 144', letterSpacing: '-0.02em' }}
          >
            What people{' '}
            <em
              className="font-light italic text-primary"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              say
            </em>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Share your experience and join our community of supporters.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
          >
            <h2 className="mb-6 font-display text-2xl text-foreground">Leave an endorsement</h2>
            <EndorsementForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
          >
            <h2 className="mb-6 font-display text-2xl text-foreground">Recent endorsements</h2>
            <EndorsementsFeed />
          </motion.div>
        </div>
      </div>
    </section>
  )
}