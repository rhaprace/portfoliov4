import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const useOrbitalAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const context = gsap.context(() => {
      const orbitContainers = gsap.utils.toArray<HTMLElement>(".orbit-container");
      const rings = gsap.utils.toArray<HTMLElement>(".orbital-ring");
      const symbols = gsap.utils.toArray<HTMLElement>(".code-symbol");

      const isAtTop = window.scrollY < 100;

      if (isAtTop) {
        gsap.set(rings, { scale: 0, opacity: 0 });
        gsap.set(symbols, { scale: 0, opacity: 0 });
      } else {
        gsap.set(rings, { scale: 1, opacity: 1 });
        gsap.set(symbols, { scale: 1, opacity: 1 });
      }

      orbitContainers.forEach((container) => {
        const depth = parseInt(container.dataset.depth || "1");
        const startAngle = parseInt(container.dataset.startAngle || "0");
        const baseDuration = 20;
        const duration = baseDuration + (depth * 5);
        const direction = depth % 2 === 0 ? 1 : -1;

        gsap.set(container, {
          rotation: startAngle,
          transformOrigin: "center center",
        });

        gsap.to(container, {
          rotation: startAngle + (360 * direction),
          duration: duration,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center",
        });

        const symbolElement = container.querySelector(".code-symbol");
        if (symbolElement) {
          gsap.set(symbolElement, {
            rotation: -startAngle,
          });

          gsap.to(symbolElement, {
            rotation: -startAngle + (-360 * direction),
            duration: duration,
            repeat: -1,
            ease: "none",
          });

          gsap.to(symbolElement, {
            y: -3 * depth,
            duration: 2.5 + depth * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });

      if (isAtTop) {
        gsap.to(rings, {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.2,
        });

        gsap.to(symbols, {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.5)",
          stagger: 0.1,
          delay: 0.5,
        });
      }
    }, containerRef);

    return () => context.revert();
  }, []);

  return containerRef;
};

