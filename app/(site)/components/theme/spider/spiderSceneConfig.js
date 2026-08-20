export const SPIDER_CHARACTER_SIZES = {
  desktop: 76,
  tablet: 58,
  mobile: 42,
}

const scene = (config) => ({
  visibleFrom: 0.02,
  visibleTo: 0.98,
  strandFrom: 0.04,
  strandTo: 0.9,
  scale: [0.9, 1.03, 0.92],
  ...config,
})

export const DESKTOP_SPIDER_SCENES = [
  scene({
    id: 'hero-opening',
    from: 'home',
    to: 'home',
    range: [0, 0.28],
    anchor: [0.2, -0.08],
    curve: [[-0.08, 0.14], [0.02, 0.3], [0.16, 0.46], [0.32, 0.38]],
    rotation: [-24, 8],
    scale: [0.78, 0.9, 0.94],
  }),
  scene({
    id: 'home-about',
    from: 'home',
    to: 'about',
    range: [0.34, 0.2],
    anchor: [0.34, -0.09],
    curve: [[-0.08, 0.18], [0.03, 0.73], [0.63, 0.76], [1.08, 0.18]],
    rotation: [-34, 34],
  }),
  scene({
    id: 'about-service',
    from: 'about',
    to: 'service',
    range: [0.58, 0.18],
    anchor: [0.72, -0.08],
    curve: [[1.08, 0.16], [0.98, 0.68], [0.4, 0.72], [-0.08, 0.2]],
    rotation: [32, -34],
  }),
  scene({
    id: 'service-work',
    from: 'service',
    to: 'work',
    range: [0.62, 0.12],
    anchor: [0.3, -0.12],
    curve: [[-0.08, 0.13], [0.08, 0.5], [0.77, 0.48], [1.08, 0.12]],
    rotation: [-24, 27],
    scale: [0.88, 0.99, 0.9],
  }),
  scene({
    id: 'work-endorsements',
    from: 'work',
    to: 'endorsements-home',
    range: [0.58, 0.16],
    anchor: [0.67, -0.1],
    curve: [[1.08, 0.17], [0.96, 0.77], [0.32, 0.8], [-0.08, 0.18]],
    rotation: [36, -36],
    scale: [0.91, 1.05, 0.9],
  }),
  scene({
    id: 'endorsements-contact',
    from: 'endorsements-home',
    to: 'contact',
    range: [0.64, 0.18],
    anchor: [0.3, -0.08],
    curve: [[-0.08, 0.16], [0.06, 0.62], [0.55, 0.67], [1.06, 0.25]],
    rotation: [-30, 28],
    scale: [0.88, 1, 0.92],
  }),
  scene({
    id: 'contact-footer',
    from: 'contact',
    to: 'footer',
    range: [0.56, 0.12],
    anchor: [0.82, -0.04],
    curve: [[1.07, 0.18], [0.96, 0.22], [0.84, 0.38], [0.82, 0.56]],
    rotation: [24, 178],
    scale: [0.9, 0.96, 0.9],
    strandTo: 1,
    visibleTo: 1,
    hold: true,
    hang: true,
  }),
]

export const MOBILE_SPIDER_SCENES = [
  scene({
    id: 'mobile-home-about',
    from: 'home',
    to: 'about',
    range: [0.22, 0.16],
    anchor: [0.22, -0.06],
    curve: [[-0.1, 0.15], [0.02, 0.42], [0.56, 0.48], [1.08, 0.14]],
    rotation: [-26, 27],
    scale: [0.86, 0.96, 0.88],
  }),
  scene({
    id: 'mobile-service-work',
    from: 'service',
    to: 'work',
    range: [0.68, 0.12],
    anchor: [0.76, -0.06],
    curve: [[1.08, 0.13], [0.98, 0.42], [0.46, 0.46], [-0.08, 0.16]],
    rotation: [25, -26],
    scale: [0.84, 0.94, 0.86],
  }),
  scene({
    id: 'mobile-endorsements-contact',
    from: 'endorsements-home',
    to: 'contact',
    range: [0.66, 0.14],
    anchor: [0.24, -0.05],
    curve: [[-0.08, 0.14], [0.03, 0.46], [0.58, 0.5], [1.08, 0.2]],
    rotation: [-24, 25],
  }),
  scene({
    id: 'mobile-contact-footer',
    from: 'contact',
    to: 'footer',
    range: [0.58, 0.08],
    anchor: [0.82, -0.04],
    curve: [[1.08, 0.18], [0.96, 0.22], [0.83, 0.4], [0.82, 0.58]],
    rotation: [22, 178],
    scale: [0.84, 0.9, 0.84],
    strandTo: 1,
    visibleTo: 1,
    hold: true,
    hang: true,
  }),
]

export function getSpiderSceneSet(width) {
  if (width < 640) return { mode: 'mobile', scenes: MOBILE_SPIDER_SCENES }
  if (width < 1024) return { mode: 'tablet', scenes: DESKTOP_SPIDER_SCENES }
  return { mode: 'desktop', scenes: DESKTOP_SPIDER_SCENES }
}
