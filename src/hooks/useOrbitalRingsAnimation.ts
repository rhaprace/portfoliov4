import { useEffect } from "react";
import { gsap } from "gsap";

export const useOrbitalRingsAnimation = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  size: "large" | "small"
) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const context = gsap.context(() => {
      const rings = gsap.utils.toArray<HTMLElement>(".orbital-ring");

      rings.forEach((ring, index) => {
        const duration = size === "small" ? 25 + index * 10 : 40 + index * 15;

        gsap.to(ring, {
          rotation: 360,
          duration: duration,
          ease: "none",
          repeat: -1,
        });
      });
    }, containerRef);

    return () => context.revert();
  }, [containerRef, size]);
};

