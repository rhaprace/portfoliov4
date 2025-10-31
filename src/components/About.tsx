import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import profileImage from "../assets/profile.jpg";

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".about-image, .about-title, .about-content", { opacity: 1, x: 0, y: 0, scale: 1 });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
      })
        .fromTo(".about-image",
          { opacity: 0, x: -80, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, ease: "power3.out" }
        )
        .fromTo(".about-title",
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(".about-content",
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, stagger: 0.2, ease: "power3.out" },
          "-=0.5"
        );

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 40%",
          end: "bottom top",
          scrub: 1,
        },
      })
        .to(".about-image", { opacity: 0, x: -50, ease: "power2.in" })
        .to(".about-title, .about-content", { opacity: 0, y: -100, ease: "power2.in" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full bg-white flex items-center py-20 md:py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-center px-8 md:px-16 gap-12 md:gap-16 lg:gap-20">
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
