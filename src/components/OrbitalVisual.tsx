import type { OrbitalVisualProps } from "../types/orbital";
import { CenteredOrbital } from "./CenteredOrbital";
import { PositionedOrbital } from "./PositionedOrbital";

export const OrbitalVisual = ({
  withSymbols = false,
  position = "center",
  size = "large",
  opacity = 1,
  showCenter = false,
}: OrbitalVisualProps) => {
  if (position === "center") {
    return <CenteredOrbital withSymbols={withSymbols} showCenter={showCenter} />;
  }

  return <PositionedOrbital position={position} size={size} opacity={opacity} />;
};
