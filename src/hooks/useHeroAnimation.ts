import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HERO_SELECTORS = {
  elements: ".hero-greeting, .hero-name, .hero-title, .hero-description, .hero-cta",
  orbital: ".orbital-visual",
} as const;

const ANIMATION_CONFIG = {
  initialScrollThreshold: 100,
  fadeOut: { opacity: 0, y: -50, scale: 0.8 },
  fadeIn: { opacity: 1, y: 0, scale: 1 },
  duration: { normal: 0.8, short: 0.6, medium: 0.4, long: 0.5 },
  stagger: { normal: 0.05, tight: 0.02 },
  offset: { normal: "-=0.4", short: "-=0.2" },
} as const;

export const useHeroAnimation = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const heroSection = containerRef.current;
      if (!heroSection) return;

      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const initialScrollY = window.scrollY;

      if (initialScrollY > heroBottom) {
        gsap.set(HERO_SELECTORS.elements, { opacity: ANIMATION_CONFIG.fadeOut.opacity, y: ANIMATION_CONFIG.fadeOut.y });
        gsap.set(HERO_SELECTORS.orbital, { opacity: ANIMATION_CONFIG.fadeOut.opacity, scale: ANIMATION_CONFIG.fadeOut.scale });
      } else {
        gsap.set(HERO_SELECTORS.elements, { opacity: ANIMATION_CONFIG.fadeIn.opacity, y: ANIMATION_CONFIG.fadeIn.y });
        gsap.set(HERO_SELECTORS.orbital, { opacity: ANIMATION_CONFIG.fadeIn.opacity, scale: ANIMATION_CONFIG.fadeIn.scale });
        if (initialScrollY < ANIMATION_CONFIG.initialScrollThreshold) {
          gsap.timeline({ defaults: { ease: "power3.out" } })
            .from(".hero-greeting", { opacity: 0, y: 30, duration: ANIMATION_CONFIG.duration.normal })
            .from(".hero-name", { opacity: 0, y: 30, duration: ANIMATION_CONFIG.duration.normal }, ANIMATION_CONFIG.offset.normal)
            .from(".hero-title", { opacity: 0, y: 30, duration: ANIMATION_CONFIG.duration.normal }, ANIMATION_CONFIG.offset.normal)
            .from(".hero-description", { opacity: 0, y: 30, duration: ANIMATION_CONFIG.duration.normal }, ANIMATION_CONFIG.offset.normal)
            .from(".hero-cta", { opacity: 0, y: 20, duration: ANIMATION_CONFIG.duration.short }, ANIMATION_CONFIG.offset.short);
        }
      }
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        onEnter: () => {
          gsap.to(HERO_SELECTORS.elements, {
            opacity: ANIMATION_CONFIG.fadeIn.opacity,
            y: ANIMATION_CONFIG.fadeIn.y,
            duration: ANIMATION_CONFIG.duration.medium,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(HERO_SELECTORS.orbital, {
            opacity: ANIMATION_CONFIG.fadeIn.opacity,
            scale: ANIMATION_CONFIG.fadeIn.scale,
            duration: ANIMATION_CONFIG.duration.medium,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
        onLeave: () => {
          gsap.to(HERO_SELECTORS.elements, {
            opacity: ANIMATION_CONFIG.fadeOut.opacity,
            y: ANIMATION_CONFIG.fadeOut.y,
            duration: ANIMATION_CONFIG.duration.medium,
            stagger: ANIMATION_CONFIG.stagger.tight,
            ease: "power2.in",
            overwrite: "auto",
          });
          gsap.to(HERO_SELECTORS.orbital, {
            opacity: ANIMATION_CONFIG.fadeOut.opacity,
            scale: ANIMATION_CONFIG.fadeOut.scale,
            duration: ANIMATION_CONFIG.duration.medium,
            ease: "power2.in",
            overwrite: "auto",
          });
        },
        onEnterBack: () => {
          gsap.to(HERO_SELECTORS.elements, {
            opacity: ANIMATION_CONFIG.fadeIn.opacity,
            y: ANIMATION_CONFIG.fadeIn.y,
            duration: ANIMATION_CONFIG.duration.long,
            stagger: ANIMATION_CONFIG.stagger.normal,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(HERO_SELECTORS.orbital, {
            opacity: ANIMATION_CONFIG.fadeIn.opacity,
            scale: ANIMATION_CONFIG.fadeIn.scale,
            duration: ANIMATION_CONFIG.duration.long,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, ANIMATION_CONFIG.initialScrollThreshold);
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);

  return containerRef;
};
