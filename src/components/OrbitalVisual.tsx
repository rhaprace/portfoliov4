import { useOrbitalAnimation } from "../hooks/useOrbitalAnimation";
import { codeSymbols } from "../data/symbols";
import { CodeSymbol } from "./CodeSymbol";

export const OrbitalVisual = () => {
  const containerRef = useOrbitalAnimation();

  return (
    <div
      ref={containerRef}
      className="orbital-visual relative w-full h-full flex items-center justify-center"
    >
      <div className="absolute w-[900px] h-[900px] rounded-full border border-gray-800 orbital-ring opacity-8"></div>
      <div className="absolute w-[700px] h-[700px] rounded-full border border-gray-700 orbital-ring opacity-10"></div>
      <div className="absolute w-[500px] h-[500px] rounded-full border border-gray-600 orbital-ring opacity-12"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full border border-gray-600 orbital-ring opacity-15"></div>

      <div className="absolute w-32 h-32 bg-black rounded-full flex items-center justify-center text-white text-5xl font-black shadow-2xl border-4 border-gray-300">
        R
      </div>

      {codeSymbols.map((symbol) => {
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
              <CodeSymbol
                symbol={symbol.symbol}
                color={symbol.color}
                size={symbol.size}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

