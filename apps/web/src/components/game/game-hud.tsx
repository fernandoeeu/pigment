import { cn } from "@color-game/ui/lib/utils";
import { Flame, Heart, Zap } from "lucide-react";
import type { GameState } from "../../lib/game-types";

interface GameHUDProps {
  state: GameState;
  timerProgress?: number;
  showTimer?: boolean;
}

export default function GameHUD({
  state,
  timerProgress = 1,
  showTimer = false,
}: GameHUDProps) {
  const timerColor =
    timerProgress > 0.5
      ? "bg-emerald-400"
      : timerProgress > 0.25
        ? "bg-amber-400"
        : "bg-red-400";

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        {/* Round */}
        <div className="flex items-center gap-2">
          <span className="font-body text-xs tracking-widest text-white/40 uppercase">
            Round
          </span>
          <span className="font-display text-lg font-bold text-white">
            {state.round}
          </span>
        </div>

        {/* Score */}
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-400" />
          <span className="font-display text-lg font-bold text-amber-400">
            {state.totalScore}
          </span>
        </div>

        {/* Streak */}
        {state.streak > 0 && (
          <div className="flex items-center gap-1.5 animate-in fade-in zoom-in-90 duration-300">
            <Flame className="h-4 w-4 text-orange-400" />
            <span className="font-display text-sm font-bold text-orange-400">
              {state.streak}x
            </span>
          </div>
        )}

        {/* Lives */}
        {state.config?.endCondition === "lives" && (
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={cn(
                  "h-4 w-4 transition-all duration-300",
                  i < state.lives
                    ? "fill-red-400 text-red-400"
                    : "text-white/15",
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Timer bar */}
      {showTimer && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className={cn(
              "h-full rounded-full transition-all ease-linear",
              timerColor,
            )}
            style={{
              width: `${timerProgress * 100}%`,
              transitionDuration: "100ms",
            }}
          />
        </div>
      )}
    </div>
  );
}
