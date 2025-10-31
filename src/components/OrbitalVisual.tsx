import { useRef } from "react";
import { codeSymbols } from "../data/symbols";
import { CodeSymbol } from "./CodeSymbol";
import { OrbitalRing } from "./OrbitalRing";
import { useOrbitalSymbolsAnimation } from "../hooks/useOrbitalSymbolsAnimation";
import { useOrbitalRingsAnimation } from "../hooks/useOrbitalRingsAnimation";

interface OrbitalVisualProps {
  withSymbols?: boolean;
  position?: "center" | "right" | "top-left";
  size?: "large" | "small";
  opacity?: number;
  showCenter?: boolean;
}

export const OrbitalVisual = ({
  withSymbols = false,
  position = "center",
  size = "large",
  opacity = 1,
  showCenter = false,
}: OrbitalVisualProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useOrbitalSymbolsAnimation(containerRef, withSymbols);
  useOrbitalRingsAnimation(containerRef, withSymbols ? "large" : size);

  const positionStyles =
    position === "top-left"
      ? { top: 0, left: 0, transform: "translate(-40%, -40%)" }
      : position === "right"
      ? { right: 0, top: "50%", transform: "translate(50%, -50%)" }
      : {};

  const sizeConfig =
    size === "small"
      ? { container: 400, rings: [400, 300, 200, 100] }
      : { container: 1400, rings: [1400, 1100, 800, 500] };

  const opacityValue = size === "small" ? opacity * 0.2 : opacity;

  const containerClass =
    position === "center"
      ? "orbital-visual relative w-full h-full flex items-center justify-center"
      : "absolute pointer-events-none";

  const containerStyle =
    position === "center"
      ? {}
      : {
          ...positionStyles,
          width: `${sizeConfig.container}px`,
          height: `${sizeConfig.container}px`,
          opacity: opacityValue,
        };

  return (
    <div ref={containerRef} className={containerClass} style={containerStyle}>
      {position === "center" ? (
        <>
          <OrbitalRing variant="center" size={900} opacity={0.08} borderColor="border-gray-800" />
          <OrbitalRing variant="center" size={700} opacity={0.1} borderColor="border-gray-700" />
          <OrbitalRing variant="center" size={500} opacity={0.12} borderColor="border-gray-600" />
          <OrbitalRing variant="center" size={300} opacity={0.15} borderColor="border-gray-600" />
        </>
      ) : (
        <>
          <OrbitalRing size={sizeConfig.rings[0]} opacity={0.2} />
          <OrbitalRing size={sizeConfig.rings[1]} opacity={0.15} />
          <OrbitalRing size={sizeConfig.rings[2]} opacity={0.12} />
          <OrbitalRing size={sizeConfig.rings[3]} opacity={0.1} />
        </>
      )}

      {showCenter && (
        <div className="absolute w-32 h-32 bg-black rounded-full flex items-center justify-center text-white text-5xl font-black shadow-2xl border-4 border-gray-300">
          R
        </div>
      )}

      {withSymbols &&
        codeSymbols.map((symbol) => {
          return (
            <div
              key={symbol.id}
              className="orbit-container absolute"
              data-depth={symbol.depth}
              data-radius={symbol.orbitRadius}
              data-start-angle={symbol.angle}
              style={{
                left: "50%",
                top: "50%",
                width: `${symbol.orbitRadius * 2}px`,
                height: `${symbol.orbitRadius * 2}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="code-symbol absolute"
                style={{
                  left: "50%",
                  top: "0",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <CodeSymbol symbol={symbol.symbol} color={symbol.color} size={symbol.size} />
              </div>
            </div>
          );
        })}
    </div>
  );
};

