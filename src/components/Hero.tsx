import { useHeroAnimation } from "../hooks/useHeroAnimation";
import { HeroContent } from "./HeroContent";
import { OrbitalVisual } from "./OrbitalVisual";
import { ScrollIndicator } from "./ScrollIndicator";

export const Hero = () => {
  const containerRef = useHeroAnimation();

  return (
    <section ref={containerRef} className="h-screen w-full overflow-hidden relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <HeroContent />
        <div className="hidden lg:flex items-center justify-center">
          <OrbitalVisual />
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
};
