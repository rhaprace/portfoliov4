import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".projects-title, .project-card", { opacity: 1, x: 0, y: 0, scale: 1 });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top 20%",
          scrub: 0.5,
          fastScrollEnd: true,
        },
      })
        .fromTo(".projects-title",
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, ease: "power2.out" }
        )
        .fromTo(".project-card",
          { opacity: 0, y: 80, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.1, ease: "power2.out" },
          "-=0.3"
        );

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 60%",
          end: "bottom 20%",
          scrub: 0.5,
          fastScrollEnd: true,
        },
      })
        .to(".projects-title", { opacity: 0, x: 100, ease: "power2.in" })
        .to(".project-card", { opacity: 0, y: -50, stagger: 0.05, ease: "power2.in" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full bg-gray-50 px-8 md:px-16 py-20 flex items-center"
    >
      <div className="w-full">
        <h2 className="projects-title text-6xl md:text-8xl font-black mb-16 leading-none">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="project-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-6"></div>
            <h3 className="text-2xl font-bold mb-3">Project One</h3>
            <p className="text-gray-600 mb-4">
              A beautiful web application built with modern technologies.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-black text-white text-sm rounded-full">
                React
              </span>
              <span className="px-3 py-1 bg-black text-white text-sm rounded-full">
                TypeScript
              </span>
            </div>
          </div>

          <div className="project-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-6"></div>
            <h3 className="text-2xl font-bold mb-3">Project Two</h3>
            <p className="text-gray-600 mb-4">
              An innovative solution for complex problems.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-black text-white text-sm rounded-full">
                Node.js
              </span>
              <span className="px-3 py-1 bg-black text-white text-sm rounded-full">
                GSAP
              </span>
            </div>
          </div>

          <div className="project-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-6"></div>
            <h3 className="text-2xl font-bold mb-3">Project Three</h3>
            <p className="text-gray-600 mb-4">
              A creative approach to user experience design.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-black text-white text-sm rounded-full">
                Tailwind
              </span>
              <span className="px-3 py-1 bg-black text-white text-sm rounded-full">
                Vite
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

