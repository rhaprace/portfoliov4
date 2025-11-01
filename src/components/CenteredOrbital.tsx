import { useRef } from "react";
import { codeSymbols } from "../data/symbols";
import { CodeSymbol } from "./CodeSymbol";
import { OrbitalRing } from "./OrbitalRing";
import { useOrbitalSymbolsAnimation } from "../hooks/useOrbitalSymbolsAnimation";
import { useOrbitalRingsAnimation } from "../hooks/useOrbitalRingsAnimation";
import { CENTER_RINGS } from "../constants/orbital";
import type { CenteredOrbitalProps } from "../types/orbital";

export const CenteredOrbital = ({
  withSymbols = false,
  showCenter = false,
}: CenteredOrbitalProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useOrbitalSymbolsAnimation(containerRef, withSymbols);
  useOrbitalRingsAnimation(containerRef, "large", withSymbols);

  return (
    <div
      ref={containerRef}
      className="orbital-visual relative w-full h-full flex items-center justify-center"
    >
      {CENTER_RINGS.map((ring, index) => (
        <OrbitalRing
          key={index}
          variant="center"
          size={ring.size}
          opacity={ring.opacity}
          borderColor={ring.borderColor}
        />
      ))}

      {showCenter && (
        <div className="absolute w-32 h-32 bg-black rounded-full flex items-center justify-center text-white text-5xl font-black shadow-2xl border-4 border-gray-300">
          R
        </div>
      )}

      {withSymbols &&
        codeSymbols.map((symbol) => (
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
        ))}
    </div>
  );
};

