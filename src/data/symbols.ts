export type CodeSymbol = "{}" | "</>" | ";" | "()" | "[]" | "=>" | "<>" | "//" | "**" | "&&";

export interface CodeShape {
  id: string;
  symbol: CodeSymbol;
  color: string;
  orbitRadius: number;
  angle: number;
  size: number;
  depth: number;
}

export const codeSymbols: CodeShape[] = [
  {
    id: "symbol-1",
    symbol: "</>",
    color: "#000000",
    orbitRadius: 150,
    angle: 0,
    size: 32,
    depth: 1,
  },
  {
    id: "symbol-2",
    symbol: "{}",
    color: "#F3F4F6",
    orbitRadius: 150,
    angle: 180,
    size: 32,
    depth: 1,
  },
  {
    id: "symbol-3",
    symbol: "=>",
    color: "#1F2937",
    orbitRadius: 250,
    angle: 60,
    size: 28,
    depth: 2,
  },
  {
    id: "symbol-4",
    symbol: "()",
    color: "#D1D5DB",
    orbitRadius: 250,
    angle: 240,
    size: 28,
    depth: 2,
  },
  {
    id: "symbol-5",
    symbol: "[]",
    color: "#374151",
    orbitRadius: 350,
    angle: 30,
    size: 28,
    depth: 3,
  },
  {
    id: "symbol-6",
    symbol: ";",
    color: "#E5E7EB",
    orbitRadius: 350,
    angle: 150,
    size: 28,
    depth: 3,
  },
  {
    id: "symbol-7",
    symbol: "//",
    color: "#6B7280",
    orbitRadius: 350,
    angle: 270,
    size: 28,
    depth: 3,
  },
  {
    id: "symbol-8",
    symbol: "<>",
    color: "#111827",
    orbitRadius: 450,
    angle: 90,
    size: 28,
    depth: 4,
  },
  {
    id: "symbol-9",
    symbol: "&&",
    color: "#F9FAFB",
    orbitRadius: 450,
    angle: 210,
    size: 28,
    depth: 4,
  },
  {
    id: "symbol-10",
    symbol: "**",
    color: "#9CA3AF",
    orbitRadius: 450,
    angle: 330,
    size: 28,
    depth: 4,
  },
];

