import { gsap } from "gsap";
import { Hero } from "./components/Hero";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { SectionSeparator } from "./components/SectionSeparator";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const App = () => {
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
