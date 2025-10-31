import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const useOrbitalAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const context = gsap.context(() => {
      const orbitContainers = gsap.utils.toArray<HTMLElement>(".orbit-container");

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

      gsap.from(".orbital-ring", {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.2,
      });

      gsap.from(".code-symbol", {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.5)",
        stagger: 0.1,
        delay: 0.5,
      });
    }, containerRef);

    return () => context.revert();
  }, []);

  return containerRef;
};

