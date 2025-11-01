import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useSeparatorAnimation = () => {
  const separatorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!separatorRef.current) return;

    const ctx = gsap.context(() => {
      const separator = separatorRef.current;
      if (!separator) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: separator,
          start: "top top",
          end: "+=100vh",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });

        gsap.fromTo(
          separator,
          { opacity: 1, scale: 1 },
          {
            opacity: 0,
            scale: 0.95,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: separator,
              start: "top top",
              end: "+=100vh",
              scrub: 0.5,
              fastScrollEnd: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return separatorRef;
};

