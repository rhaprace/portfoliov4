import { useSeparatorAnimation } from "../hooks/useSeparatorAnimation";

export const SectionSeparator = () => {
  const separatorRef = useSeparatorAnimation();

  return (
    <div ref={separatorRef} className="w-full relative h-12 overflow-hidden z-40">
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-white"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white"></div>
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1200 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,12 L30,0 L60,12 L90,0 L120,12 L150,0 L180,12 L210,0 L240,12 L270,0 L300,12 L330,0 L360,12 L390,0 L420,12 L450,0 L480,12 L510,0 L540,12 L570,0 L600,12 L630,0 L660,12 L690,0 L720,12 L750,0 L780,12 L810,0 L840,12 L870,0 L900,12 L930,0 L960,12 L990,0 L1020,12 L1050,0 L1080,12 L1110,0 L1140,12 L1170,0 L1200,12"
          stroke="rgba(0, 0, 0, 0.15)"
          strokeWidth="2"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

