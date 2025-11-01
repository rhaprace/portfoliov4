import { memo } from "react";
import type { CodeSymbol as CodeSymbolType } from "../data/symbols";

interface CodeSymbolProps {
  symbol: CodeSymbolType;
  color: string;
  size: number;
}

export const CodeSymbol = memo(({ symbol, size }: CodeSymbolProps) => {
  return (
    <div
      className="font-mono font-black flex items-center justify-center text-black opacity-80"
      style={{
        fontSize: `${size}px`,
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {symbol}
    </div>
  );
});

CodeSymbol.displayName = "CodeSymbol";

