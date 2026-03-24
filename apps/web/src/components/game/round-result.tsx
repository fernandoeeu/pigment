import { Button } from "@color-game/ui/components/button";
import { cn } from "@color-game/ui/lib/utils";
import { ArrowRight, Flame } from "lucide-react";
import { useEffect, useState } from "react";
import { rgbToHex } from "../../lib/color";
import { SCORE_BAD, SCORE_GOOD, SCORE_GREAT } from "../../lib/constants";
import type { RGB } from "../../lib/game-types";
import { useTickingNumber } from "../../hooks/use-ticking-number";

interface RoundResultProps {
  targetColor: RGB;
  playerColor: RGB;
  score: number;
  streak: number;
  onNext: () => void;
}

export default function RoundResult({
  targetColor,
  playerColor,
  score,
  streak,
  onNext,
}: RoundResultProps) {
  const [step, setStep] = useState(0);
  const tickedScore = useTickingNumber(score, 1500, step >= 3);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 700),
      setTimeout(() => setStep(3), 1100),
      setTimeout(() => setStep(4), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const targetHex = rgbToHex(targetColor);
  const playerHex = rgbToHex(playerColor);

  const scoreColor =
    score >= SCORE_GREAT
      ? "text-emerald-300"
      : score >= SCORE_GOOD
        ? "text-amber-300"
        : score >= SCORE_BAD
          ? "text-white/70"
          : "text-red-400";

  const scoreGlow =
    score >= SCORE_GREAT
      ? "shadow-[0_0_40px_-5px] shadow-emerald-400/40"
      : score >= SCORE_GOOD
        ? "shadow-[0_0_40px_-5px] shadow-amber-400/30"
        : "";

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-8">
      {/* Color comparison */}
      <div className="flex items-center gap-4">
        {/* Target */}
        <div
          className={cn(
            "flex flex-col items-center gap-2 transition-all duration-500",
            step >= 1
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0",
          )}
        >
          <span className="font-body text-[10px] tracking-widest text-white/30 uppercase">
            Target
          </span>
          <div
            className="h-28 w-28 rounded-2xl ring-1 ring-white/10 sm:h-36 sm:w-36"
            style={{ backgroundColor: targetHex }}
          />
          <span className="font-mono text-xs text-white/40">{targetHex}</span>
        </div>

        {/* VS divider */}
        <div
          className={cn(
            "font-display text-xs font-bold text-white/20 transition-all duration-300",
            step >= 2 ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
        >
          vs
        </div>

        {/* Player */}
        <div
          className={cn(
            "flex flex-col items-center gap-2 transition-all duration-500",
            step >= 2
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0",
          )}
        >
          <span className="font-body text-[10px] tracking-widest text-white/30 uppercase">
            Yours
          </span>
          <div
            className="h-28 w-28 rounded-2xl ring-1 ring-white/10 sm:h-36 sm:w-36"
            style={{ backgroundColor: playerHex }}
          />
          <span className="font-mono text-xs text-white/40">{playerHex}</span>
        </div>
      </div>

      {/* Score */}
      <div
        className={cn(
          "flex flex-col items-center gap-1 transition-all duration-700",
          step >= 3 ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          scoreGlow,
          score >= SCORE_GREAT && step >= 3 && "pigment-score-burst",
          score < SCORE_BAD && step >= 3 && "pigment-shake",
        )}
      >
        <span className="font-body text-xs tracking-widest text-white/30 uppercase">
          Match
        </span>
        <span
          className={cn(
            "font-display text-6xl font-black tabular-nums tracking-tight sm:text-7xl",
            scoreColor,
          )}
        >
          {tickedScore}%
        </span>
        {score >= SCORE_GREAT && step >= 3 && (
          <span className="font-body mt-1 text-xs tracking-wider text-emerald-300/70 animate-in fade-in zoom-in-75 duration-500">
            Perfect eye!
          </span>
        )}
        {score >= SCORE_GOOD && score < SCORE_GREAT && step >= 3 && (
          <span className="font-body mt-1 text-xs tracking-wider text-amber-300/70 animate-in fade-in zoom-in-75 duration-500">
            Nice one!
          </span>
        )}
        {score < SCORE_BAD && step >= 3 && (
          <span className="font-body mt-1 text-xs tracking-wider text-red-400/70 animate-in fade-in zoom-in-75 duration-500">
            Keep trying...
          </span>
        )}
      </div>

      {/* Streak */}
      {streak > 0 && step >= 3 && (
        <div className="flex items-center gap-1.5 animate-in fade-in zoom-in-90 duration-300">
          <Flame className="h-4 w-4 text-orange-400" />
          <span className="font-display text-sm font-bold text-orange-400">
            {streak}x streak
          </span>
        </div>
      )}

      {/* Continue */}
      <div
        className={cn(
          "transition-all duration-500",
          step >= 4 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        )}
      >
        <Button
          size="lg"
          onClick={onNext}
          className="rounded-xl bg-white/10 px-8 py-5 font-display text-sm font-semibold text-white transition-all hover:bg-white/15"
        >
          Next Round
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
