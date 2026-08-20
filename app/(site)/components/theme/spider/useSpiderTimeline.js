'use client'

import { useEffect, useState } from 'react'
import { useScroll, useTransform, useVelocity } from 'motion/react'
import { getSpiderSceneSet, SPIDER_CHARACTER_SIZES } from './spiderSceneConfig'

const EMPTY_POSE = {
  x: -200,
  y: -200,
  anchorX: 0,
  anchorY: 0,
  rotation: 0,
  scale: 1,
  opacity: 0,
  strandProgress: 0,
  hangProgress: 0,
}

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const mix = (from, to, progress) => from + (to - from) * progress
const smoothstep = (from, to, value) => {
  const progress = clamp((value - from) / Math.max(to - from, 0.0001))
  return progress * progress * (3 - 2 * progress)
}

function cubic(t, p0, p1, p2, p3) {
  const mt = 1 - t
  return (
    mt * mt * mt * p0 +
    3 * mt * mt * t * p1 +
    3 * mt * t * t * p2 +
    t * t * t * p3
  )
}

function cubicDerivative(t, p0, p1, p2, p3) {
  const mt = 1 - t
  return 3 * mt * mt * (p1 - p0) + 6 * mt * t * (p2 - p1) + 3 * t * t * (p3 - p2)
}

function sampleScale(values, t) {
  if (t <= 0.5) return mix(values[0], values[1], t * 2)
  return mix(values[1], values[2], (t - 0.5) * 2)
}

function measureTimeline() {
  const width = window.innerWidth
  const height = window.innerHeight
  const { mode, scenes } = getSpiderSceneSet(width)
  const elements = new Map()

  for (const scene of scenes) {
    for (const id of [scene.from, scene.to]) {
      if (elements.has(id)) continue
      const element = document.getElementById(id)
      if (!element) return null
      const rect = element.getBoundingClientRect()
      elements.set(id, {
        top: rect.top + window.scrollY,
        height: rect.height,
        element,
      })
    }
  }

  const measuredScenes = scenes.map((scene) => {
    const from = elements.get(scene.from)
    const to = elements.get(scene.to)
    const start = from.top + from.height * scene.range[0]
    const end = Math.max(start + 1, to.top + to.height * scene.range[1])
    return { ...scene, start, end }
  })

  return {
    width,
    height,
    mode,
    size: SPIDER_CHARACTER_SIZES[mode],
    scenes: measuredScenes,
    observedElements: [...elements.values()].map((item) => item.element),
  }
}

function samplePose(scrollPosition, timeline) {
  if (!timeline?.scenes.length) return EMPTY_POSE

  const lastScene = timeline.scenes[timeline.scenes.length - 1]
  let activeScene = timeline.scenes.find(
    (scene) => scrollPosition >= scene.start && scrollPosition <= scene.end
  )

  if (!activeScene && lastScene.hold && scrollPosition > lastScene.end) activeScene = lastScene
  if (!activeScene) return EMPTY_POSE

  const t = scrollPosition > activeScene.end
    ? 1
    : clamp((scrollPosition - activeScene.start) / (activeScene.end - activeScene.start))
  const [p0, p1, p2, p3] = activeScene.curve
  const nx = cubic(t, p0[0], p1[0], p2[0], p3[0])
  const ny = cubic(t, p0[1], p1[1], p2[1], p3[1])
  const dx = cubicDerivative(t, p0[0], p1[0], p2[0], p3[0])
  const dy = cubicDerivative(t, p0[1], p1[1], p2[1], p3[1])
  const tangent = Math.atan2(dy, dx) * (180 / Math.PI)
  const authoredRotation = mix(activeScene.rotation[0], activeScene.rotation[1], t)
  const entering = smoothstep(activeScene.visibleFrom, activeScene.visibleFrom + 0.08, t)
  const exiting = activeScene.hold ? 1 : 1 - smoothstep(activeScene.visibleTo - 0.08, activeScene.visibleTo, t)
  const strandIn = smoothstep(activeScene.strandFrom, activeScene.strandFrom + 0.1, t)
  const strandOut = activeScene.hold ? 1 : 1 - smoothstep(activeScene.strandTo - 0.1, activeScene.strandTo, t)

  return {
    x: nx * timeline.width,
    y: ny * timeline.height,
    anchorX: activeScene.anchor[0] * timeline.width,
    anchorY: activeScene.anchor[1] * timeline.height,
    rotation: activeScene.hang
      ? clamp(authoredRotation + tangent * 0.08, -48, 178)
      : clamp(authoredRotation * 0.72 + tangent * 0.28, -48, 48),
    scale: sampleScale(activeScene.scale, t),
    opacity: entering * exiting,
    strandProgress: strandIn * strandOut,
    hangProgress: activeScene.hang ? smoothstep(0.7, 1, t) : 0,
  }
}

export default function useSpiderTimeline() {
  const [timeline, setTimeline] = useState(null)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)

  useEffect(() => {
    let frame = 0
    let observer
    let cancelled = false
    const observedElements = new Set()

    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (cancelled) return
        const nextTimeline = measureTimeline()
        setTimeline(nextTimeline)

        if (!nextTimeline) return
        nextTimeline.observedElements.forEach((element) => {
          if (observedElements.has(element)) return
          observedElements.add(element)
          observer.observe(element)
        })
      })
    }

    observer = new ResizeObserver(update)
    update()
    window.addEventListener('resize', update, { passive: true })
    window.addEventListener('orientationchange', update)
    document.fonts?.ready.then(() => {
      if (!cancelled) update()
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  const pose = useTransform(scrollY, (value) => samplePose(value, timeline))
  const x = useTransform(pose, (value) => value.x - (timeline?.size ?? 64) / 2)
  const y = useTransform(pose, (value) => value.y - (timeline?.size ?? 64) * 0.75)
  const opacity = useTransform(pose, (value) => value.opacity)
  const scale = useTransform(pose, (value) => value.scale)
  const rotation = useTransform([pose, scrollVelocity], ([value, velocity]) => {
    const velocityLean = clamp(velocity / 700, -5, 5)
    return value.rotation + velocityLean
  })
  const strandProgress = useTransform(pose, (value) => value.strandProgress)
  const strandPath = useTransform([pose, rotation, scrollVelocity], ([value, angle, velocity]) => {
    const radians = angle * (Math.PI / 180)
    const size = timeline?.size ?? 64
    const localX = mix(-size * 0.3, 0, value.hangProgress)
    const localY = mix(-size * 0.58, -size * 0.63, value.hangProgress)
    const wristX = value.x + Math.cos(radians) * localX - Math.sin(radians) * localY
    const wristY = value.y + Math.sin(radians) * localX + Math.cos(radians) * localY
    const bow = clamp(velocity / 80, -18, 18)
    const controlX = (value.anchorX + wristX) / 2 + bow
    const controlY = (value.anchorY + wristY) / 2 + Math.abs(wristX - value.anchorX) * 0.035
    return `M ${value.anchorX} ${value.anchorY} Q ${controlX} ${controlY} ${wristX} ${wristY}`
  })

  return {
    active: Boolean(timeline),
    mode: timeline?.mode ?? 'desktop',
    size: timeline?.size ?? SPIDER_CHARACTER_SIZES.desktop,
    x,
    y,
    opacity,
    scale,
    rotation,
    strandPath,
    strandProgress,
  }
}
