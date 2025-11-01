export const SCROLL_TRIGGER_CONFIGS = {
  entrance: {
    start: "top 85%",
    end: "top 20%",
    scrub: 0.5,
    fastScrollEnd: true,
  },
  exit: {
    start: "bottom 60%",
    end: "bottom 20%",
    scrub: 0.5,
    fastScrollEnd: true,
  },
  hero: {
    start: "top top",
    end: "bottom top",
    scrub: 0.3,
    fastScrollEnd: true,
  },
} as const;

export const EASING = {
  smooth: "power2.out",
  bounce: "bounce.inOut",
  strong: "power3.out",
  back: "back.out(1.5)",
  none: "none",
  sine: "sine.inOut",
} as const;

export const DURATIONS = {
  fast: 0.6,
  medium: 0.8,
  slow: 1.5,
  verySlow: 2.5,
} as const;

export const STAGGER = {
  tight: 0.03,
  normal: 0.05,
  loose: 0.1,
  veryLoose: 0.2,
} as const;

export const ANIMATION_DEFAULTS = {
  ease: EASING.smooth,
  duration: DURATIONS.medium,
} as const;

