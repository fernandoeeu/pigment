import { cn } from "@color-game/ui/lib/utils";
import { rgbToHex } from "../../lib/color";
import type { RGB } from "../../lib/game-types";

interface ColorSwatchProps {
  color: RGB;
  showHex?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg" | "full";
  className?: string;
}

const sizeMap = {
  sm: "h-16 w-16 rounded-xl",
  md: "h-24 w-24 rounded-2xl",
  lg: "h-40 w-40 rounded-3xl",
  full: "h-full w-full rounded-3xl",
};

export default function ColorSwatch({
  color,
  showHex = false,
  label,
  size = "md",
  className,
}: ColorSwatchProps) {
  const hex = rgbToHex(color);

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {label && (
        <span className="font-body text-xs tracking-widest text-white/50 uppercase">
          {label}
        </span>
      )}
      <div
        className={cn(
          "ring-1 ring-white/10 shadow-lg transition-all duration-300",
          sizeMap[size],
        )}
        style={{ backgroundColor: hex }}
      />
      {showHex && (
        <span className="font-mono text-sm tracking-wider text-white/70">
          {hex}
        </span>
      )}
    </div>
  );
}
