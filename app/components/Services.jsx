'use client'

import { assets, serviceData } from '@/assets/assets'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ArrowUpRight } from 'lucide-react'

function VolunteeringModal({ item, onClose }) {
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKey)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handleKey)
            document.body.style.overflow = ''
        }
    }, [onClose])

    return createPortal(
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-background/75 backdrop-blur-md" />

            <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="volunteering-title"
                className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-2xl"
                initial={{ scale: 0.96, opacity: 0, y: 14 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 14 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="h-1.5 bg-gradient-to-r from-primary to-accent" />

                <div className="flex flex-col gap-5 p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                            {item.icon && (
                                <div className="shrink-0 rounded-lg bg-muted p-2">
                                    <Image src={item.icon} alt="" className="w-8 h-8" />
                                </div>
                            )}
                            <div>
                                <h2 id="volunteering-title" className="font-display text-2xl text-foreground">
                                    {item.title}
                                </h2>
                                {item.organization && (
                                    <p className="mt-0.5 text-sm text-muted-foreground">
                                        {item.organization}
                                    </p>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="mt-1 shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            aria-label="Close"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {(item.details?.period || item.details?.location) && (
                        <div className="flex flex-wrap gap-4 text-sm">
                            {item.details?.period && (
                                <div className="flex items-start gap-2">
                                    <span className="font-semibold text-foreground">Period:</span>
                                    <span className="text-muted-foreground">{item.details.period}</span>
                                </div>
                            )}
                            {item.details?.location && (
                                <div className="flex items-start gap-2">
                                    <span className="font-semibold text-foreground">Location:</span>
                                    <span className="text-muted-foreground">{item.details.location}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {item.description && (
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                        </p>
                    )}

                    {Array.isArray(item.details?.highlights) && item.details.highlights.length > 0 && (
                        <div>
                            <p className="mb-2 text-sm font-semibold text-foreground">Highlights</p>
                            <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
                                {item.details.highlights.map((h, i) => (
                                    <li key={i}>{h}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {Array.isArray(item.details?.links) && item.details.links.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                            {item.details.links.map((l, i) => (
                                <a
                                    key={i}
                                    href={l.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                                >
                                    {l.label}
                                    <ArrowUpRight size={12} />
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>,
        document.body
    )
}

const Services = () => {
    const [selected, setSelected] = useState(null)

    return (
        <>
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1 }}
                id="service"
                className="w-full scroll-m-20 py-24 md:py-32"
            >
                <div className="mx-auto max-w-6xl px-6">
                    <motion.h4
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-center font-display text-lg text-muted-foreground"
                    >
                        Building skills by helping others
                    </motion.h4>

                    <motion.h2
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-2 text-center font-display text-4xl text-foreground md:text-5xl"
                    >
                        Volunteering &{' '}
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Organizations
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mx-auto mt-5 mb-12 max-w-2xl text-center font-display text-muted-foreground"
                    >
                        Volunteering is a way for me to give back, connect with others, and grow both
                        personally and professionally. It continues to strengthen my communication,
                        teamwork, and leadership skills while reminding me of the value of community.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {serviceData.map((item, index) => {
                            const { icon, title, description, organization } = item
                            return (
                                <motion.article
                                    key={index}
                                    whileHover={{ y: -4 }}
                                    transition={{ duration: 0.2 }}
                                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
                                >
                                    <div className="h-1.5 bg-gradient-to-r from-primary to-accent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

                                    <div className="flex flex-1 flex-col gap-4 p-6">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl !bg-white shadow-md ring-1 ring-black/10 transition-all duration-300 group-hover:shadow-lg group-hover:ring-primary/40">
                                            <Image src={icon} alt="" className="h-8 w-8 object-contain" />
                                        </div>

                                        <div>
                                            <h3 className="mb-1 font-display text-xl text-foreground">
                                                {title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-medium">Organization:</span>{' '}
                                                <span className="italic">{organization}</span>
                                            </p>
                                        </div>

                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {description}
                                        </p>

                                        <button
                                            onClick={() => setSelected(item)}
                                            className="mt-auto inline-flex items-center gap-1.5 self-start pt-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                                        >
                                            Read more
                                            <ArrowUpRight
                                                size={14}
                                                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            />
                                        </button>
                                    </div>
                                </motion.article>
                            )
                        })}
                    </motion.div>
                </div>
            </motion.section>

            <AnimatePresence>
                {selected && (
                    <VolunteeringModal item={selected} onClose={() => setSelected(null)} />
                )}
            </AnimatePresence>
        </>
    )
}

export default Services