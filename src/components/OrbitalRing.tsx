import type { OrbitalRingProps } from "../types/orbital";

export const OrbitalRing = ({
  size = 100,
  opacity = 1,
  variant = "positioned",
  borderColor = "border-black",
}: OrbitalRingProps) => {
  if (variant === "center") {
    return (
      <div
        className={`absolute rounded-full border ${borderColor} orbital-ring`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          opacity: opacity,
        }}
      ></div>
    );
  }

  return (
    <div
      className={`orbital-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${borderColor}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        opacity: opacity,
      }}
    ></div>
  );
};
