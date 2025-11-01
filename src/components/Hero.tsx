import { useHeroAnimation } from "../hooks/useHeroAnimation";
import { HeroContent } from "./HeroContent";
import { CenteredOrbital } from "./CenteredOrbital";
import { PositionedOrbital } from "./PositionedOrbital";
import { ScrollIndicator } from "./ScrollIndicator";

export const Hero = () => {
  const containerRef = useHeroAnimation();

  return (
    <section ref={containerRef} className="h-screen w-full overflow-hidden relative">
      <div className="lg:hidden">
        <PositionedOrbital position="top-left" size="small" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <HeroContent />
        <div className="hidden lg:flex items-center justify-center">
          <CenteredOrbital withSymbols showCenter />
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
};
