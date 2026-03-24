import { Button } from "@color-game/ui/components/button";
import { Input } from "@color-game/ui/components/input";
import { Send } from "lucide-react";
import { useState } from "react";
import { hexToRgb, rgbToHex } from "../../lib/color";
import type { RGB } from "../../lib/game-types";
import ColorSwatch from "./color-swatch";

interface ColorInputProps {
  color: RGB;
  onChange: (color: RGB) => void;
  onSubmit: () => void;
}

export default function ColorInput({
  color,
  onChange,
  onSubmit,
}: ColorInputProps) {
  const [hexValue, setHexValue] = useState(rgbToHex(color));

  const updateFromRgb = (channel: "r" | "g" | "b", value: number) => {
    const next = { ...color, [channel]: value };
    onChange(next);
    setHexValue(rgbToHex(next));
  };

  const updateFromHex = (raw: string) => {
    const clean = raw.startsWith("#") ? raw : `#${raw}`;
    setHexValue(clean.toUpperCase());
    if (clean.length === 7) {
      const parsed = hexToRgb(clean);
      if (parsed) onChange(parsed);
    }
  };

  const channels: Array<{
    key: "r" | "g" | "b";
    label: string;
    gradient: string;
  }> = [
    {
      key: "r",
      label: "R",
      gradient: `linear-gradient(to right, rgb(0,${color.g},${color.b}), rgb(255,${color.g},${color.b}))`,
    },
    {
      key: "g",
      label: "G",
      gradient: `linear-gradient(to right, rgb(${color.r},0,${color.b}), rgb(${color.r},255,${color.b}))`,
    },
    {
      key: "b",
      label: "B",
      gradient: `linear-gradient(to right, rgb(${color.r},${color.g},0), rgb(${color.r},${color.g},255))`,
    },
  ];

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <span className="font-body text-xs tracking-[0.25em] text-white/30 uppercase">
        Recreate the color
      </span>

      {/* Preview swatch */}
      <ColorSwatch color={color} size="lg" className="mb-2" />

      {/* Sliders */}
      <div className="flex w-full flex-col gap-4">
        {channels.map((ch) => (
          <div key={ch.key} className="flex items-center gap-3">
            <span className="font-mono w-5 text-xs font-bold text-white/40">
              {ch.label}
            </span>
            <div className="relative flex-1">
              <div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background: ch.gradient,
                  height: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                type="range"
                min={0}
                max={255}
                value={color[ch.key]}
                onChange={(e) =>
                  updateFromRgb(ch.key, Number(e.target.value))
                }
                className="pigment-slider relative z-10 w-full"
              />
            </div>
            <span className="font-mono w-8 text-right text-xs text-white/40">
              {color[ch.key]}
            </span>
          </div>
        ))}
      </div>

      {/* Hex input */}
      <div className="flex w-full items-center gap-3">
        <span className="font-mono text-xs text-white/40">#</span>
        <Input
          value={hexValue.replace("#", "")}
          onChange={(e) => updateFromHex(e.target.value)}
          maxLength={6}
          className="font-mono flex-1 bg-white/[0.03] text-center tracking-[0.3em] text-white/80 uppercase"
          placeholder="FF00AA"
        />
      </div>

      {/* Submit */}
      <Button
        size="lg"
        onClick={onSubmit}
        className="w-full rounded-xl bg-amber-400 py-6 font-display text-base font-bold tracking-wide text-black transition-all hover:bg-amber-300 hover:shadow-[0_0_30px_-5px] hover:shadow-amber-400/40"
      >
        <Send className="mr-2 h-4 w-4" />
        Submit Guess
      </Button>
    </div>
  );
}
