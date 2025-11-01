import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { SCROLL_TRIGGER_CONFIGS, EASING, STAGGER } from "../utils/animationConfigs";

export const useAboutAnimation = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const image = section.querySelector(".about-image");
    const title = section.querySelector(".about-title");
    const contentElements = section.querySelectorAll(".about-content");

    if (!image || !title || contentElements.length === 0) return;

    const titleSplit = new SplitText(title, { type: "words" });
    const contentSplits = Array.from(contentElements).map(
      (el) => new SplitText(el, { type: "lines" })
    );
    gsap.set(image, { opacity: 0 });
    gsap.set(titleSplit.words, { opacity: 0, y: 100 });
    contentSplits.forEach((split) => {
      gsap.set(split.lines, { opacity: 0, y: 50 });
    });
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        ...SCROLL_TRIGGER_CONFIGS.entrance,
      },
    })
      .to(image, { opacity: 1, ease: EASING.smooth })
      .to(titleSplit.words, {
        opacity: 1,
        y: 0,
        stagger: STAGGER.tight,
        ease: EASING.smooth
      }, "-=0.3")
      .to(
        contentSplits.flatMap((split) => split.lines),
        { opacity: 1, y: 0, stagger: STAGGER.normal, ease: EASING.strong },
        "-=0.3"
      );
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        ...SCROLL_TRIGGER_CONFIGS.exit,
      },
    })
      .to(image, { opacity: 0, ease: EASING.bounce })
      .to(
        [titleSplit.words, ...contentSplits.flatMap((split) => split.lines)],
        { opacity: 0, y: -50, ease: EASING.bounce },
        0
      );

    return () => {
      titleSplit.revert();
      contentSplits.forEach((split) => split.revert());
    };
  }, [sectionRef]);

  return sectionRef;
}