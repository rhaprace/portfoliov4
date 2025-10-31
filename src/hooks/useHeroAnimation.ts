import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const useHeroAnimation = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-greeting", { opacity: 0, y: 30, duration: 0.8 })
        .from(".hero-name", { opacity: 0, y: 30, duration: 0.8 }, "-=0.4")
        .from(".hero-title", { opacity: 0, y: 30, duration: 0.8 }, "-=0.4")
        .from(".hero-description", { opacity: 0, y: 30, duration: 0.8 }, "-=0.4")
        .from(".hero-cta", { opacity: 0, y: 20, duration: 0.6 }, "-=0.2");
    }, containerRef);

    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center top",
        end: "bottom top",
        scrub: 1,
      },
    })
      .to(".hero-greeting, .hero-name, .hero-title, .hero-description, .hero-cta", {
        opacity: 0,
        y: -50,
        stagger: 0.05,
        ease: "power2.in",
      })
      .to(".orbital-visual", { opacity: 0, scale: 0.8, ease: "power2.in" }, 0);

    return () => ctx.revert();
  }, []);

  return containerRef;
};

