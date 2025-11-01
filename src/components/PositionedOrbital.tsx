import { useRef } from "react";
import { OrbitalRing } from "./OrbitalRing";
import { useOrbitalRingsAnimation } from "../hooks/useOrbitalRingsAnimation";
import { POSITION_STYLES, SIZE_CONFIG, POSITIONED_RING_OPACITIES } from "../constants/orbital";
import type { PositionedOrbitalProps } from "../types/orbital";

export const PositionedOrbital = ({
  position,
  size = "large",
  opacity = 1,
}: PositionedOrbitalProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useOrbitalRingsAnimation(containerRef, size, false);

  const sizeConfig = SIZE_CONFIG[size];
  const opacityValue = size === "small" ? opacity * 0.2 : opacity;

  const containerStyle = {
    ...POSITION_STYLES[position],
    width: `${sizeConfig.container}px`,
    height: `${sizeConfig.container}px`,
    opacity: opacityValue,
  };

  return (
    <div ref={containerRef} className="absolute pointer-events-none" style={containerStyle}>
      {sizeConfig.rings.map((ringSize, index) => (
        <OrbitalRing
          key={index}
          size={ringSize}
          opacity={POSITIONED_RING_OPACITIES[index]}
        />
      ))}
    </div>
  );
};

