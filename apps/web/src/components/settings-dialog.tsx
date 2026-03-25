import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@color-game/ui/components/dialog";
import { cn } from "@color-game/ui/lib/utils";
import { Eye, Settings } from "lucide-react";
import { useState } from "react";
import { useSettings } from "../hooks/use-settings";
import { generateRandomColor, rgbToHex } from "../lib/color";
import type { ColorVisionMode } from "../lib/settings";

const visionModes: Array<{
  id: ColorVisionMode;
  label: string;
  desc: string;
  tag?: string;
}> = [
  {
    id: "normal",
    label: "Standard",
    desc: "Full color spectrum",
  },
  {
    id: "protanopia",
    label: "Protanopia",
    desc: "Red-blind — blue & yellow palette",
    tag: "Red",
  },
  {
    id: "deuteranopia",
    label: "Deuteranopia",
    desc: "Green-blind — blue & yellow palette",
    tag: "Green",
  },
];

function ColorPreview({ mode }: { mode: ColorVisionMode }) {
  // Generate a consistent set of preview colors for this mode
  const [colors] = useState(() =>
    Array.from({ length: 5 }, () => generateRandomColor(mode)),
  );

  return (
    <div className="flex gap-1.5">
      {colors.map((color, i) => (
        <div
          key={i}
          className="relative h-6 w-6 overflow-hidden rounded-full ring-1 ring-white/10"
          style={{ backgroundColor: rgbToHex(color) }}
        >
          <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),inset_0_-1px_2px_rgba(0,0,0,0.2)]" />
        </div>
      ))}
    </div>
  );
}

export default function SettingsDialog() {
  const { colorVisionMode, setColorVisionMode } = useSettings();

  return (
    <Dialog>
      <DialogTrigger
        className="group relative flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-all hover:bg-white/5 hover:text-white/70"
        aria-label="Settings"
      >
        <Settings className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
      </DialogTrigger>

      <DialogContent
        className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[oklch(0.13_0.005_270)] p-0 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] sm:max-w-md"
        showCloseButton={false}
      >
        {/* Header */}
        <DialogHeader className="border-b border-white/[0.06] px-5 pt-5 pb-4">
          <DialogTitle className="font-display text-base font-bold tracking-tight text-white">
            Settings
          </DialogTitle>
          <DialogDescription className="text-xs text-white/35">
            Customize your game experience
          </DialogDescription>
        </DialogHeader>

        {/* Accessibility Section */}
        <div className="px-5 py-4">
          <div className="mb-3 flex items-center gap-2">
            <Eye className="h-3.5 w-3.5 text-white/30" />
            <span className="font-body text-[11px] font-medium tracking-widest text-white/30 uppercase">
              Color Vision
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {visionModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setColorVisionMode(mode.id)}
                className={cn(
                  "group relative flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all duration-200",
                  colorVisionMode === mode.id
                    ? "border-amber-400/30 bg-amber-400/[0.04] shadow-[0_0_20px_-8px] shadow-amber-400/15"
                    : "border-white/[0.06] bg-white/[0.015] hover:border-white/10 hover:bg-white/[0.03]",
                )}
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "font-display text-sm font-semibold transition-colors",
                        colorVisionMode === mode.id
                          ? "text-white"
                          : "text-white/55",
                      )}
                    >
                      {mode.label}
                    </span>
                    {mode.tag && (
                      <span className="rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-white/25">
                        {mode.tag}-blind
                      </span>
                    )}
                  </div>
                  <span className="font-body text-xs text-white/30">
                    {mode.desc}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <ColorPreview mode={mode.id} />
                  <div
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all",
                      colorVisionMode === mode.id
                        ? "border-amber-400 bg-amber-400"
                        : "border-white/15 bg-transparent",
                    )}
                  >
                    {colorVisionMode === mode.id && (
                      <div className="h-1.5 w-1.5 rounded-full bg-black" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Info note */}
          <p className="mt-4 font-body text-[11px] leading-relaxed text-white/20">
            Color vision modes adapt which colors appear in challenges so
            they're distinguishable for your type of vision.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
