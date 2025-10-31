import { useEffect } from "react";
import { gsap } from "gsap";
import { Hero } from "./components/Hero";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { SectionSeparator } from "./components/SectionSeparator";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const App = () => {
  useEffect(() => {
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 50,
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main>
      <Hero />
      <SectionSeparator />
      <About />
      <SectionSeparator />
      <Projects />
    </main>
  );
};
