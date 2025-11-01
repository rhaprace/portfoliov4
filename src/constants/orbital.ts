export const POSITION_STYLES = {
  "top-left": { top: 0, left: 0, transform: "translate(-40%, -40%)" },
  right: { right: 0, top: "50%", transform: "translate(50%, -50%)" },
  center: {},
} as const;

export const SIZE_CONFIG = {
  small: { container: 400, rings: [400, 300, 200, 100] },
  large: { container: 1400, rings: [1400, 1100, 800, 500] },
} as const;

export const CENTER_RINGS = [
  { size: 900, opacity: 0.08, borderColor: "border-gray-800" },
  { size: 700, opacity: 0.1, borderColor: "border-gray-700" },
  { size: 500, opacity: 0.12, borderColor: "border-gray-600" },
  { size: 300, opacity: 0.15, borderColor: "border-gray-600" },
] as const;

export const POSITIONED_RING_OPACITIES = [0.2, 0.15, 0.12, 0.1] as const;

