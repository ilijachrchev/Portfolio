'use client'

import { serviceData } from '@/assets/assets'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    X,
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react'


// ============================================================
// UPDATED VOLUNTEERING DATA
// ============================================================
//
// This keeps your original serviceData, but updates the
// Google Developer Group / GDG card without requiring you
// to edit assets.js.
//
// If you later update serviceData directly, you can remove
// this mapping and use serviceData normally.
// ============================================================

const volunteeringData = serviceData.map((item) => {
    const organization = item.organization?.toLowerCase() || ''
    const title = item.title?.toLowerCase() || ''

    const isGDG =
        organization.includes('google developer') ||
        organization.includes('gdg') ||
        title === 'technical support'

    if (!isGDG) {
        return item
    }

    return {
        ...item,

        title: 'IT Coordinator',

        organization: 'GDG on Campus',

        // Short version shown directly on the carousel card
        description:
            'As IT Coordinator, I manage the technical side of GDG on Campus events, support workshops and speakers, and help keep community activities running smoothly.',

        details: {
            ...(item.details || {}),

            // Longer version shown inside Read more
            fullDescription:
                'As IT Coordinator for GDG on Campus, I oversee the technical side of our events and community activities. I coordinate event setups and technical logistics, support speakers and attendees during workshops, and troubleshoot issues to keep sessions running smoothly. I also work with the organizing team on community initiatives, event workflows, and ideas that improve engagement and the overall member experience.',
        },
    }
})


// ============================================================
// MODAL
// ============================================================

