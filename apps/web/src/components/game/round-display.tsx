import { rgbToHex } from "../../lib/color";
import type { RGB } from "../../lib/game-types";

interface RoundDisplayProps {
  color: RGB;
}

export default function RoundDisplay({ color }: RoundDisplayProps) {
  const hex = rgbToHex(color);

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 animate-in fade-in zoom-in-95 duration-500">
      <span className="font-body text-xs tracking-[0.25em] text-white/30 uppercase">
        Memorize this color
      </span>

      <div className="relative">
        {/* Glow behind */}
        <div
          className="absolute inset-0 scale-110 rounded-[2rem] opacity-30 blur-3xl"
          style={{ backgroundColor: hex }}
        />
        {/* Main swatch */}
        <div
          className="relative h-48 w-48 rounded-[2rem] ring-1 ring-white/10 sm:h-56 sm:w-56"
          style={{ backgroundColor: hex }}
        />
      </div>

      <span className="font-body text-xs text-white/20">
        Remember it well...
      </span>
    </div>
  );
}
