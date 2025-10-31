import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useHeroAnimation = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const heroElements = ".hero-greeting, .hero-name, .hero-title, .hero-description, .hero-cta";
      const orbitalVisual = ".orbital-visual";

      const heroSection = containerRef.current;
      if (!heroSection) return;

      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const initialScrollY = window.scrollY;

      if (initialScrollY > heroBottom) {
        gsap.set(heroElements, { opacity: 0, y: -50 });
        gsap.set(orbitalVisual, { opacity: 0, scale: 0.8 });
      } else {
        gsap.set(heroElements, { opacity: 1, y: 0 });
        gsap.set(orbitalVisual, { opacity: 1, scale: 1 });
        if (initialScrollY < 100) {
          gsap.timeline({ defaults: { ease: "power3.out" } })
            .from(".hero-greeting", { opacity: 0, y: 30, duration: 0.8 })
            .from(".hero-name", { opacity: 0, y: 30, duration: 0.8 }, "-=0.4")
            .from(".hero-title", { opacity: 0, y: 30, duration: 0.8 }, "-=0.4")
            .from(".hero-description", { opacity: 0, y: 30, duration: 0.8 }, "-=0.4")
            .from(".hero-cta", { opacity: 0, y: 20, duration: 0.6 }, "-=0.2");
        }
      }
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        onEnter: () => {
          gsap.to(heroElements, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(orbitalVisual, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
        onLeave: () => {
          gsap.to(heroElements, {
            opacity: 0,
            y: -50,
            duration: 0.4,
            stagger: 0.02,
            ease: "power2.in",
            overwrite: "auto",
          });
          gsap.to(orbitalVisual, {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "power2.in",
            overwrite: "auto",
          });
        },
        onEnterBack: () => {
          gsap.to(heroElements, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(orbitalVisual, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);

  return containerRef;
};
