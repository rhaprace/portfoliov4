import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AboutOrbitalProps {
  position?: "right" | "top-left";
  size?: "large" | "small";
  opacity?: number;
}

export const AboutOrbital = ({
  position = "right",
  size = "large",
  opacity = 1
}: AboutOrbitalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const rings = containerRef.current.querySelectorAll(".orbital-ring");

    rings.forEach((ring, index) => {
      const duration = size === "small" ? 25 + index * 10 : 40 + index * 15;

      gsap.to(ring, {
        rotation: 360,
        duration: duration,
        ease: "none",
        repeat: -1,
      });
    });
  }, [size]);

  const positionStyles = position === "top-left"
    ? { top: 0, left: 0, transform: "translate(-40%, -40%)" }
    : { right: 0, top: "50%", transform: "translate(50%, -50%)" };

  const sizeConfig = size === "small"
    ? { container: 400, rings: [400, 300, 200, 100] }
    : { container: 1400, rings: [1400, 1100, 800, 500] };

  const opacityValue = size === "small" ? opacity * 0.2 : opacity;

  return (
    <div
      ref={containerRef}
      className="absolute pointer-events-none"
      style={{
        ...positionStyles,
        width: `${sizeConfig.container}px`,
        height: `${sizeConfig.container}px`,
        opacity: opacityValue,
      }}
    >
      <div className="orbital-ring absolute w-full h-full rounded-full border-2 border-black opacity-20"></div>
      <div
        className="orbital-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black opacity-15"
        style={{ width: `${sizeConfig.rings[1]}px`, height: `${sizeConfig.rings[1]}px` }}
      ></div>
      <div
        className="orbital-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black opacity-12"
        style={{ width: `${sizeConfig.rings[2]}px`, height: `${sizeConfig.rings[2]}px` }}
      ></div>
      <div
        className="orbital-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black opacity-10"
        style={{ width: `${sizeConfig.rings[3]}px`, height: `${sizeConfig.rings[3]}px` }}
      ></div>
    </div>
  );
};