function VolunteeringModal({ item, onClose }) {
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKey)
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', handleKey)
            document.body.style.overflow = ''
        }
    }, [onClose])

    const modalDescription =
        item.details?.fullDescription || item.description

    return createPortal(
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
        >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-background/75 backdrop-blur-md" />

            {/* Modal */}
            <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="volunteering-title"
                className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
                initial={{
                    scale: 0.96,
                    opacity: 0,
                    y: 14,
                }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    y: 0,
                }}
                exit={{
                    scale: 0.96,
                    opacity: 0,
                    y: 14,
                }}
                transition={{
                    duration: 0.2,
                    ease: 'easeOut',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Accent */}
                <div className="h-1.5 bg-gradient-to-r from-primary to-accent" />

                <div className="flex flex-col gap-5 p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                            {item.icon && (
                                <div className="shrink-0 rounded-lg bg-muted p-2">
                                    <Image
                                        src={item.icon}
                                        alt=""
                                        className="h-8 w-8 object-contain"
                                    />
                                </div>
                            )}

                            <div>
                                <h2
                                    id="volunteering-title"
                                    className="font-display text-2xl text-foreground"
                                >
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
                            type="button"
                            onClick={onClose}
                            className="mt-1 shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            aria-label="Close"
                        >
                            <X size={18} />
                        </button>
                    </div>


                    {/* Period / Location */}
                    {(item.details?.period ||
                        item.details?.location) && (
                        <div className="flex flex-wrap gap-4 text-sm">
                            {item.details?.period && (
                                <div className="flex items-start gap-2">
                                    <span className="font-semibold text-foreground">
                                        Period:
                                    </span>

                                    <span className="text-muted-foreground">
                                        {item.details.period}
                                    </span>
                                </div>
                            )}

                            {item.details?.location && (
                                <div className="flex items-start gap-2">
                                    <span className="font-semibold text-foreground">
                                        Location:
                                    </span>

                                    <span className="text-muted-foreground">
                                        {item.details.location}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}


                    {/* Full description */}
                    {modalDescription && (
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            {modalDescription}
                        </p>
                    )}


                    {/* Highlights */}
                    {Array.isArray(item.details?.highlights) &&
                        item.details.highlights.length > 0 && (
                            <div>
                                <p className="mb-2 text-sm font-semibold text-foreground">
                                    Highlights
                                </p>

                                <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                                    {item.details.highlights.map(
                                        (highlight, i) => (
                                            <li key={i}>
                                                {highlight}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}


                    {/* Links */}
                    {Array.isArray(item.details?.links) &&
                        item.details.links.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                                {item.details.links.map(
                                    (link, i) => (
                                        <a
                                            key={i}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                                        >
                                            {link.label}

                                            <ArrowUpRight
                                                size={12}
                                            />
                                        </a>
                                    )
                                )}
                            </div>
                        )}
                </div>
            </motion.div>
        </motion.div>,

        document.body
    )
}


// ============================================================
// CAROUSEL OFFSET HELPER
// ============================================================

const getCircularOffset = (
    index,
    activeIndex,
    total
) => {
    let offset = index - activeIndex

    if (offset > total / 2) {
        offset -= total
    }

    if (offset < -total / 2) {
        offset += total
    }

    return offset
}


// ============================================================
// VOLUNTEERING SECTION
// ============================================================

const Services = () => {
    const [selected, setSelected] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [viewportWidth, setViewportWidth] =
        useState(1024)

    const total = volunteeringData.length


    // ========================================================
    // RESPONSIVE WIDTH
    // ========================================================

    useEffect(() => {
        const updateWidth = () => {
            setViewportWidth(window.innerWidth)
        }

        updateWidth()

        window.addEventListener(
            'resize',
            updateWidth
        )

        return () => {
            window.removeEventListener(
                'resize',
                updateWidth
            )
        }
    }, [])


    const isMobile = viewportWidth < 640
    const isTablet = viewportWidth < 1024


    // Mobile = center + one on each side
    // Desktop = center + two on each side
    const maxVisibleOffset = isMobile ? 1 : 2


    // Distance between carousel cards
    const cardStep = isMobile
        ? Math.min(viewportWidth * 0.58, 215)
        : isTablet
          ? 210
          : 240


    // ========================================================
    // NAVIGATION
    // ========================================================

    const goNext = () => {
        setActiveIndex(
            (current) =>
                (current + 1) % total
        )
    }


    const goPrevious = () => {
        setActiveIndex(
            (current) =>
                (current - 1 + total) % total
        )
    }


    const goToSlide = (index) => {
        setActiveIndex(index)
    }


    const handleKeyboard = (event) => {
        if (selected) return

        if (event.key === 'ArrowLeft') {
            event.preventDefault()
            goPrevious()
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault()
            goNext()
        }
    }


    // ========================================================
    // VISIBLE CARDS
    // ========================================================

    const visibleItems = volunteeringData
        .map((item, index) => ({
            item,
            index,
            offset: getCircularOffset(
                index,
                activeIndex,
                total
            ),
        }))
        .filter(
            ({ offset }) =>
                Math.abs(offset) <=
                maxVisibleOffset
        )


    return (
        <>
            <motion.section
                data-theme-slot="section"
                role="region"
                aria-label="Volunteering carousel"
                tabIndex={0}
                onKeyDown={handleKeyboard}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{
                    once: true,
                    amount: 0.1,
                }}
                transition={{ duration: 0.8 }}
                id="service"
                className="relative w-full scroll-m-20 overflow-hidden py-20 md:py-28"
            >
                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="relative z-10 mx-auto max-w-6xl px-6">
                    <motion.h4
                        initial={{
                            y: -15,
                            opacity: 0,
                        }}
                        whileInView={{
                            y: 0,
                            opacity: 1,
                        }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.15,
                            duration: 0.5,
                        }}
                        className="text-center font-display text-sm text-muted-foreground md:text-base"
                    >
                        Building skills by helping others
                    </motion.h4>


                    <motion.h2
                        initial={{
                            y: -15,
                            opacity: 0,
                        }}
                        whileInView={{
                            y: 0,
                            opacity: 1,
                        }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.25,
                            duration: 0.5,
                        }}
                        className="mt-2 text-center font-display text-4xl text-foreground md:text-5xl"
                    >
                        Volunteering &{' '}

                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Organizations
                        </span>
                    </motion.h2>


                    <motion.p
                        initial={{
                            opacity: 0,
                        }}
                        whileInView={{
                            opacity: 1,
                        }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.4,
                            duration: 0.5,
                        }}
                        className="mx-auto mt-4 max-w-2xl text-center font-display text-sm leading-6 text-muted-foreground md:text-base md:leading-7"
                    >
                        Volunteering is a way for me to
                        give back, connect with others,
                        and grow both personally and
                        professionally. It continues to
                        strengthen my communication,
                        teamwork, and leadership skills
                        while reminding me of the value
                        of community.
                    </motion.p>
                </div>


                {/* ==================================================
                    CAROUSEL
                ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                        delay: 0.55,
                        duration: 0.7,
                    }}
                    className="relative mx-auto mt-10 max-w-6xl md:mt-12"
                >
                    {/* Carousel stage */}
                    <div className="relative h-[450px] sm:h-[470px]">
                        <AnimatePresence
                            initial={false}
                        >
                            {visibleItems.map(
                                ({
                                    item,
                                    index,
                                    offset,
                                }) => {
                                    const {
                                        icon,
                                        title,
                                        description,
                                        organization,
                                    } = item


                                    // ==================================
                                    // SPECIAL COMPACT CARDS
                                    // ==================================
                                    //
                                    // These two have more text than
                                    // the other cards, so we tighten
                                    // typography/spacing just for them.
                                    //

                                    const isStudentCouncil =
                                        title ===
                                        'Student Council Representative (Computer Science)'


                                    const isMSOS =
                                        title ===
                                            'Active Member' &&
                                        organization?.includes(
                                            'MSOS'
                                        )


                                    const isCompactCard =
                                        isStudentCouncil ||
                                        isMSOS


                                    const distance =
                                        Math.abs(offset)

                                    const isActive =
                                        offset === 0


                                    // ==================================
                                    // CARD DEPTH
                                    // ==================================

                                    const scale =
                                        distance === 0
                                            ? 1
                                            : distance === 1
                                              ? 0.91
                                              : 0.82


                                    const opacity =
                                        distance === 0
                                            ? 1
                                            : distance === 1
                                              ? 0.78
                                              : 0.48


                                    const zIndex =
                                        distance === 0
                                            ? 30
                                            : distance === 1
                                              ? 20
                                              : 10


                                    return (
                                        <motion.article
                                            data-theme-slot="volunteering-card"
                                            key={`${title}-${index}`}
                                            initial={{
                                                opacity: 0,
                                                scale: 0.8,
                                            }}
                                            animate={{
                                                x:
                                                    offset *
                                                    cardStep,
                                                y:
                                                    distance *
                                                    8,
                                                scale,
                                                opacity,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.75,
                                            }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 260,
                                                damping: 28,
                                            }}
                                            drag={
                                                isActive
                                                    ? 'x'
                                                    : false
                                            }
                                            dragConstraints={{
                                                left: 0,
                                                right: 0,
                                            }}
                                            dragElastic={
                                                0.12
                                            }
                                            onDragEnd={(
                                                _,
                                                info
                                            ) => {
                                                if (
                                                    info
                                                        .offset
                                                        .x <
                                                    -60
                                                ) {
                                                    goNext()
                                                }

                                                if (
                                                    info
                                                        .offset
                                                        .x >
                                                    60
                                                ) {
                                                    goPrevious()
                                                }
                                            }}
                                            onClick={() => {
                                                if (
                                                    !isActive
                                                ) {
                                                    setActiveIndex(
                                                        index
                                                    )
                                                }
                                            }}
                                            style={{
                                                zIndex,

                                                left: '50%',

                                                marginLeft:
                                                    'calc(min(82vw, 340px) / -2)',

                                                boxShadow:
                                                    isActive
                                                        ? '0 25px 70px rgba(0, 0, 0, 0.35)'
                                                        : '0 15px 40px rgba(0, 0, 0, 0.18)',

                                                willChange:
                                                    'transform, opacity',
                                            }}
                                            className={`group absolute top-5 flex h-[400px] w-[min(82vw,340px)] flex-col overflow-hidden rounded-2xl border border-border bg-card ${
                                                isActive
                                                    ? 'cursor-grab active:cursor-grabbing'
                                                    : 'cursor-pointer'
                                            }`}
                                        >
                                            {/* Top accent */}
                                            <div
                                                className={`absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-primary to-accent transition-opacity duration-300 ${
                                                    isActive
                                                        ? 'opacity-100'
                                                        : 'opacity-40'
                                                }`}
                                            />


                                            {/* ==================================
                                                CARD CONTENT
                                            ================================== */}

                                            <div
                                                className={`flex h-full min-h-0 flex-col px-6 sm:px-7 ${
                                                    isCompactCard
                                                        ? 'pb-4 pt-6 sm:pb-5 sm:pt-6'
                                                        : 'pb-5 pt-7 sm:pb-6 sm:pt-8'
                                                }`}
                                            >
                                                {/* Icon */}
                                                <div
                                                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/30 ${
                                                        isCompactCard
                                                            ? 'mb-3'
                                                            : 'mb-5'
                                                    }`}
                                                >
                                                    <Image
                                                        src={
                                                            icon
                                                        }
                                                        alt=""
                                                        className="h-8 w-8 object-contain"
                                                    />
                                                </div>


                                                {/* Title */}
                                                <h3
                                                    className={`shrink-0 font-display text-foreground transition-all duration-300 ${
                                                        isCompactCard
                                                            ? isActive
                                                                ? 'text-xl leading-[1.25] sm:text-[22px]'
                                                                : 'text-lg leading-[1.25]'
                                                            : isActive
                                                              ? 'text-2xl leading-[1.2] sm:text-[27px]'
                                                              : 'text-xl leading-[1.2]'
                                                    }`}
                                                >
                                                    {
                                                        title
                                                    }
                                                </h3>


                                                {/* Organization */}
                                                <p
                                                    className={`shrink-0 text-muted-foreground ${
                                                        isCompactCard
                                                            ? 'mt-1.5 text-[11px] leading-[1.45] sm:text-xs'
                                                            : 'mt-2 text-xs leading-[1.45] sm:text-sm'
                                                    }`}
                                                >
                                                    {
                                                        organization
                                                    }
                                                </p>


                                                {/* Divider */}
                                                <div
                                                    className={`h-px w-10 shrink-0 bg-border/80 ${
                                                        isCompactCard
                                                            ? 'my-3'
                                                            : 'my-4'
                                                    }`}
                                                />


                                                {/* Description */}
                                                <p
                                                    className={`min-h-0 overflow-hidden text-muted-foreground ${
                                                        isCompactCard
                                                            ? 'text-[13px] leading-[1.45rem]'
                                                            : 'text-sm leading-6'
                                                    }`}
                                                    style={
                                                        isCompactCard
                                                            ? {
                                                                  display:
                                                                      '-webkit-box',
                                                                  WebkitLineClamp: 4,
                                                                  WebkitBoxOrient:
                                                                      'vertical',
                                                              }
                                                            : undefined
                                                    }
                                                >
                                                    {
                                                        description
                                                    }
                                                </p>


                                                {/* ==================================
                                                    BOTTOM
                                                ================================== */}

                                                <div
                                                    className={`mt-auto flex shrink-0 items-end justify-between gap-4 ${
                                                        isCompactCard
                                                            ? 'pt-3'
                                                            : 'pt-5'
                                                    }`}
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={(
                                                            event
                                                        ) => {
                                                            event.stopPropagation()

                                                            if (
                                                                !isActive
                                                            ) {
                                                                setActiveIndex(
                                                                    index
                                                                )

                                                                return
                                                            }

                                                            setSelected(
                                                                item
                                                            )
                                                        }}
                                                        className="inline-flex shrink-0 items-center gap-1.5 font-display text-sm font-medium text-foreground transition-colors hover:text-primary"
                                                    >
                                                        Read
                                                        more

                                                        <ArrowUpRight
                                                            size={
                                                                14
                                                            }
                                                            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                                        />
                                                    </button>


                                                    {/* Slide counter */}
                                                    {isActive && (
                                                        <motion.span
                                                            initial={{
                                                                opacity: 0,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                            }}
                                                            className="shrink-0 font-display text-xs tracking-wider text-muted-foreground"
                                                        >
                                                            <span className="text-primary">
                                                                {String(
                                                                    activeIndex +
                                                                        1
                                                                ).padStart(
                                                                    2,
                                                                    '0'
                                                                )}
                                                            </span>

                                                            {
                                                                ' / '
                                                            }

                                                            {String(
                                                                total
                                                            ).padStart(
                                                                2,
                                                                '0'
                                                            )}
                                                        </motion.span>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.article>
                                    )
                                }
                            )}
                        </AnimatePresence>


                        {/* ==================================================
                            LEFT BUTTON
                        ================================================== */}

                        <button
                            type="button"
                            onClick={goPrevious}
                            aria-label="Previous volunteering item"
                            className="absolute left-3 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground shadow-lg backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-card hover:text-foreground sm:left-8 lg:left-10"
                        >
                            <ChevronLeft
                                size={18}
                            />
                        </button>


                        {/* ==================================================
                            RIGHT BUTTON
                        ================================================== */}

                        <button
                            type="button"
                            onClick={goNext}
                            aria-label="Next volunteering item"
                            className="absolute right-3 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground shadow-lg backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-card hover:text-foreground sm:right-8 lg:right-10"
                        >
                            <ChevronRight
                                size={18}
                            />
                        </button>
                    </div>


                    {/* ==================================================
                        PAGINATION
                    ================================================== */}

                    <div className="mt-1 flex items-center justify-center gap-2">
                        {volunteeringData.map(
                            (_, index) => {
                                const isCurrent =
                                    index ===
                                    activeIndex

                                return (
                                    <button
                                        key={
                                            index
                                        }
                                        type="button"
                                        onClick={() =>
                                            goToSlide(
                                                index
                                            )
                                        }
                                        aria-label={`Go to slide ${
                                            index +
                                            1
                                        }`}
                                        className="flex h-5 items-center justify-center"
                                    >
                                        <motion.span
                                            animate={{
                                                width: isCurrent
                                                    ? 24
                                                    : 7,

                                                opacity:
                                                    isCurrent
                                                        ? 1
                                                        : 0.4,
                                            }}
                                            transition={{
                                                duration: 0.25,
                                            }}
                                            className={`h-[3px] rounded-full ${
                                                isCurrent
                                                    ? 'bg-primary'
                                                    : 'bg-muted-foreground'
                                            }`}
                                        />
                                    </button>
                                )
                            }
                        )}
                    </div>
                </motion.div>
            </motion.section>


            {/* ======================================================
                MODAL
            ====================================================== */}

            <AnimatePresence>
                {selected && (
                    <VolunteeringModal
                        item={selected}
                        onClose={() =>
                            setSelected(null)
                        }
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default Services
