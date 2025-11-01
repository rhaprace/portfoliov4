export interface OrbitalVisualProps {
  withSymbols?: boolean;
  position?: "center" | "right" | "top-left";
  size?: "large" | "small";
  opacity?: number;
  showCenter?: boolean;
}

export interface OrbitalRingProps {
  size?: number;
  opacity?: number;
  variant?: "center" | "positioned";
  borderColor?: string;
}

export interface CenteredOrbitalProps {
  withSymbols?: boolean;
  showCenter?: boolean;
}

export interface PositionedOrbitalProps {
  position: "right" | "top-left";
  size?: "large" | "small";
  opacity?: number;
}

