import { useEffect } from "react";
import { gsap } from "gsap";

const ROTATION_DURATION = {
  small: { base: 25, increment: 10 },
  large: { base: 40, increment: 15 },
} as const;

const FULL_ROTATION = 360;
const DESKTOP_BREAKPOINT = "(min-width: 1024px)";

export const useOrbitalRingsAnimation = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  size: "large" | "small",
  desktopOnly: boolean = false
) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const context = gsap.context(() => {
      const mm = gsap.matchMedia();

      const animateRings = () => {
        const rings = gsap.utils.toArray<HTMLElement>(".orbital-ring");
        const config = ROTATION_DURATION[size];

        rings.forEach((ring, index) => {
          const duration = config.base + index * config.increment;

          gsap.to(ring, {
            rotation: FULL_ROTATION,
            duration,
            ease: "none",
            repeat: -1,
          });
        });
      };

      if (desktopOnly) {
        mm.add(DESKTOP_BREAKPOINT, () => {
          animateRings();
        });
      } else {
        animateRings();
      }
    }, containerRef);

    return () => context.revert();
  }, [containerRef, size, desktopOnly]);
};

