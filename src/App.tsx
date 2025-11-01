import { useEffect } from "react";
import { gsap } from "gsap";
import { Hero } from "./components/Hero";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";
import { SectionSeparator } from "./components/SectionSeparator";
import { useVisitorTracking } from "./hooks/useVisitorTracking";

gsap.registerPlugin(ScrollTrigger, SplitText);

const SCROLL_TRIGGER_CONFIG = {
  syncInterval: 50,
  refreshDelay: 100,
} as const;

export const App = () => {
  useVisitorTracking();

  useEffect(() => {
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: SCROLL_TRIGGER_CONFIG.syncInterval,
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, SCROLL_TRIGGER_CONFIG.refreshDelay);

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
    <>
      <main>
        <Hero />
        <SectionSeparator />
        <About />
        <SectionSeparator />
        <Experience />
        <SectionSeparator />
        <Projects />
      </main>
      <Footer />
    </>
  );
};
