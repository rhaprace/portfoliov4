import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import profileImage from "../assets/profile.jpg";
import { AboutOrbital } from "./AboutOrbital";

export const About = () => {
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
        start: "top 85%",
        end: "top 20%",
        scrub: 0.5,
        fastScrollEnd: true,
      },
    })
      .to(image, { opacity: 1, ease: "power2.out" })
      .to(titleSplit.words, {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        ease: "power2.out"
      }, "-=0.3")
      .to(
        contentSplits.flatMap((split) => split.lines),
        { opacity: 1, y: 0, stagger: 0.05, ease: "power3.out" },
        "-=0.3"
      );
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "bottom 60%",
        end: "bottom 20%",
        scrub: 0.5,
        fastScrollEnd: true,
      },
    })
      .to(image, { opacity: 0, ease: "bounce.inOut" })
      .to(
        [titleSplit.words, ...contentSplits.flatMap((split) => split.lines)],
        { opacity: 0, y: -50, ease: "bounce.inOut" },
        0
      );

    return () => {
      titleSplit.revert();
      contentSplits.forEach((split) => split.revert());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full flex items-center py-20 md:py-32 relative overflow-hidden bg-white">

      <AboutOrbital />

      <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-center px-8 md:px-16 gap-16 md:gap-24 lg:gap-32 relative z-10">
        <div className="about-image flex justify-center lg:justify-end py-8 lg:py-0">
          <div className="relative w-full max-w-lg">
            <div
              className="relative aspect-[4/5] rounded-3xl overflow-hidden border-8 border-black"
              style={{
                boxShadow: `
                  0 10px 30px -5px rgba(0, 0, 0, 0.15),
                  0 20px 50px -10px rgba(0, 0, 0, 0.12),
                  0 30px 70px -15px rgba(0, 0, 0, 0.08),
                  0 40px 90px -20px rgba(0, 0, 0, 0.04)
                `,
              }}
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="about-content-wrapper py-8 lg:py-0">
          <h2 className="about-title text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
            About Me
          </h2>
          <div className="space-y-6">
            <p className="about-content text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">
              I'm a passionate full-stack developer who loves creating beautiful and
              functional web experiences. With expertise in modern technologies and
              a keen eye for design, I bring ideas to life through clean code and
              thoughtful user interfaces.
            </p>
            <p className="about-content text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">
              My approach combines technical excellence with creative problem-solving,
              ensuring every project is both visually stunning and highly performant.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
