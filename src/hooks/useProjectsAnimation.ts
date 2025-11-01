import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../utils/dataCache";

export const useProjectsAnimation = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const projectSelectors = useMemo(() => {
    return projects.map((project) => ({
      id: project.id,
      projectElement: `.project-${project.id}`,
      titleElement: `.project-${project.id}-title`,
      activeIndicator: `.project-${project.id}-indicator`,
      imagesSelector: `.project-${project.id}-image`,
    }));
  }, []); // Empty deps - projects are frozen and never change (no re-render)

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      projectSelectors.forEach(({ projectElement, titleElement, activeIndicator, imagesSelector }) => {
        const images = gsap.utils.toArray(imagesSelector);

        gsap.set(activeIndicator, { transformOrigin: "left center" });

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          gsap.set(titleElement, { opacity: 0, y: 20 });
          gsap.set(activeIndicator, { scaleX: 0 });

          ScrollTrigger.create({
            trigger: projectElement,
            start: "top top+=100",
            end: "bottom top+=200",
            pin: titleElement,
            pinSpacing: false,
          });

          const fadeInTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: projectElement,
              start: "top bottom",
              end: "top center",
              scrub: 0.3,
              fastScrollEnd: true,
            },
          });

          fadeInTimeline
            .to(titleElement, { opacity: 1, y: 0, ease: "power2.out" }, 0)
            .to(activeIndicator, { scaleX: 1, ease: "power2.out" }, 0);

          const fadeOutTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: projectElement,
              start: "bottom bottom",
              end: "bottom bottom-=100",
              scrub: 0.2,
              fastScrollEnd: true,
            },
          });

          fadeOutTimeline
            .to(titleElement, { opacity: 0, y: -20, ease: "power2.in" }, 0)
            .to(activeIndicator, { scaleX: 0, ease: "power2.in" }, 0);
        });

        mm.add("(max-width: 1023px)", () => {
          gsap.set(titleElement, { opacity: 0, y: 30 });
          gsap.set(activeIndicator, { scaleX: 0 });

          const mobileTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: projectElement,
              start: "top 80%",
              end: "top 40%",
              scrub: 0.3,
              fastScrollEnd: true,
            },
          });

          mobileTimeline
            .to(titleElement, { opacity: 1, y: 0, ease: "power2.out" }, 0)
            .to(activeIndicator, { scaleX: 1, ease: "power2.out" }, 0);

          images.forEach((image) => {
            gsap.set(image as HTMLElement, { opacity: 0, y: 40 });

            gsap.to(image as HTMLElement, {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: image as HTMLElement,
                start: "top 85%",
                end: "top 60%",
                scrub: 0.5,
                fastScrollEnd: true,
              },
            });
          });
        });

        mm.add("(min-width: 1024px)", () => {
          images.forEach((image, imgIndex) => {
            const speed = 1 + imgIndex * 0.2;

            gsap.to(image as HTMLElement, {
              y: () => -80 * speed,
              ease: "none",
              scrollTrigger: {
                trigger: projectElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.3,
                fastScrollEnd: true,
              },
            });
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projectSelectors]); // Only re-run if selectors change (they won't)

  return sectionRef;
};
