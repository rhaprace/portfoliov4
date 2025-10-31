import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const useHeroAnimation = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .from(".hero-greeting", {
          opacity: 0,
          y: 30,
          duration: 0.8,
        })
        .from(
          ".hero-name",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          ".hero-title",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.2"
        );
    }, containerRef);

    return () => context.revert();
  }, []);

  return containerRef;
};

